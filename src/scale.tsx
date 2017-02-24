import * as d3scale from 'd3-scale';

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
	setLoc = (features: Feature[])=>{
		this.loc = [];
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
						this.loc.forEach((loc: Location, idx: number)=>{
							if(loc.start <= ptrloc.end && loc.end >= ptrloc.start) { // Intersects
								spliceDelete++;
								if(spliceStart == this.loc.length) {
									spliceStart = idx;
								}
							}
						});
						this.loc.splice(spliceStart, spliceDelete, {
							start: Math.min(ptrloc.start,
								spliceStart < this.loc.length?this.loc[spliceStart].start:Number.POSITIVE_INFINITY),
							end: Math.max(ptrloc.end,
								spliceStart < this.loc.length?this.loc[spliceStart+spliceDelete-1].end:Number.NEGATIVE_INFINITY),
						});
					});
				}
			}
		}
	}
}

export function scale() {
	return new Scale();
}

// Step 2 Provide a scale service
// Allows for switching between not to scale to scale
