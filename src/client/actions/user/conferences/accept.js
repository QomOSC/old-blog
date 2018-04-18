import izitoast from 'izitoast';

import { error } from 'Root/js/messages';
import send from 'Root/js/send';

export default async (data, push) => {
  const request = await send('/panel/conferences/accept', data);

  if (request.type === 0) {
    izitoast.success({
      rtl: true,
      title: 'کنفرانس با موفقیت تغییر و تایید شد'
    });

    push('/panel');
  }

  else if (request.type === 2) {
    error();
  }
};
