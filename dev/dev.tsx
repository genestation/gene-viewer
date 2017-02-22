"use strict";

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import GeneViewer from '../src/main.tsx';

export function init(element: Element) {
	ReactDOM.render(<GeneViewer
		features={[{
			name: 'FSHR',
			ftype: 'gene',
			loc: [{
				start: 48962156,
				end: 49154527,
				strand: -1,
			}],
			child: [{
				name: 'NM_181446.2',
				ftype: 'mRNA',
				loc: [{
					start: 48962156,
					end: 49154527,
					strand: -1,
				}],
				child: [{
					ftype: 'exon',
					loc: [{
						start: 49154265,
						end: 49154527,
						strand: -1,
					},{
						start: 49068218,
						end: 49068290,
						strand: -1,
					},{
						start: 49020085,
						end: 49020160,
						strand: -1,
					},{
						start: 49017488,
						end: 49017563,
						strand: -1,
					},{
						start: 48990565,
						end: 48990637,
						strand: -1,
					},{
						start: 48983097,
						end: 48983166,
						strand: -1,
					},{
						start: 48982911,
						end: 48982986,
						strand: -1,
					},{
						start: 48968697,
						end: 48968883,
						strand: -1,
					},{
						start: 48962156,
						end: 48963966,
						strand: -1,
					}],
				},{
					name: 'NP_852111.2',
					ftype: 'CDS',
					loc: [{
						start: 49154265,
						end: 49154417,
						strand: -1,
					},{
						start: 49068218,
						end: 49068290,
						strand: -1,
					},{
						start: 49020085,
						end: 49020160,
						strand: -1,
					},{
						start: 49017488,
						end: 49017563,
						strand: -1,
					},{
						start: 48990565,
						end: 48990637,
						strand: -1,
					},{
						start: 48983097,
						end: 48983166,
						strand: -1,
					},{
						start: 48982911,
						end: 48982986,
						strand: -1,
					},{
						start: 48968697,
						end: 48968883,
						strand: -1,
					},{
						start: 48962732,
						end: 48963966,
						strand: -1,
					}],
				}],
			},{
				name: 'NM_000145.3',
				ftype: 'mRNA',
				loc: [{
					start: 48962156,
					end: 49154527,
					strand: -1,
				}],
				child: [{
					ftype: 'exon',
					loc: [{
						start: 49154265,
						end: 49154527,
						strand: -1,
					},{
						start: 49068218,
						end: 49068290,
						strand: -1,
					},{
						start: 49020085,
						end: 49020160,
						strand: -1,
					},{
						start: 49017488,
						end: 49017563,
						strand: -1,
					},{
						start: 48990565,
						end: 48990637,
						strand: -1,
					},{
						start: 48988976,
						end: 48989054,
						strand: -1,
					},{
						start: 48983097,
						end: 48983166,
						strand: -1,
					},{
						start: 48982911,
						end: 48982986,
						strand: -1,
					},{
						start: 48968697,
						end: 48968883,
						strand: -1,
					},{
						start: 48962156,
						end: 48963966,
						strand: -1,
					}],
				},{
					name: '',
					ftype: 'CDS',
					loc: [{
						start: 49154265,
						end: 49154417,
						strand: -1,
					},{
						start: 49068218,
						end: 49068290,
						strand: -1,
					},{
						start: 49020085,
						end: 49020160,
						strand: -1,
					},{
						start: 49017488,
						end: 49017563,
						strand: -1,
					},{
						start: 48990565,
						end: 48990637,
						strand: -1,
					},{
						start: 48988976,
						end: 48989054,
						strand: -1,
					},{
						start: 48983097,
						end: 48983166,
						strand: -1,
					},{
						start: 48982911,
						end: 48982986,
						strand: -1,
					},{
						start: 48968697,
						end: 48968883,
						strand: -1,
					},{
						start: 48962732,
						end: 48963966,
						strand: -1,
					}],
				}],
			}],
	}]}/>, element);
}
