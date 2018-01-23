"use strict";

import './main.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ElasticSearch from 'elasticsearch-browser';
import {Scale} from './scale.tsx';
import {SelectFilter, FieldFilter} from './SelectFilter.tsx';
import {GraphSlider, GraphSliderStats} from './GraphSlider.tsx';

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
	selected?: string | boolean,
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
	renderLeaf(opacity: number):JSX.Element {
		if(typeof this.props.feature.start == "number" && typeof this.props.feature.end == "number") {
			const rectX = this.props.scale.get(this.props.feature.start);
			const rectWidth = Math.max(this.props.scale.get(this.props.feature.end) - this.props.scale.get(this.props.feature.start),
				this.props.shape.minWidth);
			switch(this.props.feature.strand) {
			case 1:
				return <rect x={rectX} y={this.props.shape.plusStrandY}
					width={rectWidth} height={this.props.shape.strandHeight}
					style={{fill:this.featureColor(), opacity: opacity}} />
			case -1:
				return <rect x={rectX} y={this.props.shape.minusStrandY}
					width={rectWidth} height={this.props.shape.strandHeight}
					style={{fill:this.featureColor(), opacity: opacity}} />
			default:
				return <rect x={rectX} y={this.props.shape.dnaY}
					width={rectWidth} height={this.props.shape.dnaHeight}
					style={{fill:this.featureColor(), opacity: opacity}} />
			}
		}
	}
	render():JSX.Element {
		let selected = true;
		let childSelected = false;
		if(typeof this.props.selected == 'boolean') {
			selected = this.props.selected;
			childSelected = this.props.selected;
		} else if(typeof this.props.selected == 'string') {
			selected = (this.props.feature.name == this.props.selected);
			childSelected = (this.props.feature.name == this.props.selected);
		}
		const opacity = selected ? (this.props.selected ? 0.8 : 0.6) : 0.1;
		if(this.props.feature.child) {
			return <g>
				<rect />
				{ this.props.feature.child.map((feature: Feature, idx: number)=>{
					return <GenomeFeature key={idx}
						scale={this.props.scale} shape={this.props.shape} feature={feature} selected={childSelected?childSelected:this.props.selected}/>
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
								} style={{fill: "none", opacity: opacity, stroke: this.featureColor(child.ftype), strokeWidth: 1}} />
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
								} style={{fill: "none", opacity: opacity, stroke: this.featureColor(child.ftype), strokeWidth: 1}} />
						}
					} else {
						return null
					}
				})}
			</g>;
		} else {
			return <g>
				{this.renderLeaf(opacity)}
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
function scrollToEnd(client: ElasticSearch.Client, response: ElasticSearch.SearchResponse<any>, limit = Number.POSITIVE_INFINITY): Promise<HitsArray<any>> {
	function recursiveScroll(response: ElasticSearch.SearchResponse<any>, hits: HitsArray<any>): Promise<HitsArray<any>> {
		return client.scroll({
			scrollId: response._scroll_id,
			scroll: "10s",
		}).then((response: ElasticSearch.SearchResponse<any>)=>{
			let length = response.hits.hits.length + hits.length;
			if (length < limit && response.hits.hits.length > 0) {
				return recursiveScroll(response, hits.concat(response.hits.hits));
			} else {
				return hits.concat(response.hits.hits.slice(0,response.hits.hits.length - (length - limit)));
			}
		})
	}
	return recursiveScroll(response, response.hits.hits);
}
function getRangeStats(client: ElasticSearch.Client, index: string, params: {[key: string]: any}): Promise<GraphSliderStats> {
	let stats: GraphSliderStats;
	return client.searchTemplate({
		index: index,
		type: "Homo_sapiens",
		body: {
			id: "range_stats",
			params: params,
		},
	}).then((response: ElasticSearch.SearchResponse<any>)=>{
		stats = response.aggregations.field_stats;
		let numBuckets = 100;
		let interval = (stats.max - stats.min) / numBuckets;

		let x = stats.min + interval
		let last = x
		let i = 0
		let ranges: {from?: number, to?: number}[] = [{to: x}];
		for(i++; i < numBuckets-1; i++) {
			x += interval;
			ranges.push({from: last, to: x});
			last = x
		}
		ranges.push({from: x});
		return client.searchTemplate({
			index: index,
			type: "Homo_sapiens",
			body: {
				id: "range_buckets",
				params: Object.assign(params, {
					ranges: ranges,
				}),
			}
		})
	}).then((response: ElasticSearch.SearchResponse<any>)=>{
		let buckets = response.aggregations.field_buckets.buckets;
		buckets[0].from = stats.min;
		buckets[buckets.length-1].to = stats.max;
		stats.histogram = buckets;
		return stats;
	});
}

export interface GeneViewerProps{
	features: Feature[],
	elastic: string,
	index: Object,
	numericFields: string[],
}
export interface GeneViewerState{
	start?: number,
	end?: number,
	srcfeature?: string,
	name?: string,
	stats?: GraphSliderStats,

	focus?: number,
	selectedRegion?: number[],
	selectedFeature?: string,
	hoverFeature?: string,
	currFeature?: Feature,
	features?: Feature[],
	scale?: Scale,
	filter?: FieldFilter,
}
export class GeneViewer extends React.Component<GeneViewerProps,GeneViewerState> {
	static defaultProps: GeneViewerProps = {
		elastic: "",
		features: [],
		index: {},
		numericFields: [],
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
		let scale = new Scale({
			features: props.features,
			size: this.width,
			margin: 100,
			filter: ['exon','enhancer']
		});
		this.state = {
			start: scale.domain[0],
			end: scale.domain[1],
			srcfeature: props.features[0].srcfeature,
			name: props.features[0].name,
			focus: -1,
			selectedRegion: null,
			selectedFeature: null,
			hoverFeature: null,
			features: props.features,
			scale: scale,
			filter: {
				field: null,
				order: "desc",
				limit: 10,
			},
		}
		this.elastic = new ElasticSearch.Client({
			host: props.elastic,
			apiVersion: '5.6',
		});
		this.fetchSnps();
	}
	fetchSnps = ()=>{
		let searchBody = {};
		let limit: undefined | number = undefined;
		if(this.props.numericFields.indexOf(this.state.filter.field) != -1) {
			searchBody = {
				"id": "sorted_locrange",
				"params": {
					"field": 'data.'+this.state.filter.field,
					"order": this.state.filter.order,
					"mode": "avg",
					"start": this.state.start,
					"end": this.state.end,
					"srcfeature": this.state.srcfeature,
				}
			};
			limit = this.state.filter.limit;
		} else {
			searchBody = {
				"id": "gene_association",
				"params": {
					"gene": this.state.name,
				}
			}
		}
		// Fetch SNPs
		this.elastic.searchTemplate({
			"index": "variant_v1.4",
			"type": "Homo_sapiens",
			"body": searchBody,
			"scroll": "10s",
		}).then((response:ElasticSearch.SearchResponse<any>)=>{
			return scrollToEnd(this.elastic, response, limit)
		}).then((hits:HitsArray<any>)=>{
			let features = this.props.features.concat(hits.map((hit)=>hit._source));
			let scale = new Scale({
				features: features,
				size: this.width,
				margin: 100,
				filter: ['exon','enhancer']
			});
			this.setState({
				features: features,
				scale: scale,
			});
			if(this.state.filter.field) {
				return getRangeStats(this.elastic, "variant_v1.4", {
					field: 'data.'+this.state.filter.field,
					start: scale.domain[0],
					end: scale.domain[1],
					srcfeature: this.state.srcfeature,
				}).then((stats: GraphSliderStats)=>{
					this.setState({stats: stats});
				});
			}
		});
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
			this.setState({
				selectedRegion: null,
				selectedFeature: null,
			})
		} else {
			this.setState({
				selectedRegion: region,
				selectedFeature: null,
			})
		}
	}
	selectFeature = (feature: string)=>{
		if (this.state.selectedFeature && feature == this.state.selectedFeature) {
			this.setState({selectedFeature: null})
		} else {
			this.setState({selectedFeature: feature})
		}
	}
	onHoverFeature = (feature?: string)=>{
		if(!this.handlingMouseMove) {
			requestAnimationFrame(()=>{this.handleHoverFeature(feature)});
		}
		this.handlingMouseMove = true;
	}
	handleHoverFeature = (feature?: string)=>{
		if (!feature) {
			this.setState({
				hoverFeature: null,
			}, ()=>{this.handlingMouseMove=false});
		} else {
			this.setState({
				hoverFeature: feature,
			}, ()=>{this.handlingMouseMove=false});
		}
	}
	handleChangeFilter = (filter?: FieldFilter)=>{
		this.setState({
			filter: filter
		}, this.fetchSnps);
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
			minWidth: this.width/800,
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
				return <GenomeFeature key={idx} scale={this.state.scale} shape={shape} feature={feature}
					selected={this.state.hoverFeature?this.state.hoverFeature:this.state.selectedFeature}
				/>
			}) }
			{this.state.selectedRegion && !this.state.selectedFeature ?
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
	renderData = (feature: Feature, idx: number)=>{
		return <div key={idx}>
			<div onMouseMove={()=>{this.onHoverFeature(feature.name)}}
				onMouseLeave={()=>{this.onHoverFeature()}}
				onClick={()=>this.selectFeature(feature.name)}>
				<span className="geneviewer-title">{feature.name}</span>
				&nbsp;
				<span className="geneviewer-subtitle">{feature.ftype}</span>
			</div>
			{feature.data && feature.data.gwas?
				feature.data.gwas.map((gwas, idx: number)=>{
					return <div key={idx}>
						<span className="geneviewer-header1">{gwas.description}</span><br/>
						<a target="_blank" href={"http://"+gwas["pub.url"]}>{gwas["pub.author"]}. {gwas["pub.study"]} {gwas["pub.journal"]}. {gwas["pub.date"]}</a><br/>
						<b>pvalue:</b>&nbsp;{gwas.pval} {gwas.pval_text}<br/>
						<b>-log(pvalue):</b>&nbsp;{gwas.pval_mlog}<br/>
						<b>effect size:</b>&nbsp;{gwas.effect_size}<br/>
					</div>
				})
			:null}
		</div>;
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
			<SelectFilter value={this.state.filter} onChange={this.handleChangeFilter} fields={this.props.numericFields}/>
			<GraphSlider stats={this.state.stats} />
			{region? // Region features
				<div style={{height: "20em", paddingRight: "1em", overflow: "auto"}}> {
					this.state.scale.overlap(region[0], region[1]).filter((feature: Feature)=>
						this.state.focus != -1 || !this.state.selectedFeature || this.state.selectedFeature == feature.name
					).map(this.renderData)
				} </div>
				: // All features
				<div style={{height: "20em", paddingRight: "1em", overflow: "auto"}}> {
					this.state.features.filter((feature: Feature)=>
						this.state.focus != -1 || !this.state.selectedFeature || this.state.selectedFeature == feature.name
					).map(this.renderData)
				} </div>
			}
		</div>
	}
}

