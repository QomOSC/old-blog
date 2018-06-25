import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';

import checkLogin from 'Root/actions/checklogin';
import store from './store';

import 'izitoast/dist/css/iziToast.min.css';
import 'nprogress/nprogress.css';
import './css/iransans.css';
import './css/font-fa.less';
import './css/index.less';
import './css/icon.less';

window.onload = async () => {
  await checkLogin();

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
};
