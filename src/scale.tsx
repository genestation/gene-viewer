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

interface Feature {
	name?: string,
	ftype?: string,
	start?: number,
	end?: number,
	strand?: number,
	child?: Feature[],
	data?: Datum[],
}

interface Range {
	start: number,
	end: number,
}

interface Datum {
	key: string,
	value: any,
}

// Compressed representation of locs
export class Scale {
	ranges: Range[];
	scale: {[domainKey: number]: d3.Linear<number> | d3.Log<number>};
	domainKey: number[];
	inverse: {[rangeKey: number]: number};
	rangeKey: number[];
	constructor(features: Feature[]) {
		this.ranges = [];
		this.scale = {};
		this.domainKey = [];
		this.inverse = {};
		this.rangeKey = [];
		for(let feature of features) {
			let ptr: Feature;
			let stack = [feature]
			while(stack.length) {
				ptr = stack.pop()
				if(ptr.child) {
					stack = stack.concat(ptr.child);
				} else {
					let spliceStart = this.ranges.length;
					let spliceDelete = 0;
					if(spliceStart && this.ranges[0].start >= ptr.start) {
						spliceStart = 0;
					}
					this.ranges.forEach((range: Range, idx: number)=>{
						if(range.start <= ptr.end && range.end >= ptr.start) { // Intersects
							spliceDelete++;
							if(spliceDelete == 1) {
								spliceStart = idx;
							}
						} else if (spliceStart == this.ranges.length && range.start > ptr.start) { // TODO better test?
							spliceStart = idx;
						}
					});
					this.ranges.splice(spliceStart, spliceDelete, {
						start: Math.min(ptr.start,
							spliceDelete?this.ranges[spliceStart].start:Number.POSITIVE_INFINITY),
						end: Math.max(ptr.end,
							spliceDelete?this.ranges[spliceStart+spliceDelete-1].end:Number.NEGATIVE_INFINITY),
					});
				}
			}
		}
		let sum = 0;
		this.ranges.forEach((range: Range, idx: number, array: Range[])=>{
			if(idx > 0) {
				// Interval
				const iStart = array[idx-1].end;
				const iEnd = range.start;
				const iLength = Math.log(iEnd - iStart)*10;
				this.domainKey.push(iStart);
				this.scale[iStart] = d3.scaleLog().base(Math.E)
					.domain([iStart, iEnd])
					.range([sum, sum+iLength]) as d3.Log<number>;
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
				.range([sum, sum+fLength]) as d3.Linear<number>;
			this.rangeKey.push(sum);
			this.inverse[sum] = fStart;
			sum += fLength;
		});
	}
	get(dValue: number) {
		let dKey: number;
		this.domainKey.forEach((key: number)=>{
			if(key <= dValue) {
				dKey = key;
			}
		});
		return this.scale[dKey](dValue);
	}
	invert(rValue: number) {
		let rKey: number;
		this.rangeKey.forEach((key: number)=>{
			if(key <= rValue) {
				rKey = key;
			}
		});
		console.log("value", rValue);
		console.log("key", rKey);
		console.log(this.inverse[rKey]);
		console.log(this.domainKey);
		console.log("domain", this.scale[this.inverse[rKey]].domain());
		console.log("range", this.scale[this.inverse[rKey]].range());
		console.log("inverse", this.scale[this.inverse[rKey]](rValue));
		return this.scale[this.inverse[rKey]](rValue);
	}
	get domain() {
		return [this.scale[this.domainKey[0]].domain()[0],
			this.scale[this.domainKey[this.domainKey.length-1]].domain()[1]];
	}
	get range() {
		return [this.scale[this.domainKey[0]].range()[0],
			this.scale[this.domainKey[this.domainKey.length-1]].range()[1]];
	}
}
