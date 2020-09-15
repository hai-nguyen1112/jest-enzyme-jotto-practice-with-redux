import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../test/testUtils';
import UserEnterButton from './UserEnterButton';

const defaultProps = {
  setUserEntering: () => {},
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<UserEnterButton {...setupProps} />);
  return wrapper;
};

describe('prop types checking', () => {
  test('does not throw error when correct props are passed in', () => {
    const propError = checkProps(UserEnterButton, defaultProps);
    expect(propError).toBeUndefined();
  });
});

describe('render', () => {
  test('renders without error', () => {
    const wrapper = setup();
    const userEnterButton = findByTestAttr(wrapper, 'user-enter-button');
    expect(userEnterButton.length).toBe(1);
  });
});

describe('behaviors', () => {
  test('calls setUserEntering action when the button has been clicked', () => {
    const setUserEnteringMock = jest.fn();
    const wrapper = setup({ setUserEntering: setUserEnteringMock });
    const userEnterButton = findByTestAttr(wrapper, 'user-enter-button');
    userEnterButton.simulate('click');
    expect(setUserEnteringMock.mock.calls.length).toBe(1);
  });
});
