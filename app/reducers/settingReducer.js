import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import Types from '../actions/ActionTypes';

export const INITIAL_STATE = Immutable({
  category: 0,
  language: 0,
  detail: null,
  order: null,
});

const attemptCategory = (state, action) => ({
  ...state,
  category: action.category,
});

const attemptLanguage = (state, action) => ({
  ...state,
  language: action.language,
});

const setDetail = (state, action) => ({
  ...state,
  id: action.data,
});
const setOrder = (state, action) => ({
  ...state,
  order: action.data,
});
// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.SET_CATEGORY]: attemptCategory,
  [Types.SET_LANGUAGE]: attemptLanguage,
  [Types.SET_DETAIL]: setDetail,
  [Types.SET_ORDER]: setOrder,
};
export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
