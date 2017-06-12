
import { AsyncStorage } from 'react-native';
import devTools from 'remote-redux-devtools';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import reducer from './reducers';
import promise from './promise';

import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

export default function configureStore(onCompletion:()=>void):any {
  const sagaMiddleware = createSagaMiddleware();
  const enhancer = compose(
    applyMiddleware(thunk, promise, sagaMiddleware),
    devTools({
      name: 'zonmart', realtime: true,
    }),
  );

  const store = createStore(reducer, enhancer);
  persistStore(store, { storage: AsyncStorage }, onCompletion);

  sagaMiddleware.run(rootSaga);
  return store;
}
