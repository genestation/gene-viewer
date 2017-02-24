import * as d3 from 'd3-scale';

// Read features
// scale features linearly
// scale intervening spaces logarithmically

// Step 1:
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
	ftype: string,
	loc?: Location[],
	child?: Feature[],
	data?: Datum[],
}

interface Location {
	start: number,
	end: number,
	strand?: number,
}

interface Datum {
	key: string,
	value: any,
}

// Compressed representation of locs
class Scale {
	loc: Location[] = [];
	scale: {[domain: number]: d3.Linear<{}> | d3.Log<{}>} = {};
	scaleKey: number[] = [];
	inverse: {[range: number]: number} = {};
	inverseKey: number[] = [];
	setLoc(features: Feature[]) {
		this.loc = [];
		this.scale = [];
		this.scaleKey = [];
		for(let feature of features) {
			let ptr: Feature;
			let stack = [feature]
			while(stack.length) {
				ptr = stack.pop()
				if(ptr.child) {
					stack = stack.concat(ptr.child);
				} else if(ptr.loc) {
					ptr.loc.forEach((ptrloc: Location)=>{
						let spliceStart = this.loc.length;
						let spliceDelete = 0;
						if(spliceStart && this.loc[0].start >= ptrloc.start) {
							spliceStart = 0;
						}
						this.loc.forEach((loc: Location, idx: number)=>{
							if(loc.start <= ptrloc.end && loc.end >= ptrloc.start) { // Intersects
								spliceDelete++;
								if(spliceDelete == 1) {
									spliceStart = idx;
								}
							} else if (spliceStart == this.loc.length && loc.start > ptrloc.start) { // TODO better test?
								spliceStart = idx;
							}
						});
						this.loc.splice(spliceStart, spliceDelete, {
							start: Math.min(ptrloc.start,
								spliceDelete?this.loc[spliceStart].start:Number.POSITIVE_INFINITY),
							end: Math.max(ptrloc.end,
								spliceDelete?this.loc[spliceStart+spliceDelete-1].end:Number.NEGATIVE_INFINITY),
						});
					});
				}
			}
		}
		let sum = 0;
		this.loc.forEach((loc: Location, idx: number, array: Location[])=>{
			if(idx > 0) {
				// Interval
				const iStart = array[idx-1].end;
				const iEnd = loc.start;
				const iLength = Math.log(iEnd - iStart);
				this.scaleKey.push(iStart);
				this.scale[iStart] = d3.scaleLog().base(Math.E)
					.domain([iStart, iEnd])
					.range([sum, sum+iLength])
				this.inverseKey.push(sum);
				this.inverse[sum] = iStart;
				sum += iLength;
			}
			// Feature
			const fStart = loc.start;
			const fEnd = loc.end;
			const fLength = fEnd - fStart;
			this.scaleKey.push(fStart);
			this.scale[fStart] = d3.scaleLinear()
				.domain([fStart, fEnd])
				.range([sum, sum+fLength])
			this.inverseKey.push(sum);
			this.inverse[sum] = fStart;
			sum += fLength;
		});
	}
	get min() {
		return this.loc.length?this.loc[0].start:Number.NEGATIVE_INFINITY;
	}
	get max() {
		return this.loc.length?this.loc[this.loc.length-1].end:Number.POSITIVE_INFINITY;
	}
}

export function scale() {
	return new Scale();
}

// Step 2 Provide a scale service
// Allows for switching between not to scale to scale
