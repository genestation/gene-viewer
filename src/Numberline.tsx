import * as React from 'react';
import * as d3 from 'd3-scale';


export interface NumberlineProps{
	data: {[key: string]: number};
	min: number;
	max: number;
}
export interface NumberlineState{
}
export class Numberline extends React.Component<NumberlineProps,NumberlineState> {
	scale: d3.Linear<number>;
	width = 1000;
	height = 60;
	lineHeight = 4;
	tickWidth = 2;
	tickHeight = 20;
	textMargin = 5;
	constructor(props: NumberlineProps) {
		super(props);
		this.scale = d3.scaleLinear<number>()
			.domain([props.min,props.max])
			.range([0,this.width])
	}
	render() {
		const minY = -this.height/2;
		const lineY = -this.lineHeight/2;
		const tickY = -this.tickHeight/2;
		const textY = lineY - this.textMargin;
		return <svg width="100%" height="100%"
		 viewBox={"0 "+minY+" "+this.width+" "+this.height}>
			<rect x="0" y={lineY}
			 width={this.width} height={this.lineHeight}
			 style={{fill:"black"}} />
			{ Object.keys(this.props.data).map((key: string, idx: number)=>{
				const x = this.props.data[key]
				return <g key={idx}>
					<rect
						x={x - this.tickWidth/2} y={tickY}
						width={this.tickWidth} height={this.tickHeight}/>
					<text textAnchor="middle" fontFamily="sans-serif" x={x} y={textY}>
						{key}
					</text>
				</g>
			}) }
		</svg>;
	}
}
