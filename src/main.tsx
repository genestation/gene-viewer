"use strict";

import './main.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as FileSaver from 'file-saver';
import {CardList, CardListItem} from './card-list.tsx';
import {CardInfo, CardPrice, Sort} from './card-info.tsx';
import {Dropdown} from './dropdown.tsx';

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
	onSelect: (name: string)=>any;
	decks: {name:string,cover:string}[];
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
		return <div className="decklist" >
			<div className="head" >
				<h1>Rogue Deck Builder</h1>
			</div>
			<div className="body">
				<div className="main-menu">
					<div className="overlay bottom" />
					<div className="overlay side"/>
					<div className="menu-items">
						<div className="menu-item file-upload" onClick={this.props.onUpload}>
							<i className="fa fa-plus-circle" style={{fontSize: '0.7em'}} aria-hidden="true" />
							&nbsp;
							<i className="fa fa-file-text-o" aria-hidden="true" />
						</div>
					</div>
					<div className="deck-list"> {
						this.props.decks.map((deck: {name: string, cover: string}, idx: number)=>{
							return <div key={idx} className="deck-cover" onClick={()=>this.props.onSelect(deck.name)}>
								<h2>{deck.name}</h2>
								<div className="preview-img">
									<div className="overlay"/>
									{CardInfo.data(deck.cover)?
										<img src={CardInfo.image(deck.cover)} />
									:null}
								</div>
							</div>
						})
					} </div>
				</div>
			</div>
		</div>
	}
}

