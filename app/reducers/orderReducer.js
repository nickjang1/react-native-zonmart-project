import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import Types from '../actions/ActionTypes';

export const INITIAL_STATE = Immutable({
  orders: [],
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
  orders: action.orders,
});

const failure = (state, action) => ({
  ...state,
  attempting: false,
  error: action.error,
});


// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.ORDER_ATTEMPT]: attempt,
  [Types.ORDER_SUCCESS]: success,
  [Types.ORDER_FAILURE]: failure,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
