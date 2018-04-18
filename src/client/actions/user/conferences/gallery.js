import izitoast from 'izitoast';

import { error } from 'Root/js/messages';
import send from 'Root/js/send';

export default async (data, push) => {
  const request = await send('/panel/conferences/gallery', data, 'formData');

  if (request.type === 0) {
    izitoast.success({
      rtl: true,
      title: 'عکس با موفقیت اضافه شد'
    });

    push('/');
  }

  else {
    error();
  }
};
