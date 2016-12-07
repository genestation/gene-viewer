//import "./card-list.scss"; TODO
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {CardInfo, ScryfallCard} from './card-info.tsx';

export interface CardListItem {
	card: string,
	count: number,
}
export interface CardListProps{
	title?: string;
	sublist?: boolean;
	deck: string;
	cards: CardListItem[];
	highlight: string[];
	filtered: string[];
	setCurr: (card: string)=>any;
	showPreview: ()=>any;
	onCopy: (list?: CardListItem[])=>any;
	onDownload: (name: string, list?: CardListItem[])=>any;
}
export interface CardListState{ }
export class CardList extends React.Component<CardListProps,CardListState> {
	renderManaCost(symbols: string[]) {
		return symbols?symbols.map((sym: string, idx: number)=>{
			return <span key={idx} className={"mana small s"+sym}/>
		}):null;
	}
	cardNameStyle(card: string) {
		if(CardInfo.valid(card) === true) {
			return "card-list-card-name valid";
		} else if(CardInfo.valid(card) === false) {
			return "card-list-card-name invalid";
		} else {//if(CardInfo.valid(card) === null)
			return "card-list-card-name";
		}
	}
	render() {
		let count = this.props.cards.map(({count: count}: CardListItem)=>{
			return count;
		}).reduce((a: number, b: number)=>{
			return a + b;
		}, 0);
		let first = this.props.cards
			.reduce((accum: string, {card: card}: CardListItem)=>{
				if(accum !== null) {
					return accum;
				} else if(this.props.filtered) {
					if(this.props.filtered.indexOf(card) > -1) {
						return card;
					} else {
						return accum;
					}
				} else {
					return card;
				}
		}, null);
		let title = this.props.title + " (" + count + ")";
		return <div className={"card-list" + (first?"":" card-list-empty")}
			onMouseOver={first?()=>this.props.setCurr(first):null} >
			{this.props.title?(this.props.sublist?<h3 className="title">{title}</h3>:<h2 className="title">{title}</h2>):<h2 className="title">&nbsp;</h2>}
			<div className="card-list-actions" >
				<i className="card-list-action fa fa-clipboard" aria-hidden="true" onClick={()=>this.props.onCopy(this.props.cards)}/>
				&nbsp;
				<i className="card-list-action fa fa-download" aria-hidden="true" onClick={()=>this.props.onDownload(this.props.deck + " (" + this.props.title + ")", this.props.cards)}/>
			</div>
			<table className="card-list-table"><tbody>{
				this.props.cards.map(({card: card, count: count}: CardListItem, idx: number)=>{
					let mana_cost: string[] = CardInfo.manaCost(card);
					// Calculate width
					let ratio = (20/*table width*/ - 2.5/*quantity-width*/ - 1 - (mana_cost?mana_cost.length:0))/(card.length*0.5);
					return <tr key={idx}
						className={"card-list-card"
							+(this.props.highlight.indexOf(card) > -1?
								" card-list-card-highlight":"")
							+(this.props.filtered && this.props.filtered.indexOf(card) == -1?
								" card-list-card-filter":"")
						}
						onMouseOver={(e: React.SyntheticEvent)=>{e.stopPropagation(); this.props.setCurr(card)}}
						onClick={()=>{this.props.setCurr(card); this.props.showPreview()}} >
						<td className="card-list-td card-list-quantity">{count + "×"}</td>
						<td className="card-list-td">
							<div className={this.cardNameStyle(card)} style={ratio<1?{transform: "scaleX("+ratio+")"}:null}>{card}</div>
							<div className="card-list-mana-cost">{this.renderManaCost(mana_cost)}</div>
						</td>
					</tr>
				})
			}</tbody></table>
		</div>
	}
}

