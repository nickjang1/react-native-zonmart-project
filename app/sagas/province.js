import { take, call, put } from 'redux-saga/effects';
import Store from 'react-native-simple-store';
import Types from '../actions/ActionTypes';
import { provinceSuccess, provinceFailure } from '../actions/Creators';


export default (api) => {
  function* worker() {
    try {
      const response = yield call(api.provinceapi);
      if (response.ok) {
        yield put(provinceSuccess(response.data));
      } else {
        yield put(provinceFailure(response.data));
      }
    } catch (error) {
      Store.delete('token');
    }
  }
  function* watcher() {
    while (true) {
      yield take(Types.PROVINCE_ATTEMPT);
      yield call(worker);
    }
  }
  return {
    watcher,
    worker,
  };
};
