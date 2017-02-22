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
	viewWidth: number,
	viewHeight: number,
	minY: number,
	dnaHeight: number,
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
				{ this.props.feature.loc.map((loc: Location)=>{
						return <rect />
				}) }
				{
					this.props.feature.child.map((feature: Feature)=>{
						return <GenomeFeature shape={this.props.shape} feature={feature}/>
					})
				}
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
		const viewHeight = 100;
		const shape = {
			viewWidth: this.state.viewEnd - this.state.viewStart,
			viewHeight: viewHeight,
			minY: -viewHeight/2,
			dnaHeight: 10,
		};
		return <div className="geneviewer">
			<svg width="100%" height="100%"
			 viewBox={"0 "+shape.minY+" "+shape.viewWidth+" "+shape.viewHeight}
			 preserveAspectRatio="none">
				<rect x="0" y={-shape.dnaHeight/2}
				 width={shape.viewWidth} height={shape.dnaHeight}
				 style={{fill:"#8b96a8"}} />
				{ this.props.features.map((feature: Feature)=>{
					return <GenomeFeature shape={shape} feature={feature} />
				}) }
			</svg>
		</div>
	}
}
