import { take, call, put } from 'redux-saga/effects';
import Store from 'react-native-simple-store';
import Types from '../actions/ActionTypes';
import { addCartSuccess, addCartFailure } from '../actions/Creators';


export default (api) => {
  function* worker(id) {
    try {
      const response = yield call(api.addcart, id);
      if (response.ok) {
        if (response.status === 200) {
          yield put(addCartSuccess(response.data));
        } else {
          yield put(addCartFailure(response.data));
        }
      } else {
        yield put(addCartFailure(response.data));
      }
    } catch (error) {
      Store.delete('token');
    }
  }
  function* watcher() {
    while (true) {
      const id = yield take(Types.ADD_CART_ATTEMPT);
      yield call(worker, id.id);
    }
  }
  return {
    watcher,
    worker,
  };
};
