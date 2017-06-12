import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import Types from '../actions/ActionTypes';

export const INITIAL_STATE = Immutable({
  success: false,
  error: null,
  attempting: false,
});

const attempt = (state, action) => ({
  ...state,
  success: false,
  error: null,
  attempting: true,
});

const success = (state, action) => ({
  ...state,
  attempting: false,
  error: null,
  success: true,
});

const failure = (state, action) => ({
  ...state,
  attempting: false,
  success: false,
  error: action.error,
});


// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.FORGOT_ATTEMPT]: attempt,
  [Types.FORGOT_SUCCESS]: success,
  [Types.FORGOT_FAILURE]: failure,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
