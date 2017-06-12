import { take, call, put } from 'redux-saga/effects';
import Store from 'react-native-simple-store';
import Types from '../actions/ActionTypes';
import { detailSuccess, detailFailure } from '../actions/Creators';


export default (api) => {
  function* worker(id) {
    try {
      const response = yield call(api.detailapi, id);
      console.log(response);
      if (response.ok) {
        yield put(detailSuccess(response.data));
      } else {
        yield put(detailFailure(response.data));
      }
    } catch (error) {
      Store.delete('token');
    }
  }
  function* watcher() {
    while (true) {
      const id = yield take(Types.DETAIL_ATTEMPT);
      console.log(id);
      yield call(worker, id.id);
    }
  }
  return {
    watcher,
    worker,
  };
};
