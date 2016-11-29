"use strict";

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './main.scss';

interface CardProps{
	name: string;
	lang: string;
	set: string;
	cnum: number;
}
interface CardState{
	focus?: boolean;
}
class Card extends React.Component<CardProps,CardState> {
	image_uri() {
		return "https://img.scryfall.com/cards/" + this.props.lang + '/'
		+ this.props.set + '/' + this.props.cnum + '.jpg';
	}
	render() {
		return <img src={this.image_uri()} />
	}
}

interface CardListProps{
	cards: CardProps[];
}
interface CardListState{ }
class CardList extends React.Component<CardListProps,CardListState> {
	render() {
		let counts: {[key: string]: number} = {}
		this.props.cards.forEach((card: CardProps)=>{
			counts[card.name] = (counts[card.name] || 0) + 1;
		});
		return <ul> {
			Object.keys(counts).map((card: string)=>{
				return <li>{counts[card] + "x"}&nbsp;{card}</li>
			})
		} </ul>;
	}
}

export interface MainProps{
	autofocus?: boolean;
}
export interface MainState{
	focus?: boolean;
}
export default class extends React.Component<MainProps,MainState> {
	render() {
		return <div class="roguebuilder">
			<Card name="Force of Will" lang="en" set="ema" cnum={49} />
			<CardList cards={[{name: "Force of Will", lang: "en", set: "ema", cnum: 49}]}/>
		</div>
	}
}
