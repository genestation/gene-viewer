"use strict";

import './main.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ElasticSearch from 'elasticsearch-browser';
import {Scale} from './scale.tsx';
import {SelectControl, Controls} from './SelectControl.tsx';
import {Histogram, HistogramStats, HistogramBucket, makeHistogramBuckets, readHistogramBuckets} from './Histogram.tsx';

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

function getFeatureData(feature: Feature, key: string): any {
	if(typeof key != "string") {
		return undefined;
	}
	let path = key.split('.');
	let ptr: any = feature.data;
	while(path.length && ptr !== undefined) {
		if(ptr.hasOwnProperty(path[0])) {
			ptr = ptr[path.shift()];
		} else if (path.length > 1) {
			path.splice(0,2,path[0]+'.'+path[1]);
		} else {
			ptr = undefined;
			break;
		}
	}
	return ptr;
};

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
function getRangeStats(client: ElasticSearch.Client, index: string, params: {[key: string]: any}): Promise<HistogramStats[]> {
	let stats: HistogramStats[] = [];
	return client.searchTemplate({
		index: index,
		type: "Homo_sapiens",
		body: {
			id: "field_stats",
			params: {field: params.field},
		},
	}).then((response: ElasticSearch.SearchResponse<any>)=>{
		stats[0] = response.aggregations.field_stats;
		stats[0].histogram = makeHistogramBuckets(response.aggregations.field_stats, 100);
		stats[1] = {
			histogram: makeHistogramBuckets(response.aggregations.field_stats, 100),
		};
		stats[0].percentiles = response.aggregations.field_percentiles.values;
		return client.searchTemplate({
			index: index,
			type: "Homo_sapiens",
			body: {
				id: "field_buckets",
				params: {
					field: params.field,
					ranges: stats[0].histogram,
				},
			}
		})
	}).then((response: ElasticSearch.SearchResponse<any>)=>{
		readHistogramBuckets(stats[0], response.aggregations.field_buckets.buckets);
		return client.searchTemplate({
			index: index,
			type: "Homo_sapiens",
			body: {
				id: "range_stats",
				params: params,
			},
		})
	}).then((response: ElasticSearch.SearchResponse<any>)=>{
		stats[1].max = response.aggregations.field_stats.max;
		stats[1].min = response.aggregations.field_stats.min;
		stats[1].percentiles = response.aggregations.field_percentiles.values;
		return client.searchTemplate({
			index: index,
			type: "Homo_sapiens",
			body: {
				id: "range_buckets",
				params: Object.assign(params, {
					ranges: stats[1].histogram,
				}),
			}
		})
	}).then((response: ElasticSearch.SearchResponse<any>)=>{
		readHistogramBuckets(stats[1], response.aggregations.field_buckets.buckets);
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
	stats?: HistogramStats[],

	focus?: number,
	selectedRegion?: number[],
	selectedFeature?: string,
	hoverBucket?: HistogramBucket[],
	clickBucket?: HistogramBucket[],
	hoverFeature?: string,
	currFeature?: Feature,
	features?: Feature[],
	scale?: Scale,
	control?: Controls,
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
	elastic: ElasticSearch.Client;
	margin = {top: 20, right: 20, bottom: 10, left: 20};
	padding = {top: 8, right: 0, bottom: 0, left: 0};
	width = 1000;
	dnaHeight = 35;
	strandHeight = 15;
	viewHeight = this.dnaHeight + this.margin.top + this.margin.bottom;
	viewWidth = this.width + this.margin.right + this.margin.left;
	minY = -this.dnaHeight/2 - this.margin.top;
	minX = 0 - this.margin.left;
	dnaY = -this.dnaHeight/2;
	fontSize = this.dnaHeight/2.5;
	shape = {
		dnaY: this.dnaY,
		dnaHeight: this.dnaHeight,
		strandHeight: this.strandHeight,
		intronHeight: this.strandHeight/2,
		plusStrandY: this.dnaY,
		minusStrandY: this.dnaY+this.dnaHeight-this.strandHeight,
		minWidth: this.width/800,
	};
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
			control: {
				view: null,
				filter: null,
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
		if(this.props.numericFields.indexOf(this.state.control.filter) != -1) {
			searchBody = {
				"id": "sorted_locrange",
				"params": {
					"field": 'data.'+this.state.control.filter,
					"order": this.state.control.order,
					"mode": "avg",
					"start": this.state.start,
					"end": this.state.end,
					"srcfeature": this.state.srcfeature,
				}
			};
			limit = this.state.control.limit;
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
			if(this.state.control.view || this.state.control.filter) {
				return getRangeStats(this.elastic, "variant_v1.4", {
					field: 'data.'+(this.state.control.view?this.state.control.view:this.state.control.filter),
					start: scale.domain[0],
					end: scale.domain[1],
					srcfeature: this.state.srcfeature,
				}).then((stats: HistogramStats[])=>{
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
		const coordX = (pageX - offsetLeft)/offsetWidth * (this.viewWidth) - this.margin.left;
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
	handleChangeControl = (control?: Controls)=>{
		this.setState({
			control: control
			stats: null,
		}, this.fetchSnps);
	}
	handleHoverBucket = (bucket?: HistogramBucket[])=>{
		this.setState({
			hoverBucket: bucket
		});
	}
	handleClickBucket = (bucket?: HistogramBucket[])=>{
		this.setState({
			clickBucket: bucket
		});
	}
	renderGenome = (features: Feature[])=>{
		const region = this.state.scale.region(this.state.focus);
		const draw_region = [this.state.scale.get(region[0]),this.state.scale.get(region[1])]
		const draw_region_width = draw_region[1]-draw_region[0]
		const draw_selectedRegion = this.state.selectedRegion?
			[this.state.scale.get(this.state.selectedRegion[0]),this.state.scale.get(this.state.selectedRegion[1])] : null
		const draw_selectedRegion_width = this.state.selectedRegion?
			draw_selectedRegion[1]-draw_selectedRegion[0] : null
		return <svg width="100%" height={this.viewHeight}
		 viewBox={this.minX+" "+this.minY+" "+this.viewWidth+" "+this.viewHeight}>
			<rect x="0" y={this.dnaY}
			 width={this.width} height={this.dnaHeight}
			 style={{fill:"#8b96a8"}} />
			{ features.map((feature: Feature, idx: number)=>{
				return <GenomeFeature key={idx} scale={this.state.scale} shape={this.shape} feature={feature}
					selected={this.state.hoverFeature?this.state.hoverFeature:this.state.selectedFeature}
				/>
			}) }
			{this.state.selectedRegion && !this.state.selectedFeature ?
				<rect x={draw_selectedRegion[0]} y={this.dnaY}
					width={draw_selectedRegion_width} height={this.dnaHeight}
					style={{stroke:"#FFFFFF", strokeOpacity:0.5, fill:"#6666FF", fillOpacity:0.2}} />
			: null}
			{draw_region_width? <g>
				<rect onClick={()=>this.selectRegion(region)}
					x={draw_region[0]} y={this.dnaY}
					width={draw_region_width} height={this.dnaHeight}
					style={{fill:"#FFFFFF", fillOpacity:0.2}} />
				<text textAnchor="middle" fontSize={this.fontSize}
					 x={draw_region[0]+draw_region_width/2} y={this.dnaY-this.padding.top}>
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
		let features = this.state.features.filter((feature: Feature)=>
			this.state.focus != -1 || !this.state.selectedFeature || this.state.selectedFeature == feature.name
		)
		if(region) {
			features = this.state.scale.overlap(region[0], region[1]).filter((feature: Feature)=>
				this.state.focus != -1 || !this.state.selectedFeature || this.state.selectedFeature == feature.name
			)
		}
		let histItems = features.map((feature: Feature)=>{
			return {
				x: getFeatureData(feature,
					(this.state.control.view?this.state.control.view:this.state.control.filter)),
				data: feature,
			};
		}).filter((item: {x:any, data: Feature})=>{
			return typeof item.x == "number"
				&& (!this.state.selectedFeature || this.state.selectedFeature == item.data.name)
				&& (!this.state.hoverFeature || this.state.hoverFeature == item.data.name)
		});
		if(this.state.hoverBucket || this.state.clickBucket) {
			features = features.filter((feature: Feature)=>{
				const x = getFeatureData(feature,
					(this.state.control.view?this.state.control.view:this.state.control.filter));
				if(this.state.hoverBucket) {
					return this.state.hoverBucket.reduce((found: boolean, curr: HistogramBucket)=>
						found || x >= curr.from && x <= curr.to, false)
				} else {
					return this.state.clickBucket.reduce((found: boolean, curr: HistogramBucket)=>
						found || x >= curr.from && x <= curr.to, false)
				}
			})
		}
		return <div className="geneviewer">
			<div className="geneviewer-navigation"
				style={{height: this.viewHeight+"px"}}
				ref={ref => this.child.navigation = ref}
				onMouseMove={this.onMouseMove}
				onMouseLeave={this.onMouseLeave} >
				{this.renderGenome(this.state.features)}
			</div>
			<div className="geneviewer-controls">
				<Histogram value={this.state.clickBucket} items={histItems} stats={this.state.stats}
					onHover={this.handleHoverBucket} onClick={this.handleClickBucket} />
				<SelectControl value={this.state.control} onChange={this.handleChangeControl} fields={this.props.numericFields}/>
			</div>
			<div className="geneviewer-data"> {
				features.map(this.renderData)
			} </div>
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
