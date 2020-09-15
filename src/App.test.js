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
  test('does not render Congrats, SecretWordReveal, NewWordButton, Input, GuessedWords, TotalGuesses, UserEnterButton when user is entering a secret word', () => {
    const wrapper = setup({ userEnter: 'userEntering' });
    const appComponents = findByTestAttr(wrapper, 'components-in-app');
    expect(appComponents.length).toBe(0);
  });
  test('renders EnterWordForm when user is entering a secret word', () => {
    const wrapper = setup({ userEnter: 'userEntering' });
    const component = findByTestAttr(
      wrapper,
      'component-enter-word-form-in-app'
    );
    expect(component.length).toBe(1);
  });
  test('renders ServerError component when there is an error from the server', () => {
    const wrapper = setup({ serverError: true });
    const component = findByTestAttr(wrapper, 'component-server-error');
    expect(component.length).toBe(1);
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
  test('has access to gaveUp state as props', () => {
    const gaveUp = false;
    const wrapper = setup({ gaveUp: gaveUp });
    const gaveUpProps = wrapper.instance().props.gaveUp;
    expect(gaveUpProps).toBe(false);
  });
  test('has access to userEnter state as props', () => {
    const userEnter = 'userEntering';
    const wrapper = setup({ userEnter });
    const userEnterProps = wrapper.instance().props.userEnter;
    expect(userEnterProps).toBe('userEntering');
  });
  test('has access to resetGame action as props', () => {
    const wrapper = setup();
    const resetGameProp = wrapper.instance().props.resetGame;
    expect(resetGameProp).toBeInstanceOf(Function);
  });
  test('has access to setUseringEntering action as props', () => {
    const wrapper = setup();
    const setUserEnteringProp = wrapper.instance().props.setUserEntering;
    expect(setUserEnteringProp).toBeInstanceOf(Function);
  });
  test('has access to userSubmitWord action as props', () => {
    const wrapper = setup();
    const userSubmitWordProp = wrapper.instance().props.userSubmitWord;
    expect(userSubmitWordProp).toBeInstanceOf(Function);
  });
  test('has access to serverError state as a prop', () => {
    const wrapper = setup({ serverError: false });
    const serverErrorProp = wrapper.instance().props.serverError;
    expect(serverErrorProp).toBe(false);
  });
});

describe('actions get called', () => {
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
