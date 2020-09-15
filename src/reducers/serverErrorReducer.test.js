import { actionTypes } from '../actions';
import serverErrorReducer from './serverErrorReducer';

describe('serverErrorReducer', () => {
  test('returns initial state of false when no action is passed', () => {
    const newState = serverErrorReducer(undefined, {});
    expect(newState).toBe(false);
  });
  test('returns state of true when getting an error from the server', () => {
    const newState = serverErrorReducer(false, {
      type: actionTypes.SERVER_ERROR,
    });
    expect(newState).toBe(true);
  });
});
