import React from 'react';
import { shallow } from 'enzyme';

import App, { UnconnectedApp } from './App';
import { findByTestAttr, storeFactory } from '../test/testUtils';

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<App store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe('render', () => {
  test('renders without crashing', () => {
    const wrapper = setup();
    const appComponent = findByTestAttr(wrapper, 'component-app');
    expect(appComponent.length).toBe(1);
  });
});

describe('redux props', () => {
  test('has success piece of state as prop', () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(true);
  });
  test('has guessedWords piece of state as prop', () => {
    const guessedWords = [{ guessedWord: 'train', letterMatchCount: 3 }];
    const wrapper = setup({ guessedWords });
    const guessedWordsProp = wrapper.instance().props.guessedWords;
    expect(guessedWordsProp).toEqual(guessedWords);
  });
  test('has access to secretWord state', () => {
    const secretWord = 'party';
    const wrapper = setup({ secretWord });
    const secretWordProp = wrapper.instance().props.secretWord;
    expect(secretWordProp).toBe(secretWord);
  });
  test('has access to getSecretWord action creator as a function on the props', () => {
    const wrapper = setup();
    const getSecretWordProp = wrapper.instance().props.getSecretWord;
    expect(getSecretWordProp).toBeInstanceOf(Function);
  });
});

describe('function calls', () => {
  test('getSecretWord runs on App mount', () => {
    const getSecretWordMock = jest.fn(); /* This is a Jest function that Jest will know what to see then it calls and how */

    // We have to include success and guessedWords in the props because they are required props
    const props = {
      getSecretWord: getSecretWordMock,
      success: false,
      guessedWords: [],
    };

    // set up app component with getSecretWordMock as the getSecretWord prop
    const wrapper = shallow(
      <UnconnectedApp {...props} />
    ); /* We can't use setup function because it is used for connected App */

    // run lifecycle method
    wrapper.instance().componentDidMount();

    // check to see if mock ran
    const getSecretWordCallCount = getSecretWordMock.mock.calls.length;

    expect(getSecretWordCallCount).toBe(1);
  });
});
