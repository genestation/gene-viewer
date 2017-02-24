"use strict";

import './main.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Scale} from './scale.tsx';

export interface Feature {
	name?: string,
	ftype: string,
	loc?: Location[],
	child?: Feature[],
	data?: Datum[],
}

interface Location {
	start: number,
	end: number,
	strand?: number,
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
	render():JSX.Element {
		let color: string = null;
		switch(this.props.feature.ftype) {
		case 'exon':
			color = '#56876a';
			break;
		case 'CDS':
			color = '#3e53bc';
			break;
		case 'sequence_alteration':
			color = '#e00f24';
			break;
		}
		switch(this.props.feature.ftype) {
		case 'gene':
		case 'mRNA':
			return <g>
				<rect /> //TODO viewport height highlight this.props.feature.loc
				{ this.props.feature.child.map((feature: Feature, idx: number)=>{
					return <GenomeFeature key={idx} onMouseOver={this.props.onMouseOver}
						scale={this.props.scale} shape={this.props.shape} feature={feature}/>
				}) }
			</g>;
		default:
			return <g>
				{this.props.feature.loc?
					this.props.feature.loc.map((loc: Location, idx: number)=>{
						const rectX = this.props.scale.get(loc.start);
						const rectWidth = Math.max(this.props.scale.get(loc.end) - this.props.scale.get(loc.start),
							this.props.shape.minWidth);
						switch(loc.strand) {
						case 1:
							return <rect key={idx} onMouseOver={()=>{this.props.onMouseOver(this.props.feature)}}
								x={rectX} y={this.props.shape.plusStrandY}
								width={rectWidth} height={this.props.shape.strandHeight}
								style={{fill:color}} />
						case -1:
							return <rect key={idx} onMouseOver={()=>{this.props.onMouseOver(this.props.feature)}}
								x={rectX} y={this.props.shape.minusStrandY}
								width={rectWidth} height={this.props.shape.strandHeight}
								style={{fill:color}} />
						default:
							return <rect key={idx} onMouseOver={()=>{this.props.onMouseOver(this.props.feature)}}
								x={rectX} y={this.props.shape.dnaY}
								width={rectWidth} height={this.props.shape.dnaHeight}
								style={{fill:color}} />
						}
					})
				:null}
				{this.props.feature.loc?
					this.props.feature.loc.map((loc: Location, idx: number, array: Location[])=>{
						let r: JSX.Element;
						if(idx > 0) {
							const lastLoc = array[idx-1];
							if(loc.strand == 1 && lastLoc.strand == 1) {
								const startX = this.props.scale.get(lastLoc.end);
								const endX = this.props.scale.get(loc.start);
								const strandY = this.props.shape.plusStrandY
								const midX = (startX + endX)/2;
								const midY = this.props.shape.plusStrandY - this.props.shape.intronHeight;
								r = <path key={idx} onMouseOver={()=>{this.props.onMouseOver(this.props.feature)}}
									d={"M "+startX+" "+strandY
										+" L "+midX+" "+midY
										+" L "+endX+" "+strandY
									} style={{fill: "none", stroke: color, strokeWidth: 0.5}} />
							} else if(loc.strand == -1 && lastLoc.strand == -1) {
								const startX = this.props.scale.get(lastLoc.start);
								const endX = this.props.scale.get(loc.end);
								const strandY = this.props.shape.minusStrandY + this.props.shape.strandHeight;
								const midX = (startX + endX)/2;
								const midY = this.props.shape.minusStrandY + this.props.shape.strandHeight + this.props.shape.intronHeight;
								r = <path key={idx} onMouseOver={()=>{this.props.onMouseOver(this.props.feature)}}
									d={"M "+startX+" "+strandY
										+" L "+midX+" "+midY
										+" L "+endX+" "+strandY
									} style={{fill: "none", stroke: color, strokeWidth: 0.5}} />
							}
						}
						return r;
					})
				:null}
				{this.props.feature.child?
					this.props.feature.child.map((feature: Feature, idx: number)=>{
						return <GenomeFeature key={idx} onMouseOver={this.props.onMouseOver}
							scale={this.props.scale} shape={this.props.shape} feature={feature}/>
					})
				:null}
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
	zoom?: number,
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
		this.scale = new Scale(props.features);
		this.state = {
			viewStart: this.scale.range[0],
			viewEnd: this.scale.range[1],
			zoom: 2000,
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
	start: number, end: number, highlightStart?: number, highlightEnd?: number)=>{
		const width = end - start;
		const minY = -height/2;
		const dnaY = -dnaHeight/2;
		const shape = {
			dnaY: dnaY,
			dnaHeight: dnaHeight,
			strandHeight: strandHeight,
			intronHeight: strandHeight/2,
			plusStrandY: dnaY,
			minusStrandY: dnaY+dnaHeight-strandHeight,
			minWidth: width/1000,
		};
		return <svg width="100%" height="100%"
		 viewBox={"0 "+minY+" "+width+" "+height}
		 preserveAspectRatio="none">
			<rect x="0" y={dnaY}
			 width={width} height={dnaHeight}
			 style={{fill:"#8b96a8"}} />
			{ this.props.features.map((feature: Feature, idx: number)=>{
				return <GenomeFeature key={idx} onMouseOver={this.onMouseOver} scale={this.scale} shape={shape} feature={feature} />
			}) }
			{highlightStart !== undefined && highlightEnd !== undefined?
				<rect x={highlightStart-this.state.viewStart} y={dnaY}
				 width={highlightEnd-highlightStart} height={dnaHeight}
				 style={{fill:"black", opacity: 0.2}} />
			:null}
		</svg>;
	}
	render() {
		const trackStart = Math.min(this.state.viewEnd - this.state.zoom,
			Math.max(this.state.focus - this.state.zoom/2, this.state.viewStart));
		const trackEnd = Math.max(this.state.viewStart + this.state.zoom,
			Math.min(this.state.focus + this.state.zoom/2, this.state.viewEnd));
		// Render
		return <div className="geneviewer">
			<div className="geneviewer-navigation"
				ref={ref => this.child.navigation = ref}
				onClick={this.onClickNavigation} >
				{this.renderGenome(20,10,4,this.state.viewStart,this.state.viewEnd, trackStart, trackEnd)}
			</div>
			<div className="geneviewer-track">
				{this.renderGenome(40,20,8,trackStart,trackEnd)}
			</div>
			{this.state.currFeature?
				<div>
					<h1>{this.state.currFeature.name}</h1>
					<h2>{this.state.currFeature.ftype}</h2>
					{this.state.currFeature.data?
						<table>
						{this.state.currFeature.data.map((datum: Datum)=>{
							return <tr>
								<td>{datum.key}</td>
								<td>{datum.value}</td>
							</tr>
						})}
						</table>
					:null}
				</div>
			:null}
		</div>
	}
}
