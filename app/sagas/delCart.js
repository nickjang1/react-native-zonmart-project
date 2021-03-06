import { take, call, put } from 'redux-saga/effects';
import Store from 'react-native-simple-store';
import Types from '../actions/ActionTypes';
import { cartAttempt, addCartFailure } from '../actions/Creators';


export default (api) => {
  function* worker(id) {
    try {
      const response = yield call(api.delcart, id);
      if (response.ok) {
        yield put(cartAttempt());
      } else {
        yield put(addCartFailure(response.data));
      }
    } catch (error) {
      Store.delete('token');
    }
  }
  function* watcher() {
    while (true) {
      const id = yield take(Types.DEL_CART_ATTEMPT);
      yield call(worker, id.id);
    }
  }
  return {
    watcher,
    worker,
  };
};
