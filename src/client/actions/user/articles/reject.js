import izitoast from 'izitoast';

import { error } from 'Root/js/messages';
import send from 'Root/js/send';

export default async (id, push) => {
  const { type } = await send('/panel/articles/reject', { id });

  if (type === 0) {
    izitoast.success({
      rtl: true,
      title: 'این مقاله با موفقیت حذف شذ'
    });

    push('/panel/articles');

    return;
  }

  error();
};
