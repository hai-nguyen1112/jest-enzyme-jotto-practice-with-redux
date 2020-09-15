import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../test/testUtils';
import ServerError from './ServerError';

describe('render', () => {
  let wrapper;
  let component;
  beforeEach(() => {
    wrapper = shallow(<ServerError />);
    component = findByTestAttr(wrapper, 'component-server-error');
  });
  test('renders without error', () => {
    expect(component.length).toBe(1);
  });
  test('renders non-empty text', () => {
    expect(component.text().length).not.toBe(0);
  });
});
