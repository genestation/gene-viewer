import './Histogram.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {max, min} from 'd3-array';
import {scaleLinear, scaleLog, ScaleLinear, ScaleLogarithmic} from 'd3-scale';
import {area, curveStepAfter, Area} from 'd3-shape';

interface point {
	x: number,
	y: number,
}
interface HistogramItem {
	x: number,
	data: any,
}
export interface HistogramBucket {
	from?: number,
	to?: number,
	doc_count?: number,
}
export interface HistogramPercentiles {
	"1.0": number,
	"5.0": number,
	"25.0": number,
	"50.0": number,
	"75.0": number,
	"95.0": number,
	"99.0": number,
}
export interface HistogramStats {
	min?: number,
	max?: number,
	percentiles?: HistogramPercentiles,
	histogram?: HistogramBucket[],
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
	return ranges;
}
export function readHistogramBuckets(stats: HistogramStats, buckets: HistogramBucket[]) {
	const domain = scaleLinear().domain([stats.min,stats.max]).nice(4).domain()
	buckets[0].from = domain[0];
	buckets[buckets.length-1].to = domain[1];
	return buckets;
}
export function findHistogramItems(buckets: HistogramBucket[], items: HistogramItem[]) {
	return items.filter((item: HistogramItem)=>{
		return buckets.findIndex((bucket: HistogramBucket)=>{
			return item.x >= bucket.from && item.x < bucket.to
		}) != -1;
	});
}


