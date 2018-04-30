import izitoast from 'izitoast';

import { error } from 'Root/js/messages';
import send from 'Root/js/send';

export default async (token, push) => {
  const { type, text } = await send('/subscribe/verify', { token });

  if (type === 2) {

    if (text === 0) {
      push('/notfound');
    }

    else if (text === 1) {
      error();
    }

  }

  else if (type === 0) {
    izitoast.success({
      rtl: true,
      title: 'ایمیل شما با موفقیت وارد خبرنامه شد'
    });

    push('/');
  }
};
