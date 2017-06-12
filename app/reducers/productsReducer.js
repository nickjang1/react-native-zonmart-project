import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import Types from '../actions/ActionTypes';

export const INITIAL_STATE = Immutable({
  products: [],
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
  products: action.products,
});

const failure = (state, action) => ({
  ...state,
  attempting: false,
  error: action.error,
});


// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.HOME_ATTEMPT]: attempt,
  [Types.HOME_SUCCESS]: success,
  [Types.HOME_FAILURE]: failure,
  [Types.SEARCH_ATTEMPT]: attempt,
  [Types.SEARCH_SUCCESS]: success,
  [Types.SEARCH_FAILURE]: failure,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
