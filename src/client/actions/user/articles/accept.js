import izitoast from 'izitoast';

import { error } from 'Root/js/messages';
import send from 'Root/js/send';

export default async (data, push) => {
  const { type } = await send('/panel/articles/accept', data);

  if (type === 0) {
    izitoast.success({
      rtl: true,
      title: 'مقاله با موفقیت پذیرفته شد'
    });

    push('/panel/articles');

    return;
  }

  error();
};
