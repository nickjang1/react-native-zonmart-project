import { take, call, put } from 'redux-saga/effects';
import Types from '../actions/ActionTypes';
import { reviewSuccess, reviewFailure } from '../actions/Creators';

export default (api) => {
  function* worker(id) {
    const response = yield call(api.reviews, id);
    if (response.ok) {
      yield put(reviewSuccess(response.data));
    } else {
      yield put(reviewFailure(response.data));
    }
  }
  function* watcher() {
    while (true) {
      const param = yield take(Types.REVIEW_ATTEMPT);
      yield call(worker, param.id);
    }
  }
  return {
    watcher,
    worker,
  };
};
