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
			<DeckManager decklists={[
				"decks/" + "Jessie Black - Sigarda's Permeating Aid.txt",
				"decks/" + "Kevin Crimin - Jund Obliterator.txt",
				"decks/" + "Morten - Skred Red.txt",
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