interface HistogramProps {
	value?: HistogramBucket[],
	items?: HistogramItem[],
	stats?: HistogramStats[],
	onHover?: (bucket: HistogramBucket[])=>any,
	onClick?: (bucket: HistogramBucket[])=>any,
}
interface HistogramState {
	hoverBucket?: HistogramBucket[],
}
export class Histogram extends React.Component<HistogramProps,HistogramState> {
	child: {
		navigation?: HTMLElement;
	} = {};
	margin = {top: 15, right: 80, bottom: 20, left: 40};
	padding = {top: 1, right: 20, bottom: 4, left: 20};
	width = 350;
	height = 40;
	viewWidth = this.width + this.margin.left + this.margin.right;
	viewHeight = this.height + this.margin.bottom + this.margin.top;
	fontSize = 10;
	handlingMouseMove = false;
	xScale: ScaleLinear<number,number>;
	xTicks: number[];
	xTickLabels: string[];
	yScale: ScaleLogarithmic<number,number>;
	hist_points: point[][];
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
		if(this.props.onHover) {
			this.props.onHover(null);
		}
	}
	onClick = (bucket: HistogramBucket[])=>{
		if(this.props.onClick) {
			this.props.onClick(bucket);
		}
	}
	handleMouseMove = (pageX: number)=>{
		const offsetLeft = this.child.navigation.offsetLeft;
		const offsetWidth = this.child.navigation.offsetWidth;
		const coordX = this.xScale.invert(pageX - offsetLeft - this.margin.left);
		const bucket = this.props.stats.map((stats: HistogramStats)=>{
			return stats.histogram.find((bucket: HistogramBucket, idx: number)=>
				coordX >= bucket.from && coordX < bucket.to
				|| idx == stats.histogram.length-1 && coordX == bucket.to
			);
		});
		this.setState({
			hoverBucket: bucket,
		},()=>{this.handlingMouseMove=false});
		if(this.props.onHover) {
			this.props.onHover(bucket);
		}
	}
	updateD3 = ()=>{
		this.xScale = scaleLinear()
			.domain([min(this.props.stats.map((stats: HistogramStats)=>stats.min)),
				max(this.props.stats.map((stats: HistogramStats)=>stats.max))])
			.range([0, this.width])
			.nice(4)
			.clamp(true);
		this.xTicks = this.xScale.ticks(4);
		this.xTickLabels = this.xTicks.map(this.xScale.tickFormat(4));
		this.yScale = scaleLog()
			.domain([1,
				max([].concat.apply([],this.props.stats.map((stats: HistogramStats)=>stats.histogram)),
					(bucket: HistogramBucket)=>{
						return bucket.doc_count;
					})+1])
			.range([0,this.height]);
		this.hist_points = this.props.stats.map((stats: HistogramStats)=>
			stats.histogram.map((bucket: HistogramBucket)=>{
				return {x: bucket.from, y: bucket.doc_count}
			})
		);
		this.hist_points.map((points: point[], idx: number)=>{
			points.push({
				x: this.props.stats[idx].histogram[this.props.stats[idx].histogram.length-1].to,
				y: 0
			})
		});
		this.hist_area = area<point>()
			.x((d: point)=>this.xScale(d.x))
			.y0((d: point)=>this.height - this.yScale(d.y+1))
			.y1((d: point)=>this.height)
			.curve(curveStepAfter);
	}
	render() {
		if(!this.props.stats
		|| typeof this.props.stats[0].min != "number"
		|| typeof this.props.stats[0].max != "number") {
			return <div className="histogram"
				style={{
					marginRight: this.padding.right - this.margin.right,
					marginLeft: this.padding.left - this.margin.left,
				}}>
				<svg width={this.viewWidth} height={this.viewHeight}/>
			</div>
		} else {
			this.updateD3();
			return <div className="histogram"
					style={{
						marginRight: this.padding.right - this.margin.right,
						marginLeft: this.padding.left - this.margin.left,
					}}
					ref={ref => this.child.navigation = ref}
					onMouseMove={this.onMouseMove}
					onMouseLeave={this.onMouseLeave}
				>
				<svg width={this.viewWidth} height={this.viewHeight}
					viewBox={-this.margin.left+" "+-this.margin.top+" "+this.viewWidth+" "+this.viewHeight}>
					<g className="histogram-plot">
						{this.hist_points.map((points: point[], idx: number)=>{
							return <path key={idx} className="histogram-plot-area"
								fill="#808080" fillOpacity="0.5"
								stroke="black" strokeOpacity="0.5" strokeWidth="1"
								d={this.hist_area(points)}
							/>
						})}
						{this.props.items?<g>{
							this.props.items.map((item: HistogramItem, idx: number)=>{
								return <line key={idx} className="histogram-item"
									stroke="#ff00007a"
									x1={this.xScale(item.x)} y1={0}
									x2={this.xScale(item.x)} y2={this.height}
								/>
							})
						}</g>:null}
						{this.props.items.length == 1 && !this.state.hoverBucket ?
							<text textAnchor="middle" fontSize={this.fontSize}
									x={this.xScale(this.props.items[0].x)}
									y={0 - this.padding.top}>
								{this.props.items[0].x.toExponential(4)}
							</text>
						:null}
						{this.props.value?<g>
							<rect className="histogram-plot-value"
								style={{stroke:"#FFFFFF", strokeOpacity:0.5, fill:"#6666FF", fillOpacity:0.4}}
								x={this.xScale(this.props.value[0].from)} y={0}
								width={this.xScale(this.props.value[0].to) - this.xScale(this.props.value[0].from)}
								height={this.height}
							/>
						</g>:null}
					</g>
					<g className="histogram-xaxis">
						<line className="histogram-xaxis-1to5"
							stroke="#6796cf" strokeWidth={3}
							x1={this.xScale(this.props.stats[0].percentiles["1.0"])} y1={this.height+1}
							x2={this.xScale(this.props.stats[0].percentiles["5.0"])} y2={this.height+1}
						/>
						<line className="histogram-xaxis-95to99"
							stroke="#6796cf" strokeWidth={3}
							x1={this.xScale(this.props.stats[0].percentiles["95.0"])} y1={this.height+1}
							x2={this.xScale(this.props.stats[0].percentiles["99.0"])} y2={this.height+1}
						/>
						<line className="histogram-xaxis-5to25"
							stroke="#337ab7" strokeWidth={4}
							x1={this.xScale(this.props.stats[0].percentiles["5.0"])} y1={this.height+2}
							x2={this.xScale(this.props.stats[0].percentiles["25.0"])} y2={this.height+2}
						/>
						<line className="histogram-xaxis-75to95"
							stroke="#337ab7" strokeWidth={4}
							x1={this.xScale(this.props.stats[0].percentiles["75.0"])} y1={this.height+2}
							x2={this.xScale(this.props.stats[0].percentiles["95.0"])} y2={this.height+2}
						/>
						<line className="histogram-xaxis-25to75"
							stroke="black" strokeWidth={6}
							x1={this.xScale(this.props.stats[0].percentiles["25.0"])} y1={this.height+3}
							x2={this.xScale(this.props.stats[0].percentiles["75.0"])} y2={this.height+3}
						/>
						<line className="histogram-xaxis-50"
							stroke="#016450" strokeWidth={4}
							x1={this.xScale(this.props.stats[0].percentiles["50.0"])} y1={this.height}
							x2={this.xScale(this.props.stats[0].percentiles["50.0"])} y2={this.height+4}
						/>
						<line className="histogram-xaxis-domain"
							stroke="black" strokeWidth={1}
							x1={this.xScale.range()[0]} y1={this.height}
							x2={this.xScale.range()[1]} y2={this.height}
						/>

						{this.xTicks.map((tick: number, idx: number)=>{
							return <text key={idx} textAnchor="middle" fontSize={this.fontSize}
								 x={this.xScale(tick)} y={this.height + this.padding.bottom + this.fontSize}>
									{this.xTickLabels[idx]}
							</text>
						})}
					</g>
					{this.state.hoverBucket?<g>
						<rect className="histogram-plot-hover"
							fill="#1e26d28a"
							x={this.xScale(this.state.hoverBucket[0].from)} y={0}
							width={this.xScale(this.state.hoverBucket[0].to)
								- this.xScale(this.state.hoverBucket[0].from)}
							height={this.height}
						/>
						<text textAnchor="left" fontSize={this.fontSize}
							x={this.xScale(this.state.hoverBucket[0].to)}
							y={0 - this.padding.top}>
							{this.state.hoverBucket.map((bucket: HistogramBucket)=>{
								return bucket.doc_count >= 1000 ?
									bucket.doc_count.toExponential(2).replace('+','')
									: bucket.doc_count})
							.reverse().join('/')}
						</text>
						<rect className="histogram-plot-button"
							onClick={()=>{this.onClick(this.state.hoverBucket)}}
							fillOpacity="0"
							x={this.xScale(this.state.hoverBucket[0].from)} y={-this.margin.top}
							width={this.xScale(this.state.hoverBucket[0].to)
								- this.xScale(this.state.hoverBucket[0].from)}
							height={this.viewHeight}
						/>
					</g>:null}
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
