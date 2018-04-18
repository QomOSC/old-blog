import izitoast from 'izitoast';

import { error } from 'Root/js/messages';
import send from 'Root/js/send';

export default async (_id, push) => {
  const request = await send('/panel/conferences/reject', { _id });

  if (request.type === 0) {
    izitoast.success({
      rtl: true,
      title: 'کنفرانس با موفقیت حذف شد'
    });

    push('/panel');
  }

  else if (request.type === 2) {
    error();
  }
};
