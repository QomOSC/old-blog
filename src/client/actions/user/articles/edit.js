import izitoast from 'izitoast';

import { error } from 'Root/js/messages';
import send from 'Root/js/send';

export default async (data, push) => {
  const { type } = await send('/panel/articles/edit', data);

  if (type === 0) {
    izitoast.success({
      rtl: true,
      title: 'مقاله با موفقیت تغییر یافت',
      message: ' تا زمان تایید دوباره آن توسط مدیران صبر کنید'
    });

    push('/panel');

    return;
  }

  error();
};
