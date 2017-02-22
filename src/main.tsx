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

export interface GeneViewerProps{
	features: Feature[],
}
export interface GeneViewerState{
	viewstart: number,
	viewend: number,
}
export default class GeneViewer extends React.Component<GeneViewerProps,GeneViewerState> {
	static defaultProps: GeneViewerProps = {
		features: [],
	}
	constructor(props: GeneViewerProps) {
		super(props);
		const padding = 20;
		this.state = {
			viewstart: props.features.length && props.features[0].loc && props.features[0].loc.length?
				props.features[0].loc[0].start - padding:0,
			viewend: props.features.length && props.features[0].loc && props.features[0].loc.length?
				props.features[0].loc[0].end + padding:0,
		}
	}
	render() {
		console.log(scale);
		const viewwidth = this.state.viewend - this.state.viewstart;
		const viewheight= 100;
		const miny = -viewheight/2;
		const dnaheight = 10;
		return <div className="geneviewer">
			<svg width="100%" height="100%" viewBox={"0 "+miny+" "+viewwidth+" "+viewheight} preserveAspectRatio="none">
				<rect x="0" y={-dnaheight/2} width={viewwidth} height={dnaheight} // TODO real width
					style={{fill:"#8b96a8"}}
					/>
			</svg>
		</div>
	}
}
