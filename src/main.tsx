"use strict";

import './main.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Scale} from './scale.tsx';

export interface Feature {
	name?: string,
	ftype?: string,
	start?: number,
	end?: number,
	strand?: number,
	child?: Feature[],
	data?: Datum[],
}

interface Datum {
	key: string,
	value: any,
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
	onMouseOver: (feature: Feature)=>any,
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
				return <rect onMouseOver={()=>{this.props.onMouseOver(this.props.feature)}}
					x={rectX} y={this.props.shape.plusStrandY}
					width={rectWidth} height={this.props.shape.strandHeight}
					style={{fill:this.featureColor(), opacity: 0.6}} />
			case -1:
				return <rect onMouseOver={()=>{this.props.onMouseOver(this.props.feature)}}
					x={rectX} y={this.props.shape.minusStrandY}
					width={rectWidth} height={this.props.shape.strandHeight}
					style={{fill:this.featureColor(), opacity: 0.6}} />
			default:
				return <rect onMouseOver={()=>{this.props.onMouseOver(this.props.feature)}}
					x={rectX} y={this.props.shape.dnaY}
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
					return <GenomeFeature key={idx} onMouseOver={this.props.onMouseOver}
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
							return <path key={idx} onMouseOver={()=>{this.props.onMouseOver(this.props.feature)}}
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
							return <path key={idx} onMouseOver={()=>{this.props.onMouseOver(this.props.feature)}}
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
	features: Feature[],
}
export interface GeneViewerState{
	viewStart?: number,
	viewEnd?: number,
	focus?: number,
	width?: number,
	currFeature?: Feature,
}
export class GeneViewer extends React.Component<GeneViewerProps,GeneViewerState> {
	static defaultProps: GeneViewerProps = {
		features: [],
	}
	child: {
		navigation?: HTMLElement;
	} = {};
	handlingMouseOver: boolean = false;
	scale: Scale = null;
	constructor(props: GeneViewerProps) {
		super(props);
		const width = 1000;
		this.scale = new Scale(props.features, width);
		this.state = {
			viewStart: this.scale.range[0],
			viewEnd: this.scale.range[1],
			width: width,
			focus: this.scale.range[0],
		}
	}
	onClickNavigation = (e: React.MouseEvent)=>{
		const width = this.child.navigation.getBoundingClientRect().width;
		const offsetLeft = this.child.navigation.offsetLeft;
		const clickX = e.pageX;
		const percentX = (clickX - offsetLeft)/width;
		const coordX = percentX * (this.state.viewEnd - this.state.viewStart);
		this.setState({
			focus: this.scale.invert(coordX),
		});
	}
	onMouseOver = (feature: Feature)=>{
		if(!this.handlingMouseOver) {
			requestAnimationFrame(()=>{this.handleMouseOver(feature)});
		}
		this.handlingMouseOver = true;
	}
	handleMouseOver = (feature: Feature)=>{
		this.setState({
			currFeature: feature,
		}, ()=>{this.handlingMouseOver=false});
	}
	renderGenome = (height: number, dnaHeight: number, strandHeight: number,
	start: number, end: number)=>{
		const minY = -height/2;
		const dnaY = -dnaHeight/2;
		const shape = {
			dnaY: dnaY,
			dnaHeight: dnaHeight,
			strandHeight: strandHeight,
			intronHeight: strandHeight/2,
			plusStrandY: dnaY,
			minusStrandY: dnaY+dnaHeight-strandHeight,
			minWidth: this.state.width/1000,
		};
		return <svg width="100%" height="100%"
		 viewBox={"0 "+minY+" "+this.state.width+" "+height}>
			<rect x="0" y={dnaY}
			 width={this.state.width} height={dnaHeight}
			 style={{fill:"#8b96a8"}} />
			{ this.props.features.map((feature: Feature, idx: number)=>{
				return <GenomeFeature key={idx} onMouseOver={this.onMouseOver} scale={this.scale} shape={shape} feature={feature} />
			}) }
		</svg>;
	}
	render() {
		return <div className="geneviewer">
			<div className="geneviewer-navigation"
				ref={ref => this.child.navigation = ref}
				onClick={this.onClickNavigation} >
				{this.renderGenome(60,30,12,this.state.viewStart,this.state.viewEnd)}
			</div>
			{this.state.currFeature?
				<div>
					<span className="geneviewer-title">{this.state.currFeature.name}</span>
					&nbsp;
					<span className="geneviewer-subtitle">{this.state.currFeature.ftype}</span>
					{this.state.currFeature.data?
						<table>
							<tbody>
							{this.state.currFeature.data.map((datum: Datum, idx: number)=>{
								return <tr key={idx}>
									<td>{datum.key}</td>
									<td>{datum.value}</td>
								</tr>
							})}
							</tbody>
						</table>
					:null}
				</div>
			:null}
		</div>
	}
}

export function init(element: Element, dataurl: string) {
	fetch(dataurl).then(response=>response.json()).then((json)=>{
		ReactDOM.render(<GeneViewer
			features={[json.gene].concat(json.neighbors)}/>, element);
	})
}
