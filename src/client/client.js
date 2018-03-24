import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';

import store from './store';

import 'izitoast/dist/css/iziToast.min.css';
import './css/font-fa.less';
import './css/index.less';

window.onload = () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
};
