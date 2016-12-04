import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {CardInfo, ScryfallCard} from './card-info.tsx';

export interface CardListProps{
	title?: string;
	sublist?: boolean;
	cards: {card: string, count:number}[];
	setCurr: (card: string)=>any;
	onClick: ()=>any;
}
export interface CardListState{ }
export default class CardList extends React.Component<CardListProps,CardListState> {
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
					let mana_cost: string[] = CardInfo.manaCost(card);
					// Calculate width
					let ratio = (21/*table width*/ - 2.5/*quantity-width*/ - 1 - (mana_cost?mana_cost.length:0))/(card.length*0.5);
					return <tr key={idx}
						onMouseOver={()=>this.props.setCurr(card)}
						onClick={()=>{this.props.setCurr(card); this.props.onClick()}} >
						<td className="quantity">{count + "×"}</td>
						<td>
							<div className={mana_cost?"card-name":""} style={ratio<1?{transform: "scaleX("+ratio+")"}:null}>{card}</div>
							<div className="mana-cost">{this.renderManaCost(mana_cost)}</div>
						</td>
					</tr>
				})
			}</tbody></table>
		</div>
	}
}

