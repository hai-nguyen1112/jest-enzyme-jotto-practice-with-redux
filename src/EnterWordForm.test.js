import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../test/testUtils';
import EnterWordForm from './EnterWordForm';

const defaultProps = {
  userSubmitWord: () => {},
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<EnterWordForm {...setupProps} />);
  return wrapper;
};

describe('prop-types checking', () => {
  test('does not throw error when correct props are passed in', () => {
    const propError = checkProps(EnterWordForm, defaultProps);
    expect(propError).toBeUndefined();
  });
});

describe('render', () => {
  test('renders without error', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-enter-word-form');
    expect(component.length).toBe(1);
  });
  test('renders instructions', () => {
    const wrapper = setup();
    const component = findByTestAttr(
      wrapper,
      'paragraph-instructions-enter-word-form'
    );
    expect(component.length).toBe(1);
  });
  test('renders input field', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'field-input-enter-word-form');
    expect(component.length).toBe(1);
  });
  test('renders submit button', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'button-submit-enter-word-form');
    expect(component.length).toBe(1);
  });
});

describe('behaviors of submit button', () => {
  let userSubmitWordMock;
  let wrapper;
  const userSecretWord = 'dinner';
  beforeEach(() => {
    // create a mock function
    userSubmitWordMock = jest.fn();
    // set up Input with the mock funciont as a prop
    wrapper = setup({ userSubmitWord: userSubmitWordMock });
    // simulate the input
    wrapper.instance().inputBox.current = { value: userSecretWord };
    // simulate the submit click
    const submitButton = findByTestAttr(
      wrapper,
      'button-submit-enter-word-form'
    );
    submitButton.simulate('click', { preventDefault() {} });
  });
  test('The userSubmitWord action is called when user has clicked submit button', () => {
    expect(userSubmitWordMock.mock.calls.length).toBe(1);
  });
  test('The input value is passed into the userSubmitWord function as argument', () => {
    const userSubmitWordArg = userSubmitWordMock.mock.calls[0][0];
    expect(userSubmitWordArg).toEqual('dinner');
  });
});
