"use strict";

import './main.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

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
}
export default class GeneViewer extends React.Component<GeneViewerProps,GeneViewerState> {
	static defaultProps: GeneViewerProps = {
		features: [],
	}
	constructor(props: GeneViewerProps) {
		super(props);
		this.state = { }
	}
	render() {
		return <div className="geneviewer">
		</div>
	}
}
