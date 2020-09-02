import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import { findByTestAttr } from '../test/testUtils';
import Congrats from './Congrats';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props = {}) => {
  return shallow(<Congrats {...props} />);
};

test('renders without error', () => {
  const wrapper = setup();
  const congratsComponent = findByTestAttr(wrapper, 'component-congrats');
  expect(congratsComponent.length).toBe(1);
});

test('renders no text when `success` prop is false', () => {
  const wrapper = setup({ success: false });
  const congratsComponent = findByTestAttr(wrapper, 'component-congrats');
  expect(congratsComponent.text()).toBe('');
});

test('renders non empty congrats message when `success` prop is true', () => {
  const wrapper = setup({ success: true });
  const congratsMessage = findByTestAttr(wrapper, 'congrats-message');
  expect(congratsMessage.text()).not.toBe(0);
});
