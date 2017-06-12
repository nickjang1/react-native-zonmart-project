import { take, call, put } from 'redux-saga/effects';
import Store from 'react-native-simple-store';
import Types from '../actions/ActionTypes';
import { cartSuccess, cartFailure } from '../actions/Creators';


export default (api) => {
  function* worker() {
    try {
      const response = yield call(api.cart);
      if (response.ok) {
        if (response.status === 200) {
          yield put(cartSuccess(response.data));
        } else {
          yield put(cartFailure(response.data));
        }
      } else {
        yield put(cartFailure(response.data));
      }
    } catch (error) {
      Store.delete('token');
    }
  }
  function* watcher() {
    while (true) {
      yield take(Types.CART_ATTEMPT);
      yield call(worker);
    }
  }
  return {
    watcher,
    worker,
  };
};
