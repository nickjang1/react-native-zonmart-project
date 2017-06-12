import { take, call, put } from 'redux-saga/effects';
import Store from 'react-native-simple-store';
import Types from '../actions/ActionTypes';
import { loginSuccess, loginFailure, userAttempt } from '../actions/Creators';


export default (api) => {
  function* worker(authData) {
    const response = yield call(api.login, authData);
    if (response.ok) {
      yield call(Store.update, 'token', response.data.result);
      yield put(loginSuccess(response.data));
      yield put(userAttempt());
    } else {
      yield put(loginFailure(response.data));
    }
  }
  function* watcher() {
    while (true) {
      const authData = yield take(Types.LOGIN_ATTEMPT);
      yield call(worker, authData.user);
    }
  }
  return {
    watcher,
    worker,
  };
};
