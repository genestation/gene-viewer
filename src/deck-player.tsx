import * as React from 'react';
import {CardInfo} from './card-info.tsx';
import {CardStack} from './card-stack.tsx';

export interface CardCount {
	[card: string]: number
}
export interface DeckPlayerProps{
	name?: string;
	mainboard?: {[key: string]: number};
	sideboard?: {[key: string]: number};
	onClose: ()=>any;
}
export interface DeckPlayerState{
	library?: string[];
	hand?: string[];
	graveyard?: string[];
	exile?: string[];
	battlefield?: CardCount;
	mulligan?: number;
}
export class DeckPlayer extends React.Component<DeckPlayerProps,DeckPlayerState> {
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
			graveyard: [],
			exile: [],
			battlefield: {},
			mulligan: 7,
		};
	}
	onReset = ()=>{
		let library: string[] = [];
		let hand: string[] = [];
		Object.keys(this.props.mainboard).forEach((card: string)=>{
			library.push(...Array(this.props.mainboard[card])
				.fill(card,0,this.props.mainboard[card]));
		});
		this.shuffle(library);
		for(let i = 0; i < 7; i++) {
			hand.push(library.pop());
		}
		this.setState({
			library: library,
			hand: hand,
			graveyard: [],
			exile: [],
			battlefield: {},
			mulligan: 7,
		});
	}
	onMulligan = ()=>{
		let mulligan = this.state.mulligan - 1;
		let library: string[] = [];
		let hand: string[] = [];
		Object.keys(this.props.mainboard).forEach((card: string)=>{
			library.push(...Array(this.props.mainboard[card])
				.fill(card,0,this.props.mainboard[card]));
		});
		this.shuffle(library);
		for(let i = 0; i < mulligan; i++) {
			hand.push(library.pop());
		}
		this.setState({
			library: library,
			hand: hand,
			graveyard: [],
			exile: [],
			battlefield: {},
			mulligan: mulligan,
		});
	}
	onDraw = ()=>{
		if(this.state.library.length) {
			this.state.hand.unshift(this.state.library.pop());
			this.state.mulligan = null;
			this.setState(this.state);
		}
	}
	onPlay = (card: string, idx: number, zone?: string[])=>{
		let permanents = ["Artifact","Creature","Enchantment","Land","Planeswalker"];
		let type_line = CardInfo.data(card).type_line;
		let is_permanent = permanents.reduce((accum: boolean, card_type: string)=>{
			return accum || type_line.indexOf(card_type) > -1
		}, false);
		if(is_permanent) {
			if(!this.state.battlefield.hasOwnProperty(card)) {
				this.state.battlefield[card] = 0
			}
			this.state.battlefield[card]++;
		} else {
			this.state.graveyard.push(card);
		}
		if(idx !== null) {
			zone.splice(idx,1);
		} else {
			let count = --this.state.battlefield[card];
			if(count == 0) {
				delete this.state.battlefield[card];
			}
		}
		this.state.mulligan = null;
		this.setState(this.state);
	}
	onLibraryTop = (card: string, idx: number, zone?: string[])=>{
		this.state.library.push(card);
		if(idx !== null) {
			zone.splice(idx,1);
		} else {
			let count = --this.state.battlefield[card];
			if(count == 0) {
				delete this.state.battlefield[card];
			}
		}
		this.state.mulligan = null;
		this.setState(this.state);
	}
	onLibraryBottom = (card: string, idx: number, zone?: string[])=>{
		this.state.library.unshift(card);
		if(idx !== null) {
			zone.splice(idx,1);
		} else {
			let count = --this.state.battlefield[card];
			if(count == 0) {
				delete this.state.battlefield[card];
			}
		}
		this.state.mulligan = null;
		this.setState(this.state);
	}
	onDiscard = (card: string, idx: number, zone?: string[])=>{
		this.state.graveyard.push(card);
		if(idx !== null) {
			zone.splice(idx,1);
		} else {
			let count = --this.state.battlefield[card];
			if(count == 0) {
				delete this.state.battlefield[card];
			}
		}
		this.state.mulligan = null;
		this.setState(this.state);
	}
	onHand = (card: string, idx: number, zone?: string[])=>{
		this.state.hand.push(card);
		if(idx !== null) {
			zone.splice(idx,1);
		} else {
			let count = --this.state.battlefield[card];
			if(count == 0) {
				delete this.state.battlefield[card];
			}
		}
		this.state.mulligan = null;
		this.setState(this.state);
	}
	onExile = (card: string, idx: number, zone?: string[])=>{
		this.state.exile.push(card);
		if(idx !== null) {
			zone.splice(idx,1);
		} else {
			let count = --this.state.battlefield[card];
			if(count == 0) {
				delete this.state.battlefield[card];
			}
		}
		this.state.mulligan = null;
		this.setState(this.state);
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
			let type_line = CardInfo.data(card).type_line;
			if(type_line.indexOf("Creature") > -1) {
					creatures.push(card);
			} else if(type_line.indexOf("Land") > -1) {
				if(type_line.indexOf("Basic") > -1) {
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
			</div>
			<div className="deck-player-body">
				<div className="deck-player-battlefield">
					<div className="deck-player-battlefield-row"> {
						creatures.map((card: string, idx: number)=>{
							return <CardStack key={idx} card={card}
								count={this.state.battlefield[card]}
								onLibraryTop={this.onLibraryTop}
								onLibraryBottom={this.onLibraryBottom}
								onDiscard={this.onDiscard}
								onHand={this.onHand}
								onExile={this.onExile}
							/>
						})
					} </div>
					<div className="deck-player-battlefield-row"> {
						basiclands.concat(lands,nonlands).map((card: string, idx: number)=>{
							return <CardStack key={idx}
								card={card}
								count={this.state.battlefield[card]}
								onLibraryTop={this.onLibraryTop}
								onLibraryBottom={this.onLibraryBottom}
								onDiscard={this.onDiscard}
								onHand={this.onHand}
								onExile={this.onExile}
							/>
						})
					} </div>
				</div>
				<div className="deck-player-main">
					<div className="deck-player-library-context">
						<div className="deck-player-actions" >
							<i className="deck-player-action fa fa-search" aria-hidden="true" onClick={this.onSearch}/>
							<i className="deck-player-action fa fa-eye" aria-hidden="true" onClick={this.onScry}/>
							<i className="deck-player-action fa fa-plus" aria-hidden="true" onClick={this.onDraw}/>
						</div>
						<div className={"deck-player-library"+(this.state.library.length?"":" deck-player-library-empty")}
							onClick={this.onDraw}
						/>
						<div className="deck-player-actions" >
							{!this.state.mulligan?
								<i className="deck-player-action fa fa-refresh" aria-hidden="true" onClick={this.onReset}/>:
								<i className="deck-player-action fa fa-retweet" aria-hidden="true" onClick={this.onMulligan}/>
							}
						</div>
					</div>
					<div className="deck-player-zone">
						{
							this.state.hand.map((card: string, idx: number)=>{
								return <div key={idx}
									className="deck-player-zone-item" >
									<div className="deck-player-zone-item-actions" >
										<i className="deck-player-zone-item-action fa fa-ban"
											aria-hidden="true"
											onClick={()=>this.onExile(card,idx,this.state.hand)}/>
										<i className="deck-player-zone-item-action fa fa-trash"
											aria-hidden="true"
											onClick={()=>this.onDiscard(card,idx,this.state.hand)}/>
										<i className="deck-player-zone-item-action fa fa-chevron-up"
											aria-hidden="true"
											onClick={()=>this.onPlay(card,idx,this.state.hand)}/>
									</div>
									<div className="deck-player-card-button deck-player-card"
										onClick={()=>this.onPlay(card,idx,this.state.hand)} >
										<img className="deck-player-card-img" src={CardInfo.image(card)}/>
									</div>
									<div className="deck-player-zone-item-actions" >
										<i className="deck-player-zone-item-action fa fa-arrow-up"
											aria-hidden="true"
											onClick={()=>this.onLibraryTop(card,idx,this.state.hand)}/>
										<i className="deck-player-zone-item-action fa fa-random" aria-hidden="true" onClick={null}/>
										<i className="deck-player-zone-item-action fa fa-arrow-down"
											aria-hidden="true"
											onClick={()=>this.onLibraryBottom(card,idx,this.state.hand)}/>
									</div>
								</div>
							})
						}
					</div>
				</div>
				<div className="deck-player-outerfield">
					<div className="deck-player-zone deck-player-graveyard"> {
							this.state.graveyard.map((card: string, idx: number)=>{
								return <div key={idx}
									className="deck-player-zone-item" >
									<div className="deck-player-zone-item-actions" >
										<i className="deck-player-zone-item-action fa fa-ban"
											aria-hidden="true"
											onClick={()=>this.onExile(card,idx,this.state.graveyard)}/>
										<i className="deck-player-zone-item-action fa fa-hand-paper-o"
											aria-hidden="true"
											onClick={()=>this.onHand(card,idx,this.state.graveyard)}/>
										<i className="deck-player-zone-item-action fa fa-chevron-up"
											aria-hidden="true"
											onClick={()=>this.onPlay(card,idx,this.state.graveyard)}/>
									</div>
									<div className="deck-player-card-button deck-player-card">
										<img className="deck-player-card-img" src={CardInfo.image(card)}/>
									</div>
									<div className="deck-player-zone-item-actions" >
										<i className="deck-player-zone-item-action fa fa-arrow-up"
											aria-hidden="true"
											onClick={()=>this.onLibraryTop(card,idx,this.state.graveyard)}/>
										<i className="deck-player-zone-item-action fa fa-random" aria-hidden="true" onClick={null}/>
										<i className="deck-player-zone-item-action fa fa-arrow-down"
											aria-hidden="true"
											onClick={()=>this.onLibraryBottom(card,idx,this.state.graveyard)}/>
									</div>
								</div>
							})
					} </div>
					<div className="deck-player-zone deck-player-exile"> {
							this.state.exile.map((card: string, idx: number)=>{
								return <div key={idx}
									className="deck-player-zone-item" >
									<div className="deck-player-zone-item-actions" >
										<i className="deck-player-zone-item-action fa fa-trash"
											aria-hidden="true"
											onClick={()=>this.onDiscard(card,idx,this.state.exile)}/>
										<i className="deck-player-zone-item-action fa fa-hand-paper-o"
											aria-hidden="true"
											onClick={()=>this.onHand(card,idx,this.state.exile)}/>
										<i className="deck-player-zone-item-action fa fa-chevron-up"
											aria-hidden="true"
											onClick={()=>this.onPlay(card,idx,this.state.exile)}/>
									</div>
									<div className="deck-player-card-button deck-player-card">
										<img className="deck-player-card-img" src={CardInfo.image(card)}/>
									</div>
									<div className="deck-player-zone-item-actions" >
										<i className="deck-player-zone-item-action fa fa-arrow-up"
											aria-hidden="true"
											onClick={()=>this.onLibraryTop(card,idx,this.state.exile)}/>
										<i className="deck-player-zone-item-action fa fa-random" aria-hidden="true" onClick={null}/>
										<i className="deck-player-zone-item-action fa fa-arrow-down"
											aria-hidden="true"
											onClick={()=>this.onLibraryBottom(card,idx,this.state.exile)}/>
									</div>
								</div>
							})
					} </div>
				</div>
			</div>
		</div>
	}
}

