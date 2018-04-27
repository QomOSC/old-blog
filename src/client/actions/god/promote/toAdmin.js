import izitoast from 'izitoast';

import { error } from 'Root/js/messages';
import send from 'Root/js/send';

export default async (username, push) => {
  const { type, text } = await send('/panel/god/promote/toadmin', { username });

  if (type === 0) {
    izitoast.success({
      rtl: true,
      title: 'کاربر با موفقیت به مدیر تبدیل شد'
    });

    push('/panel');
  }

  else if (type === 2) {

    if (text === 0) {
      izitoast.error({
        rtl: true,
        title: 'چنین حسابی یافت نشد'
      });
    }

    else if (text === 1) {
      error();
    }

  }
};
