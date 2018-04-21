import izitoast from 'izitoast';

import { dispatch } from 'Root/store';
import types from 'Root/actions';

import send from 'Root/js/send';

export default async (data, push) => {
  const { type, text, user } = await send('/login', data);

  if (type === 2) {

    if (text === 0) {
      izitoast.error({
        rtl: true,
        title: 'رمز عبور یا ایمیل اشتباه اند'
      });
    }

    else if (text === 1) {
      izitoast.error({
        rtl: true,
        title: 'حساب شما هنوز توسط مدیران تایید نشده'
      });
    }

    else if (text === 2) {
      izitoast.error({
        rtl: true,
        title: 'حساب شما تایید نشده، ایمیل خود را چک کنید',
      });
    }
  }

  else if (type === 0) {
    dispatch({
      type: types.user.LOGIN,
      user
    });

    push('/panel');
  }
};
