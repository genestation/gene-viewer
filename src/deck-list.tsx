import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {CardInfo, CardPrice, Sort, SortName} from './card-info.tsx';
import {CardList, CardListItem} from './card-list.tsx';
import {Dropdown} from './dropdown.tsx';

const enum Media {
	Small,
	Medium,
	Large,
}
function MediaBreakpoint() {
	let small = window.matchMedia("(max-width:40em)").matches;
	let big = window.matchMedia("(max-width:60em)").matches;
	if(small) {
		return Media.Small;
	} else if (big) {
		return Media.Medium;
	} else {
		return Media.Large;
	}
}

interface DeckListProps{
	name?: string;
	cover?: string;
	mainboard?: {[key: string]: number};
	sideboard?: {[key: string]: number};
	onBuy?: (list?: CardListItem[])=>any;
	onDownload?: (name: string, list?: CardListItem[])=>any;
	onCopy?: (list?: CardListItem[])=>any;
	onPlay?: ()=>any;
	onClose?: ()=>any;
}
interface DeckListState{
	setOrder?: {[key: string]: number};
	price?: {[key: string]: CardPrice};
	curr?: string;
	scroll?: string;
	sort?: Sort;
	filter?: string;
	highlight?: string;
}
export class DeckList extends React.Component<DeckListProps,DeckListState> {
	static defaultProps: DeckListProps = {
		name: null,
		cover: null,
		mainboard: {},
		sideboard: {},
	}
	startY: number = null;
	endY: number = null;
	scrollY: number = window.pageYOffset;
	updatingInfo: boolean = false;
	updatingScroll: boolean = false;
	child: {
		preview?: Element;
		track?: Element;
	} = {};
	constructor(props: DeckListProps) {
		super(props);
		let curr = props.cover?props.cover:
			props.mainboard && Object.keys(props.mainboard).length > 0?Object.keys(props.mainboard).sort()[0]:null;
		this.state = {
			curr: curr,
			sort: Sort.Type,
			scroll: "top",
			highlight: null,
			filter: null,
		};
		if(props.mainboard) CardInfo.register(Object.keys(props.mainboard), this.handleInfo);
		if(props.sideboard) CardInfo.register(Object.keys(props.sideboard), this.handleInfo);
	}
	componentWillReceiveProps(nextProps: DeckListProps) {
		if(nextProps.cover) this.setState({curr: nextProps.cover});
		if(nextProps.mainboard) CardInfo.register(Object.keys(nextProps.mainboard), this.handleInfo);
		if(nextProps.sideboard) CardInfo.register(Object.keys(nextProps.sideboard), this.handleInfo);
	}
	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
		this.calculateScreenPosition();
	}
	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}
	componentDidUpdate() {
		this.calculateScreenPosition();
	}
	calculateScreenPosition() {
		let previewR = this.child.preview.getClientRects()[0];
		let trackR = this.child.track.getClientRects()[0];
		this.startY = trackR.top + window.pageYOffset;
		this.endY = this.startY + trackR.height - previewR.height;
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
	handleScroll = ()=>{
		this.scrollY = window.pageYOffset;
		if(!this.updatingScroll) {
			requestAnimationFrame(this.updateScroll);
		}
		this.updatingScroll = true;
	}
	updateScroll = ()=>{
		if(MediaBreakpoint() == Media.Small) {
			this.setState({
				scroll: "top",
			}, ()=>{this.updatingScroll=false});
		} else {
			this.calculateScreenPosition();
			// Scrolling
			let scroll = "top"
			if(this.scrollY > this.endY) {
				scroll = "bottom"
			} else if (this.scrollY > this.startY) {
				scroll = "fixed"
			}
			if(scroll != this.state.scroll) {
				this.setState({
					scroll: scroll,
				}, ()=>{this.updatingScroll=false});
			} else {
				this.updatingScroll=false;
			}
		}
	}
	showPreview = ()=>{
		if(MediaBreakpoint() == Media.Small
		&& this.scrollY > this.startY) {
			this.setState({
				scroll: "fixed",
			});
		}
	}
	togglePreview = ()=>{
		if(MediaBreakpoint() == Media.Small) {
			if(this.state.scroll=="fixed") {
				this.setState({
					scroll: "top",
				});
			} else if (this.scrollY > this.startY) {
				this.setState({
					scroll: "fixed",
				});
			}
		}
	}
	setCurr = (curr: string)=>{
		this.setState({
			curr: curr,
		});
	}
	render() {
		let lists = CardInfo.sort(this.props.mainboard, this.state.sort);
		let sideboard = CardInfo.sort(this.props.sideboard, Sort.Name);
		let price = CardInfo.priceSet(this.props.mainboard, this.props.sideboard);
		let priceImg = CardInfo.priceString(this.state.curr);
		// Calculate height
		const headerSize = 2.2;
		const lineSize = 1.6;
		let height: number[] = [];
		lists.forEach(({list: list}: {list: {card: string, count: number}[]})=>{
			height.push(headerSize + lineSize * list.length);
		});
		sideboard.forEach(({list: list}: {list: {card: string, count: number}[]}, idx: number)=>{
			height.push(headerSize + lineSize * list.length + (idx==0?2:0));
		});
		let cutoff = 0;
		let last: number = null;
		let sum = height.reduce((a: number, b: number)=>{return a+b});
		height.forEach((piece: number)=>{
			if(last == null && cutoff + piece < sum/2) {
				cutoff += piece;
			} else if (last == null) {
				last = piece
			}
		});
		cutoff = Math.min(cutoff + last, sum - cutoff);
		// Count keywords
		let {keyword_count, keyword_map} = CardInfo.keywords([this.props.mainboard,this.props.sideboard]);
		let keyword_order = Object.keys(keyword_count).sort((a: string, b: string)=>{
			return keyword_count[b] - keyword_count[a];
		});
		let highlight = this.state.highlight?keyword_map[this.state.highlight]:[];
		let filtered: string[] = null;
		if(!this.state.highlight && this.state.filter) {
			filtered = keyword_map[this.state.filter];
		}
		// Return DOM
		return <div className="decklist">
			<div className="head" >
				<i className="fa fa-window-close" onClick={this.props.onClose}/>
				<div className="head-upper">
					<h1>{this.props.name}</h1>
					<span className="price" onClick={()=>this.props.onBuy()}>{price.usd} USD / {price.tix} TIX
						&nbsp;
						<i className="fa fa-shopping-cart" aria-hidden="true"/>
					</span>
					<span className="actions" >
						<i className="fa fa-play" aria-hidden="true" onClick={()=>this.props.onPlay()}/>
						&nbsp;
						<i className="fa fa-clipboard" aria-hidden="true" onClick={()=>this.props.onCopy()}/>
						&nbsp;
						<i className="fa fa-download" aria-hidden="true" onClick={()=>this.props.onDownload(this.props.name)}/>
					</span>
				</div>
				<div className="head-lower">
					<div className="select">
						<Dropdown label="Sort by" value={SortName[this.state.sort]}>
							<ul className="dropdown-list">
								<li className="dropdown-item"
									onClick={()=>this.setState({sort:Sort.Type})}>Type</li>
								<li className="dropdown-item"
									onClick={()=>this.setState({sort:Sort.CMC})}>Converted Mana Cost</li>
								<li className="dropdown-item"
									onClick={()=>this.setState({sort:Sort.Color})}>Color</li>
								<li className="dropdown-item"
									onClick={()=>this.setState({sort:Sort.Price})}>Price</li>
								<li className="dropdown-item"
									onClick={()=>this.setState({sort:Sort.Name})}>Name</li>
							</ul>
						</Dropdown>
						<Dropdown label="Keywords" value={this.state.filter?this.state.filter:"none"}>
							<table className="dropdown-table">
							<thead>
								<tr className="dropdown-item dropdown-item-reset"
									onClick={()=>this.setState({
										filter: null,
									})}
								><td colSpan={2}>Reset</td></tr>
							</thead>
							<tbody>{
								keyword_order.map((keyword: string, idx: number)=>{
									return <tr className="dropdown-item" key={idx}
									onClick={()=>{
										this.setState({
											filter: keyword,
										});
									}}
									onMouseEnter={()=>{
										this.setState({
											highlight: keyword,
										})
									}}
									onMouseLeave={()=>{
										this.setState({
											highlight: null,
										})
									}} >
										<td className="dropdown-item-keyword">{keyword}</td>
										<td className="dropdown-item-count">{keyword_count[keyword]}</td>
									</tr>
								})
							}</tbody></table>
						</Dropdown>
					</div>
				</div>
			</div>
			<div className="body">
				<div className="footprint"/>
				<div className="lists"
					style={{height: cutoff + 'em'}}>
				{
					lists.map((item: {name: string, list: CardListItem[]}, idx: number)=>{
						return <CardList
							key={idx}
							deck={this.props.name}
							title={item.name}
							sublist={true}
							cards={item.list}
							highlight={highlight}
							filtered={filtered}
							setCurr={this.setCurr}
							showPreview={this.showPreview}
							onCopy={this.props.onCopy}
							onDownload={this.props.onDownload} />
					})
				}
					<CardList
						deck={this.props.name}
						title="Sideboard"
						cards={sideboard[0].list}
						highlight={highlight}
						filtered={filtered}
						setCurr={this.setCurr}
						showPreview={this.showPreview}
						onCopy={this.props.onCopy}
						onDownload={this.props.onDownload} />
				{sideboard[1]?
					<CardList
						deck={this.props.name}
						sublist={true}
						cards={sideboard[1].list}
						highlight={highlight}
						filtered={filtered}
						setCurr={this.setCurr}
						showPreview={this.showPreview}
						onCopy={this.props.onCopy}
						onDownload={this.props.onDownload} />
				:null}
				</div>
				<div ref={(ref)=>{this.child.track=ref}} className="preview-track">
					<div ref={(ref)=>{this.child.preview=ref}}
						className={"preview-frame "+this.state.scroll}
						onClick={this.togglePreview}>
						<div className="preview">
							<div className="preview-img">
								<img src={CardInfo.image(this.state.curr)}/>
							</div>
							<span>
								{priceImg.usd} USD / {priceImg.tix} TIX
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	}
}
