"use strict";

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'fetch-polyfill'; // HOPE remove window.fetch polyfill
import './main.scss';

interface CardListProps{
	title?: string;
	sublist?: boolean;
	cards: {card: string, count:number}[];
	setCurr: (card: string)=>any;
	cardinfo: (key: string)=>ScryfallCard;
	onClick: ()=>any;
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
		let count = this.props.cards.map(({count: count}: {count: number})=>{
			return count;
		}).reduce((a: number, b: number)=>{
			return a + b;
		}, 0);
		let title = this.props.title + " (" + count + ")";
		return <div className="card-list">
			{this.props.title?(this.props.sublist?<h3>{title}</h3>:<h2>{title}</h2>):null}
			<table><tbody>{
				this.props.cards.map(({card: card, count: count}: {card: string, count: number}, idx: number)=>{
					let info = false;
					let mana_cost: string[] = null;
					if(this.props.cardinfo(card)) {
						info = true;
						mana_cost = this.parseManaCost(this.props.cardinfo(card).mana_cost);
					}
					// Calculate width
					let ratio = (16/*table width*/ - 1 - (mana_cost?mana_cost.length:0))/(card.length*0.5);
					return <tr key={idx}
						onMouseOver={()=>this.props.setCurr(card)}
						onClick={()=>{this.props.setCurr(card); this.props.onClick()}} >
						<td className="quantity">{count + "×"}</td>
						<td>
							<div className={info?"card-name":""} style={ratio<1?{transform: "scaleX("+ratio+")"}:null}>{card}</div>
							<div className="mana-cost">{this.renderManaCost(mana_cost)}</div>
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
const enum Sort {
	Type,
	CMC,
	Color,
	Name,
	Keyword
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
						let part = input?input.split('-',3).map((val: string)=>parseInt(val)):[];
						return input?new Date(part[0],part[1],part[2]).valueOf():Number.NEGATIVE_INFINITY;
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
	static splitCard(card: string) {
		return card?card.replace(/ \/\/ .*$/,""):null;
	}
	static data(card: string) {
		return CardInfo.instance.data[CardInfo.splitCard(card)];
	}
	static price(card: string) {
		return CardInfo.instance.price[CardInfo.splitCard(card)];
	}
	static register(rawCards: string[], listener: (card: string)=>any) {
		let cards = rawCards.map(CardInfo.splitCard);
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
	static priceSet(...sets: {[key: string]: number}[]) {
		// Calculate price
		let usd: number = null;
		let tix: number = null;
		sets.forEach((set: {[key: string]: number})=>{
			Object.keys(set).forEach((card: string)=>{
				if(CardInfo.price(card)) {
					usd += set[card] * CardInfo.price(card).usd;
					tix += set[card] * CardInfo.price(card).tix;
				}
			});
		});
		function roundOff(value: number) {
			return value?Number(Math.round(parseFloat(value.toString()+'e2'))+'e-2').toFixed(2):value;
		}
		return {
			usd: roundOff(usd),
			tix: roundOff(tix),
		};
	}
	static sort(cards: {[key: string]: number}, sort: Sort): {name: string, list: {card: string, count: number}[]}[] {
		let buckets: {[key: string]: {card: string, count: number}[]} = {}
		let lists: {name: string, list: {card: string, count: number}[]}[] = []
		let fallback = false;
		function secondSort({card: a}: {card: string}, {card: b}: {card: string}) {
			let cmc_a = parseFloat(CardInfo.data(a).converted_mana_cost);
			let cmc_b = parseFloat(CardInfo.data(b).converted_mana_cost);
			let diff = cmc_a - cmc_b;
			if(diff == 0) {
				if(a < b) {
					return -1;
				} else if(a > b) {
					return 1;
				} else {
					return 0;
				}
			} else {
				return diff;
			}
		}
		switch (sort) {
		case Sort.Type:
			Object.keys(cards).forEach((card: string)=>{
				if(!CardInfo.data(card)) {
					fallback = true;
				}
				if(fallback) {
					return;
				}
				let type_line = CardInfo.data(card).type_line;
				for(let item of ["Land","Creature","Artifact","Enchantment","Planeswalker","Instant","Sorcery"]) {
					if(type_line.includes(item)) {
						if(!buckets.hasOwnProperty(item)) {
							buckets[item] = []
						}
						buckets[item].push({card: card, count: cards[card]});
						break;
					}
				}
			})
			if(!fallback) {
				for(let item of ["Creature","Artifact","Enchantment","Planeswalker","Instant","Sorcery","Land"]) {
					if(buckets.hasOwnProperty(item)) {
						lists.push({
							name: item,
							list: buckets[item].sort(secondSort),
						});
					}
				}
			}
			break;
		case Sort.CMC:
			Object.keys(cards).forEach((card: string)=>{
				if(!CardInfo.data(card)) {
					fallback = true;
				}
				if(fallback) {
					return;
				}
				let cmc = CardInfo.data(card).converted_mana_cost;
				if(!buckets.hasOwnProperty(cmc)) {
					buckets[cmc] = []
				}
				buckets[cmc].push({card: card, count: cards[card]});
			});
			if(!fallback) {
				for(let item of Object.keys(buckets).sort((a: string, b: string)=>{
						return parseFloat(a) - parseFloat(b);
					})) {
					if(buckets.hasOwnProperty(item)) {
						lists.push({
							name: parseFloat(item).toString() + " drop",
							list: buckets[item].sort(({card: a}: {card: string}, {card: b}: {card: string})=>{
									if(a<b) return -1;
									else if(a>b) return 1;
									else return 0;
								}),
						});
					}
				}
			}
			break;
		case Sort.Color:
			Object.keys(cards).forEach((card: string)=>{
				if(!CardInfo.data(card)) {
					fallback = true;
				}
				if(fallback) {
					return;
				}
				let colors = CardInfo.data(card).colors;
				if(colors.length == 0) {
					if(!buckets.hasOwnProperty("Colorless")) {
						buckets["Colorless"] = [];
					}
					buckets["Colorless"].push({card: card, count: cards[card]});
				} else if(colors.length > 1) {
					if(!buckets.hasOwnProperty("Gold")) {
						buckets["Gold"] = [];
					}
					buckets["Gold"].push({card: card, count: cards[card]});
				} else {
					let color = colors[0];
					if(!buckets.hasOwnProperty(color)) {
						buckets[color] = []
					}
					buckets[color].push({card: card, count: cards[card]});
				}
			})
			if(!fallback) {
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
							list: buckets[item].sort(secondSort),
						});
					}
				}
			}
			break;
		case Sort.Name:
		case Sort.Keyword: //TODO
			fallback = true;
			break;
		}
		if(fallback) {
			lists.push({
				name: null,
				list: Object.keys(cards).sort().map((card: string)=>{
					return {card: card, count: cards[card]};
				}),
			});
		}
		return lists;
	}
}

interface DeckListProps{
	name?: string;
	cover?: string;
	mainboard?: {[key: string]: number};
	sideboard?: {[key: string]: number};
	onFile?: ()=>any;
}
interface DeckListState{
	setOrder?: {[key: string]: number};
	price?: {[key: string]: {usd: number, tix: number}};
	curr?: string;
	img?: string;
	sort?: Sort;
	scroll?: string;
}
class DeckList extends React.Component<DeckListProps,DeckListState> {
	static defaultProps: DeckListProps = {
		name: null,
		cover: null,
		mainboard: {},
		sideboard: {},
	}
	startY: number = null;
	endY: number = null;
	child: {
		preview?: Element;
		track?: Element;
	} = {};
	constructor(props: DeckListProps) {
		super(props);
		if(props.mainboard) CardInfo.register(Object.keys(props.mainboard), this.handleInfo);
		if(props.sideboard) CardInfo.register(Object.keys(props.sideboard), this.handleInfo);
		this.state = {
			curr: props.cover?props.cover:
				props.mainboard && Object.keys(props.mainboard).length > 0?Object.keys(props.mainboard).sort()[0]:null,
			sort: Sort.Type,
		};
	}
	componentWillReceiveProps(nextProps: DeckListProps) {
		if(nextProps.cover) this.setState({curr: nextProps.cover});
		if(nextProps.mainboard) CardInfo.register(Object.keys(nextProps.mainboard), this.handleInfo);
		if(nextProps.sideboard) CardInfo.register(Object.keys(nextProps.sideboard), this.handleInfo);
	}
	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
		let previewR = this.child.preview.getClientRects()[0];
		this.startY = previewR.top + window.pageYOffset;
		this.calculateScreenPosition();
		//SAFARI IS DUMB
		if(navigator.vendor == "Apple Computer, Inc.") {
			console.log("Safari is dumb.");
			let manacosts = document.getElementsByClassName('mana-cost')
			for(let idx=0; idx<manacosts.length; idx++) {
				(manacosts[idx] as HTMLElement).style.cssText="position: relative";
			};
			window.setTimeout(()=>{
				for(let idx=0; idx<manacosts.length; idx++) {
					(manacosts[idx] as HTMLElement).style.cssText="position: absolute";
				};
			},0);
		}
		// END DUMB
	}
	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}
	componentDidUpdate() {
		this.calculateScreenPosition();
	}
	calculateScreenPosition() {
		let previewR = this.child.preview.getClientRects()[0];
		let trackR = this.child.track.getClientRects()[0];
		this.endY = this.startY + trackR.height - previewR.height;
	}
	handleInfo = (card: string)=>{
		if(this.state.curr == card) {
			this.setState({
				img: CardInfo.data(this.state.curr).image_uri,
			});
		} else {
			this.forceUpdate();
		}
	}
	handleScroll = ()=>{
		this.calculateScreenPosition();
		let smallMedia = window.matchMedia("(max-width:40em)").matches;
		scrollY = (smallMedia?0:window.pageYOffset);
		// Scrolling
		let scroll = "top"
		if(scrollY > this.endY) {
			scroll = "bottom"
		} else if (scrollY > this.startY) {
			scroll = "fixed"
		}
		this.setState({
			scroll: scroll,
		});
	}
	showPreview = ()=>{
		if(window.matchMedia("(max-width:40em)").matches) {
			this.setState({
				scroll: "fixed",
			});
		}
	}
	togglePreview = ()=>{
		if(window.matchMedia("(max-width:40em)").matches) {
			this.setState({
				scroll: this.state.scroll=="fixed"?"top":"fixed",
			});
		}
	}
	setCurr = (curr: string)=>{
		if(CardInfo.data(curr)) {
			this.setState({
				curr: curr,
				img: CardInfo.data(curr).image_uri,
			});
		} else {
			this.setState({
				curr: curr,
			});
		}
	}
	render() {
		if(this.props.name == null) {
			return <div className="decklist" onClick={this.props.onFile} >
				<div className="head">
					<h1>Rogue Deck Builder</h1>
				</div>
				<div className="body">
					<div className="message">Upload file</div>
					<div ref={(ref)=>{this.child.track=ref}} className="preview-track">
						<div ref={(ref)=>{this.child.preview=ref}}
							className={"preview-frame"}>
							<div className="preview">
								<div className="preview-img"></div>
								<span></span>
							</div>
						</div>
					</div>
				</div>
			</div>
		}
		let lists = CardInfo.sort(this.props.mainboard, this.state.sort);
		let sideboard = CardInfo.sort(this.props.sideboard, Sort.Name)[0];
		let price = CardInfo.priceSet(this.props.mainboard, this.props.sideboard);
		let priceImg = CardInfo.price(this.state.curr);
		// Calculate height
		const headerSize = 4;
		const lineSize = 1.6;
		let height: number[] = [];
		lists.forEach(({list: list}: {list: {card: string, count: number}[]})=>{
			height.push(headerSize + lineSize * list.length);
		});
		height.push(headerSize + 1 + lineSize * sideboard.list.length);
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
					lists.map((item: {name: string, list: {card: string, count: number}[]}, idx: number)=>{
						return <CardList title={item.name} sublist={true} key={idx} cards={item.list} cardinfo={CardInfo.data} setCurr={this.setCurr} onClick={this.showPreview}/>
					})
				}
				<CardList title="Sideboard" cards={sideboard.list} cardinfo={CardInfo.data} setCurr={this.setCurr} onClick={this.showPreview}/>
				</div>
				<div ref={(ref)=>{this.child.track=ref}} className="preview-track">
					<div ref={(ref)=>{this.child.preview=ref}}
						className={"preview-frame "+this.state.scroll}
						onClick={this.togglePreview}>
						<div className="preview">
							<div className="preview-img">
								{this.state.img?<img src={this.state.img}/>:null}
							</div>
							{priceImg?
								<span>
									{priceImg.usd} USD / {priceImg.tix} TIX
								</span>
							:null}
						</div>
					</div>
				</div>
			</div>
		</div>
	}
}

