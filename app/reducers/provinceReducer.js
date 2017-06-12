import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import Types from '../actions/ActionTypes';

export const INITIAL_STATE = Immutable({
  province: [],
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
  province: action.province,
});

const failure = (state, action) => ({
  ...state,
  attempting: false,
  error: action.error,
});


// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.PROVINCE_ATTEMPT]: attempt,
  [Types.PROVINCE_SUCCESS]: success,
  [Types.PROVINCE_FAILURE]: failure,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
