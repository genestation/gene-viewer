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
	start: 48962156,
	end: 49154527,
	strand: -1,
	child: [{
		name: 'NM_181446.2',
		ftype: 'mRNA',
		start: 48962156,
		end: 49154527,
		strand: -1,
		child: [{
			ftype: 'exon',
			start: 49154265,
			end: 49154527,
			strand: -1,
		},{
			ftype: 'exon',
			start: 49068218,
			end: 49068290,
			strand: -1,
		},{
			ftype: 'exon',
			start: 49020085,
			end: 49020160,
			strand: -1,
		},{
			ftype: 'exon',
			start: 49017488,
			end: 49017563,
			strand: -1,
		},{
			ftype: 'exon',
			start: 48990565,
			end: 48990637,
			strand: -1,
		},{
			ftype: 'exon',
			start: 48983097,
			end: 48983166,
			strand: -1,
		},{
			ftype: 'exon',
			start: 48982911,
			end: 48982986,
			strand: -1,
		},{
			ftype: 'exon',
			start: 48968697,
			end: 48968883,
			strand: -1,
		},{
			ftype: 'exon',
			start: 48962156,
			end: 48963966,
			strand: -1,
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
	start: 48974188,
	end: 48974189,
	data: {fst: {
		afr: 0.113779,
		amr: 0.026431,
		eas: 0.00134515,
		eur: 0.0279357,
		sas: 0.0290877,
		"afr-amr": 0.203539,
		"afr-eas": 0.128487,
		"afr-eur": 0.214874,
		"afr-sas": 0.216831,
		"amr-eas": 0.0161782,
		"amr-eur": 0.0,
		"amr-sas": 0.0,
		"eas-eur": 0.0176604,
		"eas-sas": 0.0187636,
		"eur-sas": 0.0,
	}},
},{
	name: 'rs2268361',
	ftype: 'sequence_alteration',
	start: 48974472,
	end: 48974473,
	data: {fst: {
		afr: 0.109442,
		amr: 0.0376274,
		eas: 0.0,
		eur: 0.0457116,
		sas: 0.00440635,
		"afr-amr": 0.265012,
		"afr-eas": 0.134323,
		"afr-eur": 0.276761,
		"afr-sas": 0.166512,
		"amr-eas": 0.0295718,
		"amr-eur": 0.0,
		"amr-sas": 0.015344,
		"eas-eur": 0.0373124,
		"eas-sas": 0.00126936,
		"eur-sas": 0.0212528,
	}},
}]
