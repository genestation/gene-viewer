"use strict";

import './main.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ElasticSearch} from './ElasticSearch.tsx';
import {Scale} from './scale.tsx';
import {Numberline} from './Numberline.tsx';

export interface Feature {
	name?: string,
	ftype?: string,
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

export interface GeneViewerProps{
	elastic: string,
	features: Feature[],
}
export interface GeneViewerState{
	focus?: number,
	currFeature?: Feature,
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
	scale: Scale = null;
	width = 1000;
	data_keys = ['fst','nucleotide_diversity','heterozygote_deficiency','heterozygote_excess','hardy_weinburg'];
	elastic: (path?: string, body?: any) => Promise<Response>;
	constructor(props: GeneViewerProps) {
		super(props);
		this.scale = new Scale({
			features: props.features,
			size: this.width,
			margin: 10000,
			filter: ['exon','enhancer']
		});
		this.state = {
			focus: 0,
		}
		this.elastic = ElasticSearch(props.elastic);
		// Fetch SNPs
		this.elastic("variant_v1.3/Homo_sapiens/_search/templates", {
			"id": "locrange",
			"params": {
				"start": this.scale.domain[0],
				"end": this.scale.domain[1]
			}
		}).then((json)=>{console.log(json)})
	}
	onMouseMove = (e: React.MouseEvent)=>{
		// TEMP remove
		return
		// END TEMP
		if(!this.handlingMouseMove) {
			let pageX = e.pageX;
			requestAnimationFrame(()=>{this.handleMouseMove(pageX)});
		}
		this.handlingMouseMove = true;
	}
	handleMouseMove = (pageX: number)=>{
		const offsetLeft = this.child.navigation.offsetLeft;
		const offsetWidth = this.child.navigation.offsetWidth;
		const coordX = (pageX - offsetLeft)/offsetWidth * this.width;
		this.setState({
			focus: this.scale.invert(coordX),
		}, ()=>{this.handlingMouseMove=false});
	}
	renderGenome = (features: Feature[], height: number, dnaHeight: number, strandHeight: number)=>{
		const minY = -height/2;
		const dnaY = -dnaHeight/2;
		const shape = {
			dnaY: dnaY,
			dnaHeight: dnaHeight,
			strandHeight: strandHeight,
			intronHeight: strandHeight/2,
			plusStrandY: dnaY,
			minusStrandY: dnaY+dnaHeight-strandHeight,
			minWidth: this.width/1000,
		};
		return <svg width="100%" height="100%"
		 viewBox={"0 "+minY+" "+this.width+" "+height}>
			<rect x="0" y={dnaY}
			 width={this.width} height={dnaHeight}
			 style={{fill:"#8b96a8"}} />
			{ features.map((feature: Feature, idx: number)=>{
				return <GenomeFeature key={idx} scale={this.scale} shape={shape} feature={feature} />
			}) }
		</svg>;
	}
	render() {
		const tolerance = 50;
		return <div className="geneviewer">
			<div className="geneviewer-navigation"
				ref={ref => this.child.navigation = ref}
				onMouseMove={this.onMouseMove} >
				{this.renderGenome(this.props.features,60,30,12)}
			</div>
			{this.scale.overlap(this.state.focus-tolerance, this.state.focus+tolerance).map((feature: Feature, idx: number)=>{
				return <div key={idx}>
					<span className="geneviewer-title">{feature.name}</span>
					&nbsp;
					<span className="geneviewer-subtitle">{feature.ftype}</span>
					{this.renderGenome([feature],60,30,12)}
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
			})}
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
