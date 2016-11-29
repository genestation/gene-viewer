"use strict";

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './main.scss';

export interface CardProps{
	lang: string;
	set: string;
	cnum: number;
}
export interface CardState{
	focus?: boolean;
};
class Card extends React.Component<CardProps,CardState> {
	image_uri() {
		return "https://img.scryfall.com/cards/" + this.props.lang + '/'
		+ this.props.set + '/' + this.props.cnum + '.jpg';
	}
	render() {
		return <img src={this.image_uri()} />
	}
}

export interface MainProps{
	autofocus?: boolean;
}
export interface MainState{
	focus?: boolean;
};
export default class extends React.Component<MainProps,MainState> {
	render() {
		return <div><Card
		lang="en"
		set="ema"
		cnum={49} /></div>
	}
}
