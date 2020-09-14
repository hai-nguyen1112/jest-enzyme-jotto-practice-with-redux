import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../test/testUtils';
import TotalGuesses from './TotalGuesses';

const defaultProps = {
  guessCount: 0,
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<TotalGuesses {...setupProps} />);
};

describe('props testing', () => {
  test('does not throw warning with correct prop types', () => {
    const propError = checkProps(TotalGuesses, defaultProps);
    expect(propError).toBeUndefined();
  });
});

describe('render', () => {
  test('does not render TotalGuesses component if there are no words guessed', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-total-guesses');
    expect(component.length).toBe(0);
  });
  test('renders TotalGuesses component if there are words guessed', () => {
    const wrapper = setup({ guessCount: 3 });
    const component = findByTestAttr(wrapper, 'component-total-guesses');
    expect(component.length).toBe(1);
  });
});

describe('behaviors', () => {
  test('shows correct number of total guesses', () => {
    const wrapper = setup({ guessCount: 3 });
    const component = findByTestAttr(wrapper, 'component-total-guesses');
    expect(component.text()).toContain('3');
  });
});
