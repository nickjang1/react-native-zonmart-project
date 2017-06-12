import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import Types from '../actions/ActionTypes';

export const INITIAL_STATE = Immutable({
  firstname: '',
  lastname: '',
  address1: '',
  address2: '',
  postalcode: '',
  city: '',
  province: '',
  phone: '',
  email: '',
});

const attempt = (state, action) => ({
  ...state,
  firstname: action.user.firstname,
  lastname: action.user.lastname,
  address1: action.user.address1,
  address2: action.user.address2,
  postalcode: action.user.postalcode,
  city: action.user.city,
  province: action.user.province,
  phone: action.user.phone,
  email: action.user.email,
});

const success = (state, action) => ({
  ...state,
  firstname: action.user.firstname,
  lastname: action.user.lastname,
  address1: action.user.address1,
  address2: action.user.address2,
  postalcode: action.user.postalcode,
  city: action.user.city,
  province: action.user.province,
  phone: action.user.phone,
  email: action.user.email,
});

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.CHECKOUT_DELIVERY]: attempt,
  [Types.USER_SUCCESS]: success,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
