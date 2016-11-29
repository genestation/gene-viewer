'use strict';

import * as React from 'react';
import { assert, expect } from 'chai';
import * as enzyme from 'enzyme';

import {
	ConsolePrompt,
	ConsoleMessage,
	default as Console
} from 'exports?Main!../src/main.tsx';


describe('<Main />', function() {
	describe('[Property] point: ', function () {
		it('Has no cursor when point is not passed', function() {
			var wrapper = enzyme.shallow(<Main />);
			expect(wrapper.find('.react-console-cursor')).length(0);
		});
	});
});
