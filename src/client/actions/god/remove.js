import izitoast from 'izitoast';

import { error } from 'Root/js/messages';
import send from 'Root/js/send';

export default async (username, push) => {
  const { type, text } = await send('/panel/god/remove', { username });

  if (type === 0) {
    izitoast.success({
      rtl: true,
      title: 'کاربر با موفقیت حذف شد'
    });

    push('/');

    return;
  }

  if (text === 0) {
    izitoast.error({
      rtl: true,
      title: 'چنین حسابی وجود ندارد'
    });
  } else if (text === 1) {
    izitoast.error({
      rtl: true,
      title: 'کاربر مورد نظر مدیر کل است',
      message: 'شما اجازه حذف آن را ندارید'
    });
  } else if (text === 2) {
    izitoast.error({
      rtl: true,
      title: 'شما در اینجا نمی توانید خود را حذف کنید',
      message: 'به صفحه تنظیمات مراجعه کنید'
    });
  } else {
    error();
  }
};