const enum State {
	Main,
	Side,
};
class DeckParser {
	static parseText(name: string, lines: string[]) {
		let cover: string = null;
		let mainboard: {[key: string]: number} = {}
		let sideboard: {[key: string]: number} = {}
		let state: State = null;
		lines.forEach((line: string)=>{
			line = line.trim();
			let space = line.indexOf(' ');
			let count: number = null;
			let card: string = null;
			if(space > -1) {
				count = parseInt(line.slice(0,line.indexOf(' ')));
				card = line.slice(line.indexOf(' ')+1);
			}
			switch(state) {
			case null:
				if(line.length) {
					state=State.Main;
				} else {
					break;
				}
				/* fall through */
			case State.Main:
				if(!line.length) {
					state=State.Side;
					break;
				}
				if(count && card) {
					if(cover == null) {
						cover = card;
					}
					mainboard[card] = count;
				}
				break;
			case State.Side:
				if(!line.length) {
					break;
				}
				if(count && card) {
					if(cover == null) {
						cover = card;
					}
					sideboard[card] = count;
				}
			};
		});

		return {
			name: name,
			cover: cover,
			mainboard: mainboard,
			sideboard: sideboard,
		};
	}
}

interface DeckManagerProps{
}
interface DeckManagerState{
	name?: string;
	cover?: string;
	mainboard?: {[key: string]: number};
	sideboard?: {[key: string]: number};
}
class DeckManager extends React.Component<DeckManagerProps,DeckManagerState> {
	child: {
		input?: HTMLElement;
	} = {};
	constructor(props: DeckListProps) {
		super(props);
		this.state = {
			name: null,
			cover: null,
			mainboard: null,
			sideboard: null,
		}
	}
	onFile = () => {
		this.child.input.click();
	}
	handleFile = (event: React.FormEvent)=>{
		let file = event.target.files[0];
		let reader = new FileReader();
		reader.onload = (event: Event)=>{
			let output = DeckParser.parseText(
				file.name.replace(/\.[a-z]*$/,""),
				event.target.result.split(/\r?\n/),
			);
			this.setState(output);
		}
		reader.readAsText(file);
	}
	render() {
		return <div>
			<input ref={(ref)=>this.child.input=ref} className="hidden-input" type="file" onChange={this.handleFile}/>
			<DeckList name={this.state.name}
				cover={this.state.cover}
				mainboard={this.state.mainboard}
				sideboard={this.state.sideboard}
				onFile={this.onFile}
			/>
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
			<DeckManager/>
			<p>ababa</p>
			<p>ababa</p>
			<p>ababa</p>
			<p>ababa</p>
			<p>ababa</p>
			<p>ababa</p>
			<p>ababa</p>
			<p>ababa</p>
			<p>ababa</p>
			<p>ababa</p>
			<p>ababa</p>
			<p>ababa</p>
			<p>ababa</p>
			<p>ababa</p>
		</div>
	}
}
