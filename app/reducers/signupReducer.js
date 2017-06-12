import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import Types from '../actions/ActionTypes';

export const INITIAL_STATE = Immutable({
  user: null,
  signedIn: false,
  error: null,
  attempting: false,
});

const attempt = (state, action) => ({
  ...state,
  attempting: true,
});

const success = (state, action) => ({
  ...state,
  attempting: false,
  error: null,
  user: action.user,
  signedIn: true,
});

const failure = (state, action) => ({
  ...state,
  attempting: false,
  error: action.error,
});


// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.SIGNUP_ATTEMPT]: attempt,
  [Types.SIGNUP_SUCCESS]: success,
  [Types.SIGNUP_FAILURE]: failure,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
