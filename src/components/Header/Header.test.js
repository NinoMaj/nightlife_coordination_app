import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import Header from './Header';

let wrapper;
beforeEach(() => {
  wrapper = shallow(<Header />)
});

it('contains a title component with yelp', () => {
  expect(wrapper.find('h2').first().text())
    .toBe('Nighlife Coordination App');
});

it('contains a section menu with the title', () => {
  expect(wrapper.find('section').first().text())
    .toBe('Fullstack.io');
});
