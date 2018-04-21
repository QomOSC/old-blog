import izitoast from 'izitoast';

import { error } from 'Root/js/messages';
import send from 'Root/js/send';

export default async (code, password, push) => {
  const { type, text } = await send(`/recovery/${code}`, { password });

  if (type === 2) {

    if (text === 0) {
      izitoast.error({
        rtl: true,
        title: 'کد خراب است!'
      });

      push('/');
    }

    else if (text === 1) {
      izitoast.error({
        rtl: true,
        title: 'مقادیر کافی نمیباشد'
      });
    }

    else if (text === 2) {
      error();
    }
  }

  else if (type === 0) {
    izitoast.success({
      rtl: true,
      title: 'رمز شما با موفقیت تغییر پیدا کرد'
    });

    push('/login');
  }
};
