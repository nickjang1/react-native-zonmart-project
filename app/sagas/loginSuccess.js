import { take, call } from 'redux-saga/effects';
import Store from 'react-native-simple-store';
import Types from '../actions/ActionTypes';
import Global from '../Global';

export default () => {
  function* worker(userData) {
    Global.user_token = userData.result;
    yield call(Store.update, 'token', userData.result);
  }

  function* watcher() {
    while (true) {
      const userData = yield take(Types.LOGIN_SUCCESS);
      yield call(worker, userData.user);
    }
  }

  return {
    watcher,
    worker,
  };
};
