import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {max} from 'd3-array';
import {scaleLinear, scaleLog, ScaleLinear, ScaleLogarithmic} from 'd3-scale';
import {area, curveStepAfter, Area} from 'd3-shape';

interface point {
	x: number,
	y: number,
}
interface HistogramBucket {
	from?: number,
	to?: number,
	doc_count?: number,
}
export interface HistogramStats {
	min: number,
	max: number,
	avg: number,
	histogram: HistogramBucket[],
	step: number,
}
interface HistogramProps {
	stats?: HistogramStats,
}
interface HistogramState {
	hoverBucket?: HistogramBucket,
}

// Generate range aggregation buckets
export function makeHistogramBuckets(stats: HistogramStats, numBuckets: number) {
	const domain = scaleLinear().domain([stats.min,stats.max]).nice(4).domain()
	const interval = (domain[1] - domain[0]) / numBuckets;

	let x = domain[0] + interval
	let last = x
	let i = 0
	let ranges: HistogramBucket[] = [{to: x}];
	for(i++; i < numBuckets-1; i++) {
		x += interval;
		ranges.push({from: last, to: x});
		last = x
	}
	ranges.push({from: x});
	stats.histogram = ranges;
	return stats;
}
export function readHistogramBuckets(stats: HistogramStats, buckets: HistogramBucket[]) {
	const domain = scaleLinear().domain([stats.min,stats.max]).nice(4).domain()
	buckets[0].from = domain[0];
	buckets[buckets.length-1].to = domain[1];
	stats.histogram = buckets;
	return stats;
}


export class Histogram extends React.Component<HistogramProps,HistogramState> {
	child: {
		navigation?: HTMLElement;
	} = {};
	margin = {top: 20, right: 10, bottom: 20, left: 10};
	viewWidth = 350;
	viewHeight = 80;
	width = this.viewWidth - this.margin.left - this.margin.right;
	height = this.viewHeight - this.margin.bottom - this.margin.top;
	fontSize = 10;
	xTickPadding = 2;
	handlingMouseMove = false;
	xScale: ScaleLinear<number,number>;
	xTicks: number[];
	xTickLabels: string[];
	yScale: ScaleLogarithmic<number,number>;
	hist_points: point[];
	hist_area: Area<point>;
	constructor(props: HistogramProps) {
		super(props);
		this.state={};
	}
	onMouseMove = (e: React.MouseEvent)=>{
		if(!this.handlingMouseMove) {
			let pageX = e.pageX;
			requestAnimationFrame(()=>{this.handleMouseMove(pageX)});
		}
		this.handlingMouseMove = true;
	}
	onMouseLeave = (e: React.MouseEvent)=>{
		this.setState({
			hoverBucket: null,
		});
	}
	handleMouseMove = (pageX: number)=>{
		const offsetLeft = this.child.navigation.offsetLeft;
		const offsetWidth = this.child.navigation.offsetWidth;
		const coordX = this.xScale.invert(pageX - offsetLeft - this.margin.left);
		const bucket = this.props.stats.histogram.find((bucket: HistogramBucket)=>
			coordX >= bucket.from && coordX < bucket.to
		);
		this.setState({
			hoverBucket: bucket,
		},()=>{this.handlingMouseMove=false});
	}
	updateD3 = ()=>{
		this.xScale = scaleLinear()
			.domain([this.props.stats.min, this.props.stats.max])
			.range([0, this.width])
			.nice(4)
			.clamp(true);
		this.xTicks = this.xScale.ticks(4);
		this.xTickLabels = this.xTicks.map(this.xScale.tickFormat(4));
		this.yScale = scaleLog()
			.domain([1,max(this.props.stats.histogram,(bucket: HistogramBucket)=>{
				return bucket.doc_count;
			})+1])
			.range([0,this.height]);
		this.hist_points = this.props.stats.histogram.map((bucket: HistogramBucket)=>{
			return {x: bucket.from, y: bucket.doc_count}
		});
		this.hist_points.push({
			x: this.props.stats.histogram[this.props.stats.histogram.length-1].to,
			y: 0
		});
		this.hist_area = area<point>()
			.x((d: point)=>this.xScale(d.x))
			.y0((d: point)=>this.height - this.yScale(d.y+1))
			.y1((d: point)=>this.height)
			.curve(curveStepAfter);
	}
	render() {
		if(!this.props.stats || !this.props.stats.avg) {
			return null
		} else {
			this.updateD3();
			return <div className="graphslider"
					ref={ref => this.child.navigation = ref}
					onMouseMove={this.onMouseMove}
					onMouseLeave={this.onMouseLeave}
				>
				<svg width={this.viewWidth} height={this.viewHeight}
					viewBox={-this.margin.left+" "+-this.margin.right+" "+this.viewWidth+" "+this.viewHeight}>
					<g className="graphslider-histogram">
						<path className="graphslider-histogram-area"
							fill="#808080" stroke="black" strokeWidth={1}
							d={this.hist_area(this.hist_points)}
						/>
						{this.state.hoverBucket?<g>
						<rect className="graphslider-histogram-hover"
							fill="#1e26d28a"
							x={this.xScale(this.state.hoverBucket.from)} y={0}
							width={this.xScale(this.state.hoverBucket.to) - this.xScale(this.state.hoverBucket.from)}
							height={this.height}
						/>
						<text textAnchor="left" fontSize={this.fontSize}
							x={this.xScale(this.state.hoverBucket.to)}
							y={0}>
							<b>Count:</b> {this.state.hoverBucket.doc_count}
						</text>
						</g>:null}
					</g>
					<g className="graphslider-xaxis">
						<line className="graphslider-xaxis-domain"
							stroke="black" strokeWidth={2}
							x1={this.xScale.range()[0]} y1={this.height}
							x2={this.xScale.range()[1]} y2={this.height}
						/>
						{this.xTicks.map((tick: number, idx: number)=>{
							return <text key={idx} textAnchor="middle" fontSize={this.fontSize}
								 x={this.xScale(tick)} y={this.height + this.xTickPadding + this.fontSize}>
									{this.xTickLabels[idx]}
							</text>
						})}
					</g>
				</svg>
			</div>
		}
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
