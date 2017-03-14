import React from 'react'
import { shallow } from 'enzyme'

import Listing from './Listing'
import styles from './Listing.styles'

let wrapper;
const places = [{
  name: 'Chicago'
}, 
{
  name: "San Francisco"
}];

beforeEach(() => {
  wrapper = shallow(<Listing places={places} />)
});

it('wraps the component in a listing css class', () => {
  expect(wrapper.find('style'))
    .toBeDefined();
})
it('has an item for each place in the places prop', () => {
  expect(wrapper.find('Item').length)
    .toHaveLength(places.length);
})
