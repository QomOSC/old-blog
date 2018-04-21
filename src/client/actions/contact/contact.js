import izitoast from 'izitoast';

import { error } from 'Root/js/messages';
import send from 'Root/js/send';

export default async data => {
  const { type } = await send('/contact', data);

  if (type === 2) {
    error();
  }

  else {
    izitoast.success({
      rtl: true,
      title: 'پیام شما با موفقیت ارسال شد'
    });
  }
};
