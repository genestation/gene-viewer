"use strict";

import './main.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ElasticSearch from 'elasticsearch-browser';
import {Scale} from './scale.tsx';
import {Numberline} from './Numberline.tsx';

export interface Feature {
	name?: string,
	ftype?: string,
	srcfeature?: string,
	start?: number,
	end?: number,
	strand?: number,
	child?: Feature[],
	data?: {[key: string]: any[]},
}

interface GenomeShape {
	dnaY: number,
	dnaHeight: number,
	strandHeight: number,
	intronHeight: number,
	plusStrandY: number,
	minusStrandY: number,
	minWidth: number,
}

interface GenomeFeatureProps {
	scale: Scale,
	shape: GenomeShape,
	feature: Feature,
}
class GenomeFeature extends React.Component<GenomeFeatureProps,{}> {
	constructor(props: GenomeFeatureProps) {
		super(props);
		this.state = { }
	}
	featureColor(ftype = this.props.feature.ftype):string {
		switch(ftype) {
		case 'exon':
			return '#56876a';
		case 'CDS':
			return '#3e53bc';
		case 'sequence_alteration':
			return '#e00f24';
		case 'enhancer':
			return '#62138c';
		case 'repetitive_element':
			return 'none';
		default:
			return null;
		}
	}
	renderLeaf():JSX.Element {
		if(typeof this.props.feature.start == "number" && typeof this.props.feature.end == "number") {
			const rectX = this.props.scale.get(this.props.feature.start);
			const rectWidth = Math.max(this.props.scale.get(this.props.feature.end) - this.props.scale.get(this.props.feature.start),
				this.props.shape.minWidth);
			switch(this.props.feature.strand) {
			case 1:
				return <rect x={rectX} y={this.props.shape.plusStrandY}
					width={rectWidth} height={this.props.shape.strandHeight}
					style={{fill:this.featureColor(), opacity: 0.6}} />
			case -1:
				return <rect x={rectX} y={this.props.shape.minusStrandY}
					width={rectWidth} height={this.props.shape.strandHeight}
					style={{fill:this.featureColor(), opacity: 0.6}} />
			default:
				return <rect x={rectX} y={this.props.shape.dnaY}
					width={rectWidth} height={this.props.shape.dnaHeight}
					style={{fill:this.featureColor(), opacity: 0.6}} />
			}
		}
	}
	render():JSX.Element {
		if(this.props.feature.child) {
			return <g>
				<rect /> //TODO viewport height highlight this.props.feature.start - end
				{ this.props.feature.child.map((feature: Feature, idx: number)=>{
					return <GenomeFeature key={idx}
						scale={this.props.scale} shape={this.props.shape} feature={feature}/>
				}) }
				{this.props.feature.child.map((child: Feature, idx: number, array: Feature[])=>{
					if(idx > 0) {
						const lastChild = array[idx-1];
						if(child.ftype != lastChild.ftype || child.child || lastChild.child) {
							return null
						}
						if(child.strand == 1 && lastChild.strand == 1) {
							const startX = this.props.scale.get(lastChild.end);
							const endX = this.props.scale.get(child.start);
							const strandY = this.props.shape.plusStrandY
							const midX = (startX + endX)/2;
							const midY = this.props.shape.plusStrandY - this.props.shape.intronHeight;
							return <path key={idx}
								d={"M "+startX+" "+strandY
									+" L "+midX+" "+midY
									+" L "+endX+" "+strandY
								} style={{fill: "none", opacity: 0.6, stroke: this.featureColor(child.ftype), strokeWidth: 1}} />
						} else if(child.strand == -1 && lastChild.strand == -1) {
							const startX = this.props.scale.get(lastChild.start);
							const endX = this.props.scale.get(child.end);
							const strandY = this.props.shape.minusStrandY + this.props.shape.strandHeight;
							const midX = (startX + endX)/2;
							const midY = this.props.shape.minusStrandY + this.props.shape.strandHeight + this.props.shape.intronHeight;
							return <path key={idx}
								d={"M "+startX+" "+strandY
									+" L "+midX+" "+midY
									+" L "+endX+" "+strandY
								} style={{fill: "none", opacity: 0.6, stroke: this.featureColor(child.ftype), strokeWidth: 1}} />
						}
					} else {
						return null
					}
				})}
			</g>;
		} else {
			return <g>
				{this.renderLeaf()}
			</g>;
		}
	}
}

