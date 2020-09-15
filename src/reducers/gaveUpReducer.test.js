import { actionTypes } from '../actions';
import gaveUpReducer from './gaveUpReducer';

describe('gaveUpReducer', () => {
  test('returns default initial state of `false` when no action is passed', () => {
    const newState = gaveUpReducer(undefined, {});
    expect(newState).toBe(false);
  });
  test('returns gaveUp state of `true` when GaveUpButton has been clicked', () => {
    const newState = gaveUpReducer(false, { type: actionTypes.GIVE_UP });
    expect(newState).toBe(true);
  });
  test('returns gaveUp state of `false` when NewWordButton has been clicked', () => {
    const newState = gaveUpReducer(true, {
      type: actionTypes.RESET_GAME,
    });
    expect(newState).toBe(false);
  });
  test('returns gaveUp state of `false` when user has submitted secret word', () => {
    const newState = gaveUpReducer(true, {
      type: actionTypes.USER_SUBMIT_WORD,
    });
    expect(newState).toBe(false);
  });
});