interface DeckListProps{
	name?: string;
	cover?: string;
	mainboard?: {[key: string]: number};
	sideboard?: {[key: string]: number};
	onBuy?: (name: string, list?: CardListItem[])=>any;
	onDownload?: (name: string, list?: CardListItem[])=>any;
	onCopy?: (name: string, list?: CardListItem[])=>any;
	onClose?: ()=>any;
}
interface DeckListState{
	setOrder?: {[key: string]: number};
	price?: {[key: string]: CardPrice};
	curr?: string;
	scroll?: string;
	sort?: Sort;
	filter?: string[];
	highlight?: string;
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
	updatingInfo: boolean = false;
	updatingScroll: boolean = false;
	child: {
		preview?: Element;
		track?: Element;
	} = {};
	constructor(props: DeckListProps) {
		super(props);
		if(props.mainboard) CardInfo.register(Object.keys(props.mainboard), this.handleInfo);
		if(props.sideboard) CardInfo.register(Object.keys(props.sideboard), this.handleInfo);
		let curr = props.cover?props.cover:
			props.mainboard && Object.keys(props.mainboard).length > 0?Object.keys(props.mainboard).sort()[0]:null;
		this.state = {
			curr: curr,
			sort: Sort.Type,
			scroll: "top",
			highlight: null,
			filter: [],
		};
	}
	componentWillReceiveProps(nextProps: DeckListProps) {
		if(nextProps.cover) this.setState({curr: nextProps.cover});
		if(nextProps.mainboard) CardInfo.register(Object.keys(nextProps.mainboard), this.handleInfo);
		if(nextProps.sideboard) CardInfo.register(Object.keys(nextProps.sideboard), this.handleInfo);
	}
	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
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
		this.startY = trackR.top + window.pageYOffset;
		this.endY = this.startY + trackR.height - previewR.height;
	}
	handleInfo = (card: string)=>{
		if(!this.updatingInfo) {
			requestAnimationFrame(this.updateInfo);
		}
		this.updatingInfo = true;
	}
	updateInfo = ()=>{
		this.forceUpdate(()=>{
			this.updatingInfo=false;
		});
	}
	handleScroll = ()=>{
		this.scrollY = window.pageYOffset;
		if(!this.updatingScroll) {
			requestAnimationFrame(this.updateScroll);
		}
		this.updatingScroll = true;
	}
	updateScroll = ()=>{
		if(MediaBreakpoint() == Media.Small) {
			this.setState({
				scroll: "top",
			}, ()=>{this.updatingScroll=false});
		} else {
			this.calculateScreenPosition();
			// Scrolling
			let scroll = "top"
			if(this.scrollY > this.endY) {
				scroll = "bottom"
			} else if (this.scrollY > this.startY) {
				scroll = "fixed"
			}
			if(scroll != this.state.scroll) {
				this.setState({
					scroll: scroll,
				}, ()=>{this.updatingScroll=false});
			} else {
				this.updatingScroll=false;
			}
		}
	}
	showPreview = ()=>{
		if(MediaBreakpoint() == Media.Small
		&& this.scrollY > this.startY) {
			this.setState({
				scroll: "fixed",
			});
		}
	}
	togglePreview = ()=>{
		if(MediaBreakpoint() == Media.Small) {
			if(this.state.scroll=="fixed") {
				this.setState({
					scroll: "top",
				});
			} else if (this.scrollY > this.startY) {
				this.setState({
					scroll: "fixed",
				});
			}
		}
	}
	setCurr = (curr: string)=>{
		this.setState({
			curr: curr,
		});
	}
	render() {
		let lists = CardInfo.sort(this.props.mainboard, this.state.sort);
		let sideboard = CardInfo.sort(this.props.sideboard, Sort.Name);
		let price = CardInfo.priceSet(this.props.mainboard, this.props.sideboard);
		let priceImg = CardInfo.priceString(this.state.curr);
		// Calculate height
		const headerSize = 2.2;
		const lineSize = 1.6;
		let height: number[] = [];
		lists.forEach(({list: list}: {list: {card: string, count: number}[]})=>{
			height.push(headerSize + lineSize * list.length);
		});
		sideboard.forEach(({list: list}: {list: {card: string, count: number}[]}, idx: number)=>{
			height.push(headerSize + lineSize * list.length + (idx==0?2:0));
		});
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
		// Count keywords
		let {keyword_count, keyword_map} = CardInfo.keywords([this.props.mainboard,this.props.sideboard]);
		let keyword_order = Object.keys(keyword_count).sort((a: string, b: string)=>{
			return keyword_count[b] - keyword_count[a];
		});
		let highlight = this.state.highlight?keyword_map[this.state.highlight]:[];
		let filtered: string[] = null;
		if(!this.state.highlight && this.state.filter) {
			filtered = keyword_map[this.state.filter[0]];
			this.state.filter.forEach((filter: string)=>{
				filtered = filtered.filter((card: string)=>{
					return keyword_map[filter].indexOf(card) > -1;
				});
			});
		}
		// Return DOM
		return <div className="decklist">
			<div className="head" >
				<i className="fa fa-window-close" onClick={this.props.onClose}/>
				<div className="head-upper">
					<h1>{this.props.name}</h1>
					<span className="price" onClick={()=>this.props.onBuy(this.props.name)}>{price.usd} USD / {price.tix} TIX
						&nbsp;
						<i className="fa fa-shopping-cart" aria-hidden="true"/>
					</span>
					<span className="actions" >
						<i className="fa fa-clipboard" aria-hidden="true" onClick={()=>this.props.onCopy(this.props.name)}/>
						&nbsp;
						<i className="fa fa-download" aria-hidden="true" onClick={()=>this.props.onDownload(this.props.name)}/>
					</span>
				</div>
				<div className="head-lower">
					<div className="select">
						<span>Sort by </span>
						<select value={this.state.sort.toString()}
							onChange={(e: React.FormEvent)=>this.setState({sort:parseInt(e.target.value)})}>
							<option value={Sort.Type.toString()}>Type</option>
							<option value={Sort.CMC.toString()}>Converted Mana Cost</option>
							<option value={Sort.Color.toString()}>Color</option>
							<option value={Sort.Price.toString()}>Price</option>
							<option value={Sort.Name.toString()}>Name</option>
						</select>
						<br/>
						<Dropdown label="Keywords" value={this.state.filter.length?this.state.filter.join(" && "):"none"}>
							<table className="dropdown-table">
							<thead>
								<tr className="dropdown-item dropdown-item-reset"
									onClick={()=>this.setState({
										filter: [],
									})}
								><td colSpan={2}>Reset</td></tr>
							</thead>
							<tbody>{
								keyword_order.map((keyword: string, idx: number)=>{
									return <tr className="dropdown-item" key={idx}
									onClick={()=>{
										this.setState({
											filter: [keyword],
										});
									}}
									onMouseEnter={()=>{
										this.setState({
											highlight: keyword,
										})
									}}
									onMouseLeave={()=>{
										this.setState({
											highlight: null,
										})
									}} >
										<td className="dropdown-item-keyword">{keyword}</td>
										<td className="dropdown-item-count">{keyword_count[keyword]}</td>
									</tr>
								})
							}</tbody></table>
						</Dropdown>
					</div>
				</div>
			</div>
			<div className="body">
				<div className="footprint"/>
				<div className="lists"
					style={{height: cutoff + 'em'}}>
				{
					lists.map((item: {name: string, list: CardListItem[]}, idx: number)=>{
						return <CardList
							key={idx}
							deck={this.props.name}
							title={item.name}
							sublist={true}
							cards={item.list}
							highlight={highlight}
							filtered={filtered}
							setCurr={this.setCurr}
							showPreview={this.showPreview}
							onCopy={this.props.onCopy}
							onDownload={this.props.onDownload} />
					})
				}
					<CardList
						deck={this.props.name}
						title="Sideboard"
						cards={sideboard[0].list}
						highlight={highlight}
						filtered={filtered}
						setCurr={this.setCurr}
						showPreview={this.showPreview}
						onCopy={this.props.onCopy}
						onDownload={this.props.onDownload} />
				{sideboard[1]?
					<CardList
						deck={this.props.name}
						sublist={true}
						cards={sideboard[1].list}
						highlight={highlight}
						filtered={filtered}
						setCurr={this.setCurr}
						showPreview={this.showPreview}
						onCopy={this.props.onCopy}
						onDownload={this.props.onDownload} />
				:null}
				</div>
				<div ref={(ref)=>{this.child.track=ref}} className="preview-track">
					<div ref={(ref)=>{this.child.preview=ref}}
						className={"preview-frame "+this.state.scroll}
						onClick={this.togglePreview}>
						<div className="preview">
							<div className="preview-img">
								<img src={CardInfo.image(this.state.curr)}/>
							</div>
							<span>
								{priceImg.usd} USD / {priceImg.tix} TIX
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	}
}

