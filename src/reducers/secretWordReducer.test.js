import { actionTypes } from '../actions';
import secretWordReducer from './secretWordReducer';

describe('secretWordReducer', () => {
  test('returns default initial state of null when no action is called', () => {
    const newState = secretWordReducer(undefined, {});
    expect(newState).toBeNull();
  });
  test('returns a secret word when getting a random word from the server', () => {
    const newState = secretWordReducer(undefined, {
      type: actionTypes.SET_SECRET_WORD,
      payload: 'dinner',
    });
    expect(newState).toEqual('dinner');
  });
  test('returns a secret word when getting a random word from the user input', () => {
    const newState = secretWordReducer(undefined, {
      type: actionTypes.USER_SUBMIT_WORD,
      payload: 'dinner',
    });
    expect(newState).toEqual('dinner');
  });
});
