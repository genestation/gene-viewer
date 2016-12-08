import "./card-stack.scss";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {CardInfo} from './card-info.tsx';

export interface CardStackProps{
	card: string,
	count: number,
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
		let untap_width = (14.5 - 1.5 * this.props.count) * (this.props.count > this.state.tapped?1:0);
		for(let i = 0; i < this.state.tapped; i++) {
			cards.push(<div key={i}
			className="deck-player-card deck-player-card-stack-item deck-player-card-stack-item-tapped">
				<img className="deck-player-card-img" src={CardInfo.image(this.props.card)}/>
			</div>);
		}
		for(let i = this.state.tapped; i < this.props.count; i++) {
			cards.push(<div key={i}
				className="deck-player-card deck-player-card-stack-item deck-player-card-stack-item-untapped">
				<img className="deck-player-card-img" src={CardInfo.image(this.props.card)}/>
			</div>);
		}
		return <div className="deck-player-card-stack"
			style={{width: width + 'em'}}
		>
			{this.state.tapped > 0?
			<div className="deck-player-card-stack-control deck-player-card-stack-control-tapped"
				style={{left: untap_width + 'em'}}>
				<div className="deck-player-card-stack-control-actions" >
					<i className="deck-player-card-stack-control-action fa fa-ban"
						aria-hidden="true"
						onClick={()=>this.props.parent.onExile(this.props.card,null)}/>
					<i className="deck-player-card-stack-control-action fa fa-trash"
						aria-hidden="true"
						onClick={()=>this.props.parent.onDiscard(this.props.card,null)}/>
					<i className="deck-player-card-stack-control-action fa fa-hand-paper-o"
						aria-hidden="true"
						onClick={()=>this.props.parent.onHand(this.props.card,null)}/>
				</div>
				<div className="deck-player-card-stack-control-tapped-button"
					onClick={()=>this.setState({tapped: this.state.tapped-1})}/>
				<div className="deck-player-card-stack-control-actions" >
					<i className="deck-player-card-stack-control-action fa fa-arrow-up"
						aria-hidden="true"
						onClick={()=>this.props.parent.onLibraryTop(this.props.card,null)}/>
					<i className="deck-player-card-stack-control-action fa fa-random" aria-hidden="true" onClick={null}/>
					<i className="deck-player-card-stack-control-action fa fa-arrow-down"
						aria-hidden="true"
						onClick={()=>this.props.parent.onLibraryBottom(this.props.card,null)}/>
				</div>
			</div>:null}
			{this.state.tapped < this.props.count?
			<div className="deck-player-card-stack-control deck-player-card-stack-control-untapped">
				<div className="deck-player-card-stack-control-actions" >
					<i className="deck-player-card-stack-control-action fa fa-ban"
						aria-hidden="true"
						onClick={()=>this.props.parent.onExile(this.props.card,null)}/>
					<i className="deck-player-card-stack-control-action fa fa-trash"
						aria-hidden="true"
						onClick={()=>this.props.parent.onDiscard(this.props.card,null)}/>
					<i className="deck-player-card-stack-control-action fa fa-hand-paper-o"
						aria-hidden="true"
						onClick={()=>this.props.parent.onHand(this.props.card,null)}/>
				</div>
				<div className="deck-player-card-stack-control-untapped-button"
					onClick={()=>this.setState({tapped: this.state.tapped+1})}/>
				<div className="deck-player-card-stack-control-actions" >
					<i className="deck-player-card-stack-control-action fa fa-arrow-up"
						aria-hidden="true"
						onClick={()=>this.props.parent.onLibraryTop(this.props.card,null)}/>
					<i className="deck-player-card-stack-control-action fa fa-random" aria-hidden="true" onClick={null}/>
					<i className="deck-player-card-stack-control-action fa fa-arrow-down"
						aria-hidden="true"
						onClick={()=>this.props.parent.onLibraryBottom(this.props.card,null)}/>
				</div>
			</div>:null}
			{cards}
		</div>
	}
}

