import { take, call, put } from 'redux-saga/effects';
import Types from '../actions/ActionTypes';
import { signupSuccess, signupFailure } from '../actions/Creators';


export default (api) => {
  function* worker(authData) {
    const response = yield call(api.signup, authData);
    if (response.ok) {
      if (response.data && response.data.status !== 'error') {
        yield put(signupSuccess(response.data));
      } else {
        yield put(signupFailure(response.data));
      }
    } else {
      yield put(signupFailure(response.data));
    }
  }
  function* watcher() {
    while (true) {
      const authData = yield take(Types.SIGNUP_ATTEMPT);
      yield call(worker, authData.user);
    }
  }
  return {
    watcher,
    worker,
  };
};
