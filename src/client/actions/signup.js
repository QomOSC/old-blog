import izitoast from 'izitoast';

import { error } from 'Root/js/messages';
import send from 'Root/js/send';

export default async (data, push) => {
  const { type, text } = await send('/signup', data);

  if (type === 2) {

    if (text === 1) {
      izitoast.error({
        rtl: true,
        title: 'ایمیل توسط کاربر دیگری استفاده میشود'
      });
    }

    else if (text === 2) {
      izitoast.error({
        rtl: true,
        title: 'یوزرنیم توسط کاربر دیگری استفاده میشود'
      });
    }

    else if (text === 3) {
      error();
    }
  }

  else if (type === 0) {
    izitoast.success({
      rtl: true,
      title: 'حساب شما با موفقیت ساخته شد، تا زمان تایید آن صبر کنید'
    });

    push('/');
  }
};
