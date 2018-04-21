import izitoast from 'izitoast';

import { error } from 'Root/js/messages';
import send from 'Root/js/send';

export default async (email, push) => {
  const { type, text } = await send('/recovery', { email });

  if (type === 0) {
    izitoast.success({
      rtl: true,
      title: 'با موفقیت ارسال شد'
    });

    push('/');
  }

  else if (type === 2) {

    if (text === 0) {
      izitoast.error({
        rtl: true,
        title: 'چنین حسابی وجود ندارد'
      });
    }

    else if (text === 1) {
      error();
    }
  }
};
