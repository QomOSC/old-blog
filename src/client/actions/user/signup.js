import izitoast from 'izitoast';

import send from 'Root/js/send';

export default async (data, push) => {
  const request = await send('/signup', data);

  console.log(request);

  if (request.type === 2) {

    if (request.text === 1) {
      izitoast.error({
        rtl: true,
        title: 'ایمیل توسط کاربر دیگری استفاده میشود'
      });
    }

    else if (request.text === 2) {
      izitoast.error({
        rtl: true,
        title: 'یوزرنیم توسط کاربر دیگری استفاده میشود'
      });
    }

    else if (request.text === 3) {
      izitoast.error({
        rtl: true,
        title: 'خطا! بعدا امتحان کنید'
      });
    }
  }

  else if (request.type === 0) {
    izitoast.success({
      rtl: true,
      title: 'حساب شما با موفقیت ساخته شد، تا زمان تایید آن صبر کنید'
    });

    push('/');
  }
};
