"use strict";

import './main.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as scale from 'd3-scale';

interface Location {
	start: number,
	end: number,
	strand?: number,
}

interface Feature {
	name?: string,
	ftype: string,
	loc?: Location[],
	child?: Feature[],
}

interface ViewerShape {
	viewStart: number,
	dnaY: number,
	dnaHeight: number,
	strandHeight: number,
	plusStrandY: number,
	minusStrandY: number,
}

interface GenomeFeatureProps {
	shape: ViewerShape,
	feature: Feature,
}
class GenomeFeature extends React.Component<GenomeFeatureProps,{}> {
	constructor(props: GenomeFeatureProps) {
		super(props);
		this.state = { }
	}
	render():JSX.Element {
		switch(this.props.feature.ftype) {
		case 'gene':
		case 'mRNA':
			return <g>
				<rect /> //TODO viewport height highlight this.props.feature.loc
				{ this.props.feature.child.map((feature: Feature)=>{
					return <GenomeFeature shape={this.props.shape} feature={feature}/>
				}) }
			</g>;
		default:
			return <g>
				{this.props.feature.loc?
					this.props.feature.loc.map((loc: Location)=>{
						const rectX = loc.start - this.props.shape.viewStart;
						const rectWidth = loc.end - loc.start;
						switch(loc.strand) {
						case 1:
							return <rect x={rectX} y={this.props.shape.plusStrandY}
								width={rectWidth} height={this.props.shape.strandHeight}/>
						case -1:
							return <rect x={rectX} y={this.props.shape.minusStrandY}
								width={rectWidth} height={this.props.shape.strandHeight}/>
						default:
							return <rect x={rectX} y={this.props.shape.dnaY}
								width={rectWidth} height={this.props.shape.dnaHeight}/>
						}
					})
				:null}
				{this.props.feature.child?
					this.props.feature.child.map((feature: Feature)=>{
						return <GenomeFeature shape={this.props.shape} feature={feature}/>
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
	viewStart: number,
	viewEnd: number,
}
export default class GeneViewer extends React.Component<GeneViewerProps,GeneViewerState> {
	static defaultProps: GeneViewerProps = {
		features: [],
	}
	constructor(props: GeneViewerProps) {
		super(props);
		this.state = {
			viewStart: props.features.length && props.features[0].loc && props.features[0].loc.length?
				props.features[0].loc[0].start:0,
			viewEnd: props.features.length && props.features[0].loc && props.features[0].loc.length?
				props.features[0].loc[0].end:0,
		}
	}
	render() {
		const viewWidth = this.state.viewEnd - this.state.viewStart;
		const viewHeight = 100;
		const minY = -viewHeight/2;
		const dnaHeight = 10;
		const strandHeight = 4;
		const dnaY = -dnaHeight/2;
		const shape = {
			viewStart: this.state.viewStart,
			dnaY: dnaY,
			dnaHeight: dnaHeight,
			strandHeight: strandHeight,
			plusStrandY: dnaY,
			minusStrandY: dnaY+dnaHeight-strandHeight,
		};
		return <div className="geneviewer">
			<svg width="100%" height="100%"
			 viewBox={"0 "+minY+" "+viewWidth+" "+viewHeight}
			 preserveAspectRatio="none">
				<rect x="0" y={dnaY}
				 width={viewWidth} height={dnaHeight}
				 style={{fill:"#8b96a8"}} />
				{ this.props.features.map((feature: Feature)=>{
					return <GenomeFeature shape={shape} feature={feature} />
				}) }
			</svg>
		</div>
	}
}
