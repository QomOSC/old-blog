import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

const store = createStore(reducers, applyMiddleware(thunk));

if (process.env.NODE_ENV === 'development') {
  window.store = store;
}

export default store;
