import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

import 'izitoast/dist/css/iziToast.min.css';

window.onload = () => {
  render(
    <Provider store={store}>
      <h1>Hello World</h1>
    </Provider>,
    document.getElementById('root')
  );
};
