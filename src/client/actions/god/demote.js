import izitoast from 'izitoast';

import { error } from 'Root/js/messages';
import send from 'Root/js/send';

export default async (username, push) => {
  const { type, text } = await send('/panel/god/demote', { username });

  if (type === 0) {
    izitoast.success({
      rtl: true,
      title: 'کاربر با موفقیت عزل شد'
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

    else if (text === 2) {
      izitoast.warning({
        rtl: true,
        title: 'شما نمیتوانید مدیر کل را عزل کنید'
      });
    }

  }
};
