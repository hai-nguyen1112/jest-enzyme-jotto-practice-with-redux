import { storeFactory } from '../test/testUtils';
import { guessWord, userSubmitWord } from './actions';

describe('guessWord action dispatcher', () => {
  const secretWord = 'party';
  const unsuccessfulGuess = 'train';
  describe('no guessed words', () => {
    let store;
    const initialState = { secretWord };
    beforeEach(() => {
      store = storeFactory(initialState);
    });
    test('updates state correctly for unsuccessful guess', () => {
      store.dispatch(guessWord(unsuccessfulGuess));
      const newState = store.getState();
      const expectedState = {
        ...initialState,
        success: false,
        guessedWords: [{ guessedWord: unsuccessfulGuess, letterMatchCount: 3 }],
        gaveUp: false,
        userEnter: null,
        serverError: false,
      };
      expect(newState).toEqual(expectedState);
    });
    test('updates state correctly for successful guess', () => {
      store.dispatch(guessWord(secretWord));
      const newState = store.getState();
      const expectedState = {
        ...initialState,
        success: true,
        guessedWords: [{ guessedWord: secretWord, letterMatchCount: 5 }],
        gaveUp: false,
        userEnter: null,
        serverError: false,
      };
      expect(newState).toEqual(expectedState);
    });
  });
  describe('some guessed words', () => {
    const guessedWords = [{ guessedWord: 'agile', letterMatchCount: 1 }];
    const initialState = {
      secretWord,
      guessedWords,
    };
    let store;
    beforeEach(() => {
      store = storeFactory(initialState);
    });
    test('updates state correctly for unsuccessful guess', () => {
      store.dispatch(guessWord(unsuccessfulGuess));
      const newState = store.getState();
      const expectedState = {
        secretWord,
        success: false,
        guessedWords: [
          ...guessedWords,
          {
            guessedWord: unsuccessfulGuess,
            letterMatchCount: 3,
          },
        ],
        gaveUp: false,
        userEnter: null,
        serverError: false,
      };
      expect(newState).toEqual(expectedState);
    });
    test('updates state correctly for successful guess', () => {
      store.dispatch(guessWord(secretWord));
      const newState = store.getState();
      const expectedState = {
        secretWord,
        success: true,
        guessedWords: [
          ...guessedWords,
          {
            guessedWord: secretWord,
            letterMatchCount: 5,
          },
        ],
        gaveUp: false,
        userEnter: null,
        serverError: false,
      };
      expect(newState).toEqual(expectedState);
    });
  });
});

describe('setUserSecretWord action dispatcher', () => {
  // this is the integration test section because it involves the setUserSecretWord action creator and two reducers

  let store;
  let newState;

  // this represents the word the user enter
  const userSecretWord = 'lunch';

  // this represents the word we got from the server
  const initialState = { secretWord: 'party' };

  // run the action
  beforeEach(() => {
    store = storeFactory(initialState);
    store.dispatch(userSubmitWord(userSecretWord));
    newState = store.getState();
  });

  test('update secretWord state correctly after entered word', () => {
    expect(newState.secretWord).toBe('lunch');
  });
  test('update userEnter state correctly after entered word', () => {
    expect(newState.userEnter).toBe('userEntered');
  });
});
