"use strict";

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Main from '../src/main.tsx';

export function init(element: Element) {
	ReactDOM.render(<Main/>, element);
}
