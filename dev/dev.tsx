"use strict";

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DeckManager from '../src/main.tsx';

export function init(element: Element) {
	ReactDOM.render(<div>
			<p>ababa</p>
			<p>ababa</p>
			<p>ababa</p>
			<p>ababa</p>
			<p>ababa</p>
			<DeckManager deckTexts={[
{name: "Jessie Black - Sigarda's Permeating Aid",
text: `
4x Permeating Mass
2x Captain's Claws
2x Chitinous Cloak
2x Haunted Cloak
3x Slayer's Plate
2x Spidersilk Net
2x Kazuul's Toll Collector
3x Relic Seeker
3x Stone Haven Outfitter
1x Weapons Trainer
4x Forest
4x Fortified Village
3x Game Trail
2x Mountain
9x Plains
2x Iona's Blessing
4x Sigarda's Aid
2x Stasis Snare
3x Open the Armory
1x Chandra, Flamecaller
1x Gideon, Ally of Zendikar
1x Nissa, Voice of Zendikar

3x Always Watching
1x Chandra, Flamecaller
2x Dragonlord Dromoka
4x Oath of Nissa
2x Tamiyo, Field Researcher
3x Thalia, Heretic Cathar
`},
{name: "Kevin Crimin - Jund Obliterator",
text: `
4 Phyrexian Obliterator
1 Courser of Kruphix
1 Kalitas, Traitor of Ghet
1 Melira, Sylvok Outcast
1 Murderous Redcap
1 Nightshade Peddler
1 Scavenging Ooze
1 Ulvenwald Tracker
1 Viscera Seer
2 Eternal Witness
3 Kitchen Finks
4 Birds of Paradise
4 Elves of Deep Shadow
4 Domri Rade
1 Kolaghan's Command
1 Terminate
2 Abrupt Decay
3 Chord of Calling
1 Maelstrom Pulse
1 Mountain
1 Swamp
2 Forest
1 Blood Crypt
1 Stomping Ground
2 Urborg, Tomb of Yawgmoth
3 Hissing Quagmire
4 Bloodstained Mire
4 Overgrown Tomb
4 Wooded Foothills

2 Slaughter Games
2 Pulse of Murasa
1 Reclamation Sage
2 Fulminator Mage
2 Kolaghan's Command
1 Spellskite
1 Scavenging Ooze
1 Olivia Voldaren
1 Huntmaster of the Fells
1 Grim Lavamancer
1 Kalitas, Traitor of Ghet
`},
{name: "Morten - Skred Red",
text: `
4x Skred
4x Lightning Bolt
1x Magma Jet
3x Anger of the Gods
1x Mizzium Mortars
1x Roast
1x Batterskull
4x Mind Stone
4x Relic of Progenitus
1x Chandra, Pyromaster
4x Koth of the Hammer
3x Scrying Sheets
20x Snow-Covered Mountain
2x Eternal Scourge
4x Pia and Kiran Nalaar
3x Blood Moon

1x Anger of the Gods
3x Dragon's Claw
3x Molten Rain
2x Pyrite Spellbomb
1x Shattering Spree
2x Stormbreath Dragon
2x Sudden Shock
1x Vandalblast
`},
			]} />
			<p>ababa</p>
			<p>ababa</p>
			<p>ababa</p>
			<p>ababa</p>
			<p>ababa</p>
			<p>ababa</p>
			<p>ababa</p>
			<p>ababa</p>
			<p>ababa</p>
			<p>ababa</p>
			<p>ababa</p>
			<p>ababa</p>
			<p>ababa</p>
			<p>ababa</p>
	</div>
	, element);
}
