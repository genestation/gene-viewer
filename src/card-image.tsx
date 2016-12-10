import * as React from 'react';
import {CardInfo} from './card-info.tsx';

export interface CardImageProps{
	card?: string;
	className?: string;
	onClick?: ()=>any;
}
export interface CardImageState{ }
export class CardImage extends React.Component<CardImageProps,CardImageState> {
	updatingInfo: boolean = false;
	constructor(props: CardImageProps) {
		super(props);
		if(CardInfo.image(props.card) === null) {
			CardInfo.register([props.card], this.handleInfo);
		}
		this.state = {};
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
	render() {
		return <div className={"deckbuilder-card"
				+ (this.props.onClick?" deckbuilder-card-button":"")
				+ (this.props.className?" "+this.props.className:"")}
			onClick={this.props.onClick}>
			<div className="deckbuilder-card-name">{this.props.card}</div>
			<img className="deckbuilder-card-img"
				alt={this.props.card}
				src={CardInfo.image(this.props.card)}/>
		</div>
	}
}
