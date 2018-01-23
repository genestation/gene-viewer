import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {max} from 'd3-array';
import {scaleLinear, scaleLog} from 'd3-scale';
import {line, area, curveStepAfter} from 'd3-shape';

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
		const viewWidth = 350;
		const viewHeight = 80;
		const width = viewWidth - margin.left - margin.right;
		const height = viewHeight - margin.bottom - margin.top;
		const fontSize = 10;
		let xScale = scaleLinear()
			.domain([this.props.stats.min, this.props.stats.max])
			.range([0, width])
			.nice(4)
			.clamp(true);
		let xTicks = xScale.ticks(4);
		let xTickLabels = xTicks.map(xScale.tickFormat(4));
		let xTickPadding = 2;
		let yScale = scaleLog()
			.domain([1,max(this.props.stats.histogram,(bucket: GraphSliderBucket)=>{
				return bucket.doc_count;
			})+1])
			.range([0,height]);
		let points: point[] = this.props.stats.histogram.map((bucket: GraphSliderBucket)=>{
			return {x: bucket.from, y: bucket.doc_count}
		});
		points.push({x: this.props.stats.histogram[this.props.stats.histogram.length-1].to, y: 0});
		let hist_area = area<point>()
			.x((d: point)=>xScale(d.x))
			.y0((d: point)=>height - yScale(d.y+1))
			.y1((d: point)=>height)
			.curve(curveStepAfter);
		console.log(xTicks, xTickLabels);
		return <div className="graphslider">
			<svg width="100%" height={viewHeight}
				viewBox={-margin.left+" "+-margin.right+" "+viewWidth+" "+viewHeight}>
				<path className="graphslider-histogram"
					fill="#808080" stroke="black" strokeWidth={1}
					d={hist_area(points)}
				/>
				<g ref="xaxis" className="graphslider-xaxis">
					<line className="graphslider-xaxis-domain"
						stroke="black" strokeWidth={2}
						x1={xScale.range()[0]} y1={height}
						x2={xScale.range()[1]} y2={height}
					/>
					{xTicks.map((tick: number, idx: number)=>{
						return <text key={idx} textAnchor="middle" fontSize={fontSize}
							 x={xScale(tick)} y={height + xTickPadding + fontSize}>
								{xTickLabels[idx]}
						</text>
					})}
				</g>
			</svg>
		</div>
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
