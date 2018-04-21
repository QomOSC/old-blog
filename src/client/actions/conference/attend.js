import izitoast from 'izitoast';

import { error } from 'Root/js/messages';
import send from 'Root/js/send';

export default async _id => {
  const { type, text } = await send('/conference/attend', { _id });

  if (type === 3) {
    izitoast.warning({
      rtl: true,
      title: 'برای حظور، باید وارد سایت شوید'
    });
  }

  else if (type === 2) {

    if (text === 0) {
      izitoast.error({
        rtl: true,
        title: 'کنفرانس وجود ندارد'
      });
    }

    else if (text === 1) {
      error();
    }
  }

  else if (type === 0) {

    if (text === 0) {
      izitoast.success({
        rtl: true,
        title: 'شما از قبل اعلام حظور کرده اید'
      });
    }

    else if (text === 1) {
      izitoast.success({
        rtl: true,
        title: 'شما با موفقیت حظور خود را اعلام کردید'
      });
    }
  }
};
