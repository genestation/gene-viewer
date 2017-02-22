"use strict";

import './main.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as scale from 'd3-scale';

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
	viewStart: number,
	dnaY: number,
	dnaHeight: number,
	strandHeight: number,
	plusStrandY: number,
	minusStrandY: number,
	minWidth: number,
}

interface GenomeFeatureProps {
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
					return <GenomeFeature key={idx} shape={this.props.shape} feature={feature}/>
				}) }
			</g>;
		default:
			return <g>
				{this.props.feature.loc?
					this.props.feature.loc.map((loc: Location, idx: number)=>{
						const rectX = loc.start - this.props.shape.viewStart;
						const rectWidth = Math.max(loc.end - loc.start, this.props.shape.minWidth);
						switch(loc.strand) {
						case 1:
							return <rect key={idx} x={rectX} y={this.props.shape.plusStrandY}
								width={rectWidth} height={this.props.shape.strandHeight}
								style={{fill:color}} />
						case -1:
							return <rect key={idx} x={rectX} y={this.props.shape.minusStrandY}
								width={rectWidth} height={this.props.shape.strandHeight}
								style={{fill:color}} />
						default:
							return <rect key={idx} x={rectX} y={this.props.shape.dnaY}
								width={rectWidth} height={this.props.shape.dnaHeight}
								style={{fill:color}} />
						}
					})
				:null}
				{this.props.feature.child?
					this.props.feature.child.map((feature: Feature, idx: number)=>{
						return <GenomeFeature key={idx} shape={this.props.shape} feature={feature}/>
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
}
export class GeneViewer extends React.Component<GeneViewerProps,GeneViewerState> {
	static defaultProps: GeneViewerProps = {
		features: [],
	}
	child: {
		navigation?: HTMLElement;
	} = {};
	constructor(props: GeneViewerProps) {
		super(props);
		this.state = {
			viewStart: props.features.length && props.features[0].loc && props.features[0].loc.length?
				props.features[0].loc[0].start:0,
			viewEnd: props.features.length && props.features[0].loc && props.features[0].loc.length?
				props.features[0].loc[0].end:0,
			zoom: 20000,
		}
	}
	onClickNavigation = (e: React.MouseEvent)=>{
		const width = this.child.navigation.getBoundingClientRect().width;
		const offsetLeft = this.child.navigation.offsetLeft;
		const clickX = e.pageX;
		const percentX = (clickX - offsetLeft)/width;
		const coordX = percentX * (this.state.viewEnd - this.state.viewStart);
		this.setState({
			focus: this.state.viewStart + Math.round(percentX * (this.state.viewEnd - this.state.viewStart)),
		});
	}
	renderGenome = (height: number, dnaHeight: number, strandHeight: number, start: number, end: number)=>{
		const width = end - start;
		const minY = -height/2;
		const dnaY = -dnaHeight/2;
		const shape = {
			viewStart: start,
			dnaY: dnaY,
			dnaHeight: dnaHeight,
			strandHeight: strandHeight,
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
				return <GenomeFeature key={idx} shape={shape} feature={feature} />
			}) }
		</svg>;
	}
	render() {
		const trackStart = Math.min(this.state.viewEnd - this.state.zoom,
			Math.max(this.state.focus - this.state.zoom/2, this.state.viewStart));
		const trackEnd = Math.max(this.state.viewStart + this.state.zoom,
			Math.min(this.state.focus + this.state.zoom/2, this.state.viewEnd));
		console.log(this.state.focus, trackStart, trackEnd);
		// Render
		return <div className="geneviewer">
			<div className="geneviewer-navigation"
				ref={ref => this.child.navigation = ref}
				onClick={this.onClickNavigation} >
				{this.renderGenome(50,10,4,this.state.viewStart,this.state.viewEnd)}
			</div>
			<div className="geneviewer-track">
				{this.renderGenome(50,20,8,trackStart,trackEnd)}
			</div>
		</div>
	}
}
