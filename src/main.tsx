"use strict";

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'fetch-polyfill'; // HOPE remove window.fetch polyfill
import './main.scss';

interface CardListProps{
	title?: string;
	sublist?: boolean;
	cards: {[key: string]: number};
	setCurr: (card: string)=>any;
	cardinfo?: {[key: string]: ScryfallCard};
}
interface CardListState{ }
class CardList extends React.Component<CardListProps,CardListState> {
	parseManaCost(cost?: string) {
		return cost?cost.slice(0,-1).split('}{').map((sym: string)=>{
			return sym.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
		}):null;
	}
	renderManaCost(symbols: string[]) {
		return symbols?symbols.map((sym: string, idx: number)=>{
			return <span key={idx} className={"mana small s"+sym}/>
		}):null;
	}
	render() {
		return <div className="card-list">
			{this.props.title?(this.props.sublist?<h3>{this.props.title}</h3>:<h2>{this.props.title}</h2>):null}
			<table><tbody>{
				Object.keys(this.props.cards).sort().map((card: string, idx: number)=>{
					let info = false;
					let mana_cost: string[] = null;
					if(this.props.cardinfo && this.props.cardinfo[card]) {
						info = true;
						mana_cost = this.parseManaCost(this.props.cardinfo[card].mana_cost);
					}
					// Calculate width TODO
					let width = card.length*0.6/(17/*table width*/ - 2 - (mana_cost?mana_cost.length:0));
					return <tr key={idx}
						onMouseOver={()=>this.props.setCurr(card)}
						onClick={()=>this.props.setCurr(card)} >
						<td className="quantity">{this.props.cards[card] + "×"}</td>
						<td>
							<span className={info?"card-name":""} style={width>1?{transform: "scale("+length+",1)"}:{}}>{card}</span>
							<span className="mana-cost">{this.renderManaCost(mana_cost)}</span>
						</td>
					</tr>
				})
			}</tbody></table>
		</div>
	}
}

