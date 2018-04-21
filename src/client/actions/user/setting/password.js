import izitoast from 'izitoast';

import { error } from 'Root/js/messages';
import send from 'Root/js/send';

export default async (old, fresh) => {
  const { type, text } =
    await send('/panel/user/setting/password', { old, fresh });

  if (type === 0) {
    izitoast.success({
      rtl: true,
      title: 'با موفقیت به روز رسانی شد'
    });
  }

  else if (type === 2) {

    if (text === 0) {
      izitoast.error({
        rtl: true,
        title: 'چنین حسابی وجود ندارد'
      });
    }

    else if (text === 1) {
      izitoast.error({
        rtl: true,
        title: 'رمز صحیح نیست'
      });
    }

    else if (text === 2) {
      izitoast.error({
        rtl: true,
        title: 'رمز قبلی اشتباه است'
      });
    }

    else if (text === 3) {
      error();
    }
  }
};
