import izitoast from 'izitoast';

import { error } from 'Root/js/messages';
import send from 'Root/js/send';

export default async email => {
  const { type, text } = await send('/subscribe', { email });

  if (type === 0) {

    if (text === 0) {
      izitoast.success({
        rtl: true,
        title: 'ایمیل در خبرنامه هست از قبل'
      });
    }

    if (text === 1) {
      izitoast.success({
        rtl: true,
        title: 'ایمیل ثبت شد، برای استفاده ایمیل خود را تایید کنید',
        message: 'ایمیل خود را چک کنید'
      });
    }
  }

  else if (type === 2) {

    if (text === 0) {
      izitoast.warning({
        rtl: true,
        title: 'ایمیل شما تایید نشده',
        message: 'ایمیل خود را چک کنید'
      });
    }

    else if (text === 1) {
      error();
    }

  }
};