const enum State {
	Pre,
	Main,
	Side,
	Post,
};
class DeckParser {
	static parseText(text: string) {
		let cover: string = null;
		let mainboard: {[key: string]: number} = {}
		let sideboard: {[key: string]: number} = {}
		let state: State = State.Pre;
		text.split(/\r?\n/).forEach((line: string)=>{
			line = line.trim();
			let space = line.indexOf(' ');
			let count: number = null;
			let card: string = null;
			if(space > -1) {
				count = parseInt(line.slice(0,line.indexOf(' ')));
				card = line.slice(line.indexOf(' ')+1);
			}
			switch(state) {
			case State.Pre:
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
					mainboard[card] = count + (mainboard[card]?mainboard[card]:0);
				}
				break;
			case State.Post:
				if(line.length) {
					state=State.Side;
					if(count && card) {
						Object.keys(sideboard).forEach((card)=>{
							mainboard[card] = sideboard[card] + (mainboard[card]?mainboard[card]:0);
						});
						sideboard = {};
					}
				} else {
					break;
				}
			case State.Side:
				if(!line.length) {
					break;
				}
				if(count && card) {
					if(cover == null) {
						cover = card;
					}
					sideboard[card] = count + (sideboard[card]?sideboard[card]:0);
				}
			};
		});

		return {
			cover: cover,
			mainboard: mainboard,
			sideboard: sideboard,
		};
	}
}

