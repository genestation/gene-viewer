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
		let stack: JSX.Element[] = [];
		for(let i = 0; i < this.props.count - this.state.tapped; i++) {
			stack.push(<div key={i} className="deck-player-card deck-player-card-stack-item">
				<img className="deck-player-card-img" src={CardInfo.image(this.props.card)}/>
			</div>);
		}
		for(let i = this.props.count - this.state.tapped; i < this.props.count; i++) {
			stack.push(<div key={i} className="deck-player-card deck-player-card-stack-item deck-player-card-stack-item-tapped">
				<img className="deck-player-card-img" src={CardInfo.image(this.props.card)}/>
			</div>);
		}
		return <div className="deck-player-card-stack">
			{stack}
		</div>
	}
}