export function init(element: Element, elastic: string, dataurl: string) {
	fetch(dataurl).then(response=>response.json()).then((json)=>{
		ReactDOM.render(<GeneViewer
			features={[json].concat(json.association)}
			elastic={elastic}
			index={{gene: "geneviewer", variant: "variant_v1.4"}}
			numericFields={[
				"fst.afr",
				"fst.amr",
				"fst.eas",
				"fst.eur",
				"fst.sas",
				"fst.afr_amr",
				"fst.afr_eas",
				"fst.afr_eur",
				"fst.afr_sas",
				"fst.amr_eas",
				"fst.amr_eur",
				"fst.amr_sas",
				"fst.eas_eur",
				"fst.eas_sas",
				"fst.eur_sas",
				"pi.all",
				"pi.afr",
				"pi.amr",
				"pi.eas",
				"pi.eur",
				"pi.sas",
				"hwe.pval.all",
				"hwe.pval.afr",
				"hwe.pval.amr",
				"hwe.pval.eas",
				"hwe.pval.eur",
				"hwe.pval.sas",
				"hwe.chisq.all",
				"hwe.chisq.afr",
				"hwe.chisq.amr",
				"hwe.chisq.eas",
				"hwe.chisq.eur",
				"hwe.chisq.sas",
				"hwe.p_het_deficit.all",
				"hwe.p_het_deficit.afr",
				"hwe.p_het_deficit.amr",
				"hwe.p_het_deficit.eas",
				"hwe.p_het_deficit.eur",
				"hwe.p_het_deficit.sas",
				"hwe.p_het_excess.all",
				"hwe.p_het_excess.afr",
				"hwe.p_het_excess.amr",
				"hwe.p_het_excess.eur",
				"hwe.p_het_excess.eas",
				"hwe.p_het_excess.sas",
			]}
		/>, element);
	})
}
