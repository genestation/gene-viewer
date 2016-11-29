"use strict";

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'whatwg-fetch'; // HOPE remove window.fetch polyfill
import './main.scss';

interface CardListProps{
	title?: string;
	cards: string[];
	setCurr: (card: string)=>any;
}
interface CardListState{ }
class CardList extends React.Component<CardListProps,CardListState> {
	render() {
		let counts: {[key: string]: number} = {}
		this.props.cards.forEach((card: string)=>{
			counts[card] = (counts[card] || 0) + 1;
		});
		return <div className="card-list">
			{this.props.title?<div className="title">{this.props.title}</div>:null}
			<ul> {
				Object.keys(counts).map((card: string, idx: number)=>{
					return <li key={idx}
						onMouseOver={()=>this.props.setCurr(card)}
						onClick={()=>this.props.setCurr(card)} >
						{counts[card] + "×"}&nbsp;{card}
					</li>
				})
			} </ul>
		</div>
	}
}

interface ScryfallCard {
	name: string;
	mana_cost?: string;
	converted_mana_cost: string;
	type_line: string;
	oracle_text: string;
	power?: string;
	toughness?: string;
	loyalty?: string;
	hand_modifier?: string;
	life_modifier?: string;
	colors: string[];
	color_identity: string[];
	layout: string;
	legalities: {
		standard: string;
		modern: string;
		legacy: string;
		vintage: string;
		commander: string;
		pauper: string;
		frontier: string;
		penny: string;
		duel: string;
	};
	reserved: boolean;
	id: string;
	multiverse_id?: number;
	mtgo_id?: number;
	set: string;
	set_name: string;
	collector_number?: string;
	all_parts?: {
		id: string;
		name: string;
		uri: string;
	}[];
	rarity: string;
	digital: boolean;
	flavor_text: string;
	artist: string;
	frame: string;
	border: string;
	timeshifted: boolean;
	colorshifted: boolean;
	futureshifted: boolean;
	usd?: string;
	tix?: string;
	scryfall_uri: string;
	image_uri: string;
}
interface ScryfallList {
	data: ScryfallCard[];
	has_more: boolean;
	next_page?: string;
	total_cards?: number;
	warnings: string[];
}
interface DeckListProps{
	name?: string;
	mainboard?: string[];
	sideboard?: string[];
}
interface DeckListState{
	cardinfo?: {[key: string]: ScryfallCard};
	curr?: string;
	img?: string;
}
class DeckList extends React.Component<DeckListProps,DeckListState> {
	static defaultProps: DeckListProps = {
		name: "",
		mainboard: [],
		sideboard: [],
	}
	constructor(props: DeckListProps) {
		super(props);
		let cardinfo: {[key: string]: ScryfallCard} = {}
		props.mainboard.forEach((card: string)=>{
			cardinfo[card] = null
		});
		props.sideboard.forEach((card: string)=>{
			cardinfo[card] = null
		});
		this.state = {
			cardinfo: cardinfo,
			curr: props.mainboard.length > 0?props.mainboard[0]:null,
		}
		this.updateInfo();
	}
	componentWillReceiveProps(nextProps: DeckListProps) {
		let cardinfo: {[key: string]: ScryfallCard} = this.state.cardinfo
		nextProps.mainboard.forEach((card: string)=>{
			if(!cardinfo.hasOwnProperty(card)) {
				cardinfo[card] = null
			}
		});
		nextProps.sideboard.forEach((card: string)=>{
			if(!cardinfo.hasOwnProperty(card)) {
				cardinfo[card] = null
			}
		});
		this.setState({
			cardinfo: cardinfo
		}, this.updateInfo)
	}
	updateInfo() {
		let missingInfo = Object.keys(this.state.cardinfo)
			.filter((card: string)=> { return !this.state.cardinfo[card] });
		missingInfo.forEach((card: string)=>{
			fetch('https://api.scryfall.com/cards/search?q='+encodeURIComponent('!"'+card+'"'))
				.then((response: Promise<Response>)=>{
					if(response.status !== 200) {
						console.log(response.status, response.url);
					} else {
						response.json().then((json: ScryfallList)=>{
							let info: ScryfallCard = json.data[0];
							let state = this.state;
							state.cardinfo[info.name] = info;
							if(this.state.curr == info.name) {
								state.img = info.image_uri;
							}
							this.setState(state);
						})
					}
				})
		})
	}
	setCurr = (curr: string)=>{
		if(this.state.cardinfo[curr]) {
			this.setState({
				curr: curr,
				img: this.state.cardinfo[curr].image_uri,
			});
		} else {
			this.setState({
				curr: curr,
			});
		}
	}
	render() {
		return <div className="decklist">
			<div className="title">{this.props.name}</div>
			<div className="body">
				<CardList cards={this.props.mainboard} setCurr={this.setCurr}/>
				<CardList title="sideboard" cards={this.props.sideboard} setCurr={this.setCurr}/>
				<div className="preview">
					{this.state.img?<img src={this.state.img}/>:null}
				</div>
			</div>
		</div>
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
		return <div className="roguebuilder">
			<DeckList name="Skred Red"
				mainboard={[
					"Lightning Bolt",
					"Lightning Bolt",
					"Lightning Bolt",
					"Lightning Bolt",
					"Magma Jet",
					"Skred",
					"Anger of the Gods",
					"Anger of the Gods",
					"Anger of the Gods",
					"Mizzium Mortars",
					"Roast",
					"Batterskull",
					"Mind Stone",
					"Mind Stone",
					"Mind Stone",
					"Mind Stone",
					"Relic of Progenitus",
					"Relic of Progenitus",
					"Relic of Progenitus",
					"Relic of Progenitus",
					"Chandra, Pyromaster",
					"Koth of the Hammer",
					"Koth of the Hammer",
					"Koth of the Hammer",
					"Koth of the Hammer",
					"Scrying Sheets",
					"Scrying Sheets",
					"Scrying Sheets",
					"Snow-Covered Mountain",
					"Eternal Scourge",
					"Eternal Scourge",
					"Pia and Kiran Nalaar",
					"Pia and Kiran Nalaar",
					"Pia and Kiran Nalaar",
					"Pia and Kiran Nalaar",
					"Blood Moon",
					"Blood Moon",
					"Blood Moon",
				]}
				/>
		</div>
	}
}
