import izitoast from 'izitoast';

import { error } from 'Root/js/messages';
import send from 'Root/js/send';

export default async (data, push) => {
  const { type } = await send('/panel/articles/add', data, 'formData');

  if (type === 0) {
    izitoast.success({
      rtl: true,
      title: 'مقاله شما با موفقیت به ثبت رسید',
      message: 'تا زمان تایید آن صبر کنید'
    });

    push('/panel/articles');

    return;
  }

  error();
};
