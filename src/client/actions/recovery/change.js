import izitoast from 'izitoast';

import send from 'Root/js/send';

export default async (code, password, push) => {
  const request = await send(`/recovery/${code}`, { password });

  if (request.type === 2) {

    if (request.text === 0) {
      izitoast.error({
        rtl: true,
        title: 'کد خراب است!'
      });

      push('/');
    }

    else if (request.text === 1) {
      izitoast.error({
        rtl: true,
        title: 'مقادیر کافی نمیباشد'
      });
    }

    else if (request.text === 2) {
      izitoast.error({
        rtl: true,
        title: 'خطا! بعدا امتحان کنید'
      });
    }
  }

  else if (request.type === 0) {
    izitoast.success({
      rtl: true,
      title: 'رمز شما با موفقیت تغییر پیدا کرد'
    });

    push('/login');
  }
};
