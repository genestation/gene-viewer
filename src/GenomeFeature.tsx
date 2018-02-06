"use strict";

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Scale} from './scale.tsx';

export interface GenomeFeatureObject {
	name?: string,
	ftype?: string,
	srcfeature?: string,
	start?: number,
	end?: number,
	strand?: number,
	child?: GenomeFeatureObject[],
	data?: {[key: string]: any[]},
}

export function getFeatureData(feature: GenomeFeatureObject, key: string): any {
	if(typeof key != "string") {
		return undefined;
	}
	let path = key.split('.');
	let ptr: any = feature.data;
	while(path.length && ptr !== undefined) {
		if(ptr.hasOwnProperty(path[0])) {
			ptr = ptr[path.shift()];
		} else if (path.length > 1) {
			path.splice(0,2,path[0]+'.'+path[1]);
		} else {
			ptr = undefined;
			break;
		}
	}
	return ptr;
};

interface GenomeShape {
	dnaY: number,
	dnaHeight: number,
	strandHeight: number,
	intronHeight: number,
	plusStrandY: number,
	minusStrandY: number,
	minWidth: number,
}

interface GenomeFeatureProps {
	scale: Scale,
	shape: GenomeShape,
	feature: GenomeFeatureObject,
	selected?: string | boolean,
}
export class GenomeFeature extends React.Component<GenomeFeatureProps,{}> {
	constructor(props: GenomeFeatureProps) {
		super(props);
		this.state = { }
	}
	featureColor(ftype = this.props.feature.ftype):string {
		switch(ftype) {
		case 'exon':
			return '#56876a';
		case 'CDS':
			return '#3e53bc';
		case 'sequence_alteration':
			return '#e00f24';
		case 'enhancer':
			return '#62138c';
		case 'repetitive_element':
			return 'none';
		default:
			return null;
		}
	}
	renderLeaf(opacity: number):JSX.Element {
		if(typeof this.props.feature.start == "number" && typeof this.props.feature.end == "number") {
			const rectX = this.props.scale.get(this.props.feature.start);
			const rectWidth = Math.max(this.props.scale.get(this.props.feature.end) - this.props.scale.get(this.props.feature.start),
				this.props.shape.minWidth);
			switch(this.props.feature.strand) {
			case 1:
				return <rect x={rectX} y={this.props.shape.plusStrandY}
					width={rectWidth} height={this.props.shape.strandHeight}
					style={{fill:this.featureColor(), opacity: opacity}} />
			case -1:
				return <rect x={rectX} y={this.props.shape.minusStrandY}
					width={rectWidth} height={this.props.shape.strandHeight}
					style={{fill:this.featureColor(), opacity: opacity}} />
			default:
				return <rect x={rectX} y={this.props.shape.dnaY}
					width={rectWidth} height={this.props.shape.dnaHeight}
					style={{fill:this.featureColor(), opacity: opacity}} />
			}
		}
	}
	render():JSX.Element {
		let selected = true;
		let childSelected = false;
		if(typeof this.props.selected == 'boolean') {
			selected = this.props.selected;
			childSelected = this.props.selected;
		} else if(typeof this.props.selected == 'string') {
			selected = (this.props.feature.name == this.props.selected);
			childSelected = (this.props.feature.name == this.props.selected);
		}
		const opacity = selected ? (this.props.selected ? 0.8 : 0.6) : 0.1;
		if(this.props.feature.child) {
			return <g>
				<rect />
				{ this.props.feature.child.map((feature: GenomeFeatureObject, idx: number)=>{
					return <GenomeFeature key={idx}
						scale={this.props.scale} shape={this.props.shape} feature={feature} selected={childSelected?childSelected:this.props.selected}/>
				}) }
				{this.props.feature.child.map((child: GenomeFeatureObject, idx: number, array: GenomeFeatureObject[])=>{
					if(idx > 0) {
						const lastChild = array[idx-1];
						if(child.ftype != lastChild.ftype || child.child || lastChild.child) {
							return null
						}
						if(child.strand == 1 && lastChild.strand == 1) {
							const startX = this.props.scale.get(lastChild.end);
							const endX = this.props.scale.get(child.start);
							const strandY = this.props.shape.plusStrandY
							const midX = (startX + endX)/2;
							const midY = this.props.shape.plusStrandY - this.props.shape.intronHeight;
							return <path key={idx}
								d={"M "+startX+" "+strandY
									+" L "+midX+" "+midY
									+" L "+endX+" "+strandY
								} style={{fill: "none", opacity: opacity, stroke: this.featureColor(child.ftype), strokeWidth: 1}} />
						} else if(child.strand == -1 && lastChild.strand == -1) {
							const startX = this.props.scale.get(lastChild.start);
							const endX = this.props.scale.get(child.end);
							const strandY = this.props.shape.minusStrandY + this.props.shape.strandHeight;
							const midX = (startX + endX)/2;
							const midY = this.props.shape.minusStrandY + this.props.shape.strandHeight + this.props.shape.intronHeight;
							return <path key={idx}
								d={"M "+startX+" "+strandY
									+" L "+midX+" "+midY
									+" L "+endX+" "+strandY
								} style={{fill: "none", opacity: opacity, stroke: this.featureColor(child.ftype), strokeWidth: 1}} />
						}
					} else {
						return null
					}
				})}
			</g>;
		} else {
			return <g>
				{this.renderLeaf(opacity)}
			</g>;
		}
	}
}
