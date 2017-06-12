import { take, call, put } from 'redux-saga/effects';
import Store from 'react-native-simple-store';
import Types from '../actions/ActionTypes';
import { orderSuccess, orderFailure } from '../actions/Creators';


export default (api) => {
  function* worker() {
    try {
      const response = yield call(api.orderapi);
      console.log(response);
      if (response.ok) {
        yield put(orderSuccess(response.data));
      } else {
        yield put(orderFailure(response.data));
      }
    } catch (error) {
      Store.delete('token');
    }
  }
  function* watcher() {
    while (true) {
      yield take(Types.ORDER_ATTEMPT);
      yield call(worker);
    }
  }
  return {
    watcher,
    worker,
  };
};
