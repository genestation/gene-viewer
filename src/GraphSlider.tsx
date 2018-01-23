import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {max} from 'd3-array';
import {scaleLinear} from 'd3-scale';
import {line,area,curveStepAfter} from 'd3-shape';

interface point {
	x: number,
	y: number,
}
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
interface GraphSliderState { }
export class GraphSlider extends React.Component<GraphSliderProps,GraphSliderState> {
	constructor(props: GraphSliderProps) {
		super(props);
	}
	render() {
		if(!this.props.stats) {
			return null
		}
		const margin = {top: 20, right: 10, bottom: 20, left: 10};
		const width = 350 - margin.left - margin.right;
		const height = 80 - margin.bottom - margin.top;
		let xScale = scaleLinear()
			.domain([this.props.stats.min, this.props.stats.max])
			.range([0, width])
			.clamp(true);
		let yScale = scaleLinear()
			.domain([0,max(this.props.stats.histogram,(bucket: GraphSliderBucket)=>{
				return bucket.doc_count;
			})])
			.range([0,height]);
		let points: point[] = this.props.stats.histogram.map((bucket: GraphSliderBucket)=>{
			return {x: bucket.from, y: bucket.doc_count}
		});
		points.push({x: this.props.stats.histogram[this.props.stats.histogram.length-1].to, y: 0});
		console.log(this.props.stats.histogram, points);
		let hist_area = area<point>()
			.x((d: point)=>xScale(d.x))
			.y((d: point)=>height - yScale(d.y))
			.y0((d: point)=>height)
			.curve(curveStepAfter);
		let hist_line = line<point>()
			.x((d: point)=>xScale(d.x))
			.y((d: point)=>height - yScale(d.y))
			.curve(curveStepAfter);
		console.log(hist_area(points), hist_line(points));
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
