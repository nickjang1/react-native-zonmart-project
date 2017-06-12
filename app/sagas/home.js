import { take, call, put } from 'redux-saga/effects';
import Store from 'react-native-simple-store';
import Types from '../actions/ActionTypes';
import { homeSuccess, homeFailure } from '../actions/Creators';


export default (api) => {
  function* worker() {
    try {
      const token = yield call(Store.get, 'token');
      const response = yield call(api.home, token);
      if (response.ok) {
        yield put(homeSuccess(response.data.products));
      } else {
        yield put(homeFailure(response.data));
      }
    } catch (error) {
      Store.delete('token');
    }
  }
  function* watcher() {
    while (true) {
      yield take(Types.HOME_ATTEMPT);
      yield call(worker);
    }
  }
  return {
    watcher,
    worker,
  };
};
