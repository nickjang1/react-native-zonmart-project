import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import Types from '../actions/ActionTypes';

export const INITIAL_STATE = Immutable({
  cart: [],
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
  cart: action.cart,
});

const failure = (state, action) => ({
  ...state,
  attempting: false,
  error: action.error,
});

const addattempt = (state, action) => ({
  ...state,
  attempting: true,
});

const addsuccess = (state, action) => ({
  ...state,
  attempting: false,
});

const addfailure = (state, action) => ({
  ...state,
  attempting: false,
});

const delattempt = (state, action) => ({
  ...state,
  attempting: true,
});

const delsuccess = (state, action) => ({
  ...state,
  attempting: false,
});

const delfailure = (state, action) => ({
  ...state,
  attempting: false,
});


// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.CART_ATTEMPT]: attempt,
  [Types.CART_SUCCESS]: success,
  [Types.CART_FAILURE]: failure,
  [Types.ADD_CART_ATTEMPT]: addattempt,
  [Types.ADD_CART_SUCCESS]: addsuccess,
  [Types.ADD_CART_FAILURE]: addfailure,
  [Types.DEL_CART_ATTEMPT]: delattempt,
  [Types.DEL_CART_SUCCESS]: delsuccess,
  [Types.DEL_CART_FAILURE]: delfailure,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
