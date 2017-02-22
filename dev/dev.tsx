"use strict";

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {GeneViewer, Feature} from '../src/main.tsx';

export function init(element: Element) {
	ReactDOM.render(<GeneViewer
		features={[gene].concat(snps)}/>, element);
}

let gene: Feature = {
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
};
/*
snp     afr     amr     eas     eur     sas     afr-amr afr-eas afr-eur afr-sas amr-eas amr-eur amr-sas eas-eur eas-sas eur-sas
rs2268363       0.113779        0.026431        0.00134515      0.0279357       0.0290877       0.203539        0.128487        0.214874        0.216831       0.0161782        0.0     0.0     0.0176604       0.0187636       0.0
rs2268361       0.109442        0.0376274       0.0     0.0457116       0.00440635      0.265012        0.134323        0.276761        0.166512        0.0295718       0.0     0.015344        0.0373124       0.00126936      0.0212528
*/
let snps: Feature[] = [{
	name: 'rs2268363',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48974188,
		end: 48974189,
	}],
	data: [{
		key: "afr",
		value: "0.113779",
	},{
		key: "amr",
		value: "0.026431",
	},{
		key: "eas",
		value: "0.00134515",
	},{
		key: "eur",
		value: "0.0279357",
	},{
		key: "sas",
		value: "0.0290877",
	},{
		key: "afr-amr",
		value: "0.203539",
	},{
		key: "afr-eas",
		value: "0.128487",
	},{
		key: "afr-eur",
		value: "0.214874",
	},{
		key: "afr-sas",
		value: "0.216831",
	},{
		key: "amr-eas",
		value: "0.0161782",
	},{
		key: "amr-eur",
		value: "0.0",
	},{
		key: "amr-sas",
		value: "0.0",
	},{
		key: "eas-eur",
		value: "0.0176604",
	},{
		key: "eas-sas",
		value: "0.0187636",
	},{
		key: "eur-sas",
		value: "0.0",
	}]
}, {
	name: 'rs2268361',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48974472,
		end: 48974473,
	}],
	data: [{
		key: "afr",
		value: "0.109442",
	},{
		key: "amr",
		value: "0.0376274",
	},{
		key: "eas",
		value: "0.0",
	},{
		key: "eur",
		value: "0.0457116",
	},{
		key: "sas",
		value: "0.00440635",
	},{
		key: "afr-amr",
		value: "0.265012",
	},{
		key: "afr-eas",
		value: "0.134323",
	},{
		key: "afr-eur",
		value: "0.276761",
	},{
		key: "afr-sas",
		value: "0.166512",
	},{
		key: "amr-eas",
		value: "0.0295718",
	},{
		key: "amr-eur",
		value: "0.0",
	},{
		key: "amr-sas",
		value: "0.015344",
	},{
		key: "eas-eur",
		value: "0.0373124",
	},{
		key: "eas-sas",
		value: "0.00126936",
	},{
		key: "eur-sas",
		value: "0.0212528",
	}]
}];
