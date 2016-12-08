import "./card-stack.scss";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {CardInfo} from './card-info.tsx';

export interface CardStackProps{
	card: string,
	count: number,
}
export interface CardStackState{
	tapped: number,
}
export class CardStack extends React.Component<CardStackProps,CardStackState> {
	state = {
		tapped: 0
	};
	render() {
		let tapped: JSX.Element[] = [];
		let untapped: JSX.Element[] = [];
		for(let i = 0; i < this.props.count - this.state.tapped; i++) {
			untapped.push(<div key={i}
				className="deck-player-card deck-player-card-stack-item deck-player-card-stack-item-untapped"
				onClick={()=>this.setState({tapped: this.state.tapped+1})}
				>
				<img className="deck-player-card-img" src={CardInfo.image(this.props.card)}/>
			</div>);
		}
		for(let i = this.props.count - this.state.tapped; i < this.props.count; i++) {
			tapped.push(<div key={i}
			className="deck-player-card deck-player-card-stack-item deck-player-card-stack-item-tapped"
				onClick={()=>this.setState({tapped: this.state.tapped-1})}
				>
				<img className="deck-player-card-img" src={CardInfo.image(this.props.card)}/>
			</div>);
		}
		return <div className="deck-player-card-stack">
			<div className="deck-player-card-stack-untapped">
				{untapped}
			</div>
			<div className="deck-player-card-stack-tapped">
				{tapped}
			</div>
		</div>
	}
}

