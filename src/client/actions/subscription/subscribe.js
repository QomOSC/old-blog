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

    else {
      izitoast.success({
        rtl: true,
        title: 'ایمیل شما با موفقیت وارد خبر نامه شد'
      });
    }

    return;
  }

  error();
};