type HitsArray<T> = Array<{
	_index: string;
	_type: string;
	_id: string;
	_score: number;
	_source: T;
	_version?: number;
	_explanation?: ElasticSearch.Explanation;
	fields?: any;
	highlight?: any;
	inner_hits?: any;
	sort?: string[];
}>;
function scrollToEnd(client: ElasticSearch.Client, response: ElasticSearch.SearchResponse<any>): Promise<HitsArray<any>> {
	function recursiveScroll(response: ElasticSearch.SearchResponse<any>, hits: HitsArray<any>): Promise<HitsArray<any>> {
		return client.scroll({
			scrollId: response._scroll_id,
			scroll: "10s",
		}).then((response: ElasticSearch.SearchResponse<any>)=>{
			if (response.hits.hits.length > 0) {
				return recursiveScroll(response, hits.concat(response.hits.hits))
			} else {
				return hits
			}
		})
	}
	return recursiveScroll(response, response.hits.hits);
}
export interface GeneViewerProps{
	elastic: string,
	features: Feature[],
}
export interface GeneViewerState{
	focus?: number,
	selectedRegion?: number[],
	currFeature?: Feature,
	features?: Feature[],
	scale?: Scale;
}
export class GeneViewer extends React.Component<GeneViewerProps,GeneViewerState> {
	static defaultProps: GeneViewerProps = {
		elastic: "",
		features: [],
	}
	child: {
		navigation?: HTMLElement;
	} = {};
	handlingMouseMove: boolean = false;
	width = 1000;
	marginX = 20;
	viewWidth = this.width + 2*this.marginX;
	data_keys = ['fst','nucleotide_diversity','heterozygote_deficiency','heterozygote_excess','hardy_weinburg'];
	elastic: ElasticSearch.Client;
	constructor(props: GeneViewerProps) {
		super(props);
		this.state = {
			focus: -1,
			selectedRegion: null,
			features: props.features,
			scale: new Scale({
				features: props.features,
				size: this.width,
				margin: 100,
				filter: ['exon','enhancer']
			}),
		}
		this.elastic = new ElasticSearch.Client({
			host: props.elastic,
			apiVersion: '5.6',
		});
		// Fetch SNPs
		this.elastic.searchTemplate({
			"index": "variant_v1.4",
			"type": "Homo_sapiens",
			"body": {
				"id": "gene_association",
				"params": {
					"gene": props.features[0].name,
				}
			},
			"scroll": "10s",
		}).then((response:ElasticSearch.SearchResponse<any>)=>{
			return scrollToEnd(this.elastic, response)
		}).then((hits:HitsArray<any>)=>{
			let features = props.features.concat(hits.map((hit)=>hit._source));
			this.setState({
				features: features,
				scale: new Scale({
					features: features,
					size: this.width,
					margin: 100,
					filter: ['exon','enhancer']
				}),
			})
		})
		/*
		this.elastic.searchTemplate({
			"index": "variant_v1.4",
			"body": {
				"id": "locrange",
				"params": {
					"start": this.state.scale.domain[0],
					"end": this.state.scale.domain[1],
					"srcfeature": props.features[0].srcfeature,
				}
			},
		}).then((json:any)=>{console.log(json)})
		*/
	}
	onMouseMove = (e: React.MouseEvent)=>{
		if(!this.handlingMouseMove) {
			let pageX = e.pageX;
			requestAnimationFrame(()=>{this.handleMouseMove(pageX)});
		}
		this.handlingMouseMove = true;
	}
	onMouseLeave = (e: React.MouseEvent)=>{
		this.setState({
			focus: -1,
		});
	}
	handleMouseMove = (pageX: number)=>{
		const offsetLeft = this.child.navigation.offsetLeft;
		const offsetWidth = this.child.navigation.offsetWidth;
		const coordX = (pageX - offsetLeft)/offsetWidth * (this.viewWidth) - this.marginX;
		this.setState({
			focus: this.state.scale.invert(coordX),
		}, ()=>{this.handlingMouseMove=false});
	}
	selectRegion = (region: number[])=>{
		if (this.state.selectedRegion && region[0] == this.state.selectedRegion[0]) {
			this.setState({selectedRegion: null})
		} else {
			this.setState({selectedRegion: region})
		}
	}
	renderGenome = (features: Feature[], height: number, dnaHeight: number, strandHeight: number)=>{
		const minY = -height/2;
		const marginY = dnaHeight/4;
		const minX = 0 - this.marginX;
		const dnaY = -dnaHeight/2;
		const fontSize = dnaHeight/2.5;
		const shape = {
			dnaY: dnaY,
			dnaHeight: dnaHeight,
			strandHeight: strandHeight,
			intronHeight: strandHeight/2,
			plusStrandY: dnaY,
			minusStrandY: dnaY+dnaHeight-strandHeight,
			minWidth: this.width/1000,
		};
		const region = this.state.scale.region(this.state.focus);
		const draw_region = [this.state.scale.get(region[0]),this.state.scale.get(region[1])]
		const draw_region_width = draw_region[1]-draw_region[0]
		const draw_selectedRegion = this.state.selectedRegion?
			[this.state.scale.get(this.state.selectedRegion[0]),this.state.scale.get(this.state.selectedRegion[1])] : null
		const draw_selectedRegion_width = this.state.selectedRegion?
			draw_selectedRegion[1]-draw_selectedRegion[0] : null
		return <svg width="100%" height={height}
		 viewBox={minX+" "+minY+" "+this.viewWidth+" "+height}>
			<rect x="0" y={dnaY}
			 width={this.width} height={dnaHeight}
			 style={{fill:"#8b96a8"}} />
			{ features.map((feature: Feature, idx: number)=>{
				return <GenomeFeature key={idx} scale={this.state.scale} shape={shape} feature={feature} />
			}) }
			{this.state.selectedRegion ?
				<rect x={draw_selectedRegion[0]} y={dnaY}
					width={draw_selectedRegion_width} height={dnaHeight}
					style={{stroke:"#FFFFFF", strokeOpacity:0.5, fill:"#6666FF", fillOpacity:0.2}} />
			: null}
			{draw_region_width? <g>
				<rect onClick={()=>this.selectRegion(region)}
					x={draw_region[0]} y={dnaY}
					width={draw_region_width} height={dnaHeight}
					style={{fill:"#FFFFFF", fillOpacity:0.2}} />
				<text textAnchor="middle" fontSize={fontSize}
					 x={draw_region[0]+draw_region_width/2} y={shape.dnaY-marginY}>
						{region[1]-region[0]} bp
				</text>
			</g>: null}
		</svg>;
	}
	render() {
		const region = this.state.focus > -1 ?
			this.state.scale.region(this.state.focus) :
			this.state.selectedRegion;
		return <div className="geneviewer">
			<div className="geneviewer-navigation"
				ref={ref => this.child.navigation = ref}
				onMouseMove={this.onMouseMove}
				onMouseLeave={this.onMouseLeave} >
				{this.renderGenome(this.state.features,80,35,15)}
			</div>
			{region?this.state.scale.overlap(region[0], region[1]).map((feature: Feature, idx: number)=>{
				return <div key={idx}>
					<span className="geneviewer-title">{feature.name}</span>
					&nbsp;
					<span className="geneviewer-subtitle">{feature.ftype}</span>
					{feature.data?
						this.data_keys.map((key: string, idx: number)=>{
							if(key in feature.data) {
								return <div key={idx}>
									<h2>{key}</h2>
									<Numberline data={feature.data[key]} min={0} max={1}/>
								</div>
							} else {
								return null
							}
						})
					:null}
				</div>;
			}):null}
		</div>
	}
}

export function init(element: Element, elastic: string, dataurl: string) {
	fetch(dataurl).then(response=>response.json()).then((json)=>{
		ReactDOM.render(<GeneViewer
			elastic={elastic}
			features={[json].concat(json.association)}/>, element);
	})
}
