import izitoast from 'izitoast';

import { error } from 'Root/js/messages';
import send from 'Root/js/send';

export default async (data, push) => {
  const { type, text } = await send('/panel/conferences/video', data);

  if (type === 0) {
    izitoast.success({
      rtl: true,
      title: 'ویدیو با موفقیت اضافه شد'
    });

    push('/conferences');
  }

  else {

    if (text === 0) {
      izitoast.error({
        rtl: true,
        title: 'چنین کنفرانسی وجود ندارد'
      });
    }

    else if (text === 1) {
      error();
    }
  }
};
