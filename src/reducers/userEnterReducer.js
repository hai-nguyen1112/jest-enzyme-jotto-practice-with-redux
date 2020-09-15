import { actionTypes } from '../actions';

export default (state = null, action) => {
  switch (action.type) {
    case actionTypes.USER_ENTERING:
      return 'userEntering';
    case actionTypes.USER_ENTERED:
      return 'userEntered';
    case actionTypes.RESET_GAME:
      return null;
    default:
      return state;
  }
};
