import { take, call, put } from 'redux-saga/effects';
import Store from 'react-native-simple-store';
import Types from '../actions/ActionTypes';
import { checkoutSuccess, checkoutFailure } from '../actions/Creators';


export default (api) => {
  function* worker(checkoutdata) {
    try {
      const response = yield call(api.checkout, checkoutdata);
      if (response.ok) {
        if (response.status === 200) {
          yield put(checkoutSuccess(response.data.items));
        } else {
          yield put(checkoutFailure(response.data));
        }
      } else {
        yield put(checkoutFailure(response.data));
      }
    } catch (error) {
      Store.delete('token');
    }
  }
  function* watcher() {
    while (true) {
      const data = yield take(Types.CHECKOUT_ATTEMPT);
      yield call(worker, data.checkoutdata);
    }
  }
  return {
    watcher,
    worker,
  };
};
