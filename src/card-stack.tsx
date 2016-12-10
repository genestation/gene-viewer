import "./card-stack.scss";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {CardInfo} from './card-info.tsx';
import {CardImage} from './card-image.tsx';

export interface CardStackProps{
	card: string,
	count: number,
	onLibraryTop: (card: string, idx: number)=>any,
	onLibraryBottom: (card: string, idx: number)=>any,
	onDiscard: (card: string, idx: number)=>any,
	onHand: (card: string, idx: number)=>any,
	onExile: (card: string, idx: number)=>any,
}
export interface CardStackState{
	tapped?: number,
}
export class CardStack extends React.Component<CardStackProps,CardStackState> {
	state = {
		tapped: 0,
	};
	render() {
		let cards: JSX.Element[] = [];
		let width = 12.5 + 1.5 * this.props.count;
		for(let i = 0; i < this.state.tapped; i++) {
			cards.push(<CardImage key={i} card={this.props.card}
				className="deck-player-card-stack-item deck-player-card-stack-item-tapped"/>)
		}
		for(let i = this.state.tapped; i < this.props.count; i++) {
			cards.push(<CardImage key={i} card={this.props.card}
				className="deck-player-card-stack-item deck-player-card-stack-item-untapped"/>)
		}
		return <div className="deck-player-card-stack"
			style={{width: width + 'em'}}
		>
			{this.state.tapped > 0?
			<div className="deck-player-card-stack-control deck-player-card-stack-control-tapped"
				style={{left: (this.props.count==this.state.tapped?0:null)}}>
				<div className="deck-player-card-stack-control-actions" >
					<i className="deck-player-card-stack-control-action fa fa-ban"
						aria-hidden="true"
						onClick={()=>{
							this.setState({tapped: this.state.tapped-1},()=>this.props.onExile(this.props.card,null))
						}}/>
					<i className="deck-player-card-stack-control-action fa fa-trash"
						aria-hidden="true"
						onClick={()=>{
							this.setState({tapped: this.state.tapped-1},()=>this.props.onDiscard(this.props.card,null))
						}}/>
					<i className="deck-player-card-stack-control-action fa fa-hand-paper-o"
						aria-hidden="true"
						onClick={()=>{
							this.setState({tapped: this.state.tapped-1},()=>this.props.onHand(this.props.card,null))
						}}/>
				</div>
				<div className="deck-player-card-stack-control-tapped-button"
					onClick={()=>this.setState({tapped: this.state.tapped-1})}/>
				<div className="deck-player-card-stack-control-actions" >
					<i className="deck-player-card-stack-control-action fa fa-arrow-up"
						aria-hidden="true"
						onClick={()=>{
							this.setState({tapped: this.state.tapped-1},()=>this.props.onLibraryTop(this.props.card,null))
						}}/>
					<i className="deck-player-card-stack-control-action fa fa-random" aria-hidden="true" onClick={null}/>
					<i className="deck-player-card-stack-control-action fa fa-arrow-down"
						aria-hidden="true"
						onClick={()=>{
							this.setState({tapped: this.state.tapped-1},()=>this.props.onLibraryBottom(this.props.card,null))
						}}/>
				</div>
			</div>:null}
			{this.state.tapped < this.props.count?
			<div className="deck-player-card-stack-control deck-player-card-stack-control-untapped">
				<div className="deck-player-card-stack-control-actions" >
					<i className="deck-player-card-stack-control-action fa fa-ban"
						aria-hidden="true"
						onClick={()=>this.props.onExile(this.props.card,null)}/>
					<i className="deck-player-card-stack-control-action fa fa-trash"
						aria-hidden="true"
						onClick={()=>this.props.onDiscard(this.props.card,null)}/>
					<i className="deck-player-card-stack-control-action fa fa-hand-paper-o"
						aria-hidden="true"
						onClick={()=>this.props.onHand(this.props.card,null)}/>
				</div>
				<div className="deck-player-card-stack-control-untapped-button"
					onClick={()=>this.setState({tapped: this.state.tapped+1})}/>
				<div className="deck-player-card-stack-control-actions" >
					<i className="deck-player-card-stack-control-action fa fa-arrow-up"
						aria-hidden="true"
						onClick={()=>this.props.onLibraryTop(this.props.card,null)}/>
					<i className="deck-player-card-stack-control-action fa fa-random" aria-hidden="true" onClick={null}/>
					<i className="deck-player-card-stack-control-action fa fa-arrow-down"
						aria-hidden="true"
						onClick={()=>this.props.onLibraryBottom(this.props.card,null)}/>
				</div>
			</div>:null}
			{cards}
		</div>
	}
}

