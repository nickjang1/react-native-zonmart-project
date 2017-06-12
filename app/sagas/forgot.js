import { take, call, put } from 'redux-saga/effects';
import Types from '../actions/ActionTypes';
import { forgotSuccess, forgotFailure } from '../actions/Creators';


export default (api) => {
  function* worker(authData) {
    const response = yield call(api.forgot, authData);
    if (response.ok) {
      yield put(forgotSuccess(response.data));
    } else {
      yield put(forgotFailure(response.data));
    }
  }
  function* watcher() {
    while (true) {
      const authData = yield take(Types.FORGOT_ATTEMPT);
      yield call(worker, authData.user);
    }
  }
  return {
    watcher,
    worker,
  };
};
