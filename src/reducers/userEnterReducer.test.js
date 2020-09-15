import { actionTypes } from '../actions';
import userEnterReducer from './userEnterReducer';

describe('userEnterReducer', () => {
  test('returns default initial state of null when no action is passed', () => {
    const newState = userEnterReducer(undefined, {});
    expect(newState).toBe(null);
  });
  test('returns the state of `userEntering` when the UserButtonEnter has been clicked', () => {
    const newState = userEnterReducer(undefined, {
      type: actionTypes.USER_ENTERING,
    });
    expect(newState).toEqual('userEntering');
  });
  test('returns the state of `userEntered` when user has submitted secret word', () => {
    const newState = userEnterReducer(
      { userEnter: 'userEntering' },
      { type: actionTypes.USER_ENTERED }
    );
    expect(newState).toEqual('userEntered');
  });
  test('returns the state of null when user has reset the game', () => {
    const newState = userEnterReducer(
      { userEnter: 'userEntered' },
      { type: actionTypes.RESET_GAME }
    );
    expect(newState).toBeNull();
  });
});
