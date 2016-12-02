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
						mana_cost = CardInfo.manaCost(card);
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
	object: string;
	code: string;
	name: string;
	set_type: string;
	released_at: string;
	search_uri: string;
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
						if(!input) {
							return Number.NEGATIVE_INFINITY;
						} else {
							let part = input.split('-',3).map((val: string)=>parseInt(val));
							return new Date(part[0],part[1],part[2]).valueOf();
						}
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
								if(latestSet < this.setOrder[info.set]) {
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
	static manaCost(card: string) {
		let cost = CardInfo.instance.data[CardInfo.splitCard(card)].mana_cost;
		return cost?cost.slice(0,-1).split('}{').map((sym: string)=>{
			return sym.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
		}):[];
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
				let syms_a = CardInfo.manaCost(a).length;
				let syms_b = CardInfo.manaCost(b).length;
				let diff = syms_a - syms_b;
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
							list: buckets[item].sort(secondSort),
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

const enum Media {
	Small,
	Medium,
	Large,
}
function MediaBreakpoint() {
	let small = window.matchMedia("(max-width:40em)").matches;
	let big = window.matchMedia("(max-width:60em)").matches;
	if(small) {
		return Media.Small;
	} else if (big) {
		return Media.Medium;
	} else {
		return Media.Large;
	}
}

interface DeckListMenuProps{
	onUpload: ()=>any;
	decks: string[];
}
interface DeckListMenuState{
	decksOpen?: boolean;
	decksAnchor?: DOMEventTarget;
}
class DeckListMenu extends React.Component<DeckListMenuProps,DeckListMenuState> {
	constructor(props: DeckListMenuProps) {
		super(props)
		this.state = {
			decksOpen: false,
		};
	}
	openDecks = (event: React.MouseEvent)=>{
		event.preventDefault()
		this.setState({
			decksOpen: true,
			decksAnchor: event.currentTarget,
		});
	}
	closeDecks = ()=>{
		this.setState({
			decksOpen: false,
		});
	}
	render() {
		return <div className="main-menu">
			<div className="menu-item file-upload" onClick={this.props.onUpload}>
				<i className="fa fa-plus-circle" style={{fontSize: '0.7em'}} aria-hidden="true" />
				&nbsp;
				<i className="fa fa-file-text-o" aria-hidden="true" />
			</div>
		</div>
	}
}

interface DeckListProps{
	name?: string;
	cover?: string;
	mainboard?: {[key: string]: number};
	sideboard?: {[key: string]: number};
	onUpload?: ()=>any;
	decks?: string[];
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
	scrollY: number = window.pageYOffset;
	scrolling: boolean = false;
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
		let startYMod = 0;
		if(MediaBreakpoint() == Media.Medium) {
			startYMod = 20;
		}
		this.endY = this.startY + startYMod + trackR.height - previewR.height;
	}
	SafariIsBeingDumb: boolean = false;
	handleInfo = (card: string)=>{
		//SAFARI IS DUMB
		function SafariIsDumb() {
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
		function fixSafari() {
			if(!this.SafariIsBeingDumb) {
				requestAnimationFrame(SafariIsDumb);
			}
			this.SafariIsBeingDumb = true;
		}
		let Safari = navigator.vendor.indexOf("Apple") > -1;
		// END DUMB
		if(this.state.curr == card) {
			this.setState({
				img: CardInfo.data(this.state.curr).image_uri,
			}, Safari?fixSafari:null);
		} else {
			this.forceUpdate(Safari?fixSafari:null);
		}
	}
	handleScroll = ()=>{
		this.scrollY = window.pageYOffset;
		this.tickScroll();
	}
	tickScroll = ()=>{
		if(!this.scrolling) {
			requestAnimationFrame(this.updateScroll);
		}
		this.scrolling = true;
	}
	updateScroll = ()=>{
		this.calculateScreenPosition();
		scrollY = (MediaBreakpoint() == Media.Small?0:this.scrollY);
		let startYMod = 0;
		if(MediaBreakpoint() == Media.Medium) {
			startYMod = 20;
		}
		// Scrolling
		let scroll = "top"
		if(scrollY > this.endY) {
			scroll = "bottom"
		} else if (scrollY > this.startY + startYMod) {
			scroll = "fixed"
		}
		if(scroll != this.state.scroll) {
			this.setState({
				scroll: scroll,
			}, ()=>{this.scrolling=false});
		} else {
			this.scrolling=false;
		}
	}
	showPreview = ()=>{
		if(MediaBreakpoint() == Media.Small) {
			this.setState({
				scroll: "fixed",
			});
		}
	}
	togglePreview = ()=>{
		if(MediaBreakpoint() == Media.Small) {
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
			return <div className="decklist" >
				<div className="head">
					<h1>Rogue Deck Builder</h1>
				</div>
				<div className="body">
					<DeckListMenu onUpload={this.props.onUpload} decks={this.props.decks}/>
					<div ref={(ref)=>{this.child.track=ref}} className="preview-track">
						<div ref={(ref)=>{this.child.preview=ref}} className={"preview-frame"}>
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
				<div className="title">
					<h1>{this.props.name}</h1>
					<span className="price">{price.usd} USD / {price.tix} TIX</span>
				</div>
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
	decks?: {[key: string]: {mainboard: {[key: string]: number}, sideboard: {[key: string]: number}}};
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
	constructor(props: DeckManagerProps) {
		super(props);
		this.state = {
			name: null,
			cover: null,
			mainboard: null,
			sideboard: null,
		}
	}
	onUpload = () => {
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
				onUpload={this.onUpload}
				decks={this.props.decks?Object.keys(this.props.decks):[]}
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
			<p>ababa</p>
			<p>ababa</p>
			<p>ababa</p>
			<p>ababa</p>
			<p>ababa</p>
			<p>ababa</p>
			<p>ababa</p>
			<DeckManager decks={{
				"Skred Red": {
					mainboard: {
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
					},
					sideboard: {
						"Anger of the Gods": 1,
						"Dragon's Claw": 3,
						"Molten Rain": 3,
						"Pyrite Spellbomb": 2,
						"Shattering Spree": 1,
						"Stormbreath Dragon": 2,
						"Sudden Shock": 2,
						"Vandalblast": 1,
					}
				},
			}}/>
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
