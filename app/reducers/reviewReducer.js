import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import Types from '../actions/ActionTypes';

export const INITIAL_STATE = Immutable({
  review: [],
  loggedIn: false,
  error: null,
  attempting: false,
});

const attempt = (state, action) => ({
  ...state,
  attempting: true,
  review: [],
  loggedIn: false,
  error: null,
});

const success = (state, action) => ({
  ...state,
  attempting: false,
  error: null,
  review: action.review === null? []: action.review,
  loggedIn: true,
});

const failure = (state, action) => ({
  ...state,
  review: [],
  attempting: false,
  error: action.error,
});

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.REVIEW_ATTEMPT]: attempt,
  [Types.REVIEW_SUCCESS]: success,
  [Types.REVIEW_FAILURE]: failure,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
