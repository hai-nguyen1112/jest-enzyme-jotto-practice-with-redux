import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../test/testUtils';
import NewWordButton from './NewWordButton';

const defaultProps = {
  success: false,
  resetGame: () => {},
  gaveUp: false,
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<NewWordButton {...setupProps} />);
  return wrapper;
};

describe('prop-types checking', () => {
  test('does not throw warning for correct prop types', () => {
    const propError = checkProps(NewWordButton, defaultProps);
    expect(propError).toBeUndefined();
  });
});

describe('render', () => {
  test('does not render if the guess is unsuccesful and GaveUpButton has not been clicked', () => {
    const wrapper = setup();
    const newWordButton = findByTestAttr(wrapper, 'new-word-button');
    expect(newWordButton.length).toEqual(0);
  });
  test('renders if the guess is unsuccessful and GaveUpButton has been clicked', () => {
    const wrapper = setup({ success: false, gaveUp: true });
    const newWordButton = findByTestAttr(wrapper, 'new-word-button');
    expect(newWordButton.length).toBe(1);
  });
  test('renders if the guess is successful', () => {
    const wrapper = setup({ success: true });
    const newWordButton = findByTestAttr(wrapper, 'new-word-button');
    expect(newWordButton.length).toBe(1);
  });
});

describe('behaviors', () => {
  test('calls resetAction action upon button click', () => {
    const resetGameMock = jest.fn();
    const wrapper = setup({ success: true, resetGame: resetGameMock });
    const newWordButton = findByTestAttr(wrapper, 'new-word-button');
    newWordButton.simulate('click');
    expect(resetGameMock.mock.calls.length).toBe(1);
  });
});
