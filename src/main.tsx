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
		return <ul> {
			this.props.cards.map((card: CardProps)=>{
				return <li>{card.name}</li>
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
