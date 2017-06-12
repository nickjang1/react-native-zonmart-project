import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import Types from '../actions/ActionTypes';

export const INITIAL_STATE = Immutable({
  user: null,
  loggedIn: false,
  error: null,
  attempting: false,
});

const attempt = (state, action) => ({
  ...state,
  attempting: true,
  user: null,
  loggedIn: false,
  error: null,
});

const success = (state, action) => ({
  ...state,
  attempting: false,
  error: null,
  user: action.user,
  loggedIn: true,
});

const failure = (state, action) => ({
  ...state,
  user: null,
  attempting: false,
  error: action.error,
});

const logout = (state, action) => ({
  user: null,
  loggedIn: false,
});

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.LOGIN_ATTEMPT]: attempt,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGOUT]: logout,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
