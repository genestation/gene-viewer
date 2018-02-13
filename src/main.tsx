"use strict";

import './main.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ElasticSearch from 'elasticsearch-browser';
import {GenomeFeatureObject, GenomeFeature, getFeatureData} from './GenomeFeature.tsx';
import {Scale} from './scale.tsx';
import {SelectControl, Controls} from './SelectControl.tsx';
import {Histogram, HistogramStats, HistogramBucket, makeHistogramBuckets, readHistogramBuckets} from './Histogram.tsx';


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
		stats[0].histogram = readHistogramBuckets(stats[0], response.aggregations.field_buckets.buckets);
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
		stats[1].histogram = readHistogramBuckets(stats[0], response.aggregations.field_buckets.buckets);
		return stats;
	});
}

export interface GeneViewerProps{
	features: GenomeFeatureObject[],
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

	currFeature?: GenomeFeatureObject,
	features?: GenomeFeatureObject[],
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
			features: props.features,
			scale: scale,
			control: {
				view: null,
				filter: null,
				order: "desc",
				limit: 10,
				hoverRegion: null,
				clickRegion: null,
				hoverFeature: null,
				clickFeature: null,
				hoverBucket: null,
				clickBucket: null,
			},
		}
		this.elastic = new ElasticSearch.Client({
			host: props.elastic,
			apiVersion: '5.6',
		});
		this.fetchStats();
	}
	fetchStats = ()=>{
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
				let data_field = this.state.control.view?this.state.control.view:this.state.control.filter;
				const region = this.state.control.hoverRegion ? this.state.control.hoverRegion :
					this.state.control.clickRegion ? this.state.control.clickRegion :
						[scale.domain[0], scale.domain[1]];
				return getRangeStats(this.elastic, "variant_v1.4", {
					field: "data."+data_field,
					start: region[0],
					end: region[1],
					srcfeature: this.state.srcfeature,
				}).then((stats: HistogramStats[])=>{
					this.setState({stats: stats});
				}).then(()=>{
					return this.elastic.searchTemplate({
						index: "variant_v1.4",
						type: "Homo_sapiens",
						body: {
							id: "filtered_range_query",
							params: {
								field: "data."+data_field,
								start: region[0],
								end: region[1],
								srcfeature: this.state.srcfeature,
							}
						},
						scroll: "10s",
					});
				}).then((response:ElasticSearch.SearchResponse<any>)=>{
					return scrollToEnd(this.elastic, response, limit)
				}).then((hits: HitsArray<any>)=>{
					let values = hits.map((hit)=>getFeatureData(hit._source, data_field));
					let unique = Array.from(new Set(values));
					console.log(unique)
					console.log(unique[0] == unique[1]);
					//let features = hits.map((hit)=>hit._source);
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
	setControlState = (control: Controls, callback?: ()=>void)=>{
		this.setState({
			control: {
				...this.state.control,
				...control,
			}
		}, callback);
	}
	onMouseMove = (e: React.MouseEvent)=>{
		if(!this.handlingMouseMove) {
			let pageX = e.pageX;
			requestAnimationFrame(()=>{this.handleMouseMove(pageX)});
		}
		this.handlingMouseMove = true;
	}
	onMouseLeave = (e: React.MouseEvent)=>{
		this.setControlState({
			hoverRegion: null,
		}, this.fetchStats);
	}
	handleMouseMove = (pageX: number)=>{
		const offsetLeft = this.child.navigation.offsetLeft;
		const offsetWidth = this.child.navigation.offsetWidth;
		const coordX = (pageX - offsetLeft)/offsetWidth * (this.viewWidth) - this.margin.left;
		this.setControlState({
			hoverRegion: this.state.scale.region(this.state.scale.invert(coordX)),
		}, ()=>{this.handlingMouseMove=false; this.fetchStats()});
	}
	clickRegion = (region: number[])=>{
		if (this.state.control.clickRegion && region[0] == this.state.control.clickRegion[0]) {
			this.setControlState({
				clickRegion: null,
				clickFeature: null,
			})
		} else {
			this.setControlState({
				clickRegion: region,
				clickFeature: null,
			})
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
			this.setControlState({
				hoverFeature: null,
			}, ()=>{this.handlingMouseMove=false});
		} else {
			this.setControlState({
				hoverFeature: feature,
			}, ()=>{this.handlingMouseMove=false});
		}
	}
	clickFeature = (feature: string)=>{
		if (this.state.control.clickFeature && feature == this.state.control.clickFeature) {
			this.setControlState({clickFeature: null})
		} else {
			this.setControlState({clickFeature: feature})
		}
	}
	handleHoverBucket = (bucket?: HistogramBucket[])=>{
		this.setControlState({
			hoverBucket: bucket
		});
	}
	handleClickBucket = (bucket?: HistogramBucket[])=>{
		this.setControlState({
			clickBucket: bucket
		});
	}
	handleChangeControl = (control?: Controls)=>{
		if(this.state.control.view != control.view
			|| this.state.control.filter != control.filter
			|| this.state.control.limit != control.limit
			|| this.state.control.region != control.region) {
			this.setState({
				control: control,
				stats: null,
			}, this.fetchStats);
		} else {
			this.setState({
				control: control,
			});
		}
	}
	renderGenome = (features: GenomeFeatureObject[])=>{
		const draw_hoverRegion = this.state.control.hoverRegion?
			[this.state.scale.get(this.state.control.hoverRegion[0]),
				this.state.scale.get(this.state.control.hoverRegion[1])]
			: null ;
		const draw_hoverRegion_width = this.state.control.hoverRegion?
			draw_hoverRegion[1]-draw_hoverRegion[0] : null ;
		const draw_clickRegion = this.state.control.clickRegion?
			[this.state.scale.get(this.state.control.clickRegion[0]),
				this.state.scale.get(this.state.control.clickRegion[1])]
			: null;
		const draw_clickRegion_width = this.state.control.clickRegion?
			draw_clickRegion[1]-draw_clickRegion[0] : null ;
		return <svg width="100%" height={this.viewHeight}
		 viewBox={this.minX+" "+this.minY+" "+this.viewWidth+" "+this.viewHeight}>
			<rect x="0" y={this.dnaY}
			 width={this.width} height={this.dnaHeight}
			 style={{fill:"#8b96a8"}} />
			{ features.map((feature: GenomeFeatureObject, idx: number)=>{
				return <GenomeFeature key={idx} scale={this.state.scale} shape={this.shape} feature={feature}
					selected={this.state.control.hoverFeature?
						this.state.control.hoverFeature:this.state.control.clickFeature}
				/>
			}) }
			{this.state.control.clickRegion && !this.state.control.clickFeature ?
				<rect x={draw_clickRegion[0]} y={this.dnaY}
					width={draw_clickRegion_width} height={this.dnaHeight}
					style={{stroke:"#FFFFFF", strokeOpacity:0.5, fill:"#6666FF", fillOpacity:0.2}} />
			: null}
			{this.state.control.hoverRegion ? <g>
				<rect onClick={()=>this.clickRegion(this.state.control.hoverRegion)}
					x={draw_hoverRegion[0]} y={this.dnaY}
					width={draw_hoverRegion_width} height={this.dnaHeight}
					style={{fill:"#FFFFFF", fillOpacity:0.2}} />
				<text textAnchor="middle" fontSize={this.fontSize}
					 x={draw_hoverRegion[0]+draw_hoverRegion_width/2} y={this.dnaY-this.padding.top}>
						{this.state.control.hoverRegion[1]-this.state.control.hoverRegion[0]} bp
				</text>
			</g>: null}
		</svg>;
	}
	renderData = (feature: GenomeFeatureObject, idx: number)=>{
		return <div key={idx}>
			<div onMouseMove={()=>{this.onHoverFeature(feature.name)}}
				onMouseLeave={()=>{this.onHoverFeature()}}
				onClick={()=>this.clickFeature(feature.name)}>
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
		const region = this.state.control.hoverRegion ?
			this.state.control.hoverRegion : this.state.control.clickRegion;
		const focusFeature = this.state.control.hoverFeature ?
			this.state.control.hoverFeature : this.state.control.clickFeature;
		let features = this.state.features.filter((feature: GenomeFeatureObject)=>
			this.state.control.hoverRegion
			|| !this.state.control.clickFeature
			|| this.state.control.clickFeature == feature.name
		)
		if(region) {
			features = this.state.scale.overlap(region[0], region[1]).filter((feature: GenomeFeatureObject)=>
				this.state.control.hoverRegion
				|| !this.state.control.clickFeature
				|| this.state.control.clickFeature == feature.name
			)
		}
		let histItems = features.map((feature: GenomeFeatureObject)=>{
			return {
				x: getFeatureData(feature,
					(this.state.control.view?this.state.control.view:this.state.control.filter)),
				data: feature,
			};
		}).filter((item: {x:any, data: GenomeFeatureObject})=>{
			return typeof item.x == "number" && (!focusFeature || focusFeature == item.data.name)
		});
		if(this.state.control.hoverBucket || this.state.control.clickBucket) {
			features = features.filter((feature: GenomeFeatureObject)=>{
				const x = getFeatureData(feature,
					(this.state.control.view?this.state.control.view:this.state.control.filter));
				if(this.state.control.hoverBucket) {
					return this.state.control.hoverBucket.reduce((found: boolean, curr: HistogramBucket)=>
						found || x >= curr.from && x <= curr.to, false)
				} else {
					return this.state.control.clickBucket.reduce((found: boolean, curr: HistogramBucket)=>
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
				<Histogram value={this.state.control.clickBucket} items={histItems} stats={this.state.stats}
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
