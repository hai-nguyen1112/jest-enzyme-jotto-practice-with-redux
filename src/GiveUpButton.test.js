import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../test/testUtils';
import GiveUpButton from './GiveUpButton';

const defaultProps = {
  success: false,
  giveUp: () => {},
  gaveUp: false,
};

const setup = (props = {}) => {
  const setupProps = {
    ...defaultProps,
    ...props,
  };
  const wrapper = shallow(<GiveUpButton {...setupProps} />);
  return wrapper;
};

describe('prop-types checking', () => {
  test('does not throw error when correct props are passed in the GiveUpButton component', () => {
    const propError = checkProps(GiveUpButton, defaultProps);
    expect(propError).toBeUndefined();
  });
});

describe('render', () => {
  test('renders without error when the word has not been guessed correctly and GiveUpButton has not been clicked', () => {
    const wrapper = setup({ success: false, gaveUp: false });
    const giveUpButton = findByTestAttr(wrapper, 'give-up-button');
    expect(giveUpButton.length).toBe(1);
  });
  test('does not render when the word has not been guessed correctly and GiveUpButton has been clicked', () => {
    const wrapper = setup({ success: false, gaveUp: true });
    const giveUpButton = findByTestAttr(wrapper, 'give-up-button');
    expect(giveUpButton.length).toBe(0);
  });
  test('does not render when the word has been gussed correctly', () => {
    const wrapper = setup({ success: true });
    const giveUpButton = findByTestAttr(wrapper, 'give-up-button');
    expect(giveUpButton.length).toBe(0);
  });
});

describe('behaviors', () => {
  test('calls giveUp action upon GiveUpButton click', () => {
    const giveUpMock = jest.fn();
    const wrapper = setup({
      success: false,
      giveUp: giveUpMock,
      gaveUp: false,
    });
    const giveUpButton = findByTestAttr(wrapper, 'give-up-button');
    giveUpButton.simulate('click', { preventDefault() {} });
    expect(giveUpMock.mock.calls.length).toBe(1);
  });
});
