import { fork } from 'redux-saga/effects';
import API from '../services/Api';

import loginAttempt from './loginAttempt';
import loginSuccess from './loginSuccess';
import signupAttempt from './signupAttempt';
import forgot from './forgot';
import home from './home';
import category from './category';
import cart from './cart';
import addCart from './addCart';
import delCart from './delCart';
import checkout from './checkout';
import search from './search';
import user from './user';
import reviews from './reviews';
import province from './province';
import order from './order';
import detail from './detail';

const api = API.create('http://zonmart.websitedemo.today/api/');

export default function* rootSaga() {
  yield fork(loginAttempt(api).watcher);
  yield fork(loginSuccess().watcher);
  yield fork(signupAttempt(api).watcher);
  yield fork(forgot(api).watcher);
  yield fork(home(api).watcher);
  yield fork(category(api).watcher);
  yield fork(cart(api).watcher);
  yield fork(addCart(api).watcher);
  yield fork(delCart(api).watcher);
  yield fork(checkout(api).watcher);
  yield fork(search(api).watcher);
  yield fork(user(api).watcher);
  yield fork(reviews(api).watcher);
  yield fork(province(api).watcher);
  yield fork(order(api).watcher);
  yield fork(detail(api).watcher);
}
