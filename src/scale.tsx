"use strict"

import * as d3 from 'd3-scale';

// Read features
// scale features linearly
// scale intervening spaces logarithmically

// Build up "zones" of features
// Start with empty array
// For each feature.loc
/// Check each elem of array for intersection
/// If intersect
//// Check until no intersect
//// Extend//Merge locs
/// Else
//// Insert loc, maintain sorting

interface ScaleArgs {
	features: Feature[],
	size: number,
	margin?: number,
	filter?: string[],
}

interface Feature {
	name?: string,
	ftype?: string,
	start?: number,
	end?: number,
	child?: Feature[],
}

interface Range {
	start: number,
	end: number,
}

// Compressed representation of locs
export class Scale {
	features: Feature[];
	scale: {[domainKey: number]: d3.ScaleLinear<number,number>};
	domainKey: number[];
	inverse: {[rangeKey: number]: number};
	rangeKey: number[];
	master: d3.ScaleLinear<number,number>;
	constructor(args: ScaleArgs) {
		let ranges: Range[] = [];
		this.features = args.features,
		this.scale = {};
		this.domainKey = [];
		this.inverse = {};
		this.rangeKey = [];
		let min = Number.POSITIVE_INFINITY;
		let max = Number.NEGATIVE_INFINITY;
		for(let feature of args.features) {
			let ptr: Feature;
			let stack = [feature]
			while(stack.length) {
				ptr = stack.pop();
				if(ptr.child) {
					stack = stack.concat(ptr.child);
				}
				if (ptr.start < min) {
					min = ptr.start;
				}
				if (ptr.end > max) {
					max = ptr.end;
				}
				if (args.filter && args.filter.indexOf(ptr.ftype) > -1) {
					let spliceStart = ranges.length;
					let spliceDelete = 0;
					if(spliceStart && ranges[0].start >= ptr.start) {
						spliceStart = 0;
					}
					ranges.forEach((range: Range, idx: number)=>{
						if(range.start <= ptr.end && range.end >= ptr.start) { // Intersects
							spliceDelete++;
							if(spliceDelete == 1) {
								spliceStart = idx;
							}
						} else if (spliceStart == ranges.length && range.start > ptr.start) { // TODO better test?
							spliceStart = idx;
						}
					});
					ranges.splice(spliceStart, spliceDelete, {
						start: Math.min(ptr.start,
							spliceDelete?ranges[spliceStart].start:Number.POSITIVE_INFINITY),
						end: Math.max(ptr.end,
							spliceDelete?ranges[spliceStart+spliceDelete-1].end:Number.NEGATIVE_INFINITY),
					});
				}
			}
		}
		if (args.margin) {
			min -= args.margin;
			max += args.margin;
		}
		let sum = 0;
		ranges.forEach((range: Range, idx: number, array: Range[])=>{
			if(idx > 0) {
				// Interval
				const iStart = array[idx-1].end;
				const iEnd = range.start;
				const iLength = Math.log(iEnd - iStart)*10;
				this.domainKey.push(iStart);
				this.scale[iStart] = d3.scaleLinear()
					.domain([iStart, iEnd])
					.range([sum, sum+iLength]);
				this.rangeKey.push(sum);
				this.inverse[sum] = iStart;
				sum += iLength;
			} else if (min < range.start) {
				// First Interval
				const iStart = min;
				const iEnd = range.start;
				const iLength = Math.log(iEnd - iStart)*10;
				this.domainKey.push(iStart);
				this.scale[iStart] = d3.scaleLinear()
					.domain([iStart, iEnd])
					.range([sum, sum+iLength]);
				this.rangeKey.push(sum);
				this.inverse[sum] = iStart;
				sum += iLength;
			}
			// Feature
			const fStart = range.start;
			const fEnd = range.end;
			const fLength = fEnd - fStart;
			this.domainKey.push(fStart);
			this.scale[fStart] = d3.scaleLinear()
				.domain([fStart, fEnd])
				.range([sum, sum+fLength]);
			this.rangeKey.push(sum);
			this.inverse[sum] = fStart;
			sum += fLength;
			if(idx == array.length - 1 && max > range.end) {
				// Last Interval
				const iStart = range.end;
				const iEnd = max;
				const iLength = Math.log(iEnd - iStart)*10;
				this.domainKey.push(iStart);
				this.scale[iStart] = d3.scaleLinear()
					.domain([iStart, iEnd])
					.range([sum, sum+iLength]);
				this.rangeKey.push(sum);
				this.inverse[sum] = iStart;
				sum += iLength;
			}
		});
		this.master = d3.scaleLinear().clamp(true)
			.domain([0,sum])
			.range([0,args.size]);
	}
	get(dValue: number) {
		let dKey: number;
		this.domainKey.forEach((key: number)=>{
			if(key <= dValue) {
				dKey = key;
			}
		});
		return dKey ? this.master(this.scale[dKey](dValue)) : 0;
	}
	invert(rawRValue: number) {
		let rValue = this.master.invert(rawRValue);
		let rKey: number;
		this.rangeKey.forEach((key: number)=>{
			if(key <= rValue) {
				rKey = key;
			}
		});
		return this.scale[this.inverse[rKey]].invert(rValue);
	}
	get domain() {
		return [this.scale[this.domainKey[0]].domain()[0],
			this.scale[this.domainKey[this.domainKey.length-1]].domain()[1]];
	}
	get range() {
		return [this.scale[this.domainKey[0]].range()[0],
			this.scale[this.domainKey[this.domainKey.length-1]].range()[1]];
	}
	region(dValue: number) {
		let dKey: number;
		this.domainKey.forEach((key: number)=>{
			if(key <= dValue) {
				dKey = key;
			}
		});
		return dKey ? this.scale[dKey].domain() : [0,0];
	}
	overlap(start: number, end: number) {
		let overlap: Feature[] = [];
		for(let feature of this.features) {
			if(start <= feature.end && feature.start <= end) {
				overlap.push(feature);
			}
		}
		return overlap;
	}
}