interface ScryfallCard {
	name: string;
	mana_cost?: string;
	converted_mana_cost: string;
	type_line: string;
	oracle_text: string;
	power?: string;
	toughness?: string;
	loyalty?: string;
	hand_modifier?: string;
	life_modifier?: string;
	colors: string[];
	color_identity: string[];
	layout: string;
	legalities: {
		standard: string;
		modern: string;
		legacy: string;
		vintage: string;
		commander: string;
		pauper: string;
		frontier: string;
		penny: string;
		duel: string;
	};
	reserved: boolean;
	id: string;
	multiverse_id?: number;
	mtgo_id?: number;
	set: string;
	set_name: string;
	collector_number?: string;
	all_parts?: {
		id: string;
		name: string;
		uri: string;
	}[];
	rarity: string;
	digital: boolean;
	flavor_text: string;
	artist: string;
	frame: string;
	border: string;
	timeshifted: boolean;
	colorshifted: boolean;
	futureshifted: boolean;
	usd?: string;
	tix?: string;
	scryfall_uri: string;
	image_uri: string;
}
interface ScryfallSet {
	object: string,
	code: string,
	name: string,
	set_type: string,
	released_at: string,
	search_uri: string,
}
interface ScryfallSetList {
	data: ScryfallSet[];
	has_more: boolean;
	next_page?: string;
	total_cards?: number;
	warnings: string[];
}
interface ScryfallCardList {
	data: ScryfallCard[];
	has_more: boolean;
	next_page?: string;
	total_cards?: number;
	warnings: string[];
}
enum Sort {
	Type,
	CMC,
	Color,
	Name,
	Keyword
}
interface DeckListProps{
	name?: string;
	mainboard?: {[key: string]: number};
	sideboard?: {[key: string]: number};
}
interface DeckListState{
	setOrder?: {[key: string]: number};
	price?: {[key: string]: {usd: number, tix: number}};
	curr?: string;
	img?: string;
	sort?: Sort;
	startY?: number;
	maxY?: number;
	scrollY?: number;
}
class CardInfo {
	data: {[key: string]: ScryfallCard} = {};
	price: {[key: string]: {usd: number, tix: number}} = {};
	setOrder: {[key: string]: number} = null;
	listener: {[key: string]: ((card: string)=>any)[]} = {};
	static instance = new CardInfo;
	constructor() {
		fetch('https://api.scryfall.com/sets').then((response: Promise<Response>)=>{
			if(response.status !== 200) {
				console.log(response.status, response.url);
			} else {
				response.json().then((json: ScryfallSetList)=>{
					// Sort sets
					let sets: string[] = [];
					function date(input: string) {
						return input?new Date(...input.split('-')):0;
					}
					json.data.sort((a: ScryfallSet,b: ScryfallSet)=>{
						return date(a.released_at) - date(b.released_at)
					}).forEach((set: ScryfallSet)=>{
						sets.push(set.code)
					});
					this.setOrder = {};
					sets.forEach((set: string, idx: number)=>{
						this.setOrder[set] = idx;
					});
					// Trigger update for early listeners
					this.updateInfo();
				})
			}
		})
	}
	static get data() {
		return CardInfo.instance.data;
	}
	static register(cards: string[], listener: (card: string)=>any) {
		cards.forEach((card: string)=>{
			if(!CardInfo.instance.data.hasOwnProperty(card)) {
				CardInfo.instance.data[card] = null
			}
			if(!CardInfo.instance.price.hasOwnProperty(card)) {
				CardInfo.instance.price[card] = {
					usd: Number.POSITIVE_INFINITY,
					tix: Number.POSITIVE_INFINITY,
				};
			}
		});
		cards.forEach((card: string)=>{
			if(!CardInfo.instance.listener.hasOwnProperty(card)) {
				CardInfo.instance.listener[card] = [];
			}
			CardInfo.instance.listener[card].push(listener);
		});
		if(!CardInfo.instance.setOrder) {
			return;
		} else {
			CardInfo.instance.updateInfo();
		}
	}
	static sort(cards: {[key: string]: number}, sort: Sort): {name: string, list: {[key: string]: number}}[] {
		let buckets: {[key: string]: {[key: string]: number}} = {}
		let lists: {name: string, list: {[key: string]: number}}[] = []
		let sortByName = !CardInfo.data;
		if(!sortByName) {
			switch (sort) {
			case Sort.Type:
				Object.keys(cards).forEach((card: string)=>{
					if(!CardInfo.data[card]) {
						sortByName = true;
					}
					if(sortByName) {
						return;
					}
					let type_line = CardInfo.data[card].type_line;
					for(let item of ["Land","Creature","Artifact","Enchantment","Planeswalker","Instant","Sorcery"]) {
						if(type_line.includes(item)) {
							if(!buckets.hasOwnProperty(item)) {
								buckets[item] = {}
							}
							buckets[item][card] = cards[card];
							break;
						}
					}
				})
				if(!sortByName) {
					for(let item of ["Creature","Artifact","Enchantment","Planeswalker","Instant","Sorcery","Land"]) {
						if(buckets.hasOwnProperty(item)) {
							lists.push({
								name: item,
								list: buckets[item],
							});
						}
					}
				}
				break;
			case Sort.CMC:
				Object.keys(cards).forEach((card: string)=>{
					if(!CardInfo.data[card]) {
						sortByName = true;
					}
					if(sortByName) {
						return;
					}
					let cmc = CardInfo.data[card].converted_mana_cost;
					if(!buckets.hasOwnProperty(cmc)) {
						buckets[cmc] = {}
					}
					buckets[cmc][card] = cards[card];
				});
				if(!sortByName) {
					for(let item of Object.keys(buckets).sort()) {
						if(buckets.hasOwnProperty(item)) {
							lists.push({
								name: parseFloat(item).toString() + " drop",
								list: buckets[item.toString()],
							});
						}
					}
				}
				break;
			case Sort.Color:
				Object.keys(cards).forEach((card: string)=>{
					if(!CardInfo.data[card]) {
						sortByName = true;
					}
					if(sortByName) {
						return;
					}
					let colors = CardInfo.data[card].colors;
					if(colors.length == 0) {
						if(!buckets.hasOwnProperty("Colorless")) {
							buckets["Colorless"] = {}
						}
						buckets["Colorless"][card] = cards[card];
					} else if(colors.length > 1) {
						if(!buckets.hasOwnProperty("Gold")) {
							buckets["Gold"] = {}
						}
						buckets["Gold"][card] = cards[card];
					} else {
						let color = colors[0];
						if(!buckets.hasOwnProperty(color)) {
							buckets[color] = {}
						}
						buckets[color][card] = cards[card];
					}
				})
				if(!sortByName) {
					for(let item of ["W","U","B","R","G","Gold","Colorless"]) {
						if(buckets.hasOwnProperty(item)) {
							let name: string;
							switch(item) {
							case "W":
								name = "White";
								break;
							case "U":
								name = "Blue";
								break;
							case "B":
								name = "Black";
								break;
							case "R":
								name = "Red";
								break;
							case "G":
								name = "Green";
								break;
							default:
								name = item;
							}
							lists.push({
								name: name,
								list: buckets[item],
							});
						}
					}
				}
				break;
			case Sort.Name:
			case Sort.Keyword: //TODO
				sortByName = true;
				break;
			}
		} else {
			lists.push({
				name: null,
				list: cards,
			});
		}
		return lists;
	}
	updateInfo() {
		let missing = Object.keys(this.data)
			.filter((card: string)=> { return !this.data[card] });
		missing.forEach((card: string)=>{
			fetch('https://api.scryfall.com/cards/search?q='+encodeURIComponent('++!"'+card+'"'))
				.then((response: Promise<Response>)=>{
					if(response.status !== 200) {
						console.log(response.status, response.url);
					} else {
						response.json().then((json: ScryfallCardList)=>{
							let latestSet = Number.NEGATIVE_INFINITY;
							let cards = new Set();
							json.data.forEach((info: ScryfallCard)=>{
								cards.add(info.name);
								if(!info.digital && latestSet < this.setOrder[info.set]) {
									this.data[info.name] = info;
									latestSet = this.setOrder[info.set];
								}
								if(info.usd !== null) {
									let usd = parseFloat(info.usd);
									if (usd < this.price[info.name].usd) {
										this.price[info.name].usd = usd;
									}
								}
								if(info.tix !== null) {
									let tix = parseFloat(info.tix);
									if (tix < this.price[info.name].tix) {
										this.price[info.name].tix = tix;
									}
								}
							})
							cards.forEach((card: string)=>{
								if(this.listener.hasOwnProperty(card)) {
									// listener Trigger if state.curr eq then update state.img = info.image_uri
									this.listener[card].forEach((listener: (card: string)=>any)=>{
										listener(card);
									});
								}
							});
						})
					}
				})
		})
	}
}
class DeckList extends React.Component<DeckListProps,DeckListState> {
	static defaultProps: DeckListProps = {
		name: "",
		mainboard: {},
		sideboard: {},
	}
	maxY: number = null;
	startY: number = null;
	child: {
		preview?: Element;
		track?: Element;
	} = {};
	constructor(props: DeckListProps) {
		super(props);
		CardInfo.register(Object.keys(props.mainboard), this.handleInfo);
		CardInfo.register(Object.keys(props.sideboard), this.handleInfo);
		this.state = {
			curr: Object.keys(props.mainboard).length > 0?Object.keys(props.mainboard).sort()[0]:null,
			sort: Sort.Type,
		};
	}
	componentWillReceiveProps(nextProps: DeckListProps) {
		CardInfo.register(Object.keys(nextProps.mainboard), this.handleInfo);
		CardInfo.register(Object.keys(nextProps.sideboard), this.handleInfo);
	}
	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
		let previewR = this.child.preview.getClientRects()[0];
		this.startY = previewR.top + document.body.scrollTop;
		this.calculateScreenPosition();
	}
	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}
	componentDidUpdate() {
		this.calculateScreenPosition();
	}
	handleInfo = (card: string)=>{
		if(this.state.curr == card) {
			this.setState({
				img: CardInfo.data[this.state.curr].image_uri,
			});
		} else {
			this.forceUpdate();
		}
	}
	calculateScreenPosition() {
		let previewR = this.child.preview.getClientRects()[0];
		let trackR = this.child.track.getClientRects()[0];
		this.maxY = trackR.height - previewR.height;
	}
	handleScroll = ()=>{
		let previewR = this.child.preview.getClientRects()[0];
		let trackR = this.child.track.getClientRects()[0];
		let smallMedia = window.matchMedia("(max-width:36)").matches; // TODO fix
		this.maxY = trackR.height - previewR.height,
		this.setState({
			scrollY: (smallMedia?0:document.body.scrollTop),
		});
	}
	setCurr = (curr: string)=>{
		if(CardInfo.data[curr]) {
			this.setState({
				curr: curr,
				img: CardInfo.data[curr].image_uri,
			});
		} else {
			this.setState({
				curr: curr,
			});
		}
	}
	render() {
		let lists = CardInfo.sort(this.props.mainboard, this.state.sort);
		// Calculate price
		let price: {usd: string, tix: string} = {
			usd: null, tix: null,
		}
		let priceImg: {usd: string, tix: string};
		if(this.state.price) {
			Object.keys(this.props.mainboard).forEach((card: string)=>{
				price.usd += this.props.mainboard[card] * this.state.price[card].usd;
				price.tix += this.props.mainboard[card] * this.state.price[card].tix;
			});
			Object.keys(this.props.sideboard).forEach((card: string)=>{
				price.usd += this.props.sideboard[card] * this.state.price[card].usd;
				price.tix += this.props.sideboard[card] * this.state.price[card].tix;
			});
			price.usd = Number(Math.round(parseFloat(price.usd.toString()+'e2'))+'e-2').toFixed(2);
			price.tix = Number(Math.round(parseFloat(price.tix.toString()+'e2'))+'e-2').toFixed(2);
			priceImg = {
				usd: this.state.price[this.state.curr].usd.toFixed(2),
				tix: this.state.price[this.state.curr].tix.toFixed(2),
			};
		} else {
			price = {
				usd: null,
				tix: null,
			}
		}
		// Calculate height
		const headerSize = 4;
		const lineSize = 1.6;
		let height: number[] = [];
		lists.forEach((list: {name: string, list: {[key: string]: number}})=>{
			height.push(headerSize + lineSize * Object.keys(list.list).length);
		});
		height.push(headerSize + 1 + lineSize * Object.keys(this.props.sideboard).length);
		let cutoff = 0;
		let last: number = null;
		let sum = height.reduce((a: number, b: number)=>{return a+b});
		height.forEach((piece: number)=>{
			if(last == null && cutoff + piece < sum/2) {
				cutoff += piece;
			} else if (last == null) {
				last = piece
			}
		});
		cutoff = Math.min(cutoff + last, sum - cutoff);
		// Translate preview
		let translateY = Math.min(this.maxY, Math.max(this.state.scrollY - this.startY, 0));
		// Return DOM
		return <div className="decklist">
			<div className="head">
				<h1>{this.props.name}</h1>
				<span className="price">&mdash;&nbsp;{price.usd} USD / {price.tix} TIX</span>
				<div className="select">
					<span>Sort by </span>
					<select value={this.state.sort.toString()}
						onChange={(e: React.FormEvent)=>this.setState({sort:parseInt(e.target.value)})}>
						<option value={Sort.Type.toString()}>Type</option>
						<option value={Sort.CMC.toString()}>Converted Mana Cost</option>
						<option value={Sort.Color.toString()}>Color</option>
						<option value={Sort.Name.toString()}>Name</option>
					</select>
				</div>
			</div>
			<div className="body">
				<div className="lists" style={{height: cutoff + 'em'}}>
				{
					lists.map((item: {name: string, list: {[key: string]: number}}, idx: number)=>{
						return <CardList title={item.name} sublist={true} key={idx} cards={item.list} cardinfo={CardInfo.data} setCurr={this.setCurr}/>
					})
				}
				<CardList title="Sideboard" cards={this.props.sideboard} cardinfo={CardInfo.data} setCurr={this.setCurr}/>
				</div>
				<div ref={(ref)=>{this.child.track=ref}} className="preview-track">
					<div ref={(ref)=>{this.child.preview=ref}} style={{transform: "translateY("+translateY+"px)"}} className="preview-frame">
						<div className="preview">
							<div className="preview-img">
								{this.state.img?<img src={this.state.img}/>:null}
							</div>
							{this.state.price?<span>{priceImg.usd} USD / {priceImg.tix} TIX</span>:null}
						</div>
					</div>
				</div>
			</div>
		</div>
	}
}

export interface MainProps{
	autofocus?: boolean;
}
export interface MainState{
	focus?: boolean;
}
export default class extends React.Component<MainProps,MainState> {
	render() {
		return <div className="roguebuilder">
			<DeckList name="Skred Red"
				mainboard={{
					"Lightning Bolt": 4,
					"Magma Jet": 1,
					"Skred": 4,
					"Anger of the Gods": 3,
					"Mizzium Mortars": 1,
					"Roast": 1,
					"Batterskull": 1,
					"Mind Stone": 4,
					"Relic of Progenitus": 4,
					"Chandra, Pyromaster": 1,
					"Koth of the Hammer": 4,
					"Scrying Sheets": 3,
					"Snow-Covered Mountain": 20,
					"Eternal Scourge": 2,
					"Pia and Kiran Nalaar": 4,
					"Blood Moon": 3,
				}}
				sideboard={{
					"Anger of the Gods": 1,
					"Dragon's Claw": 3,
					"Molten Rain": 3,
					"Pyrite Spellbomb": 2,
					"Shattering Spree": 1,
					"Stormbreath Dragon": 2,
					"Sudden Shock": 2,
					"Vandalblast": 1,
				}}
				/>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
				<p>abababa</p>
		</div>
	}
}
