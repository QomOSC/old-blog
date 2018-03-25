import types from 'Root/actions';
import { dispatch } from 'Root/store';

export default () => {
  fetch('/captcha').then(res => res.json()).then(data => {
    dispatch({
      type: types.CAPTCHA,
      captcha: data.captcha
    });
  });
};
