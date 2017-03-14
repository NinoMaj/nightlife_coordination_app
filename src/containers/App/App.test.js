import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';

let wrapper; // "dom" node wrapper element
beforeEach(() => {
  wrapper = shallow(<App />);
})

it('has a Router component', () => {
  expect(wrapper.find('Router'))
    .toHaveLength(1);
})
