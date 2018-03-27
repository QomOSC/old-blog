import izitoast from 'izitoast';

import { dispatch } from 'Root/store';
import types from 'Root/actions';

import send from 'Root/js/send';

export default async (data, push) => {
  const request = await send('/login', data);

  console.log(request);

  if (request.type === 2) {

    if (request.text === 0) {
      izitoast.error({
        rtl: true,
        title: 'رمز عبور یا ایمیل اشتباه اند'
      });
    }

    else if (request.text === 1) {
      izitoast.error({
        rtl: true,
        title: 'حساب شما هنوز توسط مدیران تایید نشده'
      });
    }
  }

  else if (request.type === 0) {
    dispatch({
      type: types.user.LOGIN,
      user: request.user
    });

    push('/panel');
  }
};
