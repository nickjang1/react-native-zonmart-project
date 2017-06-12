import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import Types from '../actions/ActionTypes';

export const INITIAL_STATE = Immutable({
  checkoutdata: [],
  loggedIn: false,
  error: null,
  attempting: false,
});

const attempt = (state, action) => ({
  ...state,
  attempting: true,
  checkoutdata: [],
  loggedIn: false,
  error: null,
});

const success = (state, action) => ({
  ...state,
  attempting: false,
  error: null,
  checkoutdata: action.checkoutdata === null? []: action.checkoutdata,
  loggedIn: true,
});

const failure = (state, action) => ({
  ...state,
  checkoutdata: null,
  attempting: false,
  error: action.error,
});

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.CHECKOUT_ATTEMPT]: attempt,
  [Types.CHECKOUT_SUCCESS]: success,
  [Types.CHECKOUT_FAILURE]: failure,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
