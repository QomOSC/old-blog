import izitoast from 'izitoast';

import { error } from 'Root/js/messages';
import send from 'Root/js/send';

export default async (email, push) => {
  const request = await send('/unsubscribe', { email });

  if (request.type === 0) {
    izitoast.success({
      rtl: true,
      title: 'درخواست با موفقیت ارسال شد، ایمیل خود را چک کنید'
    });

    push('/');
  }

  else if (request.type === 2) {

    if (request.type === 0) {
      izitoast.warning({
        rtl: true,
        title: 'چنین ایمیلی در خبرنامه وجود ندارد'
      });

      push('/');
    }

    else if (request.type === 1) {
      error();
    }
  }
};
