import 'fetch-polyfill'; // HOPE remove window.fetch polyfill

export interface ScryfallCard {
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
export interface ScryfallSet {
	object: string;
	code: string;
	name: string;
	set_type: string;
	released_at: string;
	search_uri: string;
}
export interface ScryfallSetList {
	data: ScryfallSet[];
	has_more: boolean;
	next_page?: string;
	total_cards?: number;
	warnings: string[];
}
export interface ScryfallCardList {
	data: ScryfallCard[];
	has_more: boolean;
	next_page?: string;
	total_cards?: number;
	warnings: string[];
}
export interface CardPrice {
	usd: number;
	tix: number;
}
export const enum Sort {
	Type,
	CMC,
	Color,
	Name,
	Keyword
}

export class CardInfo {
	data: {[key: string]: ScryfallCard} = {};
	price: {[key: string]: CardPrice} = {};
	setOrder: {[key: string]: number} = null;
	listener: {[key: string]: ((card: string)=>any)[]} = {};
	static instance = new CardInfo;
	constructor() {
		fetch('https://api.scryfall.com/sets').then((response: Promise<Response>)=>{
			if(response.status !== 200) {
				console.log(response.status, response.url);
			} else {
				response.json().then((json: ScryfallSetList)=>{
					// Sort sets
					function date(input: string) {
						if(!input) {
							return Number.NEGATIVE_INFINITY;
						} else {
							let part = input.split('-',3).map((val: string)=>parseInt(val));
							return new Date(part[0],part[1],part[2]).valueOf();
						}
					}
					let sets: string[] = [];
					json.data.sort((a: ScryfallSet,b: ScryfallSet)=>{
						return date(a.released_at) - date(b.released_at)
					}).forEach((set: ScryfallSet)=>{
						sets.push(set.code)
					});
					this.setOrder = {};
					sets.forEach((set: string, idx: number)=>{
						this.setOrder[set] = idx;
					});
					// Trigger update for early listeners
					this.updateInfo();
				})
			}
		})
	}
	updateInfo() {
		let missing = Object.keys(this.data)
			.filter((card: string)=> { return !this.data[card] });
		missing.forEach((card: string)=>{
			fetch('https://api.scryfall.com/cards/search?q='+encodeURIComponent('++!"'+card+'"'))
				.then((response: Promise<Response>)=>{
					if(response.status !== 200) {
						console.log(response.status, response.url);
					} else {
						response.json().then((json: ScryfallCardList)=>{
							let latestSet = Number.NEGATIVE_INFINITY;
							let bestFrame = -1;
							let cards = new Set();
							json.data.forEach((info: ScryfallCard)=>{
								cards.add(info.name);
								let set = this.setOrder[info.set];
								let frame = parseInt(info.frame);
								if(Number.isNaN(frame)) {
									frame = 0;
								}
								if(bestFrame < frame
									|| bestFrame == frame
									&& latestSet < set) {
									this.data[info.name] = info;
									latestSet = set;
									bestFrame = frame;
								}
								if(info.usd !== null) {
									let usd = parseFloat(info.usd);
									if (usd < this.price[info.name].usd) {
										this.price[info.name].usd = usd;
									}
								}
								if(info.tix !== null) {
									let tix = parseFloat(info.tix);
									if (tix < this.price[info.name].tix) {
										this.price[info.name].tix = tix;
									}
								}
							})
							cards.forEach((card: string)=>{
								let image = new Image();
								image.src = this.data[card].image_uri;
								if(this.listener.hasOwnProperty(card)) {
									this.listener[card].forEach((listener: (card: string)=>any)=>{
										listener(card);
									});
								}
							});
						})
					}
				})
		})
	}
	static splitCard(card: string) {
		return card?card.replace(/ \/\/ .*$/,""):null;
	}
	static data(card: string) {
		return CardInfo.instance.data[CardInfo.splitCard(card)];
	}
	static image(card: string) {
		let data = CardInfo.data(card);
		return data?data.image_uri:null;
	}
	static price(card: string) {
		let price = CardInfo.instance.price[CardInfo.splitCard(card)];
		return price?price:{
			usd: Number.POSITIVE_INFINITY,
			tix: Number.POSITIVE_INFINITY,
		};
	}
	static manaCost(card: string) {
		let data = CardInfo.data(card);
		return data&&data.mana_cost?data.mana_cost.slice(0,-1).split('}{').map((sym: string)=>{
			return sym.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
		}):[];
	}
	static register(rawCards: string[], listener: (card: string)=>any) {
		let cards = rawCards.map(CardInfo.splitCard);
		cards.forEach((card: string)=>{
			if(!CardInfo.instance.data.hasOwnProperty(card)) {
				CardInfo.instance.data[card] = null
			}
			if(!CardInfo.instance.price.hasOwnProperty(card)) {
				CardInfo.instance.price[card] = {
					usd: Number.POSITIVE_INFINITY,
					tix: Number.POSITIVE_INFINITY,
				};
			}
		});
		cards.forEach((card: string)=>{
			if(!CardInfo.instance.listener.hasOwnProperty(card)) {
				CardInfo.instance.listener[card] = [];
			}
			CardInfo.instance.listener[card].push(listener);
		});
		if(!CardInfo.instance.setOrder) {
			return;
		} else {
			CardInfo.instance.updateInfo();
		}
	}
	static priceSet(...sets: {[key: string]: number}[]) {
		// Calculate price
		let usd: number = null;
		let tix: number = null;
		sets.forEach((set: {[key: string]: number})=>{
			Object.keys(set).forEach((card: string)=>{
				usd += set[card] * CardInfo.price(card).usd;
				tix += set[card] * CardInfo.price(card).tix;
			});
		});
		function roundOff(value: number) {
			return value?Number(Math.round(parseFloat(value.toString()+'e2'))+'e-2').toFixed(2):value;
		}
		return {
			usd: roundOff(usd),
			tix: roundOff(tix),
		};
	}
	static sort(cards: {[key: string]: number}, sort: Sort): {name: string, list: {card: string, count: number}[]}[] {
		let buckets: {[key: string]: {card: string, count: number}[]} = {}
		let lists: {name: string, list: {card: string, count: number}[]}[] = []
		let unknown: string[] = [];
		function secondSort({card: a}: {card: string}, {card: b}: {card: string}) {
			// Check converted mana cost
			let cmc_a = parseFloat(CardInfo.data(a).converted_mana_cost);
			let cmc_b = parseFloat(CardInfo.data(b).converted_mana_cost);
			let diff = cmc_a - cmc_b;
			if(diff == 0) {
				// Check phyrexian mana
				let phyr_a = CardInfo.manaCost(a).map((sym: string)=>{
					return sym.length==2 && sym[1]=='p'?-1:0;
				}).reduce((a:number, b:number)=>a+b,0);
				let phyr_b = CardInfo.manaCost(b).map((sym: string)=>{
					return sym.length==2 && sym[1]=='p'?-1:0;
				}).reduce((a:number, b:number)=>a+b,0);
				let diff = phyr_a - phyr_b;
				if(diff == 0) {
					// Check number of mana symbols
					let syms_a = CardInfo.manaCost(a).length;
					let syms_b = CardInfo.manaCost(b).length;
					let diff = syms_a - syms_b;
					if(diff == 0) {
						// Check number of colors
						let cols_a = CardInfo.data(a).colors.length;
						let cols_b = CardInfo.data(b).colors.length;
						let diff = cols_a - cols_b;
						if(diff == 0) {
							// Sort by color
							let colors_a = CardInfo.data(a).colors;
							let colors_b = CardInfo.data(b).colors;
							for(let color of ['W','U','B','R','G']) {
								let match_a = colors_a.indexOf(color) > -1;
								let match_b = colors_b.indexOf(color) > -1;
								if(match_a && !match_b) {
									return -1;
								} else if(!match_a && match_b) {
									return 1;
								}
							}
							// Lexical sort
							if(a < b) {
								return -1;
							} else if(a > b) {
								return 1;
							} else {
								return 0;
							}
						} else {
							return diff;
						}
					} else {
						return diff;
					}
				} else {
					return diff;
				}
			} else {
				return diff;
			}
		}
		switch (sort) {
		case Sort.Type:
			Object.keys(cards).forEach((card: string)=>{
				if(!CardInfo.data(card)) {
					unknown.push(card);
					return;
				}
				let type_line = CardInfo.data(card).type_line;
				for(let item of ["Land","Creature","Artifact","Enchantment","Planeswalker","Instant","Sorcery"]) {
					if(type_line.includes(item)) {
						if(!buckets.hasOwnProperty(item)) {
							buckets[item] = []
						}
						buckets[item].push({card: card, count: cards[card]});
						break;
					}
				}
			});
			for(let item of ["Creature","Artifact","Enchantment","Planeswalker","Instant","Sorcery","Land"]) {
				if(buckets.hasOwnProperty(item)) {
					lists.push({
						name: item,
						list: buckets[item].sort(secondSort),
					});
				}
			}
			break;
		case Sort.CMC:
			Object.keys(cards).forEach((card: string)=>{
				if(!CardInfo.data(card)) {
					unknown.push(card);
					return;
				}
				let cmc = CardInfo.data(card).converted_mana_cost;
				if(!buckets.hasOwnProperty(cmc)) {
					buckets[cmc] = []
				}
				buckets[cmc].push({card: card, count: cards[card]});
			});
			for(let item of Object.keys(buckets).sort((a: string, b: string)=>{
					return parseFloat(a) - parseFloat(b);
				})) {
				if(buckets.hasOwnProperty(item)) {
					lists.push({
						name: parseFloat(item).toString() + " drop",
						list: buckets[item].sort(secondSort),
					});
				}
			}
			break;
		case Sort.Color:
			Object.keys(cards).forEach((card: string)=>{
				if(!CardInfo.data(card)) {
					unknown.push(card);
					return;
				}
				let colors = CardInfo.data(card).colors;
				if(colors.length == 0) {
					if(!buckets.hasOwnProperty("Colorless")) {
						buckets["Colorless"] = [];
					}
					buckets["Colorless"].push({card: card, count: cards[card]});
				} else if(colors.length > 1) {
					if(!buckets.hasOwnProperty("Gold")) {
						buckets["Gold"] = [];
					}
					buckets["Gold"].push({card: card, count: cards[card]});
				} else {
					let color = colors[0];
					if(!buckets.hasOwnProperty(color)) {
						buckets[color] = []
					}
					buckets[color].push({card: card, count: cards[card]});
				}
			})
			for(let item of ["W","U","B","R","G","Gold","Colorless"]) {
				if(buckets.hasOwnProperty(item)) {
					let name: string;
					switch(item) {
					case "W":
						name = "White";
						break;
					case "U":
						name = "Blue";
						break;
					case "B":
						name = "Black";
						break;
					case "R":
						name = "Red";
						break;
					case "G":
						name = "Green";
						break;
					default:
						name = item;
					}
					lists.push({
						name: name,
						list: buckets[item].sort(secondSort),
					});
				}
			}
			break;
		case Sort.Name:
		case Sort.Keyword: //TODO
			let list: string[] = []
			Object.keys(cards).forEach((card: string)=>{
				if(!CardInfo.data(card)) {
					unknown.push(card);
				} else {
					list.push(card);
				}
			});
			lists.push({
				name: null,
				list: list.sort().map((card: string)=>{
					return {card: card, count: cards[card]};
				}),
			});
			break;
		}
		if(unknown.length) {
			lists.push({
				name: null,
				list: unknown.sort().map((card: string)=>{
					return {card: card, count: cards[card]};
				}),
			});
		}
		return lists;
	}
}
