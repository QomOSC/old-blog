import izitoast from 'izitoast';

import { error } from 'Root/js/messages';
import send from 'Root/js/send';

export default async (data, push) => {
  const { type } = await send('/panel/conferences/add', data);

  if (type === 0) {
    izitoast.success({
      rtl: true,
      title: 'درخواست شما با موفقیت به ثبت رسید',
      message: 'تا زمان تایید آن توسط مدیران شکیبا باشید'
    });

    push('/panel');

    return;
  }

  error();
};
