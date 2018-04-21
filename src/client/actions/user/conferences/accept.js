import izitoast from 'izitoast';

import { error } from 'Root/js/messages';
import send from 'Root/js/send';

export default async (data, push) => {
  const { type } = await send('/panel/conferences/accept', data);

  if (type === 0) {
    izitoast.success({
      rtl: true,
      title: 'کنفرانس با موفقیت تغییر و تایید شد'
    });

    push('/panel');

    return;
  }

  error();
};
