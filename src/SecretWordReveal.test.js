import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../test/testUtils';
import SecretWordReveal from './SecretWordReveal';

const defaultProps = {
  gaveUp: false,
  secretWord: 'party',
};

const setup = (props = {}) => {
  const setupProps = {
    ...defaultProps,
    ...props,
  };
  const wrapper = shallow(<SecretWordReveal {...setupProps} />);
  return wrapper;
};

describe('prop-types checking', () => {
  test('does not throw error when correct props are passed in SecretWordReveal', () => {
    const propError = checkProps(SecretWordReveal, defaultProps);
    expect(propError).toBeUndefined();
  });
});

describe('render', () => {
  test('does not render if GaveUpButton has not been clicked', () => {
    const wrapper = setup({ gaveUp: false });
    const component = findByTestAttr(wrapper, 'sercet-word-reveal-component');
    expect(component.length).toBe(0);
  });
  test('renders without error if GaveUpButton has been clicked', () => {
    const wrapper = setup({ gaveUp: true });
    const component = findByTestAttr(wrapper, 'sercet-word-reveal-component');
    expect(component.length).toBe(1);
  });
  test('the failure message displays the secret word', () => {
    const wrapper = setup({ gaveUp: true, secretWord: 'party' });
    const component = findByTestAttr(wrapper, 'sercet-word-reveal-component');
    expect(component.text()).toContain('party');
  });
});
