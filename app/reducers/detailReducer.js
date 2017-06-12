import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import Types from '../actions/ActionTypes';

export const INITIAL_STATE = Immutable({
  detaildata: null,
  loggedIn: false,
  error: null,
  attempting: false,
});

const attempt = (state, action) => ({
  ...state,
  attempting: true,
  detaildata: null,
  loggedIn: false,
  error: null,
});

const success = (state, action) => ({
  ...state,
  attempting: false,
  error: null,
  detaildata: action.detail,
  loggedIn: true,
});

const failure = (state, action) => ({
  ...state,
  detaildata: null,
  attempting: false,
  error: action.error,
});

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.DETAIL_ATTEMPT]: attempt,
  [Types.DETAIL_SUCCESS]: success,
  [Types.DETAIL_FAILURE]: failure,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
