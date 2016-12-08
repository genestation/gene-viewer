"use strict";

import './main.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as FileSaver from 'file-saver';
import {CardInfo} from './card-info.tsx';
import {CardListItem} from './card-list.tsx';
import {CardStack} from './card-stack.tsx';
import {DeckList} from './deck-list.tsx';

interface DeckPlayerProps{
	name?: string;
	mainboard?: {[key: string]: number};
	sideboard?: {[key: string]: number};
	onClose: ()=>any;
}
interface DeckPlayerState{
	library?: string[];
	hand?: string[];
	battlefield?: {[card: string]: number};
}
class DeckPlayer extends React.Component<DeckPlayerProps,DeckPlayerState> {
	constructor(props: DeckPlayerProps) {
		super(props)
		let library: string[] = [];
		let hand: string[] = [];
		Object.keys(props.mainboard).forEach((card: string)=>{
			library.push(...Array(props.mainboard[card]).fill(card,0,props.mainboard[card]));
		});
		this.shuffle(library);
		for(let i = 0; i < 7; i++) {
			hand.push(library.pop());
		}
		this.state = {
			library: library,
			hand: hand,
			battlefield: {},
		};
	}
	onReset() {
		let library: string[] = [];
		Object.keys(this.props.mainboard).forEach((card: string)=>{
			library.push(...Array(this.props.mainboard[card])
				.fill(card,0,this.props.mainboard[card]));
		});
		this.shuffle(library);
		this.setState({
			library: library,
			hand: [],
			battlefield: {},
		});
	}
	onDraw = ()=>{
		if(this.state.library.length) {
			this.state.hand.unshift(this.state.library.pop());
			this.setState(this.state);
		}
	}
	onScry() {
	}
	onSearch() {
	}
	shuffle(cards: string[]) {
		for (let i = cards.length; i; i--) {
			let j = Math.floor(Math.random() * i);
			[cards[i - 1], cards[j]] = [cards[j], cards[i - 1]];
		}
	}
	render() {
		let creatures: string[] = [];
		let basiclands: string[] = [];
		let lands: string[] = [];
		let nonlands: string[] = [];
		Object.keys(this.state.battlefield).forEach((card: string)=>{
			if(CardInfo.data(card).type_line.indexOf("Creature") > -1) {
					creatures.push(card);
			} else if(CardInfo.data(card).type_line.indexOf("Land") > -1) {
				if(CardInfo.data(card).type_line.indexOf("Basic") > -1) {
					basiclands.push(card);
				} else {
					lands.push(card);
				}
			} else {
				nonlands.push(card);
			}
		});
		return <div className="decklist" >
			<div className="head" >
				<i className="fa fa-window-close" onClick={this.props.onClose}/>
				<h1>{this.props.name}</h1>
				<div className="deck-player-actions" >
					<i className="deck-player-action fa fa-refresh" aria-hidden="true" onClick={()=>this.onReset()}/>
				</div>
			</div>
			<div className="deck-player-body">
				<div className="deck-player-battlefield">
					<div className="deck-player-battlefield-row"> {
						creatures.map((card: string, idx: number)=>{
							return <CardStack key={idx}
								card={card}
								count={this.state.battlefield[card]}/>;
						})
					} </div>
					<div className="deck-player-battlefield-row"> {
						nonlands.map((card: string, idx: number)=>{
							return <CardStack key={idx}
								card={card}
								count={this.state.battlefield[card]}/>;
						})
					} </div>
					<div className="deck-player-battlefield-row deck-player-battlefield-lands"> {
						basiclands.concat(lands).map((card: string, idx: number)=>{
							return <CardStack key={idx}
								card={card}
								count={this.state.battlefield[card]}/>;
						})
					} </div>
				</div>
				<div className="deck-player-actions" >
					<i className="deck-player-action fa fa-search" aria-hidden="true" onClick={this.onSearch}/>
					<i className="deck-player-action fa fa-eye" aria-hidden="true" onClick={this.onScry}/>
					<i className="deck-player-action fa fa-plus" aria-hidden="true" onClick={this.onDraw}/>
				</div>
				<div className="deck-player-hand">
					<div className={"deck-player-library"+(this.state.library.length?"":" deck-player-library-empty")}
						onClick={this.onDraw}
					/>
					{
						this.state.hand.map((card: string, idx: number)=>{
							return <div key={idx}
								className="deck-player-card deck-player-hand-item"
								onClick={()=>{
									if(!this.state.battlefield.hasOwnProperty(card)) {
										this.state.battlefield[card] = 0
									}
									this.state.battlefield[card]++;
									this.state.hand.splice(idx,1);
									this.setState(this.state);
								}}
							>
								<img className="deck-player-card-img" src={CardInfo.image(card)}/>
							</div>
						})
					}
				</div>
			</div>
		</div>
	}
}

