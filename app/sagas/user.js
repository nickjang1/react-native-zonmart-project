import { take, call, put } from 'redux-saga/effects';
import Store from 'react-native-simple-store';
import Types from '../actions/ActionTypes';
import { userSuccess, userFailure } from '../actions/Creators';


export default (api) => {
  function* worker() {
    try {
      const response = yield call(api.user);
      if (response.ok) {
        if (response.status === 200) {
          yield put(userSuccess(response.data.result));
        } else {
          yield put(userFailure(response.data));
        }
      } else {
        yield put(userFailure(response.data));
      }
    } catch (error) {
      Store.delete('token');
    }
  }
  function* watcher() {
    while (true) {
      yield take(Types.USER_ATTEMPT);
      yield call(worker);
    }
  }
  return {
    watcher,
    worker,
  };
};
