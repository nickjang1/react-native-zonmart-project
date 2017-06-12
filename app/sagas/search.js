import { take, call, put } from 'redux-saga/effects';
import Store from 'react-native-simple-store';
import Types from '../actions/ActionTypes';
import { homeSuccess, homeFailure, categorySuccess, categoryFailure } from '../actions/Creators';


export default (api) => {
  function* worker(search) {
    try {
      const response = yield call(api.searchapi, search);
      if (response.ok) {
        if (response.status === 200) {
          yield put(homeSuccess(response.data));
          yield put(categorySuccess(response.data));
        } else {
          yield put(homeFailure(response.data));
          yield put(categoryFailure(response.data));
        }
      } else {
        yield put(homeFailure(response.data));
      }
    } catch (error) {
      Store.delete('token');
    }
  }
  function* watcher() {
    while (true) {
      const search = yield take(Types.SEARCH_ATTEMPT);
      yield call(worker, search.search);
    }
  }
  return {
    watcher,
    worker,
  };
};
