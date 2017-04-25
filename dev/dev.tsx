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
			name: 'NP_000136.2',
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
},{
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
},{
	name: 'rs566285204',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49041994,
		end: 49041995,
	}],
},{
	name: 'rs573569754',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49049618,
		end: 49049619,
	}],
},{
	name: 'rs201923251',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48980184,
		end: 48980185,
	}],
},{
	name: 'rs572664202',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48995357,
		end: 48995358,
	}],
},{
	name: 'rs544262075',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49026251,
		end: 49026252,
	}],
},{
	name: 'rs386645887',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49043885,
		end: 49043888,
	}],
},{
	name: 'rs536168636',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49149852,
		end: 49149853,
	}],
},{
	name: 'rs568543967',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49034491,
		end: 49034493,
	}],
},{
	name: 'rs570522938',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49067073,
		end: 49067074,
	}],
},{
	name: 'rs535122053',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48964337,
		end: 48964338,
	}],
},{
	name: 'rs374146378',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49041799,
		end: 49041800,
	}],
},{
	name: 'rs544851215',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49015347,
		end: 49015350,
	}],
},{
	name: 'rs80287231',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49090145,
		end: 49090146,
	}],
},{
	name: 'rs144660360',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49049823,
		end: 49049838,
	}],
},{
	name: 'rs369893936',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49067225,
		end: 49067226,
	}],
},{
	name: 'rs369463493',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49028320,
		end: 49028321,
	}],
},{
	name: 'rs113777347',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49033206,
		end: 49033207,
	}],
},{
	name: 'rs577431497',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49100785,
		end: 49100786,
	}],
},{
	name: 'rs35285121',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48989843,
		end: 48989844,
	}],
},{
	name: 'rs549891494',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49139727,
		end: 49139728,
	}],
},{
	name: 'rs12620825',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48962827,
		end: 48962828,
	}],
},{
	name: 'rs535941931',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49131587,
		end: 49131588,
	}],
},{
	name: 'rs531478887',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49003876,
		end: 49003877,
	}],
},{
	name: 'rs372290922',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49082812,
		end: 49082813,
	}],
},{
	name: 'rs554332029',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49038383,
		end: 49038384,
	}],
},{
	name: 'rs547763136',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49089861,
		end: 49089864,
	}],
},{
	name: 'rs369439625',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49064087,
		end: 49064088,
	}],
},{
	name: 'rs61452747',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49042596,
		end: 49042598,
	}],
},{
	name: 'rs368861816',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49008316,
		end: 49008317,
	}],
},{
	name: 'rs71407541',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49036496,
		end: 49036504,
	}],
},{
	name: 'rs71407541',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49036496,
		end: 49036504,
	}],
},{
	name: 'rs528639884',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49025057,
		end: 49025058,
	}],
},{
	name: 'rs376526832',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49059230,
		end: 49059231,
	}],
},{
	name: 'rs369882647',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49045892,
		end: 49045897,
	}],
},{
	name: 'rs200226648',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49018846,
		end: 49018847,
	}],
},{
	name: 'rs137873721',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127740,
		end: 49127741,
	}],
},{
	name: 'rs374727730',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49094737,
		end: 49094738,
	}],
},{
	name: 'rs370571283',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49143778,
		end: 49143779,
	}],
},{
	name: 'rs573796955',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49121115,
		end: 49121116,
	}],
},{
	name: 'rs112401909',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49006699,
		end: 49006700,
	}],
},{
	name: 'rs538820633',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48977336,
		end: 48977337,
	}],
},{
	name: 'rs374642025',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49020040,
		end: 49020041,
	}],
},{
	name: 'rs369613634',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48998482,
		end: 48998483,
	}],
},{
	name: 'rs561806164',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49116520,
		end: 49116521,
	}],
},{
	name: 'rs546604053',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49078709,
		end: 49078710,
	}],
},{
	name: 'rs200369780',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49035044,
		end: 49035045,
	}],
},{
	name: 'rs146918036',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49154398,
		end: 49154399,
	}],
},{
	name: 'rs371482817',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963484,
		end: 48963485,
	}],
},{
	name: 'rs376527663',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49100783,
		end: 49100784,
	}],
},{
	name: 'rs367998665',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49130429,
		end: 49130430,
	}],
},{
	name: 'rs528901672',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49000044,
		end: 49000045,
	}],
},{
	name: 'rs201828891',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49069997,
		end: 49070002,
	}],
},{
	name: 'rs566926723',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49135467,
		end: 49135468,
	}],
},{
	name: 'rs189381911',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49110384,
		end: 49110385,
	}],
},{
	name: 'rs547597974',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49079572,
		end: 49079573,
	}],
},{
	name: 'rs112806440',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48969149,
		end: 48969150,
	}],
},{
	name: 'rs527730058',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49089735,
		end: 49089737,
	}],
},{
	name: 'rs11444533',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48999281,
		end: 48999282,
	}],
},{
	name: 'rs538550530',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127668,
		end: 49127669,
	}],
},{
	name: 'rs377297275',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48986411,
		end: 48986412,
	}],
},{
	name: 'rs373791821',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49114525,
		end: 49114526,
	}],
},{
	name: 'rs578134087',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49056078,
		end: 49056080,
	}],
},{
	name: 'rs367632322',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49093612,
		end: 49093613,
	}],
},{
	name: 'rs575345619',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49044815,
		end: 49044816,
	}],
},{
	name: 'rs60960801',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48975365,
		end: 48975366,
	}],
},{
	name: 'rs141135052',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49017508,
		end: 49017509,
	}],
},{
	name: 'rs35729500',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49006845,
		end: 49006846,
	}],
},{
	name: 'rs200299931',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49071684,
		end: 49071685,
	}],
},{
	name: 'rs200283946',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49084234,
		end: 49084236,
	}],
},{
	name: 'rs376595763',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48999986,
		end: 48999987,
	}],
},{
	name: 'rs370332388',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963025,
		end: 48963026,
	}],
},{
	name: 'rs563143279',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49062667,
		end: 49062668,
	}],
},{
	name: 'rs571699638',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49094200,
		end: 49094201,
	}],
},{
	name: 'rs370905595',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48993025,
		end: 48993026,
	}],
},{
	name: 'rs561543955',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49095729,
		end: 49095730,
	}],
},{
	name: 'rs528653832',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49081526,
		end: 49081527,
	}],
},{
	name: 'rs201848562',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49008782,
		end: 49008783,
	}],
},{
	name: 'rs370804131',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48979951,
		end: 48979952,
	}],
},{
	name: 'rs566036355',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49055323,
		end: 49055324,
	}],
},{
	name: 'rs367716206',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127461,
		end: 49127462,
	}],
},{
	name: 'rs564516016',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49085520,
		end: 49085521,
	}],
},{
	name: 'rs371954563',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49152461,
		end: 49152462,
	}],
},{
	name: 'rs533590261',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49124148,
		end: 49124149,
	}],
},{
	name: 'rs113630947',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49013723,
		end: 49013724,
	}],
},{
	name: 'rs34105893',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49078429,
		end: 49078431,
	}],
},{
	name: 'rs121909663',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963475,
		end: 48963476,
	}],
},{
	name: 'rs559564496',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49151764,
		end: 49151765,
	}],
},{
	name: 'rs565496878',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49032305,
		end: 49032306,
	}],
},{
	name: 'rs13025969',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49021925,
		end: 49021926,
	}],
},{
	name: 'rs11690610',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49128713,
		end: 49128714,
	}],
},{
	name: 'rs552710698',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49136473,
		end: 49136474,
	}],
},{
	name: 'rs202104665',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49039924,
		end: 49039925,
	}],
},{
	name: 'rs59130487',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49055562,
		end: 49055563,
	}],
},{
	name: 'rs371163932',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49058601,
		end: 49058602,
	}],
},{
	name: 'rs371163932',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49058601,
		end: 49058602,
	}],
},{
	name: 'rs202023893',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48964995,
		end: 48964996,
	}],
},{
	name: 'rs533762223',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49084514,
		end: 49084515,
	}],
},{
	name: 'rs541989759',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49089092,
		end: 49089093,
	}],
},{
	name: 'rs570916706',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49124136,
		end: 49124137,
	}],
},{
	name: 'rs190689885',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49041988,
		end: 49041989,
	}],
},{
	name: 'rs201522365',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49041006,
		end: 49041007,
	}],
},{
	name: 'rs58831906',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49049836,
		end: 49049838,
	}],
},{
	name: 'rs397871549',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49098759,
		end: 49098761,
	}],
},{
	name: 'rs13002554',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49021818,
		end: 49021819,
	}],
},{
	name: 'rs368038051',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49026563,
		end: 49026564,
	}],
},{
	name: 'rs13019293',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49132994,
		end: 49132995,
	}],
},{
	name: 'rs557708560',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48982689,
		end: 48982690,
	}],
},{
	name: 'rs555360828',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49140412,
		end: 49140413,
	}],
},{
	name: 'rs566770201',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49036496,
		end: 49036509,
	}],
},{
	name: 'rs371164419',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49110183,
		end: 49110184,
	}],
},{
	name: 'rs561943881',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49085528,
		end: 49085529,
	}],
},{
	name: 'rs61107875',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48973938,
		end: 48973939,
	}],
},{
	name: 'rs61107875',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48973938,
		end: 48973939,
	}],
},{
	name: 'rs374472761',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49048636,
		end: 49048637,
	}],
},{
	name: 'rs547462374',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49089307,
		end: 49089308,
	}],
},{
	name: 'rs556286680',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49091790,
		end: 49091791,
	}],
},{
	name: 'rs184083797',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49001757,
		end: 49001758,
	}],
},{
	name: 'rs375484083',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48987740,
		end: 48987742,
	}],
},{
	name: 'rs570424000',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49019393,
		end: 49019394,
	}],
},{
	name: 'rs207461717',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48995974,
		end: 48995975,
	}],
},{
	name: 'rs373544973',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49091478,
		end: 49091479,
	}],
},{
	name: 'rs34275347',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49147749,
		end: 49147750,
	}],
},{
	name: 'rs368337197',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49154248,
		end: 49154249,
	}],
},{
	name: 'rs538943507',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49125055,
		end: 49125056,
	}],
},{
	name: 'rs183335950',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48996685,
		end: 48996686,
	}],
},{
	name: 'rs140283005',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49034324,
		end: 49034325,
	}],
},{
	name: 'rs185554196',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49145708,
		end: 49145709,
	}],
},{
	name: 'rs548566047',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49087215,
		end: 49087216,
	}],
},{
	name: 'rs188229871',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49049569,
		end: 49049570,
	}],
},{
	name: 'rs369077670',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48990951,
		end: 48990952,
	}],
},{
	name: 'rs149502612',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48962803,
		end: 48962804,
	}],
},{
	name: 'rs188658932',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48987668,
		end: 48987669,
	}],
},{
	name: 'rs572958161',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49047210,
		end: 49047211,
	}],
},{
	name: 'rs372845944',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49096785,
		end: 49096786,
	}],
},{
	name: 'rs374178155',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48993555,
		end: 48993556,
	}],
},{
	name: 'rs566012636',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49105043,
		end: 49105044,
	}],
},{
	name: 'rs368117808',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49085275,
		end: 49085276,
	}],
},{
	name: 'rs544036896',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49137137,
		end: 49137138,
	}],
},{
	name: 'rs554774832',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49141650,
		end: 49141651,
	}],
},{
	name: 'rs539213357',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49007809,
		end: 49007810,
	}],
},{
	name: 'rs35989378',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49140701,
		end: 49140702,
	}],
},{
	name: 'rs559415268',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48977122,
		end: 48977123,
	}],
},{
	name: 'rs536893973',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49096575,
		end: 49096576,
	}],
},{
	name: 'rs190294745',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49089114,
		end: 49089115,
	}],
},{
	name: 'rs369635694',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49011493,
		end: 49011494,
	}],
},{
	name: 'rs530012239',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49096393,
		end: 49096394,
	}],
},{
	name: 'rs539475945',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49075517,
		end: 49075518,
	}],
},{
	name: 'rs566020341',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49061025,
		end: 49061026,
	}],
},{
	name: 'rs370601155',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49111700,
		end: 49111701,
	}],
},{
	name: 'rs201909194',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49017528,
		end: 49017529,
	}],
},{
	name: 'rs13416651',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49016434,
		end: 49016435,
	}],
},{
	name: 'rs576312609',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49122376,
		end: 49122377,
	}],
},{
	name: 'rs62165292',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49021879,
		end: 49021880,
	}],
},{
	name: 'rs34110902',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49143827,
		end: 49143828,
	}],
},{
	name: 'rs112763271',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48964795,
		end: 48964796,
	}],
},{
	name: 'rs371078381',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48983192,
		end: 48983193,
	}],
},{
	name: 'rs554207885',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49084722,
		end: 49084724,
	}],
},{
	name: 'rs369733812',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49008852,
		end: 49008853,
	}],
},{
	name: 'rs192736154',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49048075,
		end: 49048076,
	}],
},{
	name: 'rs368100137',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48974756,
		end: 48974757,
	}],
},{
	name: 'rs371646619',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49020037,
		end: 49020038,
	}],
},{
	name: 'rs530118435',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49056088,
		end: 49056089,
	}],
},{
	name: 'rs538483165',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49135787,
		end: 49135788,
	}],
},{
	name: 'rs551581462',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49119379,
		end: 49119380,
	}],
},{
	name: 'rs559023725',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49082615,
		end: 49082616,
	}],
},{
	name: 'rs376811852',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49086019,
		end: 49086020,
	}],
},{
	name: 'rs111246090',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49114973,
		end: 49114974,
	}],
},{
	name: 'rs2268363',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48974188,
		end: 48974189,
	}],
},{
	name: 'rs191410469',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49047870,
		end: 49047871,
	}],
},{
	name: 'rs368681409',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49067057,
		end: 49067058,
	}],
},{
	name: 'rs187323062',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48973302,
		end: 48973303,
	}],
},{
	name: 'rs367783892',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49021318,
		end: 49021319,
	}],
},{
	name: 'rs111453531',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49039169,
		end: 49039170,
	}],
},{
	name: 'rs200262648',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49120705,
		end: 49120706,
	}],
},{
	name: 'rs183214057',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49126422,
		end: 49126423,
	}],
},{
	name: 'rs367799302',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49038633,
		end: 49038641,
	}],
},{
	name: 'rs371064605',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49102845,
		end: 49102846,
	}],
},{
	name: 'rs374191266',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963151,
		end: 48963152,
	}],
},{
	name: 'rs35236514',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127890,
		end: 49127892,
	}],
},{
	name: 'rs201468160',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49056444,
		end: 49056463,
	}],
},{
	name: 'rs200144377',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963156,
		end: 48963157,
	}],
},{
	name: 'rs561812007',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49153423,
		end: 49153429,
	}],
},{
	name: 'rs368830515',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127891,
		end: 49127892,
	}],
},{
	name: 'rs74611035',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48969562,
		end: 48969563,
	}],
},{
	name: 'rs199548127',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49020174,
		end: 49020175,
	}],
},{
	name: 'rs372119266',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49124309,
		end: 49124310,
	}],
},{
	name: 'rs545234046',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49104070,
		end: 49104071,
	}],
},{
	name: 'rs67271260',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49064254,
		end: 49064255,
	}],
},{
	name: 'rs535930987',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49150071,
		end: 49150072,
	}],
},{
	name: 'rs201624803',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48984598,
		end: 48984599,
	}],
},{
	name: 'rs374094378',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49114514,
		end: 49114515,
	}],
},{
	name: 'rs374391921',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49149058,
		end: 49149059,
	}],
},{
	name: 'rs397984536',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49042596,
		end: 49042598,
	}],
},{
	name: 'rs370839300',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49129241,
		end: 49129242,
	}],
},{
	name: 'rs267599403',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963240,
		end: 48963241,
	}],
},{
	name: 'rs370234024',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48977077,
		end: 48977078,
	}],
},{
	name: 'rs566567930',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49048958,
		end: 49048959,
	}],
},{
	name: 'rs35014852',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49098759,
		end: 49098761,
	}],
},{
	name: 'rs397705082',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49040307,
		end: 49040308,
	}],
},{
	name: 'rs541412339',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49104198,
		end: 49104199,
	}],
},{
	name: 'rs562454616',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49002735,
		end: 49002736,
	}],
},{
	name: 'rs549359295',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49073548,
		end: 49073549,
	}],
},{
	name: 'rs371699227',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49068137,
		end: 49068138,
	}],
},{
	name: 'rs367606530',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49081822,
		end: 49081823,
	}],
},{
	name: 'rs549267601',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48970174,
		end: 48970175,
	}],
},{
	name: 'rs377105879',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49154476,
		end: 49154477,
	}],
},{
	name: 'rs112562066',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49099215,
		end: 49099216,
	}],
},{
	name: 'rs371875648',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49154448,
		end: 49154449,
	}],
},{
	name: 'rs572960690',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49025795,
		end: 49025796,
	}],
},{
	name: 'rs111743269',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49013923,
		end: 49013924,
	}],
},{
	name: 'rs370251850',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49133029,
		end: 49133030,
	}],
},{
	name: 'rs370251850',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49133029,
		end: 49133030,
	}],
},{
	name: 'rs78783854',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49128677,
		end: 49128678,
	}],
},{
	name: 'rs112937052',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48962831,
		end: 48962832,
	}],
},{
	name: 'rs562290734',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49129968,
		end: 49129969,
	}],
},{
	name: 'rs567930453',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49119506,
		end: 49119507,
	}],
},{
	name: 'rs35128134',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49070181,
		end: 49070182,
	}],
},{
	name: 'rs558631931',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49147980,
		end: 49147981,
	}],
},{
	name: 'rs78740236',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48998309,
		end: 48998310,
	}],
},{
	name: 'rs376362933',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48985629,
		end: 48985630,
	}],
},{
	name: 'rs35549654',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49040307,
		end: 49040308,
	}],
},{
	name: 'rs191944212',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49089459,
		end: 49089460,
	}],
},{
	name: 'rs188472442',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49107814,
		end: 49107815,
	}],
},{
	name: 'rs371386283',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127328,
		end: 49127329,
	}],
},{
	name: 'rs551912037',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49117505,
		end: 49117506,
	}],
},{
	name: 'rs183898390',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49047900,
		end: 49047901,
	}],
},{
	name: 'rs367937029',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49019249,
		end: 49019253,
	}],
},{
	name: 'rs539790992',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49025851,
		end: 49025852,
	}],
},{
	name: 'rs377349635',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49139920,
		end: 49139921,
	}],
},{
	name: 'rs551830802',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49124015,
		end: 49124016,
	}],
},{
	name: 'rs386833514',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48982917,
		end: 48982918,
	}],
},{
	name: 'rs369182138',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49070578,
		end: 49070579,
	}],
},{
	name: 'rs62164267',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49152149,
		end: 49152150,
	}],
},{
	name: 'rs539262752',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49085274,
		end: 49085275,
	}],
},{
	name: 'rs377037437',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49019847,
		end: 49019848,
	}],
},{
	name: 'rs569435971',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49089180,
		end: 49089181,
	}],
},{
	name: 'rs548523051',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48976352,
		end: 48976353,
	}],
},{
	name: 'rs35953659',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49014023,
		end: 49014024,
	}],
},{
	name: 'rs12623785',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49131094,
		end: 49131095,
	}],
},{
	name: 'rs112201855',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49088178,
		end: 49088179,
	}],
},{
	name: 'rs370492209',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49064172,
		end: 49064173,
	}],
},{
	name: 'rs71407551',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49095311,
		end: 49095312,
	}],
},{
	name: 'rs556536696',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49089960,
		end: 49089961,
	}],
},{
	name: 'rs75210933',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49104896,
		end: 49104897,
	}],
},{
	name: 'rs200909950',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127743,
		end: 49127744,
	}],
},{
	name: 'rs574005097',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49072793,
		end: 49072794,
	}],
},{
	name: 'rs369191560',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48982975,
		end: 48982976,
	}],
},{
	name: 'rs368422292',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49016756,
		end: 49016757,
	}],
},{
	name: 'rs568109041',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48977234,
		end: 48977235,
	}],
},{
	name: 'rs566751213',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49007507,
		end: 49007508,
	}],
},{
	name: 'rs35544772',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49064261,
		end: 49064262,
	}],
},{
	name: 'rs556644280',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49055306,
		end: 49055307,
	}],
},{
	name: 'rs7604476',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49038628,
		end: 49038629,
	}],
},{
	name: 'rs543959212',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48974324,
		end: 48974325,
	}],
},{
	name: 'rs540074846',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49118330,
		end: 49118331,
	}],
},{
	name: 'rs111287869',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49015712,
		end: 49015713,
	}],
},{
	name: 'rs58926557',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49021885,
		end: 49021888,
	}],
},{
	name: 'rs201949594',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49020155,
		end: 49020156,
	}],
},{
	name: 'rs371473072',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49058283,
		end: 49058284,
	}],
},{
	name: 'rs372146840',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49048716,
		end: 49048717,
	}],
},{
	name: 'rs565407694',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49036446,
		end: 49036447,
	}],
},{
	name: 'rs574861605',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48980057,
		end: 48980058,
	}],
},{
	name: 'rs368791550',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49085544,
		end: 49085545,
	}],
},{
	name: 'rs372157073',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49013282,
		end: 49013283,
	}],
},{
	name: 'rs112977491',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49061620,
		end: 49061621,
	}],
},{
	name: 'rs1295872',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49038403,
		end: 49038404,
	}],
},{
	name: 'rs571010191',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49147055,
		end: 49147056,
	}],
},{
	name: 'rs371488439',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963180,
		end: 48963181,
	}],
},{
	name: 'rs371300270',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48982351,
		end: 48982352,
	}],
},{
	name: 'rs369494728',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49147396,
		end: 49147397,
	}],
},{
	name: 'rs556960102',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49131241,
		end: 49131242,
	}],
},{
	name: 'rs28478725',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127823,
		end: 49127824,
	}],
},{
	name: 'rs567936720',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49078655,
		end: 49078656,
	}],
},{
	name: 'rs533900708',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49144471,
		end: 49144472,
	}],
},{
	name: 'rs112699078',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49017341,
		end: 49017342,
	}],
},{
	name: 'rs373845443',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49153696,
		end: 49153697,
	}],
},{
	name: 'rs11892641',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49034044,
		end: 49034045,
	}],
},{
	name: 'rs529854454',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49138114,
		end: 49138115,
	}],
},{
	name: 'rs533945812',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49129704,
		end: 49129705,
	}],
},{
	name: 'rs13411685',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49145346,
		end: 49145347,
	}],
},{
	name: 'rs547745174',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49047271,
		end: 49047272,
	}],
},{
	name: 'rs71401008',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49090123,
		end: 49090124,
	}],
},{
	name: 'rs35848948',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49085258,
		end: 49085259,
	}],
},{
	name: 'rs573532493',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49048144,
		end: 49048145,
	}],
},{
	name: 'rs369106240',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48994355,
		end: 48994356,
	}],
},{
	name: 'rs547306743',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49107785,
		end: 49107786,
	}],
},{
	name: 'rs77619733',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49076406,
		end: 49076407,
	}],
},{
	name: 'rs77619733',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49076406,
		end: 49076407,
	}],
},{
	name: 'rs188727755',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49030037,
		end: 49030038,
	}],
},{
	name: 'rs571936537',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49138458,
		end: 49138459,
	}],
},{
	name: 'rs148176407',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127828,
		end: 49127829,
	}],
},{
	name: 'rs188706491',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49089402,
		end: 49089403,
	}],
},{
	name: 'rs577633852',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49098817,
		end: 49098821,
	}],
},{
	name: 'rs71407552',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49116063,
		end: 49116064,
	}],
},{
	name: 'rs568055203',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49046374,
		end: 49046375,
	}],
},{
	name: 'rs10558428',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48977122,
		end: 48977125,
	}],
},{
	name: 'rs368646425',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49087737,
		end: 49087738,
	}],
},{
	name: 'rs207461719',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49072095,
		end: 49072096,
	}],
},{
	name: 'rs200580842',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48964992,
		end: 48964997,
	}],
},{
	name: 'rs370650290',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49135228,
		end: 49135229,
	}],
},{
	name: 'rs189323054',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49065540,
		end: 49065541,
	}],
},{
	name: 'rs371389504',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49033967,
		end: 49033969,
	}],
},{
	name: 'rs553143848',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48997985,
		end: 48997994,
	}],
},{
	name: 'rs549202316',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49137770,
		end: 49137771,
	}],
},{
	name: 'rs539495729',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49110753,
		end: 49110754,
	}],
},{
	name: 'rs564678422',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49057552,
		end: 49057554,
	}],
},{
	name: 'rs555698608',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49140460,
		end: 49140462,
	}],
},{
	name: 'rs28928870',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963474,
		end: 48963475,
	}],
},{
	name: 'rs370569165',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48983028,
		end: 48983029,
	}],
},{
	name: 'rs371331105',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49093785,
		end: 49093786,
	}],
},{
	name: 'rs3057238',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49097951,
		end: 49097955,
	}],
},{
	name: 'rs151298152',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963818,
		end: 48963819,
	}],
},{
	name: 'rs567703328',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49083517,
		end: 49083518,
	}],
},{
	name: 'rs545237102',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48966713,
		end: 48966718,
	}],
},{
	name: 'rs2103399',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49014019,
		end: 49014020,
	}],
},{
	name: 'rs151330408',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49056444,
		end: 49056469,
	}],
},{
	name: 'rs35179417',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49137851,
		end: 49137852,
	}],
},{
	name: 'rs561195648',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49035923,
		end: 49035924,
	}],
},{
	name: 'rs577949600',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48993244,
		end: 48993245,
	}],
},{
	name: 'rs145100372',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49081259,
		end: 49081261,
	}],
},{
	name: 'rs35070498',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49112224,
		end: 49112225,
	}],
},{
	name: 'rs35761126',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48999484,
		end: 48999485,
	}],
},{
	name: 'rs377077301',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49100045,
		end: 49100046,
	}],
},{
	name: 'rs377596075',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963675,
		end: 48963676,
	}],
},{
	name: 'rs549295111',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49001196,
		end: 49001197,
	}],
},{
	name: 'rs561256595',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49014206,
		end: 49014207,
	}],
},{
	name: 'rs565273495',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49018040,
		end: 49018041,
	}],
},{
	name: 'rs371271989',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49033218,
		end: 49033219,
	}],
},{
	name: 'rs372398512',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49026360,
		end: 49026361,
	}],
},{
	name: 'rs11338274',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49039923,
		end: 49039925,
	}],
},{
	name: 'rs7426210',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49009501,
		end: 49009502,
	}],
},{
	name: 'rs565354895',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49143422,
		end: 49143424,
	}],
},{
	name: 'rs548955707',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49054449,
		end: 49054450,
	}],
},{
	name: 'rs372227568',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48981961,
		end: 48981962,
	}],
},{
	name: 'rs543796068',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48964992,
		end: 48964997,
	}],
},{
	name: 'rs199566615',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49150338,
		end: 49150340,
	}],
},{
	name: 'rs371576141',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49055387,
		end: 49055388,
	}],
},{
	name: 'rs546678042',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48999909,
		end: 48999911,
	}],
},{
	name: 'rs559782568',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49099116,
		end: 49099117,
	}],
},{
	name: 'rs367770009',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48982195,
		end: 48982196,
	}],
},{
	name: 'rs145527599',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49101013,
		end: 49101015,
	}],
},{
	name: 'rs377743918',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49021567,
		end: 49021568,
	}],
},{
	name: 'rs562748750',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49088266,
		end: 49088267,
	}],
},{
	name: 'rs573580785',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49020954,
		end: 49020955,
	}],
},{
	name: 'rs555313263',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48962677,
		end: 48962678,
	}],
},{
	name: 'rs555027052',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49148101,
		end: 49148102,
	}],
},{
	name: 'rs375872879',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49082952,
		end: 49082953,
	}],
},{
	name: 'rs368181319',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49017137,
		end: 49017138,
	}],
},{
	name: 'rs72879884',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49135227,
		end: 49135228,
	}],
},{
	name: 'rs547101125',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49045892,
		end: 49045897,
	}],
},{
	name: 'rs370567668',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49094044,
		end: 49094046,
	}],
},{
	name: 'rs374804095',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49058350,
		end: 49058351,
	}],
},{
	name: 'rs140910463',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49120133,
		end: 49120134,
	}],
},{
	name: 'rs34350954',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49124436,
		end: 49124437,
	}],
},{
	name: 'rs374717371',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48970477,
		end: 48970478,
	}],
},{
	name: 'rs374582489',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49015595,
		end: 49015597,
	}],
},{
	name: 'rs374554249',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49070174,
		end: 49070175,
	}],
},{
	name: 'rs552165656',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49043865,
		end: 49043866,
	}],
},{
	name: 'rs147355964',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49017550,
		end: 49017551,
	}],
},{
	name: 'rs567628694',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49102593,
		end: 49102594,
	}],
},{
	name: 'rs544175549',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49074476,
		end: 49074477,
	}],
},{
	name: 'rs556248084',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48967873,
		end: 48967874,
	}],
},{
	name: 'rs72821785',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49126389,
		end: 49126390,
	}],
},{
	name: 'rs546430465',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48995684,
		end: 48995685,
	}],
},{
	name: 'rs371780672',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49015816,
		end: 49015817,
	}],
},{
	name: 'rs72531883',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48984593,
		end: 48984594,
	}],
},{
	name: 'rs72531883',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48984593,
		end: 48984594,
	}],
},{
	name: 'rs59781125',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49090123,
		end: 49090128,
	}],
},{
	name: 'rs373500262',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48992178,
		end: 48992179,
	}],
},{
	name: 'rs147230540',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48991424,
		end: 48991425,
	}],
},{
	name: 'rs570695146',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49112431,
		end: 49112432,
	}],
},{
	name: 'rs549454008',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48967540,
		end: 48967541,
	}],
},{
	name: 'rs562112216',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49026262,
		end: 49026263,
	}],
},{
	name: 'rs61201847',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49074206,
		end: 49074219,
	}],
},{
	name: 'rs36104068',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49062077,
		end: 49062078,
	}],
},{
	name: 'rs369974500',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49139283,
		end: 49139284,
	}],
},{
	name: 'rs371175776',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49059906,
		end: 49059907,
	}],
},{
	name: 'rs377573260',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49050414,
		end: 49050415,
	}],
},{
	name: 'rs549957806',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49149085,
		end: 49149086,
	}],
},{
	name: 'rs201515558',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49102844,
		end: 49102845,
	}],
},{
	name: 'rs60550259',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49045568,
		end: 49045569,
	}],
},{
	name: 'rs570112809',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48988008,
		end: 48988009,
	}],
},{
	name: 'rs374887891',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49015378,
		end: 49015379,
	}],
},{
	name: 'rs572944941',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49113886,
		end: 49113887,
	}],
},{
	name: 'rs578130497',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49132789,
		end: 49132790,
	}],
},{
	name: 'rs61220657',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49129046,
		end: 49129049,
	}],
},{
	name: 'rs573824633',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49028164,
		end: 49028165,
	}],
},{
	name: 'rs144400042',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49102842,
		end: 49102843,
	}],
},{
	name: 'rs370710392',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49073046,
		end: 49073047,
	}],
},{
	name: 'rs534667174',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49043950,
		end: 49043951,
	}],
},{
	name: 'rs368696747',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49102844,
		end: 49102845,
	}],
},{
	name: 'rs568195164',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48996267,
		end: 48996268,
	}],
},{
	name: 'rs541072175',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49078198,
		end: 49078199,
	}],
},{
	name: 'rs554006656',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49092143,
		end: 49092144,
	}],
},{
	name: 'rs201105591',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49030270,
		end: 49030281,
	}],
},{
	name: 'rs77335022',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49089727,
		end: 49089728,
	}],
},{
	name: 'rs191486651',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48990393,
		end: 48990394,
	}],
},{
	name: 'rs558872182',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48990901,
		end: 48990903,
	}],
},{
	name: 'rs7421065',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49013498,
		end: 49013499,
	}],
},{
	name: 'rs372743122',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49151193,
		end: 49151194,
	}],
},{
	name: 'rs201725294',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49119396,
		end: 49119397,
	}],
},{
	name: 'rs369073966',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49020045,
		end: 49020046,
	}],
},{
	name: 'rs12620153',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49025852,
		end: 49025853,
	}],
},{
	name: 'rs548672924',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49056848,
		end: 49056849,
	}],
},{
	name: 'rs550803963',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49029772,
		end: 49029773,
	}],
},{
	name: 'rs368642160',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49051475,
		end: 49051476,
	}],
},{
	name: 'rs76274298',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49010057,
		end: 49010058,
	}],
},{
	name: 'rs578261716',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49136058,
		end: 49136059,
	}],
},{
	name: 'rs371743716',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49139466,
		end: 49139467,
	}],
},{
	name: 'rs145516311',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48988983,
		end: 48988984,
	}],
},{
	name: 'rs369583512',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49154283,
		end: 49154284,
	}],
},{
	name: 'rs545872826',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49016551,
		end: 49016552,
	}],
},{
	name: 'rs539593656',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48986915,
		end: 48986916,
	}],
},{
	name: 'rs544502347',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48988930,
		end: 48988931,
	}],
},{
	name: 'rs185363532',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49024191,
		end: 49024192,
	}],
},{
	name: 'rs376588445',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48980269,
		end: 48980270,
	}],
},{
	name: 'rs575455568',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49087425,
		end: 49087426,
	}],
},{
	name: 'rs202075474',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49120352,
		end: 49120353,
	}],
},{
	name: 'rs201614520',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49112761,
		end: 49112762,
	}],
},{
	name: 'rs141416405',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48984585,
		end: 48984587,
	}],
},{
	name: 'rs568734002',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49092812,
		end: 49092813,
	}],
},{
	name: 'rs368367400',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963177,
		end: 48963178,
	}],
},{
	name: 'rs553622865',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48977374,
		end: 48977375,
	}],
},{
	name: 'rs13019186',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48990850,
		end: 48990851,
	}],
},{
	name: 'rs191446440',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49013488,
		end: 49013489,
	}],
},{
	name: 'rs538283176',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49008742,
		end: 49008744,
	}],
},{
	name: 'rs372416170',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48976458,
		end: 48976459,
	}],
},{
	name: 'rs564057614',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48980622,
		end: 48980623,
	}],
},{
	name: 'rs564293336',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49022195,
		end: 49022196,
	}],
},{
	name: 'rs373166909',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48995072,
		end: 48995077,
	}],
},{
	name: 'rs199746676',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49024288,
		end: 49024289,
	}],
},{
	name: 'rs574535306',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49014255,
		end: 49014256,
	}],
},{
	name: 'rs116882003',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49054536,
		end: 49054537,
	}],
},{
	name: 'rs566145865',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49079823,
		end: 49079824,
	}],
},{
	name: 'rs72825283',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48997438,
		end: 48997439,
	}],
},{
	name: 'rs535311252',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48981843,
		end: 48981844,
	}],
},{
	name: 'rs538513579',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49036496,
		end: 49036503,
	}],
},{
	name: 'rs376091361',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48962192,
		end: 48962193,
	}],
},{
	name: 'rs397743121',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49075811,
		end: 49075812,
	}],
},{
	name: 'rs370352010',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48966387,
		end: 48966388,
	}],
},{
	name: 'rs561208245',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49125583,
		end: 49125584,
	}],
},{
	name: 'rs374244417',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49030873,
		end: 49030874,
	}],
},{
	name: 'rs567263806',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48989396,
		end: 48989397,
	}],
},{
	name: 'rs372500776',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49033719,
		end: 49033720,
	}],
},{
	name: 'rs561047996',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48968830,
		end: 48968831,
	}],
},{
	name: 'rs576726970',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49112278,
		end: 49112280,
	}],
},{
	name: 'rs576713247',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48997386,
		end: 48997387,
	}],
},{
	name: 'rs374457314',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49080679,
		end: 49080680,
	}],
},{
	name: 'rs533991719',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49033690,
		end: 49033691,
	}],
},{
	name: 'rs562975340',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49000392,
		end: 49000393,
	}],
},{
	name: 'rs570900344',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49053776,
		end: 49053777,
	}],
},{
	name: 'rs564179919',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49001255,
		end: 49001256,
	}],
},{
	name: 'rs531584795',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49128677,
		end: 49128679,
	}],
},{
	name: 'rs373169748',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49064090,
		end: 49064091,
	}],
},{
	name: 'rs561884732',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49129746,
		end: 49129748,
	}],
},{
	name: 'rs373386233',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49042189,
		end: 49042190,
	}],
},{
	name: 'rs376921223',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49130399,
		end: 49130400,
	}],
},{
	name: 'rs552428180',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49128690,
		end: 49128691,
	}],
},{
	name: 'rs545173781',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48964017,
		end: 48964018,
	}],
},{
	name: 'rs575459855',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49067773,
		end: 49067774,
	}],
},{
	name: 'rs143806105',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49120605,
		end: 49120606,
	}],
},{
	name: 'rs571020005',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49000463,
		end: 49000464,
	}],
},{
	name: 'rs372147824',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48968764,
		end: 48968765,
	}],
},{
	name: 'rs574513627',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49096879,
		end: 49096880,
	}],
},{
	name: 'rs572588255',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49007956,
		end: 49007957,
	}],
},{
	name: 'rs191041761',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48973056,
		end: 48973057,
	}],
},{
	name: 'rs191924165',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49115988,
		end: 49115989,
	}],
},{
	name: 'rs574049050',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49059461,
		end: 49059462,
	}],
},{
	name: 'rs201807246',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49005387,
		end: 49005388,
	}],
},{
	name: 'rs9711233',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49132991,
		end: 49132992,
	}],
},{
	name: 'rs559441199',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49091295,
		end: 49091296,
	}],
},{
	name: 'rs374191757',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49064253,
		end: 49064255,
	}],
},{
	name: 'rs562178276',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49050939,
		end: 49050940,
	}],
},{
	name: 'rs373040773',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48985902,
		end: 48985903,
	}],
},{
	name: 'rs191848257',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49020650,
		end: 49020651,
	}],
},{
	name: 'rs369070864',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49070817,
		end: 49070818,
	}],
},{
	name: 'rs56376437',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49038633,
		end: 49038635,
	}],
},{
	name: 'rs56326531',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49038625,
		end: 49038629,
	}],
},{
	name: 'rs376429229',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48980661,
		end: 48980662,
	}],
},{
	name: 'rs71401010',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49102845,
		end: 49102846,
	}],
},{
	name: 'rs369496775',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49046707,
		end: 49046708,
	}],
},{
	name: 'rs34150512',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49063431,
		end: 49063434,
	}],
},{
	name: 'rs72539625',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48981893,
		end: 48981896,
	}],
},{
	name: 'rs72539625',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48981893,
		end: 48981896,
	}],
},{
	name: 'rs148924563',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49104862,
		end: 49104864,
	}],
},{
	name: 'rs550040822',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49012461,
		end: 49012462,
	}],
},{
	name: 'rs576222306',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49124684,
		end: 49124685,
	}],
},{
	name: 'rs148779737',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49150648,
		end: 49150649,
	}],
},{
	name: 'rs532656345',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48974454,
		end: 48974455,
	}],
},{
	name: 'rs374088800',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49151859,
		end: 49151861,
	}],
},{
	name: 'rs573312599',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49072586,
		end: 49072587,
	}],
},{
	name: 'rs200467795',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48985128,
		end: 48985129,
	}],
},{
	name: 'rs563208318',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48984220,
		end: 48984222,
	}],
},{
	name: 'rs565885659',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49130744,
		end: 49130745,
	}],
},{
	name: 'rs34512151',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49077220,
		end: 49077221,
	}],
},{
	name: 'rs553660846',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48997687,
		end: 48997688,
	}],
},{
	name: 'rs368735977',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48973904,
		end: 48973908,
	}],
},{
	name: 'rs565011654',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49099559,
		end: 49099561,
	}],
},{
	name: 'rs111579400',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49130614,
		end: 49130615,
	}],
},{
	name: 'rs71407538',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48976850,
		end: 48976851,
	}],
},{
	name: 'rs531858147',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49140014,
		end: 49140015,
	}],
},{
	name: 'rs200122729',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49075438,
		end: 49075443,
	}],
},{
	name: 'rs542336646',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49090526,
		end: 49090527,
	}],
},{
	name: 'rs201936398',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48987369,
		end: 48987371,
	}],
},{
	name: 'rs577928188',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49091820,
		end: 49091822,
	}],
},{
	name: 'rs201029766',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49063449,
		end: 49063450,
	}],
},{
	name: 'rs199688570',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49138842,
		end: 49138843,
	}],
},{
	name: 'rs575472661',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48993996,
		end: 48993997,
	}],
},{
	name: 'rs575523820',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49064122,
		end: 49064125,
	}],
},{
	name: 'rs189355740',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49079992,
		end: 49079993,
	}],
},{
	name: 'rs369106329',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48980343,
		end: 48980344,
	}],
},{
	name: 'rs564621703',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49047734,
		end: 49047735,
	}],
},{
	name: 'rs386833512',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963060,
		end: 48963061,
	}],
},{
	name: 'rs552470218',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49023205,
		end: 49023206,
	}],
},{
	name: 'rs147597116',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49071144,
		end: 49071145,
	}],
},{
	name: 'rs370619618',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48988024,
		end: 48988025,
	}],
},{
	name: 'rs144379697',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48973936,
		end: 48973937,
	}],
},{
	name: 'rs144379697',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48973936,
		end: 48973937,
	}],
},{
	name: 'rs533478075',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48969388,
		end: 48969389,
	}],
},{
	name: 'rs201213830',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49040309,
		end: 49040310,
	}],
},{
	name: 'rs58305048',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49003806,
		end: 49003807,
	}],
},{
	name: 'rs199924790',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49078610,
		end: 49078615,
	}],
},{
	name: 'rs554273929',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49037583,
		end: 49037587,
	}],
},{
	name: 'rs547463260',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49036085,
		end: 49036087,
	}],
},{
	name: 'rs74739257',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49052266,
		end: 49052268,
	}],
},{
	name: 'rs372690847',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49064253,
		end: 49064254,
	}],
},{
	name: 'rs200540281',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127748,
		end: 49127750,
	}],
},{
	name: 'rs140415279',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48990616,
		end: 48990617,
	}],
},{
	name: 'rs532156869',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48973251,
		end: 48973252,
	}],
},{
	name: 'rs550948716',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48979283,
		end: 48979284,
	}],
},{
	name: 'rs397872008',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49093916,
		end: 49093918,
	}],
},{
	name: 'rs189959744',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49013718,
		end: 49013719,
	}],
},{
	name: 'rs551978073',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49091132,
		end: 49091135,
	}],
},{
	name: 'rs371332407',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49023161,
		end: 49023167,
	}],
},{
	name: 'rs560503090',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49017367,
		end: 49017369,
	}],
},{
	name: 'rs561680193',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49114539,
		end: 49114540,
	}],
},{
	name: 'rs559530138',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48991879,
		end: 48991880,
	}],
},{
	name: 'rs371681143',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49061626,
		end: 49061627,
	}],
},{
	name: 'rs187661722',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49129794,
		end: 49129795,
	}],
},{
	name: 'rs201903308',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963143,
		end: 48963144,
	}],
},{
	name: 'rs370376185',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49020634,
		end: 49020635,
	}],
},{
	name: 'rs549750226',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49036072,
		end: 49036073,
	}],
},{
	name: 'rs397714463',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49141783,
		end: 49141784,
	}],
},{
	name: 'rs371024510',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49042265,
		end: 49042266,
	}],
},{
	name: 'rs554090330',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49059481,
		end: 49059482,
	}],
},{
	name: 'rs529337624',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49137551,
		end: 49137552,
	}],
},{
	name: 'rs374925114',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49061630,
		end: 49061631,
	}],
},{
	name: 'rs373439537',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48990534,
		end: 48990535,
	}],
},{
	name: 'rs368341678',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48970522,
		end: 48970528,
	}],
},{
	name: 'rs536447661',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49072223,
		end: 49072224,
	}],
},{
	name: 'rs367867366',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48993416,
		end: 48993417,
	}],
},{
	name: 'rs113271420',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49023579,
		end: 49023580,
	}],
},{
	name: 'rs557110996',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49067692,
		end: 49067693,
	}],
},{
	name: 'rs566646470',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48965145,
		end: 48965146,
	}],
},{
	name: 'rs367812667',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48983468,
		end: 48983469,
	}],
},{
	name: 'rs370391640',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48968895,
		end: 48968896,
	}],
},{
	name: 'rs536863156',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48974985,
		end: 48974986,
	}],
},{
	name: 'rs375535557',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49081194,
		end: 49081195,
	}],
},{
	name: 'rs568621300',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48984820,
		end: 48984821,
	}],
},{
	name: 'rs200669375',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48985112,
		end: 48985113,
	}],
},{
	name: 'rs547967754',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49036780,
		end: 49036781,
	}],
},{
	name: 'rs146366042',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49039131,
		end: 49039133,
	}],
},{
	name: 'rs367810392',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48977122,
		end: 48977125,
	}],
},{
	name: 'rs13415815',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49086653,
		end: 49086654,
	}],
},{
	name: 'rs35918861',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49097152,
		end: 49097153,
	}],
},{
	name: 'rs370505050',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49075066,
		end: 49075067,
	}],
},{
	name: 'rs551538993',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49079090,
		end: 49079091,
	}],
},{
	name: 'rs376652716',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49017994,
		end: 49017995,
	}],
},{
	name: 'rs111492490',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49087535,
		end: 49087536,
	}],
},{
	name: 'rs370647784',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49053277,
		end: 49053278,
	}],
},{
	name: 'rs552905188',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49014454,
		end: 49014460,
	}],
},{
	name: 'rs567554756',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49061832,
		end: 49061839,
	}],
},{
	name: 'rs112088603',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49036758,
		end: 49036759,
	}],
},{
	name: 'rs376199340',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49009307,
		end: 49009308,
	}],
},{
	name: 'rs372396444',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48966371,
		end: 48966372,
	}],
},{
	name: 'rs113054858',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49068066,
		end: 49068067,
	}],
},{
	name: 'rs544226355',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49118913,
		end: 49118914,
	}],
},{
	name: 'rs112352672',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49091749,
		end: 49091750,
	}],
},{
	name: 'rs121909660',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963103,
		end: 48963104,
	}],
},{
	name: 'rs201926497',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48983832,
		end: 48983833,
	}],
},{
	name: 'rs377028098',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49008813,
		end: 49008814,
	}],
},{
	name: 'rs147298183',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49020108,
		end: 49020109,
	}],
},{
	name: 'rs67310231',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48994630,
		end: 48994631,
	}],
},{
	name: 'rs375435627',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48989026,
		end: 48989027,
	}],
},{
	name: 'rs188446218',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49039812,
		end: 49039813,
	}],
},{
	name: 'rs546853647',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48964865,
		end: 48964870,
	}],
},{
	name: 'rs377596422',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49017444,
		end: 49017445,
	}],
},{
	name: 'rs373690021',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49087537,
		end: 49087538,
	}],
},{
	name: 'rs541794546',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49079434,
		end: 49079435,
	}],
},{
	name: 'rs572855568',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49136743,
		end: 49136744,
	}],
},{
	name: 'rs533796295',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49046795,
		end: 49046796,
	}],
},{
	name: 'rs572835371',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49089925,
		end: 49089926,
	}],
},{
	name: 'rs66680193',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49126325,
		end: 49126326,
	}],
},{
	name: 'rs546421673',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49087513,
		end: 49087515,
	}],
},{
	name: 'rs374583206',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49140524,
		end: 49140525,
	}],
},{
	name: 'rs139998658',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49148009,
		end: 49148010,
	}],
},{
	name: 'rs575882072',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49050218,
		end: 49050219,
	}],
},{
	name: 'rs187291040',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48986020,
		end: 48986021,
	}],
},{
	name: 'rs544491017',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49100610,
		end: 49100611,
	}],
},{
	name: 'rs571518939',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49033800,
		end: 49033801,
	}],
},{
	name: 'rs369997668',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49081800,
		end: 49081801,
	}],
},{
	name: 'rs144651466',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49086233,
		end: 49086234,
	}],
},{
	name: 'rs112256472',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48968529,
		end: 48968532,
	}],
},{
	name: 'rs574923521',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49054676,
		end: 49054681,
	}],
},{
	name: 'rs369119142',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49017598,
		end: 49017599,
	}],
},{
	name: 'rs562519357',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49004459,
		end: 49004460,
	}],
},{
	name: 'rs539495650',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49133160,
		end: 49133161,
	}],
},{
	name: 'rs369963359',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49072829,
		end: 49072830,
	}],
},{
	name: 'rs181700887',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49067868,
		end: 49067869,
	}],
},{
	name: 'rs569464365',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49099418,
		end: 49099419,
	}],
},{
	name: 'rs113458820',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49091497,
		end: 49091498,
	}],
},{
	name: 'rs72348325',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49072818,
		end: 49072822,
	}],
},{
	name: 'rs369015563',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49082969,
		end: 49082970,
	}],
},{
	name: 'rs376900813',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49121598,
		end: 49121599,
	}],
},{
	name: 'rs114623339',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48970937,
		end: 48970938,
	}],
},{
	name: 'rs575132194',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49119756,
		end: 49119757,
	}],
},{
	name: 'rs372392928',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49015582,
		end: 49015583,
	}],
},{
	name: 'rs376170041',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48962319,
		end: 48962320,
	}],
},{
	name: 'rs573973761',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49011445,
		end: 49011446,
	}],
},{
	name: 'rs541106127',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49113683,
		end: 49113684,
	}],
},{
	name: 'rs112531427',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49085228,
		end: 49085229,
	}],
},{
	name: 'rs182947628',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49130612,
		end: 49130613,
	}],
},{
	name: 'rs367711694',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48968863,
		end: 48968864,
	}],
},{
	name: 'rs562011876',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49072657,
		end: 49072658,
	}],
},{
	name: 'rs537093243',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49129097,
		end: 49129098,
	}],
},{
	name: 'rs553503091',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48979970,
		end: 48979971,
	}],
},{
	name: 'rs2268361',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48974472,
		end: 48974473,
	}],
},{
	name: 'rs202228245',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127741,
		end: 49127772,
	}],
},{
	name: 'rs560100191',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49090186,
		end: 49090187,
	}],
},{
	name: 'rs368009789',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49118689,
		end: 49118690,
	}],
},{
	name: 'rs578240025',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49132516,
		end: 49132517,
	}],
},{
	name: 'rs200354317',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49008254,
		end: 49008255,
	}],
},{
	name: 'rs544258489',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48978965,
		end: 48978966,
	}],
},{
	name: 'rs55655312',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49146894,
		end: 49146895,
	}],
},{
	name: 'rs377752423',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49133308,
		end: 49133309,
	}],
},{
	name: 'rs187536080',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49020805,
		end: 49020806,
	}],
},{
	name: 'rs375207238',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49015961,
		end: 49015962,
	}],
},{
	name: 'rs373721124',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49133613,
		end: 49133614,
	}],
},{
	name: 'rs376735786',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48990535,
		end: 48990536,
	}],
},{
	name: 'rs377115447',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49100162,
		end: 49100163,
	}],
},{
	name: 'rs549039831',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48977122,
		end: 48977123,
	}],
},{
	name: 'rs565036144',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49016430,
		end: 49016435,
	}],
},{
	name: 'rs7582152',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127808,
		end: 49127809,
	}],
},{
	name: 'rs377425027',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49049234,
		end: 49049235,
	}],
},{
	name: 'rs60000282',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49020506,
		end: 49020508,
	}],
},{
	name: 'rs376245815',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49145740,
		end: 49145741,
	}],
},{
	name: 'rs527512067',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49052545,
		end: 49052546,
	}],
},{
	name: 'rs563195047',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49022369,
		end: 49022370,
	}],
},{
	name: 'rs530820160',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49079101,
		end: 49079102,
	}],
},{
	name: 'rs546975349',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49048013,
		end: 49048014,
	}],
},{
	name: 'rs373720103',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49053695,
		end: 49053697,
	}],
},{
	name: 'rs182859113',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49129792,
		end: 49129793,
	}],
},{
	name: 'rs35349819',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48999282,
		end: 48999283,
	}],
},{
	name: 'rs551420765',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48984102,
		end: 48984103,
	}],
},{
	name: 'rs543557974',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49104738,
		end: 49104739,
	}],
},{
	name: 'rs534704505',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49112898,
		end: 49112899,
	}],
},{
	name: 'rs397984534',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48974757,
		end: 48974759,
	}],
},{
	name: 'rs34430149',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48965032,
		end: 48965033,
	}],
},{
	name: 'rs373696730',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963671,
		end: 48963672,
	}],
},{
	name: 'rs538007120',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49031090,
		end: 49031091,
	}],
},{
	name: 'rs28928871',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963121,
		end: 48963122,
	}],
},{
	name: 'rs531923110',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49138076,
		end: 49138077,
	}],
},{
	name: 'rs377550562',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49020091,
		end: 49020092,
	}],
},{
	name: 'rs368773992',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127893,
		end: 49127895,
	}],
},{
	name: 'rs567334357',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49051466,
		end: 49051467,
	}],
},{
	name: 'rs372683200',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49108087,
		end: 49108088,
	}],
},{
	name: 'rs567075375',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48964391,
		end: 48964392,
	}],
},{
	name: 'rs1126714',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49017527,
		end: 49017528,
	}],
},{
	name: 'rs375663675',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49041498,
		end: 49041499,
	}],
},{
	name: 'rs374520447',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49003948,
		end: 49003949,
	}],
},{
	name: 'rs200975614',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49064261,
		end: 49064262,
	}],
},{
	name: 'rs372149926',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49138022,
		end: 49138023,
	}],
},{
	name: 'rs10169885',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49038652,
		end: 49038653,
	}],
},{
	name: 'rs71401004',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49074780,
		end: 49074781,
	}],
},{
	name: 'rs71401004',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49074780,
		end: 49074781,
	}],
},{
	name: 'rs375648000',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49039890,
		end: 49039891,
	}],
},{
	name: 'rs373468388',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49044779,
		end: 49044780,
	}],
},{
	name: 'rs556646832',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49090642,
		end: 49090643,
	}],
},{
	name: 'rs2655371',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49047938,
		end: 49047941,
	}],
},{
	name: 'rs2655371',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49047938,
		end: 49047941,
	}],
},{
	name: 'rs370678880',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49075172,
		end: 49075173,
	}],
},{
	name: 'rs572555062',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48993373,
		end: 48993374,
	}],
},{
	name: 'rs368721479',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49048272,
		end: 49048273,
	}],
},{
	name: 'rs373886652',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49008923,
		end: 49008924,
	}],
},{
	name: 'rs542208977',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49126126,
		end: 49126127,
	}],
},{
	name: 'rs59083384',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49064351,
		end: 49064352,
	}],
},{
	name: 'rs148626637',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48962847,
		end: 48962848,
	}],
},{
	name: 'rs531365644',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49076152,
		end: 49076153,
	}],
},{
	name: 'rs185226085',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49093098,
		end: 49093099,
	}],
},{
	name: 'rs368055027',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49136370,
		end: 49136371,
	}],
},{
	name: 'rs60398199',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49009251,
		end: 49009253,
	}],
},{
	name: 'rs66986502',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49091468,
		end: 49091472,
	}],
},{
	name: 'rs368913969',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49050000,
		end: 49050001,
	}],
},{
	name: 'rs113187984',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49120137,
		end: 49120138,
	}],
},{
	name: 'rs142126614',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48968861,
		end: 48968862,
	}],
},{
	name: 'rs397753493',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48995846,
		end: 48995847,
	}],
},{
	name: 'rs543158673',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49136940,
		end: 49136941,
	}],
},{
	name: 'rs35315263',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49063796,
		end: 49063797,
	}],
},{
	name: 'rs397868584',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49139597,
		end: 49139599,
	}],
},{
	name: 'rs5831024',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49121795,
		end: 49121797,
	}],
},{
	name: 'rs538460616',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48972063,
		end: 48972064,
	}],
},{
	name: 'rs371348128',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49106340,
		end: 49106345,
	}],
},{
	name: 'rs538200802',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48977632,
		end: 48977633,
	}],
},{
	name: 'rs60593735',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49036489,
		end: 49036490,
	}],
},{
	name: 'rs373087121',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49083139,
		end: 49083140,
	}],
},{
	name: 'rs571249087',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49105156,
		end: 49105157,
	}],
},{
	name: 'rs184101309',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49086965,
		end: 49086966,
	}],
},{
	name: 'rs556921417',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49025230,
		end: 49025231,
	}],
},{
	name: 'rs72108367',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48987836,
		end: 48987839,
	}],
},{
	name: 'rs561719944',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49003867,
		end: 49003868,
	}],
},{
	name: 'rs186039700',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49102849,
		end: 49102850,
	}],
},{
	name: 'rs186039700',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49102849,
		end: 49102850,
	}],
},{
	name: 'rs181440420',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49142782,
		end: 49142783,
	}],
},{
	name: 'rs114607481',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49093421,
		end: 49093422,
	}],
},{
	name: 'rs552740066',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49061514,
		end: 49061515,
	}],
},{
	name: 'rs529159965',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49020506,
		end: 49020509,
	}],
},{
	name: 'rs369194959',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49018860,
		end: 49018861,
	}],
},{
	name: 'rs200037925',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49045089,
		end: 49045090,
	}],
},{
	name: 'rs536297981',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49105509,
		end: 49105510,
	}],
},{
	name: 'rs111983504',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49002650,
		end: 49002651,
	}],
},{
	name: 'rs56221410',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49038648,
		end: 49038650,
	}],
},{
	name: 'rs377700557',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49072690,
		end: 49072691,
	}],
},{
	name: 'rs377102760',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49042351,
		end: 49042352,
	}],
},{
	name: 'rs377031489',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48989045,
		end: 48989046,
	}],
},{
	name: 'rs529976675',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48996467,
		end: 48996468,
	}],
},{
	name: 'rs578242953',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49105603,
		end: 49105604,
	}],
},{
	name: 'rs367742513',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49014930,
		end: 49014936,
	}],
},{
	name: 'rs374722275',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48997237,
		end: 48997238,
	}],
},{
	name: 'rs71891895',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49022283,
		end: 49022284,
	}],
},{
	name: 'rs71891895',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49022283,
		end: 49022284,
	}],
},{
	name: 'rs201429752',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49036502,
		end: 49036503,
	}],
},{
	name: 'rs376145809',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49021306,
		end: 49021307,
	}],
},{
	name: 'rs529827660',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49148989,
		end: 49148990,
	}],
},{
	name: 'rs546978577',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49054989,
		end: 49054990,
	}],
},{
	name: 'rs368068832',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49116265,
		end: 49116266,
	}],
},{
	name: 'rs539993117',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49152486,
		end: 49152487,
	}],
},{
	name: 'rs374650061',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49086108,
		end: 49086109,
	}],
},{
	name: 'rs375033141',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49154421,
		end: 49154422,
	}],
},{
	name: 'rs578257718',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49136271,
		end: 49136272,
	}],
},{
	name: 'rs573184010',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49053284,
		end: 49053285,
	}],
},{
	name: 'rs75045300',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49124157,
		end: 49124158,
	}],
},{
	name: 'rs368958642',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48979380,
		end: 48979381,
	}],
},{
	name: 'rs543456670',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49137404,
		end: 49137405,
	}],
},{
	name: 'rs528821912',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49006204,
		end: 49006205,
	}],
},{
	name: 'rs554599523',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48991100,
		end: 48991101,
	}],
},{
	name: 'rs569452126',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49077352,
		end: 49077353,
	}],
},{
	name: 'rs551361235',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48981716,
		end: 48981717,
	}],
},{
	name: 'rs4299379',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48982533,
		end: 48982534,
	}],
},{
	name: 'rs532562367',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48995784,
		end: 48995785,
	}],
},{
	name: 'rs574192521',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49038625,
		end: 49038626,
	}],
},{
	name: 'rs199724230',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49049823,
		end: 49049836,
	}],
},{
	name: 'rs373489701',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48970359,
		end: 48970360,
	}],
},{
	name: 'rs375964496',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48979310,
		end: 48979311,
	}],
},{
	name: 'rs191211213',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49088751,
		end: 49088752,
	}],
},{
	name: 'rs201867420',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49007203,
		end: 49007209,
	}],
},{
	name: 'rs113155106',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49023436,
		end: 49023437,
	}],
},{
	name: 'rs563500169',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48988878,
		end: 48988879,
	}],
},{
	name: 'rs546867652',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49149392,
		end: 49149393,
	}],
},{
	name: 'rs560121975',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49045366,
		end: 49045367,
	}],
},{
	name: 'rs369096238',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48978876,
		end: 48978877,
	}],
},{
	name: 'rs199686035',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49083936,
		end: 49083937,
	}],
},{
	name: 'rs374759120',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48983094,
		end: 48983095,
	}],
},{
	name: 'rs377532664',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127625,
		end: 49127626,
	}],
},{
	name: 'rs533592120',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49100956,
		end: 49100957,
	}],
},{
	name: 'rs180756700',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49098685,
		end: 49098686,
	}],
},{
	name: 'rs10541638',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48969560,
		end: 48969563,
	}],
},{
	name: 'rs371205011',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49073674,
		end: 49073675,
	}],
},{
	name: 'rs367681504',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48988938,
		end: 48988939,
	}],
},{
	name: 'rs35670931',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49128677,
		end: 49128680,
	}],
},{
	name: 'rs187536249',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49095130,
		end: 49095131,
	}],
},{
	name: 'rs375980831',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49088224,
		end: 49088225,
	}],
},{
	name: 'rs373166226',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49114520,
		end: 49114521,
	}],
},{
	name: 'rs567982954',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49140320,
		end: 49140321,
	}],
},{
	name: 'rs28827576',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49061782,
		end: 49061783,
	}],
},{
	name: 'rs375206500',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48982091,
		end: 48982092,
	}],
},{
	name: 'rs566495225',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49073244,
		end: 49073245,
	}],
},{
	name: 'rs145775250',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49020121,
		end: 49020122,
	}],
},{
	name: 'rs386645893',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49144625,
		end: 49144629,
	}],
},{
	name: 'rs556877547',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49102161,
		end: 49102163,
	}],
},{
	name: 'rs375692365',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49027333,
		end: 49027334,
	}],
},{
	name: 'rs376112121',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49070640,
		end: 49070641,
	}],
},{
	name: 'rs201272833',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49048262,
		end: 49048263,
	}],
},{
	name: 'rs61350443',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49053810,
		end: 49053812,
	}],
},{
	name: 'rs575270162',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49116525,
		end: 49116526,
	}],
},{
	name: 'rs543038707',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49139876,
		end: 49139877,
	}],
},{
	name: 'rs201646936',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49009867,
		end: 49009869,
	}],
},{
	name: 'rs373210232',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49021260,
		end: 49021261,
	}],
},{
	name: 'rs113520866',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48984595,
		end: 48984596,
	}],
},{
	name: 'rs150607497',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49078709,
		end: 49078711,
	}],
},{
	name: 'rs559369855',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49079407,
		end: 49079408,
	}],
},{
	name: 'rs566814575',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48972158,
		end: 48972159,
	}],
},{
	name: 'rs544504048',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49013212,
		end: 49013213,
	}],
},{
	name: 'rs371414756',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49013023,
		end: 49013029,
	}],
},{
	name: 'rs369410071',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49024729,
		end: 49024730,
	}],
},{
	name: 'rs538762193',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49078915,
		end: 49078916,
	}],
},{
	name: 'rs551522921',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48989138,
		end: 48989139,
	}],
},{
	name: 'rs373120301',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49061749,
		end: 49061754,
	}],
},{
	name: 'rs557545372',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49139201,
		end: 49139202,
	}],
},{
	name: 'rs376929612',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48978480,
		end: 48978481,
	}],
},{
	name: 'rs376420882',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48967362,
		end: 48967363,
	}],
},{
	name: 'rs373377070',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48994629,
		end: 48994630,
	}],
},{
	name: 'rs372433010',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49076970,
		end: 49076971,
	}],
},{
	name: 'rs9309156',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49007358,
		end: 49007359,
	}],
},{
	name: 'rs35119659',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49033634,
		end: 49033635,
	}],
},{
	name: 'rs146652075',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49058672,
		end: 49058673,
	}],
},{
	name: 'rs566581958',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49064071,
		end: 49064072,
	}],
},{
	name: 'rs138465237',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49128596,
		end: 49128600,
	}],
},{
	name: 'rs547163974',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49033566,
		end: 49033567,
	}],
},{
	name: 'rs533077510',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49137251,
		end: 49137252,
	}],
},{
	name: 'rs375279102',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48962891,
		end: 48962892,
	}],
},{
	name: 'rs546185268',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49026462,
		end: 49026463,
	}],
},{
	name: 'rs34255462',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49098937,
		end: 49098938,
	}],
},{
	name: 'rs34255462',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49098937,
		end: 49098938,
	}],
},{
	name: 'rs542576010',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49011203,
		end: 49011204,
	}],
},{
	name: 'rs371576036',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49049823,
		end: 49049826,
	}],
},{
	name: 'rs372339005',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49018935,
		end: 49018938,
	}],
},{
	name: 'rs553948218',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49039433,
		end: 49039434,
	}],
},{
	name: 'rs35608687',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49093593,
		end: 49093594,
	}],
},{
	name: 'rs374554353',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49086645,
		end: 49086646,
	}],
},{
	name: 'rs202224904',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49018848,
		end: 49018849,
	}],
},{
	name: 'rs550523166',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49012719,
		end: 49012720,
	}],
},{
	name: 'rs374702206',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49043864,
		end: 49043865,
	}],
},{
	name: 'rs537671769',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49048627,
		end: 49048628,
	}],
},{
	name: 'rs35421994',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49150240,
		end: 49150242,
	}],
},{
	name: 'rs369798787',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49055892,
		end: 49055893,
	}],
},{
	name: 'rs202229033',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49042597,
		end: 49042598,
	}],
},{
	name: 'rs35914360',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49036888,
		end: 49036890,
	}],
},{
	name: 'rs79753330',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49139612,
		end: 49139613,
	}],
},{
	name: 'rs528713711',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48968405,
		end: 48968406,
	}],
},{
	name: 'rs545745372',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48964674,
		end: 48964675,
	}],
},{
	name: 'rs397732837',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49141783,
		end: 49141784,
	}],
},{
	name: 'rs372229265',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49117184,
		end: 49117185,
	}],
},{
	name: 'rs375008924',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49064061,
		end: 49064062,
	}],
},{
	name: 'rs531740644',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49081257,
		end: 49081258,
	}],
},{
	name: 'rs72393639',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49063431,
		end: 49063434,
	}],
},{
	name: 'rs543413572',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49150338,
		end: 49150340,
	}],
},{
	name: 'rs201746711',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127749,
		end: 49127750,
	}],
},{
	name: 'rs540695901',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49148617,
		end: 49148618,
	}],
},{
	name: 'rs56412936',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49038639,
		end: 49038641,
	}],
},{
	name: 'rs545546588',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49013772,
		end: 49013773,
	}],
},{
	name: 'rs373351668',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49102631,
		end: 49102632,
	}],
},{
	name: 'rs372298899',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48974757,
		end: 48974758,
	}],
},{
	name: 'rs1882554',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49021287,
		end: 49021290,
	}],
},{
	name: 'rs1882554',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49021287,
		end: 49021290,
	}],
},{
	name: 'rs13411539',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49094129,
		end: 49094130,
	}],
},{
	name: 'rs185382370',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49107372,
		end: 49107373,
	}],
},{
	name: 'rs34449959',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49096864,
		end: 49096866,
	}],
},{
	name: 'rs572409241',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49145301,
		end: 49145302,
	}],
},{
	name: 'rs536623158',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49079092,
		end: 49079094,
	}],
},{
	name: 'rs4312534',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49121360,
		end: 49121361,
	}],
},{
	name: 'rs201278107',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49038630,
		end: 49038638,
	}],
},{
	name: 'rs571943745',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49041847,
		end: 49041848,
	}],
},{
	name: 'rs369288845',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49112230,
		end: 49112231,
	}],
},{
	name: 'rs534872903',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49147281,
		end: 49147282,
	}],
},{
	name: 'rs552485551',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49038829,
		end: 49038830,
	}],
},{
	name: 'rs372192145',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49046530,
		end: 49046531,
	}],
},{
	name: 'rs542800285',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48968657,
		end: 48968658,
	}],
},{
	name: 'rs528653020',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48995849,
		end: 48995850,
	}],
},{
	name: 'rs373670221',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49094250,
		end: 49094251,
	}],
},{
	name: 'rs368221415',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49145642,
		end: 49145643,
	}],
},{
	name: 'rs35224883',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49030398,
		end: 49030400,
	}],
},{
	name: 'rs77561897',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49074779,
		end: 49074780,
	}],
},{
	name: 'rs371780180',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48988947,
		end: 48988948,
	}],
},{
	name: 'rs540466587',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49028885,
		end: 49028886,
	}],
},{
	name: 'rs563617243',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49106458,
		end: 49106459,
	}],
},{
	name: 'rs559635612',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49081099,
		end: 49081100,
	}],
},{
	name: 'rs151040317',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49082949,
		end: 49082950,
	}],
},{
	name: 'rs34956197',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49117584,
		end: 49117586,
	}],
},{
	name: 'rs386645888',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49045566,
		end: 49045569,
	}],
},{
	name: 'rs185826533',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49121660,
		end: 49121661,
	}],
},{
	name: 'rs386645894',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49147882,
		end: 49147885,
	}],
},{
	name: 'rs74335030',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49056346,
		end: 49056347,
	}],
},{
	name: 'rs75639449',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49124159,
		end: 49124160,
	}],
},{
	name: 'rs567593587',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49012118,
		end: 49012119,
	}],
},{
	name: 'rs375680877',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48985423,
		end: 48985424,
	}],
},{
	name: 'rs536023471',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49133594,
		end: 49133595,
	}],
},{
	name: 'rs567298583',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48967516,
		end: 48967517,
	}],
},{
	name: 'rs371813213',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49004007,
		end: 49004008,
	}],
},{
	name: 'rs572425754',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49056819,
		end: 49056820,
	}],
},{
	name: 'rs190036265',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49014307,
		end: 49014308,
	}],
},{
	name: 'rs7424788',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49105144,
		end: 49105145,
	}],
},{
	name: 'rs199958210',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127746,
		end: 49127747,
	}],
},{
	name: 'rs373495205',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49022135,
		end: 49022136,
	}],
},{
	name: 'rs185834645',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49075193,
		end: 49075194,
	}],
},{
	name: 'rs370497775',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49102996,
		end: 49102998,
	}],
},{
	name: 'rs541564933',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49136811,
		end: 49136812,
	}],
},{
	name: 'rs375094387',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49093594,
		end: 49093595,
	}],
},{
	name: 'rs367637521',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49120706,
		end: 49120707,
	}],
},{
	name: 'rs200532372',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963647,
		end: 48963648,
	}],
},{
	name: 'rs542197434',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49145150,
		end: 49145151,
	}],
},{
	name: 'rs373385869',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48982991,
		end: 48982992,
	}],
},{
	name: 'rs77933299',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48986391,
		end: 48986392,
	}],
},{
	name: 'rs375609737',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49027523,
		end: 49027525,
	}],
},{
	name: 'rs557001521',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49098321,
		end: 49098322,
	}],
},{
	name: 'rs550382183',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49123846,
		end: 49123847,
	}],
},{
	name: 'rs560175038',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48984345,
		end: 48984346,
	}],
},{
	name: 'rs375512146',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49013355,
		end: 49013356,
	}],
},{
	name: 'rs183322323',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49030013,
		end: 49030014,
	}],
},{
	name: 'rs369158999',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49038642,
		end: 49038644,
	}],
},{
	name: 'rs377631741',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48989250,
		end: 48989251,
	}],
},{
	name: 'rs138630937',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49002734,
		end: 49002735,
	}],
},{
	name: 'rs547043305',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49128170,
		end: 49128171,
	}],
},{
	name: 'rs374171752',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49011891,
		end: 49011892,
	}],
},{
	name: 'rs70946842',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49018832,
		end: 49018835,
	}],
},{
	name: 'rs186132767',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49111647,
		end: 49111648,
	}],
},{
	name: 'rs181188671',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49108061,
		end: 49108062,
	}],
},{
	name: 'rs372434976',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48990521,
		end: 48990522,
	}],
},{
	name: 'rs34543222',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49015436,
		end: 49015437,
	}],
},{
	name: 'rs552395590',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49089754,
		end: 49089755,
	}],
},{
	name: 'rs72178744',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49106354,
		end: 49106357,
	}],
},{
	name: 'rs565692710',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49094611,
		end: 49094612,
	}],
},{
	name: 'rs181849597',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49056966,
		end: 49056967,
	}],
},{
	name: 'rs10645537',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48984593,
		end: 48984594,
	}],
},{
	name: 'rs535897976',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49013034,
		end: 49013035,
	}],
},{
	name: 'rs142755430',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49068227,
		end: 49068228,
	}],
},{
	name: 'rs559831472',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48976153,
		end: 48976154,
	}],
},{
	name: 'rs372244380',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49081152,
		end: 49081153,
	}],
},{
	name: 'rs376550398',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49069578,
		end: 49069579,
	}],
},{
	name: 'rs373797439',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49140606,
		end: 49140607,
	}],
},{
	name: 'rs7424375',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49009614,
		end: 49009615,
	}],
},{
	name: 'rs369902785',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49064092,
		end: 49064093,
	}],
},{
	name: 'rs548785655',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49051600,
		end: 49051601,
	}],
},{
	name: 'rs377125083',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49063884,
		end: 49063885,
	}],
},{
	name: 'rs182633842',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49120717,
		end: 49120718,
	}],
},{
	name: 'rs553051060',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49064709,
		end: 49064710,
	}],
},{
	name: 'rs71399101',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48986392,
		end: 48986393,
	}],
},{
	name: 'rs552257790',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49049042,
		end: 49049044,
	}],
},{
	name: 'rs113620081',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48988605,
		end: 48988606,
	}],
},{
	name: 'rs371832631',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49128681,
		end: 49128685,
	}],
},{
	name: 'rs140247018',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49036496,
		end: 49036503,
	}],
},{
	name: 'rs185250673',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49121336,
		end: 49121337,
	}],
},{
	name: 'rs370086214',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48987252,
		end: 48987253,
	}],
},{
	name: 'rs185026246',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49109567,
		end: 49109568,
	}],
},{
	name: 'rs367834451',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49021877,
		end: 49021900,
	}],
},{
	name: 'rs545852158',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49111714,
		end: 49111715,
	}],
},{
	name: 'rs369059186',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49059801,
		end: 49059802,
	}],
},{
	name: 'rs113895169',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49019249,
		end: 49019253,
	}],
},{
	name: 'rs386645892',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49113772,
		end: 49113775,
	}],
},{
	name: 'rs539626068',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49087663,
		end: 49087664,
	}],
},{
	name: 'rs371697008',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49019795,
		end: 49019796,
	}],
},{
	name: 'rs78069385',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49140744,
		end: 49140745,
	}],
},{
	name: 'rs373187853',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49088504,
		end: 49088505,
	}],
},{
	name: 'rs551601595',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49023031,
		end: 49023032,
	}],
},{
	name: 'rs375610961',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49070414,
		end: 49070415,
	}],
},{
	name: 'rs369379728',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49135977,
		end: 49135978,
	}],
},{
	name: 'rs540638842',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48973936,
		end: 48973937,
	}],
},{
	name: 'rs548116680',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48996549,
		end: 48996550,
	}],
},{
	name: 'rs563349808',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49153092,
		end: 49153093,
	}],
},{
	name: 'rs386645883',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49007271,
		end: 49007274,
	}],
},{
	name: 'rs201814642',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127893,
		end: 49127898,
	}],
},{
	name: 'rs369220777',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49091275,
		end: 49091277,
	}],
},{
	name: 'rs371757948',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49041641,
		end: 49041642,
	}],
},{
	name: 'rs398060165',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49091132,
		end: 49091136,
	}],
},{
	name: 'rs190435360',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49102345,
		end: 49102346,
	}],
},{
	name: 'rs553127856',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49144529,
		end: 49144530,
	}],
},{
	name: 'rs542188480',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49020965,
		end: 49020966,
	}],
},{
	name: 'rs34728206',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49102037,
		end: 49102040,
	}],
},{
	name: 'rs372526711',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49131038,
		end: 49131039,
	}],
},{
	name: 'rs530243698',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49102525,
		end: 49102526,
	}],
},{
	name: 'rs533938722',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49051389,
		end: 49051390,
	}],
},{
	name: 'rs565621340',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49146255,
		end: 49146256,
	}],
},{
	name: 'rs377122771',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49082815,
		end: 49082816,
	}],
},{
	name: 'rs74399843',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49076398,
		end: 49076399,
	}],
},{
	name: 'rs561941553',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49029180,
		end: 49029181,
	}],
},{
	name: 'rs569884231',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48974870,
		end: 48974871,
	}],
},{
	name: 'rs187880149',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48997442,
		end: 48997443,
	}],
},{
	name: 'rs199536256',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48964992,
		end: 48964993,
	}],
},{
	name: 'rs554379607',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48992929,
		end: 48992930,
	}],
},{
	name: 'rs369672242',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49079474,
		end: 49079475,
	}],
},{
	name: 'rs550452783',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49060743,
		end: 49060744,
	}],
},{
	name: 'rs532624439',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48974400,
		end: 48974401,
	}],
},{
	name: 'rs72213738',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48986392,
		end: 48986393,
	}],
},{
	name: 'rs72213738',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48986392,
		end: 48986393,
	}],
},{
	name: 'rs72213738',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48986392,
		end: 48986393,
	}],
},{
	name: 'rs537890779',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49119807,
		end: 49119808,
	}],
},{
	name: 'rs144646679',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49113554,
		end: 49113556,
	}],
},{
	name: 'rs529539939',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48986678,
		end: 48986679,
	}],
},{
	name: 'rs397705896',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49121795,
		end: 49121797,
	}],
},{
	name: 'rs369955275',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49105437,
		end: 49105438,
	}],
},{
	name: 'rs527397857',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49088524,
		end: 49088525,
	}],
},{
	name: 'rs386833510',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963777,
		end: 48963778,
	}],
},{
	name: 'rs112162253',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49027624,
		end: 49027625,
	}],
},{
	name: 'rs565887690',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49108063,
		end: 49108064,
	}],
},{
	name: 'rs374230028',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48982878,
		end: 48982879,
	}],
},{
	name: 'rs374313400',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49073772,
		end: 49073773,
	}],
},{
	name: 'rs371205413',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48971909,
		end: 48971910,
	}],
},{
	name: 'rs569097543',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49051166,
		end: 49051167,
	}],
},{
	name: 'rs397873819',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49132967,
		end: 49132969,
	}],
},{
	name: 'rs533531497',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49085890,
		end: 49085891,
	}],
},{
	name: 'rs554452002',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48999367,
		end: 48999368,
	}],
},{
	name: 'rs199749182',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49063451,
		end: 49063452,
	}],
},{
	name: 'rs181259208',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49053512,
		end: 49053513,
	}],
},{
	name: 'rs369755347',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127896,
		end: 49127897,
	}],
},{
	name: 'rs538489468',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49079349,
		end: 49079351,
	}],
},{
	name: 'rs35872152',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49139597,
		end: 49139599,
	}],
},{
	name: 'rs144704968',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48988001,
		end: 48988003,
	}],
},{
	name: 'rs543620401',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49125804,
		end: 49125806,
	}],
},{
	name: 'rs370487578',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127265,
		end: 49127266,
	}],
},{
	name: 'rs370306904',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49123167,
		end: 49123168,
	}],
},{
	name: 'rs543817667',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49066121,
		end: 49066130,
	}],
},{
	name: 'rs34127173',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49104596,
		end: 49104597,
	}],
},{
	name: 'rs367886396',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49041015,
		end: 49041016,
	}],
},{
	name: 'rs558540387',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49015158,
		end: 49015159,
	}],
},{
	name: 'rs200924698',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127747,
		end: 49127748,
	}],
},{
	name: 'rs373816849',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49110279,
		end: 49110280,
	}],
},{
	name: 'rs373987968',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48978818,
		end: 48978819,
	}],
},{
	name: 'rs568031444',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49143741,
		end: 49143742,
	}],
},{
	name: 'rs573097355',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49109169,
		end: 49109170,
	}],
},{
	name: 'rs576584257',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49017882,
		end: 49017883,
	}],
},{
	name: 'rs369642093',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49131187,
		end: 49131188,
	}],
},{
	name: 'rs397869653',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49090123,
		end: 49090124,
	}],
},{
	name: 'rs376739167',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49073944,
		end: 49073945,
	}],
},{
	name: 'rs553361483',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49084970,
		end: 49084971,
	}],
},{
	name: 'rs184022422',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49129890,
		end: 49129891,
	}],
},{
	name: 'rs79789760',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49080689,
		end: 49080690,
	}],
},{
	name: 'rs200253375',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49063447,
		end: 49063448,
	}],
},{
	name: 'rs377397067',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49068223,
		end: 49068224,
	}],
},{
	name: 'rs80251275',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49124001,
		end: 49124002,
	}],
},{
	name: 'rs554410908',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49077664,
		end: 49077665,
	}],
},{
	name: 'rs535934947',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49015060,
		end: 49015061,
	}],
},{
	name: 'rs201007899',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127754,
		end: 49127755,
	}],
},{
	name: 'rs78072246',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49090146,
		end: 49090147,
	}],
},{
	name: 'rs577508385',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48977847,
		end: 48977848,
	}],
},{
	name: 'rs113258437',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48962569,
		end: 48962570,
	}],
},{
	name: 'rs200667776',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49083251,
		end: 49083252,
	}],
},{
	name: 'rs113877695',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963090,
		end: 48963091,
	}],
},{
	name: 'rs34913428',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49132967,
		end: 49132969,
	}],
},{
	name: 'rs34495125',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49125317,
		end: 49125318,
	}],
},{
	name: 'rs75571219',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49137266,
		end: 49137267,
	}],
},{
	name: 'rs560947207',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49128267,
		end: 49128268,
	}],
},{
	name: 'rs555581147',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49005814,
		end: 49005815,
	}],
},{
	name: 'rs1290101',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49038373,
		end: 49038374,
	}],
},{
	name: 'rs145890339',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49008476,
		end: 49008477,
	}],
},{
	name: 'rs534506804',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49138497,
		end: 49138498,
	}],
},{
	name: 'rs368499208',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49024376,
		end: 49024377,
	}],
},{
	name: 'rs371075764',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48973170,
		end: 48973171,
	}],
},{
	name: 'rs577601947',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48999686,
		end: 48999687,
	}],
},{
	name: 'rs70946851',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49153423,
		end: 49153429,
	}],
},{
	name: 'rs375746667',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48966381,
		end: 48966382,
	}],
},{
	name: 'rs528693331',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49149357,
		end: 49149358,
	}],
},{
	name: 'rs76938919',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49034122,
		end: 49034123,
	}],
},{
	name: 'rs570231132',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48975188,
		end: 48975189,
	}],
},{
	name: 'rs372223632',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49013870,
		end: 49013871,
	}],
},{
	name: 'rs373306579',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49121438,
		end: 49121439,
	}],
},{
	name: 'rs200591155',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49139597,
		end: 49139600,
	}],
},{
	name: 'rs148192369',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49153423,
		end: 49153429,
	}],
},{
	name: 'rs34487783',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49087276,
		end: 49087278,
	}],
},{
	name: 'rs74271809',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49039923,
		end: 49039927,
	}],
},{
	name: 'rs148247445',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49056662,
		end: 49056663,
	}],
},{
	name: 'rs386645886',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49042817,
		end: 49042820,
	}],
},{
	name: 'rs554412881',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49094750,
		end: 49094751,
	}],
},{
	name: 'rs373195880',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49013462,
		end: 49013463,
	}],
},{
	name: 'rs35914737',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49048574,
		end: 49048575,
	}],
},{
	name: 'rs183254062',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49137809,
		end: 49137810,
	}],
},{
	name: 'rs35052191',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49049187,
		end: 49049189,
	}],
},{
	name: 'rs191184513',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48982629,
		end: 48982630,
	}],
},{
	name: 'rs371801430',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49090671,
		end: 49090672,
	}],
},{
	name: 'rs77874238',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49106968,
		end: 49106969,
	}],
},{
	name: 'rs551637519',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49130059,
		end: 49130060,
	}],
},{
	name: 'rs556808358',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49066125,
		end: 49066126,
	}],
},{
	name: 'rs547065771',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49076529,
		end: 49076530,
	}],
},{
	name: 'rs536606471',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49015400,
		end: 49015401,
	}],
},{
	name: 'rs369006028',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49065809,
		end: 49065810,
	}],
},{
	name: 'rs532395196',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49110212,
		end: 49110213,
	}],
},{
	name: 'rs59462300',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49090123,
		end: 49090132,
	}],
},{
	name: 'rs121909662',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963265,
		end: 48963266,
	}],
},{
	name: 'rs79589284',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49017329,
		end: 49017330,
	}],
},{
	name: 'rs549389036',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48989479,
		end: 48989480,
	}],
},{
	name: 'rs112750981',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49010153,
		end: 49010154,
	}],
},{
	name: 'rs368806827',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49059316,
		end: 49059317,
	}],
},{
	name: 'rs556390442',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49110750,
		end: 49110751,
	}],
},{
	name: 'rs1277458',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49040421,
		end: 49040422,
	}],
},{
	name: 'rs563348058',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49130398,
		end: 49130399,
	}],
},{
	name: 'rs540013120',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49120185,
		end: 49120186,
	}],
},{
	name: 'rs536667062',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49017019,
		end: 49017020,
	}],
},{
	name: 'rs569639237',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49039699,
		end: 49039700,
	}],
},{
	name: 'rs541572224',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49043663,
		end: 49043664,
	}],
},{
	name: 'rs187463929',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48973025,
		end: 48973026,
	}],
},{
	name: 'rs141079184',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49030270,
		end: 49030297,
	}],
},{
	name: 'rs373486223',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49050186,
		end: 49050187,
	}],
},{
	name: 'rs540893080',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49040440,
		end: 49040441,
	}],
},{
	name: 'rs201013157',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49021566,
		end: 49021567,
	}],
},{
	name: 'rs540824890',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49058706,
		end: 49058707,
	}],
},{
	name: 'rs372329839',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49070382,
		end: 49070383,
	}],
},{
	name: 'rs386833515',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48968880,
		end: 48968881,
	}],
},{
	name: 'rs557973817',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49049206,
		end: 49049207,
	}],
},{
	name: 'rs371019984',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49050729,
		end: 49050730,
	}],
},{
	name: 'rs74777253',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49077501,
		end: 49077502,
	}],
},{
	name: 'rs376286167',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49013643,
		end: 49013644,
	}],
},{
	name: 'rs541227707',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49093054,
		end: 49093055,
	}],
},{
	name: 'rs10439473',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49008330,
		end: 49008331,
	}],
},{
	name: 'rs397871538',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49071802,
		end: 49071804,
	}],
},{
	name: 'rs374194913',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49088180,
		end: 49088181,
	}],
},{
	name: 'rs372531554',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49065972,
		end: 49065973,
	}],
},{
	name: 'rs539347862',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49025592,
		end: 49025593,
	}],
},{
	name: 'rs562559702',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49058996,
		end: 49058997,
	}],
},{
	name: 'rs59321155',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49021866,
		end: 49021867,
	}],
},{
	name: 'rs572141420',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48990959,
		end: 48990960,
	}],
},{
	name: 'rs556479632',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49144675,
		end: 49144676,
	}],
},{
	name: 'rs371300633',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49002734,
		end: 49002736,
	}],
},{
	name: 'rs112905075',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49094395,
		end: 49094396,
	}],
},{
	name: 'rs559104273',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48967822,
		end: 48967825,
	}],
},{
	name: 'rs79139420',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49064355,
		end: 49064356,
	}],
},{
	name: 'rs543714037',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48991100,
		end: 48991105,
	}],
},{
	name: 'rs543592760',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49017571,
		end: 49017572,
	}],
},{
	name: 'rs566207215',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49063630,
		end: 49063631,
	}],
},{
	name: 'rs188219908',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49033245,
		end: 49033246,
	}],
},{
	name: 'rs567454512',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49144548,
		end: 49144549,
	}],
},{
	name: 'rs200717952',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49061849,
		end: 49061855,
	}],
},{
	name: 'rs75865974',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49126325,
		end: 49126326,
	}],
},{
	name: 'rs534910568',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49069476,
		end: 49069477,
	}],
},{
	name: 'rs367666092',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48979846,
		end: 48979847,
	}],
},{
	name: 'rs377064737',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48980228,
		end: 48980229,
	}],
},{
	name: 'rs113402121',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49150238,
		end: 49150239,
	}],
},{
	name: 'rs70946839',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48985696,
		end: 48985699,
	}],
},{
	name: 'rs368236895',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49082623,
		end: 49082624,
	}],
},{
	name: 'rs557438293',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48982474,
		end: 48982475,
	}],
},{
	name: 'rs192362667',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49038853,
		end: 49038854,
	}],
},{
	name: 'rs549497879',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49032097,
		end: 49032098,
	}],
},{
	name: 'rs67442791',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49036496,
		end: 49036503,
	}],
},{
	name: 'rs562004463',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49006359,
		end: 49006360,
	}],
},{
	name: 'rs186907567',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49061359,
		end: 49061360,
	}],
},{
	name: 'rs77770165',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49000762,
		end: 49000763,
	}],
},{
	name: 'rs564676662',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49077997,
		end: 49077998,
	}],
},{
	name: 'rs554843887',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49075631,
		end: 49075633,
	}],
},{
	name: 'rs538746591',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49107770,
		end: 49107771,
	}],
},{
	name: 'rs536288362',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49079826,
		end: 49079827,
	}],
},{
	name: 'rs121909665',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48990628,
		end: 48990629,
	}],
},{
	name: 'rs374306544',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127973,
		end: 49127974,
	}],
},{
	name: 'rs542975008',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48991519,
		end: 48991520,
	}],
},{
	name: 'rs545356355',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49136139,
		end: 49136140,
	}],
},{
	name: 'rs66829931',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49047005,
		end: 49047006,
	}],
},{
	name: 'rs376239476',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49060972,
		end: 49060973,
	}],
},{
	name: 'rs138281715',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963244,
		end: 48963245,
	}],
},{
	name: 'rs183241170',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48993261,
		end: 48993262,
	}],
},{
	name: 'rs375501633',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48988141,
		end: 48988142,
	}],
},{
	name: 'rs561609887',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49079457,
		end: 49079458,
	}],
},{
	name: 'rs183939560',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48975248,
		end: 48975249,
	}],
},{
	name: 'rs369329157',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49071439,
		end: 49071440,
	}],
},{
	name: 'rs2655373',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49027061,
		end: 49027062,
	}],
},{
	name: 'rs370432426',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49146618,
		end: 49146619,
	}],
},{
	name: 'rs376729619',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49036798,
		end: 49036799,
	}],
},{
	name: 'rs376597499',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49142332,
		end: 49142333,
	}],
},{
	name: 'rs34287713',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49104222,
		end: 49104224,
	}],
},{
	name: 'rs185039748',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49152681,
		end: 49152682,
	}],
},{
	name: 'rs569664937',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49079974,
		end: 49079975,
	}],
},{
	name: 'rs189113775',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49111047,
		end: 49111048,
	}],
},{
	name: 'rs5831017',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48985424,
		end: 48985425,
	}],
},{
	name: 'rs560931688',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49076108,
		end: 49076109,
	}],
},{
	name: 'rs548476148',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49107072,
		end: 49107073,
	}],
},{
	name: 'rs5831022',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49071802,
		end: 49071804,
	}],
},{
	name: 'rs121909658',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48983124,
		end: 48983125,
	}],
},{
	name: 'rs563481236',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49085082,
		end: 49085083,
	}],
},{
	name: 'rs552835085',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49002666,
		end: 49002667,
	}],
},{
	name: 'rs544280524',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48967995,
		end: 48967996,
	}],
},{
	name: 'rs11885931',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49038637,
		end: 49038638,
	}],
},{
	name: 'rs61681324',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49064061,
		end: 49064062,
	}],
},{
	name: 'rs61681324',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49064061,
		end: 49064062,
	}],
},{
	name: 'rs530214102',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48986145,
		end: 48986146,
	}],
},{
	name: 'rs62165295',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49021885,
		end: 49021886,
	}],
},{
	name: 'rs367809518',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48971392,
		end: 48971393,
	}],
},{
	name: 'rs376137373',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49047603,
		end: 49047604,
	}],
},{
	name: 'rs397872061',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48964992,
		end: 48964994,
	}],
},{
	name: 'rs373109222',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49143255,
		end: 49143256,
	}],
},{
	name: 'rs76937853',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127329,
		end: 49127330,
	}],
},{
	name: 'rs572834206',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49066613,
		end: 49066614,
	}],
},{
	name: 'rs185811464',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49062543,
		end: 49062544,
	}],
},{
	name: 'rs552333066',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49048457,
		end: 49048458,
	}],
},{
	name: 'rs542129107',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127592,
		end: 49127593,
	}],
},{
	name: 'rs577708818',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49149058,
		end: 49149059,
	}],
},{
	name: 'rs574102991',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49053743,
		end: 49053744,
	}],
},{
	name: 'rs561285609',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49104454,
		end: 49104455,
	}],
},{
	name: 'rs182083441',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49044048,
		end: 49044049,
	}],
},{
	name: 'rs2268364',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48966363,
		end: 48966364,
	}],
},{
	name: 'rs537497951',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49025338,
		end: 49025339,
	}],
},{
	name: 'rs374143438',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48971305,
		end: 48971306,
	}],
},{
	name: 'rs185689118',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49131841,
		end: 49131842,
	}],
},{
	name: 'rs145304181',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127915,
		end: 49127916,
	}],
},{
	name: 'rs552164288',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48982753,
		end: 48982754,
	}],
},{
	name: 'rs548112488',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49132670,
		end: 49132671,
	}],
},{
	name: 'rs367863574',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48972387,
		end: 48972388,
	}],
},{
	name: 'rs541986001',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49070898,
		end: 49070899,
	}],
},{
	name: 'rs147801328',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48994293,
		end: 48994294,
	}],
},{
	name: 'rs373547026',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48974454,
		end: 48974455,
	}],
},{
	name: 'rs78678301',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49140714,
		end: 49140718,
	}],
},{
	name: 'rs137939058',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127737,
		end: 49127747,
	}],
},{
	name: 'rs7568182',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127829,
		end: 49127830,
	}],
},{
	name: 'rs574594700',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49099059,
		end: 49099060,
	}],
},{
	name: 'rs552077749',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49075345,
		end: 49075346,
	}],
},{
	name: 'rs547569754',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49118174,
		end: 49118175,
	}],
},{
	name: 'rs569438448',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49018534,
		end: 49018535,
	}],
},{
	name: 'rs199700056',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49093155,
		end: 49093157,
	}],
},{
	name: 'rs111484910',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49009113,
		end: 49009114,
	}],
},{
	name: 'rs530211485',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49081131,
		end: 49081132,
	}],
},{
	name: 'rs68181837',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48973252,
		end: 48973253,
	}],
},{
	name: 'rs375488525',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49041035,
		end: 49041036,
	}],
},{
	name: 'rs60949511',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49087069,
		end: 49087070,
	}],
},{
	name: 'rs60949511',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49087069,
		end: 49087070,
	}],
},{
	name: 'rs60949511',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49087069,
		end: 49087070,
	}],
},{
	name: 'rs35287724',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49065877,
		end: 49065878,
	}],
},{
	name: 'rs562468977',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48995239,
		end: 48995240,
	}],
},{
	name: 'rs72289679',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127518,
		end: 49127521,
	}],
},{
	name: 'rs201402792',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49091132,
		end: 49091135,
	}],
},{
	name: 'rs142714780',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49034556,
		end: 49034557,
	}],
},{
	name: 'rs199708888',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49063433,
		end: 49063434,
	}],
},{
	name: 'rs201729150',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49093630,
		end: 49093631,
	}],
},{
	name: 'rs60323129',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49040421,
		end: 49040423,
	}],
},{
	name: 'rs191634359',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49106494,
		end: 49106495,
	}],
},{
	name: 'rs375437198',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49109085,
		end: 49109086,
	}],
},{
	name: 'rs13024122',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49085981,
		end: 49085982,
	}],
},{
	name: 'rs554035294',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127799,
		end: 49127800,
	}],
},{
	name: 'rs537182714',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49057654,
		end: 49057655,
	}],
},{
	name: 'rs376967247',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49034414,
		end: 49034415,
	}],
},{
	name: 'rs563286504',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49131915,
		end: 49131916,
	}],
},{
	name: 'rs188152309',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49085246,
		end: 49085247,
	}],
},{
	name: 'rs551152185',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49123756,
		end: 49123757,
	}],
},{
	name: 'rs397822780',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49045568,
		end: 49045569,
	}],
},{
	name: 'rs370457475',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49116327,
		end: 49116328,
	}],
},{
	name: 'rs370457475',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49116327,
		end: 49116328,
	}],
},{
	name: 'rs374074233',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49029314,
		end: 49029315,
	}],
},{
	name: 'rs372340043',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49068327,
		end: 49068328,
	}],
},{
	name: 'rs375993923',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49016730,
		end: 49016731,
	}],
},{
	name: 'rs373161295',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49068322,
		end: 49068323,
	}],
},{
	name: 'rs373446406',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49061132,
		end: 49061133,
	}],
},{
	name: 'rs578133314',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49038160,
		end: 49038161,
	}],
},{
	name: 'rs368228664',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49111819,
		end: 49111820,
	}],
},{
	name: 'rs564997001',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49039056,
		end: 49039057,
	}],
},{
	name: 'rs575637881',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49015352,
		end: 49015353,
	}],
},{
	name: 'rs201439022',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49103985,
		end: 49103986,
	}],
},{
	name: 'rs35719941',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49126324,
		end: 49126325,
	}],
},{
	name: 'rs56132405',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49038630,
		end: 49038632,
	}],
},{
	name: 'rs373477745',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49055702,
		end: 49055703,
	}],
},{
	name: 'rs549864854',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49054882,
		end: 49054883,
	}],
},{
	name: 'rs34174059',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49100431,
		end: 49100432,
	}],
},{
	name: 'rs556717789',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49005539,
		end: 49005540,
	}],
},{
	name: 'rs375993085',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49092591,
		end: 49092594,
	}],
},{
	name: 'rs571350523',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49012656,
		end: 49012657,
	}],
},{
	name: 'rs370679071',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49057557,
		end: 49057558,
	}],
},{
	name: 'rs534864694',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49108067,
		end: 49108068,
	}],
},{
	name: 'rs386645885',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49041662,
		end: 49041665,
	}],
},{
	name: 'rs564811165',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49003587,
		end: 49003614,
	}],
},{
	name: 'rs74472625',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49114624,
		end: 49114625,
	}],
},{
	name: 'rs71407536',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48966431,
		end: 48966432,
	}],
},{
	name: 'rs558091839',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49115785,
		end: 49115786,
	}],
},{
	name: 'rs71407550',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49085009,
		end: 49085010,
	}],
},{
	name: 'rs556852079',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49023982,
		end: 49023983,
	}],
},{
	name: 'rs397868513',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49124158,
		end: 49124160,
	}],
},{
	name: 'rs111343726',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49059414,
		end: 49059415,
	}],
},{
	name: 'rs34680327',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49059551,
		end: 49059552,
	}],
},{
	name: 'rs567969320',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49093018,
		end: 49093019,
	}],
},{
	name: 'rs567969320',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49093018,
		end: 49093019,
	}],
},{
	name: 'rs372042219',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49010764,
		end: 49010765,
	}],
},{
	name: 'rs10181627',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48973259,
		end: 48973260,
	}],
},{
	name: 'rs368417932',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48985293,
		end: 48985294,
	}],
},{
	name: 'rs527783049',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49138455,
		end: 49138456,
	}],
},{
	name: 'rs570731139',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49044057,
		end: 49044079,
	}],
},{
	name: 'rs530615751',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48988914,
		end: 48988915,
	}],
},{
	name: 'rs545517446',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49141259,
		end: 49141260,
	}],
},{
	name: 'rs547267618',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48984784,
		end: 48984785,
	}],
},{
	name: 'rs546763651',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49026744,
		end: 49026745,
	}],
},{
	name: 'rs538022522',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48972770,
		end: 48972771,
	}],
},{
	name: 'rs551243654',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49101946,
		end: 49101947,
	}],
},{
	name: 'rs536741186',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49040582,
		end: 49040583,
	}],
},{
	name: 'rs535407920',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49117941,
		end: 49117942,
	}],
},{
	name: 'rs561684198',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49154361,
		end: 49154362,
	}],
},{
	name: 'rs534375590',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49119475,
		end: 49119476,
	}],
},{
	name: 'rs200656867',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48999299,
		end: 48999300,
	}],
},{
	name: 'rs374792949',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49077155,
		end: 49077156,
	}],
},{
	name: 'rs60516180',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49102845,
		end: 49102846,
	}],
},{
	name: 'rs550354930',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49116759,
		end: 49116760,
	}],
},{
	name: 'rs59319553',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49132967,
		end: 49132970,
	}],
},{
	name: 'rs529769913',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49036653,
		end: 49036654,
	}],
},{
	name: 'rs1295871',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49038436,
		end: 49038437,
	}],
},{
	name: 'rs150233822',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49104387,
		end: 49104388,
	}],
},{
	name: 'rs367893230',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49073855,
		end: 49073856,
	}],
},{
	name: 'rs370471724',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49082267,
		end: 49082268,
	}],
},{
	name: 'rs550057606',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49144244,
		end: 49144245,
	}],
},{
	name: 'rs553145303',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49064006,
		end: 49064010,
	}],
},{
	name: 'rs201226679',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48977544,
		end: 48977545,
	}],
},{
	name: 'rs200280706',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49008789,
		end: 49008790,
	}],
},{
	name: 'rs397706107',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49013512,
		end: 49013513,
	}],
},{
	name: 'rs574310013',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49042710,
		end: 49042711,
	}],
},{
	name: 'rs543519147',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48983668,
		end: 48983669,
	}],
},{
	name: 'rs555766014',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49032399,
		end: 49032400,
	}],
},{
	name: 'rs184087088',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49103683,
		end: 49103684,
	}],
},{
	name: 'rs33965509',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49074784,
		end: 49074785,
	}],
},{
	name: 'rs33965509',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49074784,
		end: 49074785,
	}],
},{
	name: 'rs33965509',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49074784,
		end: 49074785,
	}],
},{
	name: 'rs371470532',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49009401,
		end: 49009402,
	}],
},{
	name: 'rs576399680',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49040991,
		end: 49040992,
	}],
},{
	name: 'rs199708988',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49128677,
		end: 49128680,
	}],
},{
	name: 'rs111786988',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48981921,
		end: 48981922,
	}],
},{
	name: 'rs191859389',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49055342,
		end: 49055343,
	}],
},{
	name: 'rs560236461',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48985820,
		end: 48985821,
	}],
},{
	name: 'rs565696331',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49018148,
		end: 49018149,
	}],
},{
	name: 'rs192981018',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49024497,
		end: 49024498,
	}],
},{
	name: 'rs201271447',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49074218,
		end: 49074219,
	}],
},{
	name: 'rs550456439',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49134748,
		end: 49134749,
	}],
},{
	name: 'rs375297536',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49024662,
		end: 49024663,
	}],
},{
	name: 'rs373896803',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48966790,
		end: 48966791,
	}],
},{
	name: 'rs538672442',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49081513,
		end: 49081514,
	}],
},{
	name: 'rs13413619',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49011938,
		end: 49011939,
	}],
},{
	name: 'rs573967996',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48965758,
		end: 48965759,
	}],
},{
	name: 'rs371810640',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48985787,
		end: 48985788,
	}],
},{
	name: 'rs267599405',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49020123,
		end: 49020124,
	}],
},{
	name: 'rs560771748',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48966843,
		end: 48966844,
	}],
},{
	name: 'rs143458203',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48991099,
		end: 48991100,
	}],
},{
	name: 'rs373900746',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49051105,
		end: 49051106,
	}],
},{
	name: 'rs76783450',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49128678,
		end: 49128679,
	}],
},{
	name: 'rs113506591',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48977028,
		end: 48977029,
	}],
},{
	name: 'rs370515726',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48999002,
		end: 48999003,
	}],
},{
	name: 'rs549844603',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49128444,
		end: 49128445,
	}],
},{
	name: 'rs59286902',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49107533,
		end: 49107538,
	}],
},{
	name: 'rs554565002',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49084223,
		end: 49084225,
	}],
},{
	name: 'rs376405231',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49080332,
		end: 49080333,
	}],
},{
	name: 'rs13025970',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49021927,
		end: 49021928,
	}],
},{
	name: 'rs35004985',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48979441,
		end: 48979442,
	}],
},{
	name: 'rs368673266',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49142534,
		end: 49142535,
	}],
},{
	name: 'rs527810286',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49104521,
		end: 49104522,
	}],
},{
	name: 'rs373331329',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49145434,
		end: 49145435,
	}],
},{
	name: 'rs528976954',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49001711,
		end: 49001712,
	}],
},{
	name: 'rs207461718',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49040667,
		end: 49040668,
	}],
},{
	name: 'rs533300645',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49052480,
		end: 49052481,
	}],
},{
	name: 'rs567378892',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49025251,
		end: 49025252,
	}],
},{
	name: 'rs200304003',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49029679,
		end: 49029680,
	}],
},{
	name: 'rs573985844',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49010663,
		end: 49010666,
	}],
},{
	name: 'rs200401696',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48976156,
		end: 48976157,
	}],
},{
	name: 'rs571316534',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49140134,
		end: 49140135,
	}],
},{
	name: 'rs143598774',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49090144,
		end: 49090145,
	}],
},{
	name: 'rs184144415',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49073145,
		end: 49073146,
	}],
},{
	name: 'rs370597718',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49050612,
		end: 49050613,
	}],
},{
	name: 'rs562006711',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49086546,
		end: 49086547,
	}],
},{
	name: 'rs540927987',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49042662,
		end: 49042663,
	}],
},{
	name: 'rs376121685',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49067559,
		end: 49067560,
	}],
},{
	name: 'rs370759040',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48992997,
		end: 48992998,
	}],
},{
	name: 'rs374933025',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49046165,
		end: 49046166,
	}],
},{
	name: 'rs140510316',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49072818,
		end: 49072822,
	}],
},{
	name: 'rs201602611',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49018847,
		end: 49018848,
	}],
},{
	name: 'rs375924215',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49103410,
		end: 49103411,
	}],
},{
	name: 'rs35876884',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49088842,
		end: 49088845,
	}],
},{
	name: 'rs200708674',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49038634,
		end: 49038635,
	}],
},{
	name: 'rs561240844',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48993681,
		end: 48993682,
	}],
},{
	name: 'rs71401003',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49038623,
		end: 49038625,
	}],
},{
	name: 'rs80149912',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49049823,
		end: 49049836,
	}],
},{
	name: 'rs570149787',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49045586,
		end: 49045588,
	}],
},{
	name: 'rs2707277',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49027059,
		end: 49027062,
	}],
},{
	name: 'rs2707277',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49027059,
		end: 49027062,
	}],
},{
	name: 'rs528719532',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49107069,
		end: 49107070,
	}],
},{
	name: 'rs542391841',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49101147,
		end: 49101148,
	}],
},{
	name: 'rs570057328',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49146649,
		end: 49146650,
	}],
},{
	name: 'rs563452573',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49140708,
		end: 49140709,
	}],
},{
	name: 'rs79109092',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49016800,
		end: 49016801,
	}],
},{
	name: 'rs397870582',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49125317,
		end: 49125318,
	}],
},{
	name: 'rs145815060',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963216,
		end: 48963217,
	}],
},{
	name: 'rs74179101',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49021831,
		end: 49021832,
	}],
},{
	name: 'rs74179101',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49021831,
		end: 49021832,
	}],
},{
	name: 'rs67597787',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49021862,
		end: 49021863,
	}],
},{
	name: 'rs369145028',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48962687,
		end: 48962688,
	}],
},{
	name: 'rs530671306',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49112342,
		end: 49112343,
	}],
},{
	name: 'rs577030728',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49153325,
		end: 49153326,
	}],
},{
	name: 'rs148563173',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49042602,
		end: 49042603,
	}],
},{
	name: 'rs541779686',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48999622,
		end: 48999623,
	}],
},{
	name: 'rs531585721',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49147727,
		end: 49147729,
	}],
},{
	name: 'rs11312298',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48974757,
		end: 48974759,
	}],
},{
	name: 'rs527903029',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49139366,
		end: 49139368,
	}],
},{
	name: 'rs138656125',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48982937,
		end: 48982938,
	}],
},{
	name: 'rs369642126',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49084697,
		end: 49084698,
	}],
},{
	name: 'rs369004656',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49131819,
		end: 49131820,
	}],
},{
	name: 'rs200191550',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48962988,
		end: 48962989,
	}],
},{
	name: 'rs56402028',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49076871,
		end: 49076872,
	}],
},{
	name: 'rs184168401',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49026528,
		end: 49026529,
	}],
},{
	name: 'rs373787397',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49138262,
		end: 49138263,
	}],
},{
	name: 'rs36099655',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49013512,
		end: 49013513,
	}],
},{
	name: 'rs368534764',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48988791,
		end: 48988792,
	}],
},{
	name: 'rs528335290',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49153778,
		end: 49153779,
	}],
},{
	name: 'rs559878386',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49006200,
		end: 49006201,
	}],
},{
	name: 'rs372585952',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49134703,
		end: 49134704,
	}],
},{
	name: 'rs377452345',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49084721,
		end: 49084722,
	}],
},{
	name: 'rs11680961',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49138758,
		end: 49138759,
	}],
},{
	name: 'rs12474496',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127919,
		end: 49127920,
	}],
},{
	name: 'rs531262560',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49109226,
		end: 49109227,
	}],
},{
	name: 'rs200572961',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49076430,
		end: 49076432,
	}],
},{
	name: 'rs192437784',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49145490,
		end: 49145491,
	}],
},{
	name: 'rs371890146',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49078894,
		end: 49078895,
	}],
},{
	name: 'rs556644063',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49056065,
		end: 49056066,
	}],
},{
	name: 'rs112847109',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49116081,
		end: 49116082,
	}],
},{
	name: 'rs190743255',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49081497,
		end: 49081498,
	}],
},{
	name: 'rs542853453',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49001261,
		end: 49001264,
	}],
},{
	name: 'rs397813924',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48990891,
		end: 48990892,
	}],
},{
	name: 'rs575600286',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49145183,
		end: 49145184,
	}],
},{
	name: 'rs34629878',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49138263,
		end: 49138264,
	}],
},{
	name: 'rs35155984',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49069835,
		end: 49069837,
	}],
},{
	name: 'rs370447585',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49015222,
		end: 49015223,
	}],
},{
	name: 'rs566965410',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49050350,
		end: 49050352,
	}],
},{
	name: 'rs369034484',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49135464,
		end: 49135465,
	}],
},{
	name: 'rs367748700',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49110250,
		end: 49110251,
	}],
},{
	name: 'rs369622568',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48992239,
		end: 48992240,
	}],
},{
	name: 'rs193276571',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49025931,
		end: 49025932,
	}],
},{
	name: 'rs569259904',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49073552,
		end: 49073553,
	}],
},{
	name: 'rs569815671',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49088044,
		end: 49088045,
	}],
},{
	name: 'rs184174255',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48999738,
		end: 48999739,
	}],
},{
	name: 'rs374935293',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49076259,
		end: 49076260,
	}],
},{
	name: 'rs377065798',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49005387,
		end: 49005388,
	}],
},{
	name: 'rs371177775',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49084829,
		end: 49084830,
	}],
},{
	name: 'rs201345977',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49038606,
		end: 49038607,
	}],
},{
	name: 'rs569868648',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127188,
		end: 49127189,
	}],
},{
	name: 'rs200915059',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49017523,
		end: 49017524,
	}],
},{
	name: 'rs374449978',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49117778,
		end: 49117779,
	}],
},{
	name: 'rs537485876',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49042456,
		end: 49042457,
	}],
},{
	name: 'rs574885647',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49106213,
		end: 49106214,
	}],
},{
	name: 'rs377116672',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48982900,
		end: 48982901,
	}],
},{
	name: 'rs372660030',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49082995,
		end: 49082996,
	}],
},{
	name: 'rs372034595',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49103885,
		end: 49103886,
	}],
},{
	name: 'rs201502949',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49021881,
		end: 49021902,
	}],
},{
	name: 'rs561783189',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48983254,
		end: 48983255,
	}],
},{
	name: 'rs34370636',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127545,
		end: 49127547,
	}],
},{
	name: 'rs555925399',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49053667,
		end: 49053668,
	}],
},{
	name: 'rs369693551',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48992146,
		end: 48992148,
	}],
},{
	name: 'rs397971443',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49064351,
		end: 49064352,
	}],
},{
	name: 'rs571663093',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49002185,
		end: 49002186,
	}],
},{
	name: 'rs3082696',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49020506,
		end: 49020508,
	}],
},{
	name: 'rs375475417',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963102,
		end: 48963103,
	}],
},{
	name: 'rs386645881',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48979805,
		end: 48979809,
	}],
},{
	name: 'rs114528248',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963410,
		end: 48963411,
	}],
},{
	name: 'rs539416571',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49121795,
		end: 49121796,
	}],
},{
	name: 'rs557731968',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49148164,
		end: 49148165,
	}],
},{
	name: 'rs376171259',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49017925,
		end: 49017926,
	}],
},{
	name: 'rs397870799',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49093594,
		end: 49093595,
	}],
},{
	name: 'rs557569723',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49075775,
		end: 49075776,
	}],
},{
	name: 'rs563088806',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49111429,
		end: 49111430,
	}],
},{
	name: 'rs62161853',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48977115,
		end: 48977116,
	}],
},{
	name: 'rs558232358',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48973714,
		end: 48973715,
	}],
},{
	name: 'rs181175567',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49121503,
		end: 49121504,
	}],
},{
	name: 'rs570305010',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49100613,
		end: 49100614,
	}],
},{
	name: 'rs371934406',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49055530,
		end: 49055542,
	}],
},{
	name: 'rs373399039',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49001886,
		end: 49001887,
	}],
},{
	name: 'rs35994990',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49073154,
		end: 49073155,
	}],
},{
	name: 'rs532200605',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49132352,
		end: 49132353,
	}],
},{
	name: 'rs569666862',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49097864,
		end: 49097865,
	}],
},{
	name: 'rs567198515',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49076647,
		end: 49076649,
	}],
},{
	name: 'rs572897399',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49068092,
		end: 49068093,
	}],
},{
	name: 'rs371115174',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48975320,
		end: 48975321,
	}],
},{
	name: 'rs544688652',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49046774,
		end: 49046775,
	}],
},{
	name: 'rs35629226',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49038742,
		end: 49038743,
	}],
},{
	name: 'rs375460821',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48999282,
		end: 48999283,
	}],
},{
	name: 'rs199608636',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49153934,
		end: 49153935,
	}],
},{
	name: 'rs567594767',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48997168,
		end: 48997170,
	}],
},{
	name: 'rs552547794',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48966441,
		end: 48966442,
	}],
},{
	name: 'rs370447252',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49068264,
		end: 49068265,
	}],
},{
	name: 'rs369796757',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48989029,
		end: 48989030,
	}],
},{
	name: 'rs111890906',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49145019,
		end: 49145020,
	}],
},{
	name: 'rs550555677',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49070374,
		end: 49070375,
	}],
},{
	name: 'rs555967246',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49054727,
		end: 49054728,
	}],
},{
	name: 'rs386390139',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48990891,
		end: 48990892,
	}],
},{
	name: 'rs369813928',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49050515,
		end: 49050516,
	}],
},{
	name: 'rs527594965',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49031636,
		end: 49031637,
	}],
},{
	name: 'rs377420370',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49067340,
		end: 49067341,
	}],
},{
	name: 'rs374697050',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49027911,
		end: 49027912,
	}],
},{
	name: 'rs34014225',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49048261,
		end: 49048263,
	}],
},{
	name: 'rs34907162',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49039676,
		end: 49039677,
	}],
},{
	name: 'rs552935301',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49046113,
		end: 49046114,
	}],
},{
	name: 'rs571816743',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49078909,
		end: 49078910,
	}],
},{
	name: 'rs541003671',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48988252,
		end: 48988253,
	}],
},{
	name: 'rs199943222',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49126477,
		end: 49126478,
	}],
},{
	name: 'rs540282763',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49081347,
		end: 49081348,
	}],
},{
	name: 'rs568568294',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49002975,
		end: 49002976,
	}],
},{
	name: 'rs371305742',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49140019,
		end: 49140020,
	}],
},{
	name: 'rs34967566',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49148918,
		end: 49148919,
	}],
},{
	name: 'rs368250768',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49044816,
		end: 49044817,
	}],
},{
	name: 'rs112982551',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49019461,
		end: 49019462,
	}],
},{
	name: 'rs572932724',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48985101,
		end: 48985104,
	}],
},{
	name: 'rs111861924',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49047649,
		end: 49047651,
	}],
},{
	name: 'rs376965248',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49056108,
		end: 49056109,
	}],
},{
	name: 'rs13004077',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49083492,
		end: 49083493,
	}],
},{
	name: 'rs559237177',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48977710,
		end: 48977711,
	}],
},{
	name: 'rs369388504',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49129440,
		end: 49129441,
	}],
},{
	name: 'rs374179800',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49025051,
		end: 49025052,
	}],
},{
	name: 'rs556941053',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49122137,
		end: 49122139,
	}],
},{
	name: 'rs200031252',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49032115,
		end: 49032116,
	}],
},{
	name: 'rs556869775',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49044443,
		end: 49044444,
	}],
},{
	name: 'rs560773381',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48982930,
		end: 48982931,
	}],
},{
	name: 'rs532788400',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49118982,
		end: 49118983,
	}],
},{
	name: 'rs552251266',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49046031,
		end: 49046032,
	}],
},{
	name: 'rs575419911',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49024086,
		end: 49024087,
	}],
},{
	name: 'rs374352796',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49082477,
		end: 49082478,
	}],
},{
	name: 'rs141738147',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49039658,
		end: 49039661,
	}],
},{
	name: 'rs70946846',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49047004,
		end: 49047005,
	}],
},{
	name: 'rs201078200',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963225,
		end: 48963226,
	}],
},{
	name: 'rs56890721',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49087097,
		end: 49087098,
	}],
},{
	name: 'rs56890721',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49087097,
		end: 49087098,
	}],
},{
	name: 'rs554386619',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49081904,
		end: 49081905,
	}],
},{
	name: 'rs541097248',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48997843,
		end: 48997844,
	}],
},{
	name: 'rs569172382',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49025267,
		end: 49025268,
	}],
},{
	name: 'rs563016073',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49125229,
		end: 49125230,
	}],
},{
	name: 'rs368012036',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48964432,
		end: 48964433,
	}],
},{
	name: 'rs375329429',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48990602,
		end: 48990603,
	}],
},{
	name: 'rs531286567',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49026432,
		end: 49026433,
	}],
},{
	name: 'rs189087587',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49071327,
		end: 49071328,
	}],
},{
	name: 'rs375863550',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49103192,
		end: 49103193,
	}],
},{
	name: 'rs546699128',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49025071,
		end: 49025072,
	}],
},{
	name: 'rs192485587',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49083935,
		end: 49083936,
	}],
},{
	name: 'rs141137270',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48975867,
		end: 48975868,
	}],
},{
	name: 'rs572960683',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49062248,
		end: 49062249,
	}],
},{
	name: 'rs532562325',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48973137,
		end: 48973138,
	}],
},{
	name: 'rs199998104',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48964996,
		end: 48964997,
	}],
},{
	name: 'rs544983226',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49101461,
		end: 49101462,
	}],
},{
	name: 'rs545624707',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49060567,
		end: 49060568,
	}],
},{
	name: 'rs200790073',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49082244,
		end: 49082247,
	}],
},{
	name: 'rs370314028',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48992607,
		end: 48992608,
	}],
},{
	name: 'rs551047499',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49142480,
		end: 49142481,
	}],
},{
	name: 'rs566807283',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48965080,
		end: 48965081,
	}],
},{
	name: 'rs533540659',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48980999,
		end: 48981000,
	}],
},{
	name: 'rs576022516',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48968966,
		end: 48968967,
	}],
},{
	name: 'rs374643506',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49029690,
		end: 49029691,
	}],
},{
	name: 'rs368345114',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49015513,
		end: 49015514,
	}],
},{
	name: 'rs386645884',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49040305,
		end: 49040308,
	}],
},{
	name: 'rs567812909',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49093060,
		end: 49093061,
	}],
},{
	name: 'rs140339079',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49062952,
		end: 49062954,
	}],
},{
	name: 'rs371087153',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49002381,
		end: 49002382,
	}],
},{
	name: 'rs552152800',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49097896,
		end: 49097897,
	}],
},{
	name: 'rs76882619',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49140194,
		end: 49140195,
	}],
},{
	name: 'rs202174501',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49136859,
		end: 49136860,
	}],
},{
	name: 'rs78673055',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49151157,
		end: 49151158,
	}],
},{
	name: 'rs371585750',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49066328,
		end: 49066329,
	}],
},{
	name: 'rs538879823',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127199,
		end: 49127200,
	}],
},{
	name: 'rs35705787',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49125277,
		end: 49125279,
	}],
},{
	name: 'rs190085193',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49042494,
		end: 49042495,
	}],
},{
	name: 'rs371089850',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49083379,
		end: 49083380,
	}],
},{
	name: 'rs544171966',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49034794,
		end: 49034795,
	}],
},{
	name: 'rs13388017',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49038643,
		end: 49038644,
	}],
},{
	name: 'rs562880300',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49141096,
		end: 49141097,
	}],
},{
	name: 'rs375603115',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49017581,
		end: 49017582,
	}],
},{
	name: 'rs373416539',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48983078,
		end: 48983079,
	}],
},{
	name: 'rs531276503',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49002324,
		end: 49002325,
	}],
},{
	name: 'rs536075506',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48994049,
		end: 48994050,
	}],
},{
	name: 'rs535774317',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49152725,
		end: 49152726,
	}],
},{
	name: 'rs529983006',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48998016,
		end: 48998017,
	}],
},{
	name: 'rs538941334',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49147939,
		end: 49147940,
	}],
},{
	name: 'rs573381354',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49131449,
		end: 49131450,
	}],
},{
	name: 'rs559479957',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49067126,
		end: 49067127,
	}],
},{
	name: 'rs543932218',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48995718,
		end: 48995719,
	}],
},{
	name: 'rs377194571',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49022933,
		end: 49022934,
	}],
},{
	name: 'rs386833513',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963019,
		end: 48963020,
	}],
},{
	name: 'rs183432492',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49081618,
		end: 49081619,
	}],
},{
	name: 'rs377089172',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49123092,
		end: 49123093,
	}],
},{
	name: 'rs556482458',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49078609,
		end: 49078610,
	}],
},{
	name: 'rs150146783',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49068247,
		end: 49068248,
	}],
},{
	name: 'rs536091508',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49093353,
		end: 49093354,
	}],
},{
	name: 'rs7422758',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49013500,
		end: 49013501,
	}],
},{
	name: 'rs367612940',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49071698,
		end: 49071699,
	}],
},{
	name: 'rs146774301',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48998767,
		end: 48998769,
	}],
},{
	name: 'rs201752956',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49090123,
		end: 49090132,
	}],
},{
	name: 'rs565325004',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49089271,
		end: 49089272,
	}],
},{
	name: 'rs547975490',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49120952,
		end: 49120953,
	}],
},{
	name: 'rs190078786',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49062796,
		end: 49062797,
	}],
},{
	name: 'rs111557526',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49038631,
		end: 49038632,
	}],
},{
	name: 'rs56891689',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127328,
		end: 49127330,
	}],
},{
	name: 'rs397873897',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49088842,
		end: 49088845,
	}],
},{
	name: 'rs552003896',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48964109,
		end: 48964110,
	}],
},{
	name: 'rs35983165',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49072682,
		end: 49072683,
	}],
},{
	name: 'rs370394509',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49049787,
		end: 49049788,
	}],
},{
	name: 'rs34127690',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49094823,
		end: 49094824,
	}],
},{
	name: 'rs150235567',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963150,
		end: 48963151,
	}],
},{
	name: 'rs58594174',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49121795,
		end: 49121796,
	}],
},{
	name: 'rs186402314',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49098252,
		end: 49098253,
	}],
},{
	name: 'rs201240250',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49049835,
		end: 49049836,
	}],
},{
	name: 'rs34018023',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49011672,
		end: 49011674,
	}],
},{
	name: 'rs375700282',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49017447,
		end: 49017448,
	}],
},{
	name: 'rs2134813',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49112845,
		end: 49112846,
	}],
},{
	name: 'rs148022042',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48984123,
		end: 48984124,
	}],
},{
	name: 'rs376637561',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49082195,
		end: 49082196,
	}],
},{
	name: 'rs533530884',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49103579,
		end: 49103580,
	}],
},{
	name: 'rs34986202',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49145825,
		end: 49145826,
	}],
},{
	name: 'rs201219807',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49114516,
		end: 49114517,
	}],
},{
	name: 'rs564114745',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49107256,
		end: 49107257,
	}],
},{
	name: 'rs376633875',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49013120,
		end: 49013121,
	}],
},{
	name: 'rs566729531',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49027678,
		end: 49027679,
	}],
},{
	name: 'rs200550464',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49038602,
		end: 49038603,
	}],
},{
	name: 'rs556423280',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48966252,
		end: 48966253,
	}],
},{
	name: 'rs566428975',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49079170,
		end: 49079172,
	}],
},{
	name: 'rs202199596',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49089615,
		end: 49089616,
	}],
},{
	name: 'rs563856809',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49049988,
		end: 49049989,
	}],
},{
	name: 'rs35574043',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49090124,
		end: 49090125,
	}],
},{
	name: 'rs35574043',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49090124,
		end: 49090125,
	}],
},{
	name: 'rs35639630',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49093916,
		end: 49093918,
	}],
},{
	name: 'rs377020096',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963836,
		end: 48963837,
	}],
},{
	name: 'rs368042533',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49095489,
		end: 49095490,
	}],
},{
	name: 'rs76738831',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49016800,
		end: 49016801,
	}],
},{
	name: 'rs76738831',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49016800,
		end: 49016801,
	}],
},{
	name: 'rs151109524',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963094,
		end: 48963095,
	}],
},{
	name: 'rs558740979',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49036496,
		end: 49036497,
	}],
},{
	name: 'rs558740979',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49036496,
		end: 49036497,
	}],
},{
	name: 'rs201461362',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49089725,
		end: 49089741,
	}],
},{
	name: 'rs201576735',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49121503,
		end: 49121505,
	}],
},{
	name: 'rs547398186',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49126874,
		end: 49126875,
	}],
},{
	name: 'rs202099953',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49140713,
		end: 49140715,
	}],
},{
	name: 'rs114297239',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48962942,
		end: 48962943,
	}],
},{
	name: 'rs536062685',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48985014,
		end: 48985015,
	}],
},{
	name: 'rs201801007',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49108626,
		end: 49108627,
	}],
},{
	name: 'rs373478422',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49010252,
		end: 49010253,
	}],
},{
	name: 'rs543780761',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48981538,
		end: 48981539,
	}],
},{
	name: 'rs370714869',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48985417,
		end: 48985418,
	}],
},{
	name: 'rs374434786',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49116333,
		end: 49116334,
	}],
},{
	name: 'rs377475310',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49140653,
		end: 49140654,
	}],
},{
	name: 'rs560490357',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49032905,
		end: 49032906,
	}],
},{
	name: 'rs367968013',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49030706,
		end: 49030707,
	}],
},{
	name: 'rs559167562',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48982164,
		end: 48982165,
	}],
},{
	name: 'rs184442012',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49116582,
		end: 49116583,
	}],
},{
	name: 'rs146365090',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48973265,
		end: 48973266,
	}],
},{
	name: 'rs565911794',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48998125,
		end: 48998126,
	}],
},{
	name: 'rs374623853',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49040267,
		end: 49040268,
	}],
},{
	name: 'rs370979211',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49042130,
		end: 49042131,
	}],
},{
	name: 'rs200306506',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49090123,
		end: 49090130,
	}],
},{
	name: 'rs191454347',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49031795,
		end: 49031796,
	}],
},{
	name: 'rs547761957',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49140318,
		end: 49140319,
	}],
},{
	name: 'rs77991770',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49091132,
		end: 49091136,
	}],
},{
	name: 'rs372490466',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49048270,
		end: 49048271,
	}],
},{
	name: 'rs34017410',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49128491,
		end: 49128493,
	}],
},{
	name: 'rs373874774',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49072885,
		end: 49072886,
	}],
},{
	name: 'rs13005640',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127902,
		end: 49127903,
	}],
},{
	name: 'rs397870370',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48964992,
		end: 48964994,
	}],
},{
	name: 'rs369531965',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48968905,
		end: 48968906,
	}],
},{
	name: 'rs557773758',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48985136,
		end: 48985137,
	}],
},{
	name: 'rs377196789',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48997748,
		end: 48997749,
	}],
},{
	name: 'rs557814775',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127518,
		end: 49127519,
	}],
},{
	name: 'rs5831015',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48973011,
		end: 48973013,
	}],
},{
	name: 'rs561598179',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49146298,
		end: 49146299,
	}],
},{
	name: 'rs59789081',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48964067,
		end: 48964068,
	}],
},{
	name: 'rs186791396',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49134140,
		end: 49134141,
	}],
},{
	name: 'rs5831020',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49049823,
		end: 49049834,
	}],
},{
	name: 'rs368363518',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48996242,
		end: 48996243,
	}],
},{
	name: 'rs201510902',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49085215,
		end: 49085216,
	}],
},{
	name: 'rs546191814',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49071139,
		end: 49071140,
	}],
},{
	name: 'rs111255945',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49106810,
		end: 49106811,
	}],
},{
	name: 'rs141446762',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49122463,
		end: 49122464,
	}],
},{
	name: 'rs570731084',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49049065,
		end: 49049066,
	}],
},{
	name: 'rs372140731',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49032414,
		end: 49032415,
	}],
},{
	name: 'rs141198625',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49071682,
		end: 49071685,
	}],
},{
	name: 'rs184284111',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49100645,
		end: 49100646,
	}],
},{
	name: 'rs557233171',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49072361,
		end: 49072362,
	}],
},{
	name: 'rs62165293',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49021881,
		end: 49021882,
	}],
},{
	name: 'rs556118116',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49051625,
		end: 49051626,
	}],
},{
	name: 'rs142226600',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49013100,
		end: 49013101,
	}],
},{
	name: 'rs374455029',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49087220,
		end: 49087221,
	}],
},{
	name: 'rs558613737',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49108732,
		end: 49108733,
	}],
},{
	name: 'rs374788157',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49025361,
		end: 49025362,
	}],
},{
	name: 'rs374034554',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48996982,
		end: 48996983,
	}],
},{
	name: 'rs564014674',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49137248,
		end: 49137249,
	}],
},{
	name: 'rs185062316',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49055752,
		end: 49055753,
	}],
},{
	name: 'rs201360403',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49107218,
		end: 49107219,
	}],
},{
	name: 'rs181851787',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48990902,
		end: 48990903,
	}],
},{
	name: 'rs369894878',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49152678,
		end: 49152679,
	}],
},{
	name: 'rs35210289',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49112568,
		end: 49112569,
	}],
},{
	name: 'rs201785248',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49022290,
		end: 49022291,
	}],
},{
	name: 'rs555660013',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49034049,
		end: 49034050,
	}],
},{
	name: 'rs575092154',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49098529,
		end: 49098530,
	}],
},{
	name: 'rs76496060',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49071682,
		end: 49071685,
	}],
},{
	name: 'rs145998490',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49090366,
		end: 49090367,
	}],
},{
	name: 'rs148535647',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49139390,
		end: 49139392,
	}],
},{
	name: 'rs370645852',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49042409,
		end: 49042410,
	}],
},{
	name: 'rs200220658',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49061734,
		end: 49061749,
	}],
},{
	name: 'rs555299820',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49119670,
		end: 49119671,
	}],
},{
	name: 'rs372945996',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49024821,
		end: 49024822,
	}],
},{
	name: 'rs146854254',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49026618,
		end: 49026619,
	}],
},{
	name: 'rs34394877',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48986392,
		end: 48986393,
	}],
},{
	name: 'rs34394877',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48986392,
		end: 48986393,
	}],
},{
	name: 'rs34394877',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48986392,
		end: 48986393,
	}],
},{
	name: 'rs375173744',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49009344,
		end: 49009345,
	}],
},{
	name: 'rs369636760',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48979633,
		end: 48979634,
	}],
},{
	name: 'rs557984345',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49073876,
		end: 49073877,
	}],
},{
	name: 'rs549785667',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49014514,
		end: 49014515,
	}],
},{
	name: 'rs368574903',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49082523,
		end: 49082524,
	}],
},{
	name: 'rs557833197',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48962460,
		end: 48962461,
	}],
},{
	name: 'rs372250633',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49038626,
		end: 49038627,
	}],
},{
	name: 'rs374894095',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48991463,
		end: 48991464,
	}],
},{
	name: 'rs564903184',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49146617,
		end: 49146618,
	}],
},{
	name: 'rs373711593',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49038646,
		end: 49038647,
	}],
},{
	name: 'rs530727950',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49143350,
		end: 49143351,
	}],
},{
	name: 'rs138079934',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49017495,
		end: 49017496,
	}],
},{
	name: 'rs376359468',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48998927,
		end: 48998928,
	}],
},{
	name: 'rs139899211',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49018832,
		end: 49018835,
	}],
},{
	name: 'rs35028950',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48971768,
		end: 48971770,
	}],
},{
	name: 'rs370645661',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49069839,
		end: 49069840,
	}],
},{
	name: 'rs535342610',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48984060,
		end: 48984061,
	}],
},{
	name: 'rs573345353',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49073947,
		end: 49073948,
	}],
},{
	name: 'rs577588596',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49152527,
		end: 49152528,
	}],
},{
	name: 'rs534079972',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48972222,
		end: 48972223,
	}],
},{
	name: 'rs397868435',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49027849,
		end: 49027850,
	}],
},{
	name: 'rs375180964',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49004466,
		end: 49004467,
	}],
},{
	name: 'rs577093192',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49093048,
		end: 49093049,
	}],
},{
	name: 'rs539308398',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49017379,
		end: 49017380,
	}],
},{
	name: 'rs553136113',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48999477,
		end: 48999478,
	}],
},{
	name: 'rs571856267',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48987740,
		end: 48987742,
	}],
},{
	name: 'rs397935055',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49008177,
		end: 49008178,
	}],
},{
	name: 'rs534003105',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49027899,
		end: 49027900,
	}],
},{
	name: 'rs566595907',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49112566,
		end: 49112567,
	}],
},{
	name: 'rs113130232',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49090123,
		end: 49090134,
	}],
},{
	name: 'rs397827636',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49021567,
		end: 49021568,
	}],
},{
	name: 'rs371029245',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49012203,
		end: 49012204,
	}],
},{
	name: 'rs28831485',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49085362,
		end: 49085363,
	}],
},{
	name: 'rs13032866',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49013530,
		end: 49013531,
	}],
},{
	name: 'rs35465003',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49129550,
		end: 49129552,
	}],
},{
	name: 'rs80343551',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49129046,
		end: 49129050,
	}],
},{
	name: 'rs548323105',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49118952,
		end: 49118957,
	}],
},{
	name: 'rs373591815',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49067334,
		end: 49067335,
	}],
},{
	name: 'rs370735940',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49032303,
		end: 49032304,
	}],
},{
	name: 'rs191304330',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49152893,
		end: 49152894,
	}],
},{
	name: 'rs368446379',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48982073,
		end: 48982074,
	}],
},{
	name: 'rs368135496',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49122414,
		end: 49122415,
	}],
},{
	name: 'rs3838213',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48985103,
		end: 48985113,
	}],
},{
	name: 'rs536938129',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49021303,
		end: 49021304,
	}],
},{
	name: 'rs112689038',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48979149,
		end: 48979150,
	}],
},{
	name: 'rs568507828',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49117066,
		end: 49117067,
	}],
},{
	name: 'rs5831025',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49124158,
		end: 49124160,
	}],
},{
	name: 'rs573049088',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49023940,
		end: 49023973,
	}],
},{
	name: 'rs184236251',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49061100,
		end: 49061101,
	}],
},{
	name: 'rs577233564',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49108946,
		end: 49108947,
	}],
},{
	name: 'rs185327664',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49105280,
		end: 49105281,
	}],
},{
	name: 'rs80263253',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49053540,
		end: 49053543,
	}],
},{
	name: 'rs67372600',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49120701,
		end: 49120705,
	}],
},{
	name: 'rs542291902',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48980123,
		end: 48980124,
	}],
},{
	name: 'rs374719504',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48990657,
		end: 48990658,
	}],
},{
	name: 'rs369750776',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48984678,
		end: 48984679,
	}],
},{
	name: 'rs550195309',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49151140,
		end: 49151141,
	}],
},{
	name: 'rs398090309',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49120703,
		end: 49120705,
	}],
},{
	name: 'rs398090309',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49120703,
		end: 49120705,
	}],
},{
	name: 'rs368526656',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49054157,
		end: 49054158,
	}],
},{
	name: 'rs55824712',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49008177,
		end: 49008178,
	}],
},{
	name: 'rs572873095',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49116427,
		end: 49116428,
	}],
},{
	name: 'rs79689481',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48970522,
		end: 48970528,
	}],
},{
	name: 'rs574189615',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49002608,
		end: 49002609,
	}],
},{
	name: 'rs4991812',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49021887,
		end: 49021888,
	}],
},{
	name: 'rs543817756',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49016976,
		end: 49016978,
	}],
},{
	name: 'rs556007258',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49131531,
		end: 49131532,
	}],
},{
	name: 'rs35054706',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49115970,
		end: 49115971,
	}],
},{
	name: 'rs139409773',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48966491,
		end: 48966492,
	}],
},{
	name: 'rs549045631',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49027159,
		end: 49027160,
	}],
},{
	name: 'rs370303040',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49148700,
		end: 49148701,
	}],
},{
	name: 'rs539546609',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49067881,
		end: 49067882,
	}],
},{
	name: 'rs190558725',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49046215,
		end: 49046216,
	}],
},{
	name: 'rs559176024',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48999268,
		end: 48999269,
	}],
},{
	name: 'rs147685926',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963864,
		end: 48963865,
	}],
},{
	name: 'rs372872742',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49144094,
		end: 49144095,
	}],
},{
	name: 'rs77898765',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48972674,
		end: 48972675,
	}],
},{
	name: 'rs370531564',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49083118,
		end: 49083119,
	}],
},{
	name: 'rs202057680',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49058668,
		end: 49058669,
	}],
},{
	name: 'rs371684302',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48962704,
		end: 48962705,
	}],
},{
	name: 'rs374993414',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49051392,
		end: 49051393,
	}],
},{
	name: 'rs12999595',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49042777,
		end: 49042778,
	}],
},{
	name: 'rs533233831',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49051125,
		end: 49051126,
	}],
},{
	name: 'rs372843897',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49009499,
		end: 49009500,
	}],
},{
	name: 'rs369322507',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49010191,
		end: 49010192,
	}],
},{
	name: 'rs578212016',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48980212,
		end: 48980213,
	}],
},{
	name: 'rs79974348',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48984593,
		end: 48984594,
	}],
},{
	name: 'rs572838692',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48982825,
		end: 48982826,
	}],
},{
	name: 'rs566884775',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49133484,
		end: 49133485,
	}],
},{
	name: 'rs181823331',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49139561,
		end: 49139562,
	}],
},{
	name: 'rs148306119',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49138618,
		end: 49138619,
	}],
},{
	name: 'rs545330144',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49133193,
		end: 49133194,
	}],
},{
	name: 'rs376240295',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48971937,
		end: 48971938,
	}],
},{
	name: 'rs574092323',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49049823,
		end: 49049838,
	}],
},{
	name: 'rs573082606',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49078988,
		end: 49078989,
	}],
},{
	name: 'rs527942492',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48972747,
		end: 48972748,
	}],
},{
	name: 'rs192355477',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49020926,
		end: 49020927,
	}],
},{
	name: 'rs551652926',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49051224,
		end: 49051229,
	}],
},{
	name: 'rs534331528',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49141092,
		end: 49141093,
	}],
},{
	name: 'rs571379058',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48996867,
		end: 48996868,
	}],
},{
	name: 'rs70946840',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48989272,
		end: 48989281,
	}],
},{
	name: 'rs562848805',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49120631,
		end: 49120632,
	}],
},{
	name: 'rs386645890',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49099798,
		end: 49099809,
	}],
},{
	name: 'rs143942463',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49098936,
		end: 49098937,
	}],
},{
	name: 'rs528167009',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48998814,
		end: 48998819,
	}],
},{
	name: 'rs549868495',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49105068,
		end: 49105069,
	}],
},{
	name: 'rs193229087',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49131742,
		end: 49131743,
	}],
},{
	name: 'rs557912360',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49070451,
		end: 49070452,
	}],
},{
	name: 'rs377657419',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48962849,
		end: 48962850,
	}],
},{
	name: 'rs372223800',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49000043,
		end: 49000044,
	}],
},{
	name: 'rs199948641',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48962820,
		end: 48962821,
	}],
},{
	name: 'rs566923095',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49075187,
		end: 49075188,
	}],
},{
	name: 'rs532966255',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48981702,
		end: 48981704,
	}],
},{
	name: 'rs56172410',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49061734,
		end: 49061749,
	}],
},{
	name: 'rs369318515',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48997354,
		end: 48997355,
	}],
},{
	name: 'rs538254372',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49051392,
		end: 49051393,
	}],
},{
	name: 'rs369999511',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49020702,
		end: 49020703,
	}],
},{
	name: 'rs10181628',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48973265,
		end: 48973266,
	}],
},{
	name: 'rs577846104',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49112202,
		end: 49112203,
	}],
},{
	name: 'rs569086447',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49070398,
		end: 49070399,
	}],
},{
	name: 'rs371099574',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48995727,
		end: 48995728,
	}],
},{
	name: 'rs550984309',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49144432,
		end: 49144433,
	}],
},{
	name: 'rs567422534',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49109090,
		end: 49109091,
	}],
},{
	name: 'rs555581890',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49028060,
		end: 49028061,
	}],
},{
	name: 'rs150389524',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49130185,
		end: 49130186,
	}],
},{
	name: 'rs111684599',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49096711,
		end: 49096712,
	}],
},{
	name: 'rs200656126',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49068566,
		end: 49068567,
	}],
},{
	name: 'rs375209036',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49026887,
		end: 49026888,
	}],
},{
	name: 'rs200790317',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49090153,
		end: 49090154,
	}],
},{
	name: 'rs144870135',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49052362,
		end: 49052365,
	}],
},{
	name: 'rs200713482',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49083836,
		end: 49083837,
	}],
},{
	name: 'rs552492875',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49020542,
		end: 49020544,
	}],
},{
	name: 'rs186069633',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49119170,
		end: 49119171,
	}],
},{
	name: 'rs34329354',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49088761,
		end: 49088763,
	}],
},{
	name: 'rs372523662',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49009143,
		end: 49009144,
	}],
},{
	name: 'rs543416286',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49132394,
		end: 49132395,
	}],
},{
	name: 'rs181565030',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49108214,
		end: 49108215,
	}],
},{
	name: 'rs370639594',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49078585,
		end: 49078586,
	}],
},{
	name: 'rs527746458',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49041799,
		end: 49041800,
	}],
},{
	name: 'rs185923233',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49053951,
		end: 49053952,
	}],
},{
	name: 'rs546960830',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49069509,
		end: 49069510,
	}],
},{
	name: 'rs11903022',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49009412,
		end: 49009413,
	}],
},{
	name: 'rs530803519',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48976525,
		end: 48976526,
	}],
},{
	name: 'rs555930351',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49125281,
		end: 49125282,
	}],
},{
	name: 'rs34054612',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49040603,
		end: 49040604,
	}],
},{
	name: 'rs552220670',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49139904,
		end: 49139906,
	}],
},{
	name: 'rs533903259',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49090431,
		end: 49090432,
	}],
},{
	name: 'rs371608596',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49154410,
		end: 49154411,
	}],
},{
	name: 'rs575358484',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49046608,
		end: 49046609,
	}],
},{
	name: 'rs56145032',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49038645,
		end: 49038647,
	}],
},{
	name: 'rs548890126',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49074949,
		end: 49074950,
	}],
},{
	name: 'rs184323309',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49043221,
		end: 49043222,
	}],
},{
	name: 'rs558959983',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49043749,
		end: 49043750,
	}],
},{
	name: 'rs142889441',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48995846,
		end: 48995847,
	}],
},{
	name: 'rs551091898',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48993588,
		end: 48993590,
	}],
},{
	name: 'rs35590768',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49036463,
		end: 49036464,
	}],
},{
	name: 'rs553817948',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49093263,
		end: 49093264,
	}],
},{
	name: 'rs543841144',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49106387,
		end: 49106388,
	}],
},{
	name: 'rs371204828',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49034636,
		end: 49034637,
	}],
},{
	name: 'rs190242504',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49027612,
		end: 49027613,
	}],
},{
	name: 'rs555018505',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49046820,
		end: 49046821,
	}],
},{
	name: 'rs536523424',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49141628,
		end: 49141629,
	}],
},{
	name: 'rs181604409',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49150139,
		end: 49150140,
	}],
},{
	name: 'rs547959065',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49080995,
		end: 49080996,
	}],
},{
	name: 'rs149847853',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48983098,
		end: 48983099,
	}],
},{
	name: 'rs527640807',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49033052,
		end: 49033053,
	}],
},{
	name: 'rs534488669',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49015324,
		end: 49015325,
	}],
},{
	name: 'rs560304062',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49073258,
		end: 49073259,
	}],
},{
	name: 'rs376490789',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48983178,
		end: 48983179,
	}],
},{
	name: 'rs562421477',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49112278,
		end: 49112279,
	}],
},{
	name: 'rs34870124',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49131852,
		end: 49131854,
	}],
},{
	name: 'rs565416085',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48977484,
		end: 48977485,
	}],
},{
	name: 'rs575067949',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49068567,
		end: 49068568,
	}],
},{
	name: 'rs550407789',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49034421,
		end: 49034422,
	}],
},{
	name: 'rs554192383',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49015344,
		end: 49015345,
	}],
},{
	name: 'rs201146996',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49002735,
		end: 49002736,
	}],
},{
	name: 'rs540022471',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49001346,
		end: 49001347,
	}],
},{
	name: 'rs34047807',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48994169,
		end: 48994170,
	}],
},{
	name: 'rs551916524',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48975104,
		end: 48975105,
	}],
},{
	name: 'rs549669689',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127144,
		end: 49127145,
	}],
},{
	name: 'rs368119045',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49091010,
		end: 49091011,
	}],
},{
	name: 'rs560705666',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48988832,
		end: 48988833,
	}],
},{
	name: 'rs201122960',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48968866,
		end: 48968867,
	}],
},{
	name: 'rs186151064',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49154517,
		end: 49154518,
	}],
},{
	name: 'rs371082462',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48990528,
		end: 48990529,
	}],
},{
	name: 'rs183487365',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49146522,
		end: 49146523,
	}],
},{
	name: 'rs368401161',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48985424,
		end: 48985425,
	}],
},{
	name: 'rs192315340',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49133814,
		end: 49133815,
	}],
},{
	name: 'rs60395378',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49097952,
		end: 49097955,
	}],
},{
	name: 'rs370842104',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48987836,
		end: 48987837,
	}],
},{
	name: 'rs192578973',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49145124,
		end: 49145125,
	}],
},{
	name: 'rs76115179',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49072242,
		end: 49072243,
	}],
},{
	name: 'rs369764719',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48974604,
		end: 48974607,
	}],
},{
	name: 'rs201091058',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49093150,
		end: 49093152,
	}],
},{
	name: 'rs149009489',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49116387,
		end: 49116388,
	}],
},{
	name: 'rs372546279',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49075014,
		end: 49075015,
	}],
},{
	name: 'rs78474802',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49068871,
		end: 49068872,
	}],
},{
	name: 'rs74813240',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49027175,
		end: 49027176,
	}],
},{
	name: 'rs74179102',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49021886,
		end: 49021887,
	}],
},{
	name: 'rs74179102',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49021886,
		end: 49021887,
	}],
},{
	name: 'rs34665985',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49060483,
		end: 49060484,
	}],
},{
	name: 'rs368750578',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48996573,
		end: 48996574,
	}],
},{
	name: 'rs377301289',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48968885,
		end: 48968886,
	}],
},{
	name: 'rs145165174',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49020989,
		end: 49020990,
	}],
},{
	name: 'rs569230933',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49008344,
		end: 49008346,
	}],
},{
	name: 'rs200712246',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49041799,
		end: 49041800,
	}],
},{
	name: 'rs200712246',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49041799,
		end: 49041800,
	}],
},{
	name: 'rs577449941',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49051356,
		end: 49051357,
	}],
},{
	name: 'rs375708417',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49061753,
		end: 49061754,
	}],
},{
	name: 'rs368504613',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49076801,
		end: 49076802,
	}],
},{
	name: 'rs377737086',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49007220,
		end: 49007227,
	}],
},{
	name: 'rs374957380',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49017128,
		end: 49017129,
	}],
},{
	name: 'rs34025238',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48982277,
		end: 48982279,
	}],
},{
	name: 'rs199631390',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49029603,
		end: 49029604,
	}],
},{
	name: 'rs373767808',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49119379,
		end: 49119380,
	}],
},{
	name: 'rs556592211',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49015456,
		end: 49015457,
	}],
},{
	name: 'rs546642315',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48990033,
		end: 48990034,
	}],
},{
	name: 'rs200808791',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48964997,
		end: 48964998,
	}],
},{
	name: 'rs562860254',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48991724,
		end: 48991725,
	}],
},{
	name: 'rs535574344',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49068976,
		end: 49068977,
	}],
},{
	name: 'rs34298862',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49119718,
		end: 49119720,
	}],
},{
	name: 'rs372050097',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48975747,
		end: 48975748,
	}],
},{
	name: 'rs184148142',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49009347,
		end: 49009348,
	}],
},{
	name: 'rs377691134',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49025199,
		end: 49025200,
	}],
},{
	name: 'rs66528420',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127896,
		end: 49127898,
	}],
},{
	name: 'rs533896375',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48985307,
		end: 48985308,
	}],
},{
	name: 'rs533613222',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49049094,
		end: 49049095,
	}],
},{
	name: 'rs368922136',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49068320,
		end: 49068321,
	}],
},{
	name: 'rs566619798',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49028507,
		end: 49028509,
	}],
},{
	name: 'rs372575332',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49112009,
		end: 49112010,
	}],
},{
	name: 'rs560296754',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48964165,
		end: 48964166,
	}],
},{
	name: 'rs554503980',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48983464,
		end: 48983465,
	}],
},{
	name: 'rs532669231',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49106802,
		end: 49106803,
	}],
},{
	name: 'rs374864214',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49016619,
		end: 49016620,
	}],
},{
	name: 'rs375727645',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48995909,
		end: 48995910,
	}],
},{
	name: 'rs375981097',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49084665,
		end: 49084666,
	}],
},{
	name: 'rs199705922',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49085216,
		end: 49085217,
	}],
},{
	name: 'rs113570244',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49019413,
		end: 49019414,
	}],
},{
	name: 'rs543171958',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49093603,
		end: 49093604,
	}],
},{
	name: 'rs557418931',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49119966,
		end: 49119967,
	}],
},{
	name: 'rs112237991',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49001078,
		end: 49001081,
	}],
},{
	name: 'rs548895583',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48992719,
		end: 48992720,
	}],
},{
	name: 'rs71399102',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49034189,
		end: 49034190,
	}],
},{
	name: 'rs535105315',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49114855,
		end: 49114856,
	}],
},{
	name: 'rs370030016',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49099970,
		end: 49099971,
	}],
},{
	name: 'rs375017323',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49028178,
		end: 49028179,
	}],
},{
	name: 'rs375963506',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49121125,
		end: 49121126,
	}],
},{
	name: 'rs372699255',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49121273,
		end: 49121274,
	}],
},{
	name: 'rs200074136',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49042594,
		end: 49042596,
	}],
},{
	name: 'rs543854085',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49148417,
		end: 49148418,
	}],
},{
	name: 'rs374616039',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49045352,
		end: 49045353,
	}],
},{
	name: 'rs548125140',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49043088,
		end: 49043089,
	}],
},{
	name: 'rs200761493',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49061752,
		end: 49061753,
	}],
},{
	name: 'rs370248468',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48972148,
		end: 48972149,
	}],
},{
	name: 'rs376683682',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49064062,
		end: 49064063,
	}],
},{
	name: 'rs371831193',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49072296,
		end: 49072297,
	}],
},{
	name: 'rs386645882',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49003271,
		end: 49003274,
	}],
},{
	name: 'rs181632740',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49059361,
		end: 49059362,
	}],
},{
	name: 'rs111877101',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49097234,
		end: 49097235,
	}],
},{
	name: 'rs574190080',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49055587,
		end: 49055588,
	}],
},{
	name: 'rs377130186',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49046581,
		end: 49046582,
	}],
},{
	name: 'rs531913245',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49094057,
		end: 49094058,
	}],
},{
	name: 'rs13415495',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49125442,
		end: 49125443,
	}],
},{
	name: 'rs578013670',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48967890,
		end: 48967891,
	}],
},{
	name: 'rs546059353',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49148154,
		end: 49148155,
	}],
},{
	name: 'rs70946848',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49056444,
		end: 49056469,
	}],
},{
	name: 'rs200482566',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963136,
		end: 48963137,
	}],
},{
	name: 'rs367844572',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49082679,
		end: 49082680,
	}],
},{
	name: 'rs543904072',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127805,
		end: 49127806,
	}],
},{
	name: 'rs200795643',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49011500,
		end: 49011501,
	}],
},{
	name: 'rs184298181',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49145367,
		end: 49145368,
	}],
},{
	name: 'rs369843271',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49013954,
		end: 49013955,
	}],
},{
	name: 'rs144341642',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49124796,
		end: 49124797,
	}],
},{
	name: 'rs370933194',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49068196,
		end: 49068197,
	}],
},{
	name: 'rs143972148',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49017500,
		end: 49017501,
	}],
},{
	name: 'rs368315161',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49068122,
		end: 49068123,
	}],
},{
	name: 'rs397727344',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48985424,
		end: 48985425,
	}],
},{
	name: 'rs532166305',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49036247,
		end: 49036248,
	}],
},{
	name: 'rs376451927',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48979802,
		end: 48979803,
	}],
},{
	name: 'rs199803706',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49021749,
		end: 49021753,
	}],
},{
	name: 'rs534582471',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49139713,
		end: 49139714,
	}],
},{
	name: 'rs535663744',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49044419,
		end: 49044420,
	}],
},{
	name: 'rs200439873',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49061620,
		end: 49061621,
	}],
},{
	name: 'rs368094185',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49070305,
		end: 49070306,
	}],
},{
	name: 'rs529491933',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49123754,
		end: 49123755,
	}],
},{
	name: 'rs572465386',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49104862,
		end: 49104864,
	}],
},{
	name: 'rs374788399',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48968795,
		end: 48968796,
	}],
},{
	name: 'rs386833511',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963096,
		end: 48963097,
	}],
},{
	name: 'rs369204695',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49036991,
		end: 49036992,
	}],
},{
	name: 'rs568115964',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49081947,
		end: 49081948,
	}],
},{
	name: 'rs567752541',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49091585,
		end: 49091586,
	}],
},{
	name: 'rs541572872',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49064526,
		end: 49064527,
	}],
},{
	name: 'rs376474098',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49035124,
		end: 49035125,
	}],
},{
	name: 'rs397870901',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49098936,
		end: 49098937,
	}],
},{
	name: 'rs564739352',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49059574,
		end: 49059575,
	}],
},{
	name: 'rs375089256',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48969852,
		end: 48969853,
	}],
},{
	name: 'rs183748993',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49107521,
		end: 49107522,
	}],
},{
	name: 'rs70946843',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49021567,
		end: 49021568,
	}],
},{
	name: 'rs369329506',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49038651,
		end: 49038653,
	}],
},{
	name: 'rs550727111',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49132967,
		end: 49132974,
	}],
},{
	name: 'rs150174258',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48977121,
		end: 48977124,
	}],
},{
	name: 'rs376346505',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49064091,
		end: 49064092,
	}],
},{
	name: 'rs574852928',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48972728,
		end: 48972730,
	}],
},{
	name: 'rs573118906',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49051873,
		end: 49051874,
	}],
},{
	name: 'rs377472536',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49063777,
		end: 49063781,
	}],
},{
	name: 'rs374186395',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49007524,
		end: 49007525,
	}],
},{
	name: 'rs527247523',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48966800,
		end: 48966801,
	}],
},{
	name: 'rs192446909',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49084203,
		end: 49084204,
	}],
},{
	name: 'rs568267774',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48983190,
		end: 48983191,
	}],
},{
	name: 'rs148058297',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49023093,
		end: 49023094,
	}],
},{
	name: 'rs61743754',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963894,
		end: 48963895,
	}],
},{
	name: 'rs537519410',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49083470,
		end: 49083473,
	}],
},{
	name: 'rs372023595',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49105332,
		end: 49105333,
	}],
},{
	name: 'rs370974916',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49061854,
		end: 49061855,
	}],
},{
	name: 'rs544091877',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49030270,
		end: 49030279,
	}],
},{
	name: 'rs565417954',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49006843,
		end: 49006844,
	}],
},{
	name: 'rs111482811',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49010290,
		end: 49010291,
	}],
},{
	name: 'rs138702806',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49060009,
		end: 49060010,
	}],
},{
	name: 'rs567903216',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49037155,
		end: 49037156,
	}],
},{
	name: 'rs370891530',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48999250,
		end: 48999251,
	}],
},{
	name: 'rs368608509',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49017367,
		end: 49017369,
	}],
},{
	name: 'rs201693291',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963875,
		end: 48963876,
	}],
},{
	name: 'rs527728983',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49034771,
		end: 49034773,
	}],
},{
	name: 'rs556101030',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48975211,
		end: 48975212,
	}],
},{
	name: 'rs147089907',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49048301,
		end: 49048302,
	}],
},{
	name: 'rs77147055',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48979829,
		end: 48979830,
	}],
},{
	name: 'rs564648213',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49028738,
		end: 49028739,
	}],
},{
	name: 'rs557419151',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49070096,
		end: 49070097,
	}],
},{
	name: 'rs201611066',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49010615,
		end: 49010616,
	}],
},{
	name: 'rs374375364',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49078788,
		end: 49078789,
	}],
},{
	name: 'rs530291654',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49004836,
		end: 49004837,
	}],
},{
	name: 'rs372230544',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49069438,
		end: 49069439,
	}],
},{
	name: 'rs199673066',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48999281,
		end: 48999282,
	}],
},{
	name: 'rs397702644',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49040845,
		end: 49040847,
	}],
},{
	name: 'rs34773868',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49114356,
		end: 49114357,
	}],
},{
	name: 'rs374544721',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49151388,
		end: 49151389,
	}],
},{
	name: 'rs386645889',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49079127,
		end: 49079150,
	}],
},{
	name: 'rs373164130',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49100044,
		end: 49100045,
	}],
},{
	name: 'rs111825458',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49022283,
		end: 49022284,
	}],
},{
	name: 'rs367685789',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48993872,
		end: 48993873,
	}],
},{
	name: 'rs551918804',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48998660,
		end: 48998661,
	}],
},{
	name: 'rs121909661',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963565,
		end: 48963566,
	}],
},{
	name: 'rs200408081',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127894,
		end: 49127895,
	}],
},{
	name: 'rs376611210',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49111464,
		end: 49111465,
	}],
},{
	name: 'rs76404580',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49123991,
		end: 49123992,
	}],
},{
	name: 'rs115351891',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49130349,
		end: 49130350,
	}],
},{
	name: 'rs368345067',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49017454,
		end: 49017455,
	}],
},{
	name: 'rs545659388',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48992255,
		end: 48992256,
	}],
},{
	name: 'rs77918052',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49093595,
		end: 49093596,
	}],
},{
	name: 'rs374373241',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49115219,
		end: 49115220,
	}],
},{
	name: 'rs75665223',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49055530,
		end: 49055531,
	}],
},{
	name: 'rs537551534',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49020203,
		end: 49020204,
	}],
},{
	name: 'rs200795252',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127784,
		end: 49127785,
	}],
},{
	name: 'rs35714572',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49097123,
		end: 49097125,
	}],
},{
	name: 'rs576623464',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49089092,
		end: 49089098,
	}],
},{
	name: 'rs374872133',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127757,
		end: 49127758,
	}],
},{
	name: 'rs541216928',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49153423,
		end: 49153424,
	}],
},{
	name: 'rs540442744',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49076503,
		end: 49076504,
	}],
},{
	name: 'rs375285755',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49149854,
		end: 49149855,
	}],
},{
	name: 'rs111934068',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49082925,
		end: 49082926,
	}],
},{
	name: 'rs368888734',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963389,
		end: 48963390,
	}],
},{
	name: 'rs150806732',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49120412,
		end: 49120413,
	}],
},{
	name: 'rs376248692',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49001074,
		end: 49001075,
	}],
},{
	name: 'rs372051560',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48975401,
		end: 48975402,
	}],
},{
	name: 'rs542485207',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49120701,
		end: 49120705,
	}],
},{
	name: 'rs576735197',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49042366,
		end: 49042367,
	}],
},{
	name: 'rs545682323',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48978753,
		end: 48978754,
	}],
},{
	name: 'rs570977858',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49121510,
		end: 49121511,
	}],
},{
	name: 'rs543225740',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48972858,
		end: 48972859,
	}],
},{
	name: 'rs563664169',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49078293,
		end: 49078294,
	}],
},{
	name: 'rs543713042',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49097077,
		end: 49097078,
	}],
},{
	name: 'rs531977198',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49095744,
		end: 49095745,
	}],
},{
	name: 'rs374351542',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49030703,
		end: 49030704,
	}],
},{
	name: 'rs373667444',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49082621,
		end: 49082622,
	}],
},{
	name: 'rs13386240',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49087037,
		end: 49087038,
	}],
},{
	name: 'rs35380548',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127544,
		end: 49127546,
	}],
},{
	name: 'rs374448813',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49098593,
		end: 49098594,
	}],
},{
	name: 'rs200122416',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48964992,
		end: 48964996,
	}],
},{
	name: 'rs546776283',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49081928,
		end: 49081929,
	}],
},{
	name: 'rs537912236',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49150830,
		end: 49150831,
	}],
},{
	name: 'rs570920713',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49053069,
		end: 49053070,
	}],
},{
	name: 'rs541538780',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49123700,
		end: 49123701,
	}],
},{
	name: 'rs55742563',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49152938,
		end: 49152939,
	}],
},{
	name: 'rs200309475',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48970520,
		end: 48970523,
	}],
},{
	name: 'rs551465953',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48987343,
		end: 48987344,
	}],
},{
	name: 'rs377696771',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48975023,
		end: 48975024,
	}],
},{
	name: 'rs541375018',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49066674,
		end: 49066675,
	}],
},{
	name: 'rs572963629',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49076435,
		end: 49076436,
	}],
},{
	name: 'rs56231042',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49061849,
		end: 49061855,
	}],
},{
	name: 'rs559978024',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49045406,
		end: 49045407,
	}],
},{
	name: 'rs537789286',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48979541,
		end: 48979542,
	}],
},{
	name: 'rs200357743',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49039925,
		end: 49039926,
	}],
},{
	name: 'rs575873577',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49131635,
		end: 49131636,
	}],
},{
	name: 'rs373463644',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49068323,
		end: 49068324,
	}],
},{
	name: 'rs555824840',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49115639,
		end: 49115640,
	}],
},{
	name: 'rs376735485',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49014451,
		end: 49014452,
	}],
},{
	name: 'rs189673417',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49096532,
		end: 49096533,
	}],
},{
	name: 'rs3082692',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48985103,
		end: 48985113,
	}],
},{
	name: 'rs200567746',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49139598,
		end: 49139599,
	}],
},{
	name: 'rs561300359',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48972924,
		end: 48972925,
	}],
},{
	name: 'rs35380100',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49141156,
		end: 49141158,
	}],
},{
	name: 'rs201387284',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48990603,
		end: 48990604,
	}],
},{
	name: 'rs201686960',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127888,
		end: 49127889,
	}],
},{
	name: 'rs397984535',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49039923,
		end: 49039925,
	}],
},{
	name: 'rs537143960',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49043732,
		end: 49043733,
	}],
},{
	name: 'rs564540203',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49094927,
		end: 49094928,
	}],
},{
	name: 'rs368461574',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48968529,
		end: 48968532,
	}],
},{
	name: 'rs535235184',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49002781,
		end: 49002782,
	}],
},{
	name: 'rs528443222',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49085521,
		end: 49085522,
	}],
},{
	name: 'rs368775695',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48990891,
		end: 48990892,
	}],
},{
	name: 'rs199800812',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49040307,
		end: 49040308,
	}],
},{
	name: 'rs121909664',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963186,
		end: 48963187,
	}],
},{
	name: 'rs567285231',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49147091,
		end: 49147093,
	}],
},{
	name: 'rs1126715',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48990573,
		end: 48990574,
	}],
},{
	name: 'rs375337383',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48967269,
		end: 48967270,
	}],
},{
	name: 'rs540335783',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49024505,
		end: 49024506,
	}],
},{
	name: 'rs544538372',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49088166,
		end: 49088167,
	}],
},{
	name: 'rs34168636',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49040845,
		end: 49040847,
	}],
},{
	name: 'rs200773822',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49065292,
		end: 49065293,
	}],
},{
	name: 'rs142443585',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49037570,
		end: 49037574,
	}],
},{
	name: 'rs560728122',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49151203,
		end: 49151204,
	}],
},{
	name: 'rs377676799',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49071469,
		end: 49071470,
	}],
},{
	name: 'rs553998329',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48972068,
		end: 48972069,
	}],
},{
	name: 'rs367722560',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48990677,
		end: 48990678,
	}],
},{
	name: 'rs200312098',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48992279,
		end: 48992280,
	}],
},{
	name: 'rs74604254',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49074185,
		end: 49074188,
	}],
},{
	name: 'rs74604254',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49074185,
		end: 49074188,
	}],
},{
	name: 'rs373320492',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49129335,
		end: 49129336,
	}],
},{
	name: 'rs376309047',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49083191,
		end: 49083192,
	}],
},{
	name: 'rs544763019',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49032553,
		end: 49032554,
	}],
},{
	name: 'rs574822151',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49108422,
		end: 49108423,
	}],
},{
	name: 'rs56390546',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49061621,
		end: 49061622,
	}],
},{
	name: 'rs56390546',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49061621,
		end: 49061622,
	}],
},{
	name: 'rs373425767',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49014423,
		end: 49014424,
	}],
},{
	name: 'rs375315345',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49002285,
		end: 49002286,
	}],
},{
	name: 'rs5831023',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49103972,
		end: 49103973,
	}],
},{
	name: 'rs5831023',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49103972,
		end: 49103973,
	}],
},{
	name: 'rs561392547',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49141912,
		end: 49141913,
	}],
},{
	name: 'rs553257670',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49023579,
		end: 49023580,
	}],
},{
	name: 'rs369277935',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49061856,
		end: 49061857,
	}],
},{
	name: 'rs543070707',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49092499,
		end: 49092500,
	}],
},{
	name: 'rs146482480',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49068235,
		end: 49068236,
	}],
},{
	name: 'rs544220893',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49002710,
		end: 49002711,
	}],
},{
	name: 'rs199623924',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127741,
		end: 49127744,
	}],
},{
	name: 'rs374207026',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48979283,
		end: 48979284,
	}],
},{
	name: 'rs397727574',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49061620,
		end: 49061621,
	}],
},{
	name: 'rs571896392',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49105399,
		end: 49105400,
	}],
},{
	name: 'rs111479446',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49078879,
		end: 49078880,
	}],
},{
	name: 'rs10644983',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48990891,
		end: 48990892,
	}],
},{
	name: 'rs573793945',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48967964,
		end: 48967965,
	}],
},{
	name: 'rs62165294',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49021883,
		end: 49021884,
	}],
},{
	name: 'rs538295443',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49021638,
		end: 49021640,
	}],
},{
	name: 'rs141082451',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49089092,
		end: 49089093,
	}],
},{
	name: 'rs35958678',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49094775,
		end: 49094776,
	}],
},{
	name: 'rs35958678',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49094775,
		end: 49094776,
	}],
},{
	name: 'rs34641522',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49075811,
		end: 49075812,
	}],
},{
	name: 'rs200562485',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49039923,
		end: 49039926,
	}],
},{
	name: 'rs573817677',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48985370,
		end: 48985371,
	}],
},{
	name: 'rs376719039',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49115110,
		end: 49115111,
	}],
},{
	name: 'rs375738452',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49009165,
		end: 49009166,
	}],
},{
	name: 'rs60542504',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49016802,
		end: 49016803,
	}],
},{
	name: 'rs60542504',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49016802,
		end: 49016803,
	}],
},{
	name: 'rs199644823',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49071683,
		end: 49071684,
	}],
},{
	name: 'rs577013206',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127914,
		end: 49127915,
	}],
},{
	name: 'rs201002837',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49042817,
		end: 49042818,
	}],
},{
	name: 'rs367723842',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49058571,
		end: 49058572,
	}],
},{
	name: 'rs567813014',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49075478,
		end: 49075479,
	}],
},{
	name: 'rs375289019',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48973996,
		end: 48973997,
	}],
},{
	name: 'rs541941548',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49014289,
		end: 49014290,
	}],
},{
	name: 'rs370625091',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49048232,
		end: 49048233,
	}],
},{
	name: 'rs367983760',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49112850,
		end: 49112851,
	}],
},{
	name: 'rs75798936',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49042553,
		end: 49042554,
	}],
},{
	name: 'rs546053905',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49106821,
		end: 49106822,
	}],
},{
	name: 'rs557510307',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49120423,
		end: 49120424,
	}],
},{
	name: 'rs572520333',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49039745,
		end: 49039746,
	}],
},{
	name: 'rs576252878',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49101340,
		end: 49101341,
	}],
},{
	name: 'rs559295865',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48979872,
		end: 48979873,
	}],
},{
	name: 'rs564509263',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49049608,
		end: 49049610,
	}],
},{
	name: 'rs531305637',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49137374,
		end: 49137375,
	}],
},{
	name: 'rs138289115',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48978468,
		end: 48978469,
	}],
},{
	name: 'rs570701704',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49114896,
		end: 49114897,
	}],
},{
	name: 'rs552842266',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49000321,
		end: 49000322,
	}],
},{
	name: 'rs368688665',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49045369,
		end: 49045370,
	}],
},{
	name: 'rs56290234',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48994628,
		end: 48994629,
	}],
},{
	name: 'rs56290234',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48994628,
		end: 48994629,
	}],
},{
	name: 'rs373479183',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49038699,
		end: 49038700,
	}],
},{
	name: 'rs373370906',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49025524,
		end: 49025530,
	}],
},{
	name: 'rs548038658',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49119484,
		end: 49119485,
	}],
},{
	name: 'rs539276551',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49103134,
		end: 49103135,
	}],
},{
	name: 'rs550942763',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49099781,
		end: 49099782,
	}],
},{
	name: 'rs377126097',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49074192,
		end: 49074193,
	}],
},{
	name: 'rs549066211',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48985879,
		end: 48985880,
	}],
},{
	name: 'rs376993546',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49137549,
		end: 49137550,
	}],
},{
	name: 'rs374074612',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48981995,
		end: 48981996,
	}],
},{
	name: 'rs61382948',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49106354,
		end: 49106357,
	}],
},{
	name: 'rs188614035',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49113612,
		end: 49113613,
	}],
},{
	name: 'rs370424554',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49011733,
		end: 49011734,
	}],
},{
	name: 'rs372080233',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49060462,
		end: 49060463,
	}],
},{
	name: 'rs35905315',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49111404,
		end: 49111405,
	}],
},{
	name: 'rs532102629',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49092591,
		end: 49092592,
	}],
},{
	name: 'rs559996072',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49118509,
		end: 49118510,
	}],
},{
	name: 'rs549420282',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48976992,
		end: 48976993,
	}],
},{
	name: 'rs558563143',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48972102,
		end: 48972104,
	}],
},{
	name: 'rs201952011',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49064263,
		end: 49064264,
	}],
},{
	name: 'rs545396578',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49054289,
		end: 49054290,
	}],
},{
	name: 'rs368657296',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49063724,
		end: 49063725,
	}],
},{
	name: 'rs555862028',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49073915,
		end: 49073916,
	}],
},{
	name: 'rs147427726',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49005053,
		end: 49005054,
	}],
},{
	name: 'rs576651012',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48995715,
		end: 48995716,
	}],
},{
	name: 'rs556659041',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49075678,
		end: 49075679,
	}],
},{
	name: 'rs377520549',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49111696,
		end: 49111697,
	}],
},{
	name: 'rs536168711',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49061243,
		end: 49061244,
	}],
},{
	name: 'rs537795697',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48965976,
		end: 48965977,
	}],
},{
	name: 'rs560293155',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49137473,
		end: 49137474,
	}],
},{
	name: 'rs541528881',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48976116,
		end: 48976117,
	}],
},{
	name: 'rs149209503',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127922,
		end: 49127923,
	}],
},{
	name: 'rs554476140',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49079104,
		end: 49079105,
	}],
},{
	name: 'rs369204389',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49122328,
		end: 49122330,
	}],
},{
	name: 'rs555081057',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48979106,
		end: 48979135,
	}],
},{
	name: 'rs532236579',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48978995,
		end: 48978996,
	}],
},{
	name: 'rs202162496',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963490,
		end: 48963491,
	}],
},{
	name: 'rs544461967',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49118638,
		end: 49118639,
	}],
},{
	name: 'rs57607541',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49091569,
		end: 49091571,
	}],
},{
	name: 'rs375784513',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48986634,
		end: 48986635,
	}],
},{
	name: 'rs375084331',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49107827,
		end: 49107828,
	}],
},{
	name: 'rs143985517',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49078615,
		end: 49078621,
	}],
},{
	name: 'rs375277371',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49077337,
		end: 49077338,
	}],
},{
	name: 'rs201947401',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49085315,
		end: 49085316,
	}],
},{
	name: 'rs375230215',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48964479,
		end: 48964480,
	}],
},{
	name: 'rs148244357',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49019157,
		end: 49019158,
	}],
},{
	name: 'rs147627467',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49126103,
		end: 49126104,
	}],
},{
	name: 'rs368998651',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49103318,
		end: 49103319,
	}],
},{
	name: 'rs34506323',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49141783,
		end: 49141784,
	}],
},{
	name: 'rs530747257',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49112649,
		end: 49112650,
	}],
},{
	name: 'rs35054867',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49052751,
		end: 49052752,
	}],
},{
	name: 'rs147439856',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48962790,
		end: 48962791,
	}],
},{
	name: 'rs147439856',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48962790,
		end: 48962791,
	}],
},{
	name: 'rs144307939',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49006261,
		end: 49006264,
	}],
},{
	name: 'rs558718750',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49096609,
		end: 49096610,
	}],
},{
	name: 'rs369273313',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49043917,
		end: 49043918,
	}],
},{
	name: 'rs528779098',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49119574,
		end: 49119575,
	}],
},{
	name: 'rs373195721',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49131744,
		end: 49131745,
	}],
},{
	name: 'rs553568647',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49120211,
		end: 49120212,
	}],
},{
	name: 'rs537479539',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49051467,
		end: 49051468,
	}],
},{
	name: 'rs67574268',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49128677,
		end: 49128679,
	}],
},{
	name: 'rs529646585',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49107416,
		end: 49107417,
	}],
},{
	name: 'rs74526416',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48990681,
		end: 48990682,
	}],
},{
	name: 'rs372018910',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49036760,
		end: 49036761,
	}],
},{
	name: 'rs139272294',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49064061,
		end: 49064062,
	}],
},{
	name: 'rs139272294',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49064061,
		end: 49064062,
	}],
},{
	name: 'rs533654395',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49121748,
		end: 49121749,
	}],
},{
	name: 'rs188485049',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48989242,
		end: 48989243,
	}],
},{
	name: 'rs202123769',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48976898,
		end: 48976899,
	}],
},{
	name: 'rs560452697',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49059414,
		end: 49059415,
	}],
},{
	name: 'rs556188757',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49092185,
		end: 49092186,
	}],
},{
	name: 'rs546077223',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49030270,
		end: 49030273,
	}],
},{
	name: 'rs554622873',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49129017,
		end: 49129018,
	}],
},{
	name: 'rs377030410',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48988910,
		end: 48988911,
	}],
},{
	name: 'rs377096576',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49038655,
		end: 49038656,
	}],
},{
	name: 'rs549670757',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49058106,
		end: 49058107,
	}],
},{
	name: 'rs368874539',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49117145,
		end: 49117146,
	}],
},{
	name: 'rs35557030',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49051791,
		end: 49051793,
	}],
},{
	name: 'rs376853672',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48993866,
		end: 48993867,
	}],
},{
	name: 'rs374658060',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49025621,
		end: 49025624,
	}],
},{
	name: 'rs150549219',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963345,
		end: 48963346,
	}],
},{
	name: 'rs556117775',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49024188,
		end: 49024189,
	}],
},{
	name: 'rs35157182',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49101265,
		end: 49101266,
	}],
},{
	name: 'rs72336064',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48969560,
		end: 48969563,
	}],
},{
	name: 'rs73928374',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48985127,
		end: 48985128,
	}],
},{
	name: 'rs370663317',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49003710,
		end: 49003711,
	}],
},{
	name: 'rs35756012',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49015976,
		end: 49015978,
	}],
},{
	name: 'rs145727873',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49137846,
		end: 49137847,
	}],
},{
	name: 'rs74881453',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49125327,
		end: 49125328,
	}],
},{
	name: 'rs7568202',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127897,
		end: 49127898,
	}],
},{
	name: 'rs573910731',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49032375,
		end: 49032376,
	}],
},{
	name: 'rs200729073',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49055770,
		end: 49055771,
	}],
},{
	name: 'rs528782664',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49105174,
		end: 49105175,
	}],
},{
	name: 'rs374118850',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49055530,
		end: 49055541,
	}],
},{
	name: 'rs112733881',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49095475,
		end: 49095477,
	}],
},{
	name: 'rs111650686',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49144628,
		end: 49144629,
	}],
},{
	name: 'rs201904562',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127744,
		end: 49127745,
	}],
},{
	name: 'rs267599404',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48968808,
		end: 48968809,
	}],
},{
	name: 'rs12475351',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127929,
		end: 49127930,
	}],
},{
	name: 'rs544366183',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49116546,
		end: 49116547,
	}],
},{
	name: 'rs535012318',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49071928,
		end: 49071929,
	}],
},{
	name: 'rs563042286',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49030270,
		end: 49030273,
	}],
},{
	name: 'rs534202892',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127666,
		end: 49127667,
	}],
},{
	name: 'rs568363941',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49046473,
		end: 49046474,
	}],
},{
	name: 'rs545223965',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48991739,
		end: 48991740,
	}],
},{
	name: 'rs572340246',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49105843,
		end: 49105844,
	}],
},{
	name: 'rs199953704',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49129048,
		end: 49129049,
	}],
},{
	name: 'rs34690820',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49066155,
		end: 49066156,
	}],
},{
	name: 'rs544510880',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49034646,
		end: 49034647,
	}],
},{
	name: 'rs369418493',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49121528,
		end: 49121529,
	}],
},{
	name: 'rs573880207',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49005899,
		end: 49005900,
	}],
},{
	name: 'rs199659187',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127763,
		end: 49127764,
	}],
},{
	name: 'rs370616847',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49089583,
		end: 49089584,
	}],
},{
	name: 'rs183507455',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49007934,
		end: 49007935,
	}],
},{
	name: 'rs542936244',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49033242,
		end: 49033243,
	}],
},{
	name: 'rs548477965',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49043159,
		end: 49043160,
	}],
},{
	name: 'rs574800018',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127802,
		end: 49127803,
	}],
},{
	name: 'rs541297885',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48987836,
		end: 48987839,
	}],
},{
	name: 'rs62162143',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49134497,
		end: 49134498,
	}],
},{
	name: 'rs565285802',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49096060,
		end: 49096061,
	}],
},{
	name: 'rs565949950',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49128905,
		end: 49128906,
	}],
},{
	name: 'rs563918434',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49125829,
		end: 49125830,
	}],
},{
	name: 'rs570960477',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49140524,
		end: 49140525,
	}],
},{
	name: 'rs200824820',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127895,
		end: 49127896,
	}],
},{
	name: 'rs574563987',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49066025,
		end: 49066026,
	}],
},{
	name: 'rs546144531',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49039923,
		end: 49039925,
	}],
},{
	name: 'rs374081210',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49009193,
		end: 49009194,
	}],
},{
	name: 'rs74360165',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48998310,
		end: 48998311,
	}],
},{
	name: 'rs200033776',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48990891,
		end: 48990892,
	}],
},{
	name: 'rs201402346',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49019499,
		end: 49019500,
	}],
},{
	name: 'rs374174306',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49014605,
		end: 49014606,
	}],
},{
	name: 'rs530080646',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49066931,
		end: 49066932,
	}],
},{
	name: 'rs150508772',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48983096,
		end: 48983097,
	}],
},{
	name: 'rs199530890',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49072238,
		end: 49072243,
	}],
},{
	name: 'rs199912624',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49074217,
		end: 49074218,
	}],
},{
	name: 'rs186923017',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49077892,
		end: 49077893,
	}],
},{
	name: 'rs529009577',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49094645,
		end: 49094646,
	}],
},{
	name: 'rs138888225',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49020506,
		end: 49020509,
	}],
},{
	name: 'rs370648759',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49082437,
		end: 49082438,
	}],
},{
	name: 'rs370273919',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49035686,
		end: 49035687,
	}],
},{
	name: 'rs112256823',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49072238,
		end: 49072239,
	}],
},{
	name: 'rs371548774',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49016801,
		end: 49016802,
	}],
},{
	name: 'rs371548774',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49016801,
		end: 49016802,
	}],
},{
	name: 'rs568116723',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49048846,
		end: 49048847,
	}],
},{
	name: 'rs368044109',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49073945,
		end: 49073946,
	}],
},{
	name: 'rs527246461',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49134947,
		end: 49134948,
	}],
},{
	name: 'rs557044575',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49066495,
		end: 49066496,
	}],
},{
	name: 'rs200086040',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49039935,
		end: 49039936,
	}],
},{
	name: 'rs370523835',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49103541,
		end: 49103542,
	}],
},{
	name: 'rs192251099',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49150560,
		end: 49150561,
	}],
},{
	name: 'rs149986484',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49123738,
		end: 49123741,
	}],
},{
	name: 'rs369840935',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48985874,
		end: 48985875,
	}],
},{
	name: 'rs377518889',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49038636,
		end: 49038638,
	}],
},{
	name: 'rs201307243',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49040306,
		end: 49040307,
	}],
},{
	name: 'rs201307243',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49040306,
		end: 49040307,
	}],
},{
	name: 'rs527807350',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49120944,
		end: 49120945,
	}],
},{
	name: 'rs567221500',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49126991,
		end: 49126992,
	}],
},{
	name: 'rs574037019',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49013120,
		end: 49013121,
	}],
},{
	name: 'rs555335901',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48974550,
		end: 48974551,
	}],
},{
	name: 'rs182915819',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49038649,
		end: 49038650,
	}],
},{
	name: 'rs544007287',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49089185,
		end: 49089186,
	}],
},{
	name: 'rs542636044',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48988706,
		end: 48988707,
	}],
},{
	name: 'rs545909855',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49069193,
		end: 49069194,
	}],
},{
	name: 'rs367872338',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48978890,
		end: 48978891,
	}],
},{
	name: 'rs576271117',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49153423,
		end: 49153434,
	}],
},{
	name: 'rs547380221',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48993975,
		end: 48993976,
	}],
},{
	name: 'rs184986964',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49112817,
		end: 49112818,
	}],
},{
	name: 'rs530369776',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49121065,
		end: 49121066,
	}],
},{
	name: 'rs191422756',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49090716,
		end: 49090717,
	}],
},{
	name: 'rs559572753',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49137815,
		end: 49137816,
	}],
},{
	name: 'rs569804969',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49128514,
		end: 49128515,
	}],
},{
	name: 'rs372721174',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48985900,
		end: 48985901,
	}],
},{
	name: 'rs563193150',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48998527,
		end: 48998528,
	}],
},{
	name: 'rs552931180',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49022332,
		end: 49022333,
	}],
},{
	name: 'rs185576959',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48987348,
		end: 48987349,
	}],
},{
	name: 'rs570167121',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49103124,
		end: 49103125,
	}],
},{
	name: 'rs547611329',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48992454,
		end: 48992455,
	}],
},{
	name: 'rs537031772',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49013802,
		end: 49013803,
	}],
},{
	name: 'rs151285664',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127920,
		end: 49127921,
	}],
},{
	name: 'rs373133319',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49146444,
		end: 49146445,
	}],
},{
	name: 'rs377222977',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48990649,
		end: 48990650,
	}],
},{
	name: 'rs551113676',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49154386,
		end: 49154387,
	}],
},{
	name: 'rs373563478',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49068192,
		end: 49068193,
	}],
},{
	name: 'rs568045665',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48998976,
		end: 48998977,
	}],
},{
	name: 'rs201315195',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49103972,
		end: 49103973,
	}],
},{
	name: 'rs201315195',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49103972,
		end: 49103973,
	}],
},{
	name: 'rs372318508',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49102059,
		end: 49102060,
	}],
},{
	name: 'rs561577730',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48974213,
		end: 48974214,
	}],
},{
	name: 'rs201115329',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48962890,
		end: 48962891,
	}],
},{
	name: 'rs537222778',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49142192,
		end: 49142193,
	}],
},{
	name: 'rs187536946',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49090206,
		end: 49090207,
	}],
},{
	name: 'rs6737173',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49093354,
		end: 49093355,
	}],
},{
	name: 'rs544440570',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49011464,
		end: 49011465,
	}],
},{
	name: 'rs372700923',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49059554,
		end: 49059555,
	}],
},{
	name: 'rs369464756',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49094220,
		end: 49094221,
	}],
},{
	name: 'rs143680136',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49119402,
		end: 49119403,
	}],
},{
	name: 'rs375730228',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49076922,
		end: 49076923,
	}],
},{
	name: 'rs372948937',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49136884,
		end: 49136886,
	}],
},{
	name: 'rs574470685',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49088523,
		end: 49088524,
	}],
},{
	name: 'rs377505300',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48989838,
		end: 48989839,
	}],
},{
	name: 'rs10691636',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49022283,
		end: 49022284,
	}],
},{
	name: 'rs75132941',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48972673,
		end: 48972674,
	}],
},{
	name: 'rs367979383',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49138516,
		end: 49138517,
	}],
},{
	name: 'rs369196448',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49079557,
		end: 49079558,
	}],
},{
	name: 'rs141624278',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48963362,
		end: 48963363,
	}],
},{
	name: 'rs200456269',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49038623,
		end: 49038624,
	}],
},{
	name: 'rs562019202',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49074111,
		end: 49074112,
	}],
},{
	name: 'rs370028434',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49058807,
		end: 49058808,
	}],
},{
	name: 'rs568238432',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49110470,
		end: 49110471,
	}],
},{
	name: 'rs370159474',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49045344,
		end: 49045345,
	}],
},{
	name: 'rs386645880',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48976527,
		end: 48976531,
	}],
},{
	name: 'rs373364291',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49021862,
		end: 49021863,
	}],
},{
	name: 'rs549421891',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49075052,
		end: 49075053,
	}],
},{
	name: 'rs540457131',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49140838,
		end: 49140839,
	}],
},{
	name: 'rs563541991',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49068936,
		end: 49068937,
	}],
},{
	name: 'rs199974651',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49017280,
		end: 49017281,
	}],
},{
	name: 'rs574459619',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49040891,
		end: 49040892,
	}],
},{
	name: 'rs371227642',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127749,
		end: 49127751,
	}],
},{
	name: 'rs373686746',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49121540,
		end: 49121541,
	}],
},{
	name: 'rs373202314',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49047539,
		end: 49047540,
	}],
},{
	name: 'rs556606711',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48980131,
		end: 48980132,
	}],
},{
	name: 'rs545980747',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49143381,
		end: 49143382,
	}],
},{
	name: 'rs530089161',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49065587,
		end: 49065588,
	}],
},{
	name: 'rs552976255',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49112523,
		end: 49112524,
	}],
},{
	name: 'rs553168004',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49129785,
		end: 49129786,
	}],
},{
	name: 'rs371147970',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49038627,
		end: 49038629,
	}],
},{
	name: 'rs573003713',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49001329,
		end: 49001330,
	}],
},{
	name: 'rs556961645',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49051475,
		end: 49051476,
	}],
},{
	name: 'rs141732834',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49148721,
		end: 49148722,
	}],
},{
	name: 'rs537665854',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48999262,
		end: 48999263,
	}],
},{
	name: 'rs78185950',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49030200,
		end: 49030201,
	}],
},{
	name: 'rs370616580',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49060017,
		end: 49060018,
	}],
},{
	name: 'rs543811388',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49016449,
		end: 49016450,
	}],
},{
	name: 'rs370672715',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49009313,
		end: 49009314,
	}],
},{
	name: 'rs138602367',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49012637,
		end: 49012638,
	}],
},{
	name: 'rs371567199',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49096114,
		end: 49096115,
	}],
},{
	name: 'rs561845109',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49001453,
		end: 49001454,
	}],
},{
	name: 'rs201875089',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49064901,
		end: 49064902,
	}],
},{
	name: 'rs534108356',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49073817,
		end: 49073818,
	}],
},{
	name: 'rs550340656',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48979475,
		end: 48979476,
	}],
},{
	name: 'rs545943387',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49153468,
		end: 49153469,
	}],
},{
	name: 'rs35605088',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48990551,
		end: 48990552,
	}],
},{
	name: 'rs577571524',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49087077,
		end: 49087078,
	}],
},{
	name: 'rs374437231',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49007918,
		end: 49007919,
	}],
},{
	name: 'rs386390142',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49022286,
		end: 49022287,
	}],
},{
	name: 'rs199611578',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49009960,
		end: 49009961,
	}],
},{
	name: 'rs373925243',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49068520,
		end: 49068521,
	}],
},{
	name: 'rs377433909',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49057399,
		end: 49057400,
	}],
},{
	name: 'rs121909659',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48989021,
		end: 48989022,
	}],
},{
	name: 'rs147701906',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49062353,
		end: 49062354,
	}],
},{
	name: 'rs555338397',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49070851,
		end: 49070852,
	}],
},{
	name: 'rs372287294',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49130971,
		end: 49130972,
	}],
},{
	name: 'rs553403416',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49033874,
		end: 49033875,
	}],
},{
	name: 'rs564273533',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48985105,
		end: 48985113,
	}],
},{
	name: 'rs369350634',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49044509,
		end: 49044510,
	}],
},{
	name: 'rs558579450',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49135934,
		end: 49135935,
	}],
},{
	name: 'rs57766180',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49037570,
		end: 49037574,
	}],
},{
	name: 'rs567592998',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49128039,
		end: 49128040,
	}],
},{
	name: 'rs367734668',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49045913,
		end: 49045914,
	}],
},{
	name: 'rs376584526',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48997985,
		end: 48997994,
	}],
},{
	name: 'rs371465692',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49107848,
		end: 49107849,
	}],
},{
	name: 'rs543980191',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49118280,
		end: 49118281,
	}],
},{
	name: 'rs34620918',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49134570,
		end: 49134571,
	}],
},{
	name: 'rs537554752',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49140615,
		end: 49140616,
	}],
},{
	name: 'rs76660837',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49124550,
		end: 49124551,
	}],
},{
	name: 'rs182695537',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48969424,
		end: 48969425,
	}],
},{
	name: 'rs538722944',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49033841,
		end: 49033842,
	}],
},{
	name: 'rs367883025',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48973236,
		end: 48973237,
	}],
},{
	name: 'rs181701274',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49093949,
		end: 49093950,
	}],
},{
	name: 'rs374378387',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48987810,
		end: 48987811,
	}],
},{
	name: 'rs376286271',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48970490,
		end: 48970491,
	}],
},{
	name: 'rs558416074',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49113555,
		end: 49113556,
	}],
},{
	name: 'rs7593168',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49021864,
		end: 49021865,
	}],
},{
	name: 'rs376971370',
	ftype: 'sequence_alteration',
	loc: [{
		start: 48976539,
		end: 48976540,
	}],
},{
	name: 'rs35674955',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49131704,
		end: 49131705,
	}],
},{
	name: 'rs376009679',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49048271,
		end: 49048272,
	}],
},{
	name: 'rs187303978',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49002835,
		end: 49002836,
	}],
},{
	name: 'rs564278640',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49048585,
		end: 49048586,
	}],
},{
	name: 'rs142408171',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49127834,
		end: 49127835,
	}],
},{
	name: 'rs200436300',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49151140,
		end: 49151142,
	}],
},{
	name: 'rs376002188',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49082428,
		end: 49082429,
	}],
},{
	name: 'rs184282475',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49019013,
		end: 49019014,
	}],
},{
	name: 'rs550514056',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49045855,
		end: 49045856,
	}],
},{
	name: 'rs553600726',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49012771,
		end: 49012772,
	}],
},{
	name: 'rs140123771',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49135227,
		end: 49135228,
	}],
},{
	name: 'rs567306013',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49130689,
		end: 49130690,
	}],
},{
	name: 'rs192000725',
	ftype: 'sequence_alteration',
	loc: [{
		start: 49092146,
		end: 49092147,
	}],
}];
