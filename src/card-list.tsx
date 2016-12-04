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
	cards: CardListItem[];
	setCurr: (card: string)=>any;
	showPreview: ()=>any;
	onDownload: ()=>any;
}
export interface CardListState{ }
export class CardList extends React.Component<CardListProps,CardListState> {
	renderManaCost(symbols: string[]) {
		return symbols?symbols.map((sym: string, idx: number)=>{
			return <span key={idx} className={"mana small s"+sym}/>
		}):null;
	}
	render() {
		let count = this.props.cards.map(({count: count}: CardListItem)=>{
			return count;
		}).reduce((a: number, b: number)=>{
			return a + b;
		}, 0);
		let title = this.props.title + " (" + count + ")";
		return <div className="card-list">
			{this.props.title?(this.props.sublist?<h3 className="title">{title}</h3>:<h2 className="title">{title}</h2>):null}
			<div className="actions" onClick={this.props.onDownload}>
				<i className="fa fa-download" aria-hidden="true" />
			</div>
			<table><tbody>{
				this.props.cards.map(({card: card, count: count}: CardListItem, idx: number)=>{
					let mana_cost: string[] = CardInfo.manaCost(card);
					// Calculate width
					let ratio = (20/*table width*/ - 2.5/*quantity-width*/ - 1 - (mana_cost?mana_cost.length:0))/(card.length*0.5);
					return <tr key={idx}
						onMouseOver={()=>this.props.setCurr(card)}
						onClick={()=>{this.props.setCurr(card); this.props.showPreview()}} >
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

