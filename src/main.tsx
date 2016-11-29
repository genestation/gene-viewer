"use strict";

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './main.scss';

export interface MainProps{
	autofocus?: boolean;
}
export interface MainState{
	focus?: boolean;
};
export default class extends React.Component<MainProps,MainState> {
	render() {
		return <div>Hello, World!</div>
	}
}
