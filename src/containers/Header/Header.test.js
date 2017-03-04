import React from 'react';
import Header from './Header';
import { shallow } from 'enzyme'

let wrapper;
beforeEach(() => {
  wrapper = shallow(<Header />)
});

it('contains a title component with yelp', () => {
  expect(wrapper.find('h1').first().text())
    .toMatch('Yelp')
});

it('contains a section menu with the title', () => {
  expect(wrapper.find('section').first().text())
    .toMatch('Fullstack.io')
});
