import izitoast from 'izitoast';

import types from 'Root/actions';

import { error } from 'Root/js/messages';
import send from 'Root/js/send';

export default (email, push) => async dispatch => {
  const { type, text } = await send('/panel/user/setting/email', { email });

  if (type === 0) {
    izitoast.success({
      rtl: true,
      title: 'با موفقیت به روز رسانی شد',
      message: 'برای ورود ایمیل خود را تایید کنید'
    });

    dispatch({
      type: types.user.LOGOUT,
    });

    push('/');
  }

  else if (type === 2) {

    if (text === 0) {
      izitoast.error({
        rtl: true,
        title: 'چنین حسابی وجود ندارد'
      });
    }

    else if (text === 1) {
      izitoast.error({
        rtl: true,
        title: 'این ایمیل توسط حساب دیگری استفاده میشود'
      });
    }

    else if (text === 2) {
      error();
    }
  }
};
