import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface GraphSliderBucket {
	from: number,
	to: number,
	doc_count: number,
}
export interface GraphSliderStats {
	min: number,
	max: number,
	avg: number,
	histogram: GraphSliderBucket[],
	step: number,
}
interface GraphSliderProps {
	stats?: GraphSliderStats,
}
interface GraphSliderState {}
export class GraphSlider extends React.Component<GraphSliderProps,GraphSliderState> {
	constructor(props: GraphSliderProps) {
		super(props);
		this.state={};
	}
	render() {
		return <div/>
	}
}

function discretize(value: number, max: number, min: number, step: number): number {
	if(value < max && value > min) {
		value = Math.round(value/step)*step;
		var magnitude = Math.log10(step);
		if(magnitude < 0) {
			return parseFloat(value.toFixed(Math.min(20,Math.abs(magnitude))));
		} else {
			return parseInt(value.toFixed(0));
		}
	} else {
		return value;
	}
}
