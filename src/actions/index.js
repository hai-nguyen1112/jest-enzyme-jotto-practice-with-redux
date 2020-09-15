import { getLetterMatchCount } from '../helpers';
import axios from 'axios';

export const actionTypes = {
  CORRECT_GUESS: 'CORRECT_GUESS',
  GUESS_WORD: 'GUESS_WORD',
  SET_SECRET_WORD: 'SET_SECRET_WORD',
  RESET_GAME: 'RESET_GAME',
  GIVE_UP: 'GIVE_UP',
  USER_ENTERING: 'USER_ENTERING',
  USER_ENTERED: 'USER_ENTERED',
  USER_SUBMIT_WORD: 'USER_SUBMIT_WORD',
  SERVER_ERROR: 'SERVER_ERROR',
};

export const guessWord = (guessedWord) => {
  return (dispatch, getState) => {
    const secretWord = getState().secretWord;
    const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);

    dispatch({
      type: actionTypes.GUESS_WORD,
      payload: { guessedWord, letterMatchCount },
    });

    if (guessedWord === secretWord) {
      dispatch({ type: actionTypes.CORRECT_GUESS });
    }
  };
};

export const getSecretWord = () => {
  return getSecretWordDispatch;
};

const getSecretWordDispatch = (dispatch) => {
  return axios
    .get('http://localhost:3030')
    .then((response) => {
      dispatch({
        type: actionTypes.SET_SECRET_WORD,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({ type: actionTypes.SERVER_ERROR });
    });
};

export const resetGame = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.RESET_GAME,
    });
    return getSecretWordDispatch(dispatch);
  };
};

export const giveUp = () => {
  return {
    type: actionTypes.GIVE_UP,
  };
};

export const setUserEntering = () => {
  return {
    type: actionTypes.USER_ENTERING,
  };
};

export const userSubmitWord = (word) => {
  return (dispatch) => {
    dispatch(setUserEntered());
    dispatch(setUserSecretWord(word));
  };
};

const setUserEntered = () => {
  return {
    type: actionTypes.USER_ENTERED,
  };
};

const setUserSecretWord = (word) => {
  return {
    type: actionTypes.USER_SUBMIT_WORD,
    payload: word,
  };
};
