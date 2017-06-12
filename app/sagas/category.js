import { take, call, put } from 'redux-saga/effects';
import Types from '../actions/ActionTypes';
import { categorySuccess, categoryFailure } from '../actions/Creators';

export default (api) => {
  function* worker(param) {
    if (param === 'all') {
      const response = yield call(api.products);
      if (response.ok) {
        if (response.data && response.status === 200) {
          yield put(categorySuccess(response.data));
        } else {
          yield put(categoryFailure(response.data));
        }
      } else {
        yield put(categoryFailure(response.data));
      }
    } else {
      const response = yield call(api.category, param);
      if (response.ok) {
        if (response.data && response.status === 200) {
          yield put(categorySuccess(response.data.products));
        } else {
          yield put(categoryFailure(response.data));
        }
      } else {
        yield put(categoryFailure(response.data));
      }
    }
  }
  function* watcher() {
    while (true) {
      const param = yield take(Types.CATEGORY_ATTEMPT);
      yield call(worker, param.categoryID);
    }
  }
  return {
    watcher,
    worker,
  };
};