export interface DeckManagerProps{
	deckTexts?: {name: string, text: string}[];
	deckFiles?: string[];
}
export interface DeckManagerState{
	library?: {
		[name: string]: {
			cover: string;
			mainboard: {[key: string]: number};
			sideboard: {[key: string]: number};
		},
	},
	decks?: string[],
	curr?: string,
}
export default class DeckManager extends React.Component<DeckManagerProps,DeckManagerState> {
	static defaultProps: DeckManagerProps = {
		deckTexts: [],
		deckFiles: [],
	}
	child: {
		input?: HTMLElement;
	} = {};
	constructor(props: DeckManagerProps) {
		super(props);
		this.state = {
			library: {},
			decks: [].concat(
				props.deckTexts?props.deckTexts.map((input: {name: string, text: string})=>input.name):[],
				props.deckFiles?props.deckFiles.map(this.cleanFilename):[],
			),
		}
		// Load decks
		if(props.deckTexts) {
			props.deckTexts.forEach(({name: name, text: text}: {name: string, text: string})=>{
				let output = DeckParser.parseText(text);
				this.addDeckList(this.cleanFilename(name), output, false, true);
			});
		}
		if(props.deckFiles) {
			props.deckFiles.forEach((url: string)=>{
				fetch(url).then((response: Promise<Request>)=>{
					if(response.status !== 200) {
						console.log(response.status, response.url);
					} else {
						let name = this.cleanFilename(
							decodeURIComponent(response.url)
								.split('/').pop()
						);
						response.text().then((text: string)=>{
							let output = DeckParser.parseText(text);
							this.addDeckList(this.cleanFilename(name), output);
						});
					}
				});
			});
		}
	}
	onUpload = () => {
		this.child.input.click();
	}
	onSelect = (name: string) => {
		this.setState({
			curr: name,
		});
	}
	toText = (name: string, list?: CardListItem[]) => {
		let lines: string[] = [];
		if(list === undefined) {
			// Export whole deck
			let deck = this.state.library[name];
			lines.push(deck.mainboard[deck.cover] + " " + deck.cover + "\n");
			Object.keys(deck.mainboard).forEach((card: string)=>{
				if(card !== deck.cover) {
					lines.push(deck.mainboard[card] + " " + card + "\n")
				}
			});
			lines.push("\n","\n");
			Object.keys(deck.sideboard).forEach((card: string)=>{
				lines.push(deck.sideboard[card] + " " + card + "\n")
			});
		} else {
			lines = list.map((item: CardListItem)=>{
				return item.count + " " + item.card + "\n"
			});
		}
		return lines;
	}
	onBuy = (name: string, list?: CardListItem[]) => {
		alert("Add to cart:\n"+this.toText(name,list).join(''));
	}
	onCopy = (name: string, list?: CardListItem[]) => {
		let textField = document.createElement('textarea');
		textField.textContent = this.toText(name, list).join('');
		document.body.appendChild(textField);
		textField.select();
		document.execCommand('copy');
		textField.remove();
	}
	onDownload = (name: string, list?: CardListItem[]) => {
		let file = new File(this.toText(name,list), name + ".txt", {type: "text/plain;charset=utf-8"});
		FileSaver.saveAs(file);
	}
	onClose = () => {
		this.setState({
			curr: null,
		});
	}
	cleanFilename(filename: string) {
		return filename.replace(/\.[a-z]*$/,"");
	}
	addDeckList = (name: string, deck: {
		cover: string;
		mainboard: {[key: string]: number};
		sideboard: {[key: string]: number};
	}, setCurr: boolean = false, inConstructor: boolean = false) => {
		// Register cover
		CardInfo.register([deck.cover], this.handleInfo)
		// Update state
		if(!this.state.decks.includes(name)) {
			this.state.decks.unshift(name);
			// TODO solve name collisions
		}
		this.state.library[name] = deck;
		if(setCurr) {
			this.state.curr = name;
		}
		if(!inConstructor) this.setState(this.state);
	}
	handleInfo = ()=>{
		this.forceUpdate();
	}
	handleFile = (event: React.FormEvent)=>{
		let file = event.target.files[0];
		let reader = new FileReader();
		reader.onload = (event: Event)=>{
			let output = DeckParser.parseText(event.target.result);
			this.addDeckList(this.cleanFilename(file.name), output, true);
		}
		reader.readAsText(file);
	}
	render() {
		let decks = this.state.decks.map((name: string)=>{return {
			name: name,
			cover: this.state.library[name].cover,
		}});
		return <div className="roguebuilder">
			<input ref={(ref)=>this.child.input=ref} className="hidden-input" type="file" onChange={this.handleFile}/>
			{this.state.curr?
			<DeckList
				name={this.state.curr}
				{...this.state.library[this.state.curr]}
				onBuy={this.onBuy}
				onCopy={this.onCopy}
				onDownload={this.onDownload}
				onClose={this.onClose}
			/>:<DeckListMenu
				decks={decks}
				onUpload={this.onUpload}
				onSelect={this.onSelect}
			/>}
		</div>
	}
}
