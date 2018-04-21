import izitoast from 'izitoast';

import { error } from 'Root/js/messages';
import send from 'Root/js/send';

export default async (email, push) => {
  const { type, text } = await send('/unsubscribe', { email });

  if (type === 0) {
    izitoast.success({
      rtl: true,
      title: 'درخواست با موفقیت ارسال شد، ایمیل خود را چک کنید'
    });

    push('/');
  }

  else if (type === 2) {

    if (text === 0) {
      izitoast.warning({
        rtl: true,
        title: 'چنین ایمیلی در خبرنامه وجود ندارد'
      });

      push('/');
    }

    else if (text === 1) {
      error();
    }
  }
};