interface DeckListMenuProps{
	decks: {name:string,cover:string}[];
	onSelect: (name: string)=>any;
	handleFile: (event: React.FormEvent)=>any;
}
interface DeckListMenuState{
	decksOpen?: boolean;
	decksAnchor?: DOMEventTarget;
}
class DeckListMenu extends React.Component<DeckListMenuProps,DeckListMenuState> {
	child: {
		input?: HTMLElement;
	} = {};
	constructor(props: DeckListMenuProps) {
		super(props)
		this.state = {
			decksOpen: false,
		};
	}
	onUpload = () => {
		this.child.input.click();
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
			<input ref={(ref)=>this.child.input=ref} className="hidden-input" type="file" onChange={this.props.handleFile}/>
			<div className="head" >
				<h1>Rogue Deck Builder</h1>
			</div>
			<div className="body">
				<div className="main-menu">
					<div className="overlay bottom" />
					<div className="overlay side"/>
					<div className="menu-items">
						<div className="menu-item file-upload" onClick={this.onUpload}>
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
	play?: boolean,
}
export default class DeckManager extends React.Component<DeckManagerProps,DeckManagerState> {
	static defaultProps: DeckManagerProps = {
		deckTexts: [],
		deckFiles: [],
	}
	constructor(props: DeckManagerProps) {
		super(props);
		this.state = {
			library: {},
			decks: [].concat(
				props.deckTexts?props.deckTexts.map((input: {name: string, text: string})=>input.name):[],
				props.deckFiles?props.deckFiles.map(this.cleanFilename):[],
			),
			play: false,
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
	onSelect = (name: string) => {
		this.setState({
			curr: name,
		});
	}
	toText = (list?: CardListItem[]) => {
		let lines: string[] = [];
		if(list === undefined) {
			// Export whole deck
			let deck = this.state.library[this.state.curr];
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
	onBuy = (list?: CardListItem[]) => {
		alert("Add to cart:\n"+this.toText(list).join(''));
	}
	onPlay = () => {
		this.setState({
			play: true,
		});
	}
	onCopy = (list?: CardListItem[]) => {
		let textField = document.createElement('textarea');
		textField.textContent = this.toText(list).join('');
		document.body.appendChild(textField);
		textField.select();
		document.execCommand('copy');
		textField.remove();
	}
	onDownload = (name: string, list?: CardListItem[]) => {
		let file = new File(this.toText(list), name + ".txt", {type: "text/plain;charset=utf-8"});
		FileSaver.saveAs(file);
	}
	onClose = () => {
		if(this.state.play) {
			this.setState({
				play: false,
			});
		} else {
			this.setState({
				curr: null,
			});
		}
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
		if(this.state.decks.indexOf(name) == -1) {
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
		if(this.state.curr) {
			if(this.state.play) {
				return <div className="roguebuilder">
					<DeckPlayer
						name={this.state.curr}
						{...this.state.library[this.state.curr]}
						onClose={this.onClose}
					/>
				</div>
			} else {
				return <div className="roguebuilder">
					<DeckList
						name={this.state.curr}
						{...this.state.library[this.state.curr]}
						onBuy={this.onBuy}
						onPlay={this.onPlay}
						onCopy={this.onCopy}
						onDownload={this.onDownload}
						onClose={this.onClose}
					/>
				</div>
			}
		} else {
			return <div className="roguebuilder">
				<DeckListMenu
					decks={decks}
					onSelect={this.onSelect}
					handleFile={this.handleFile}
				/>
			</div>
		}
	}
}
