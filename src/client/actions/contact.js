import izitoast from 'izitoast';

import send from 'Root/js/send';

export default async data => {
  const request = await send('/contact', { data });

  if (request.type === 2) {
    izitoast.error({
      rtl: true,
      title: 'خطا! بعدا امتحان کنید'
    });
  }

  else {
    izitoast.success({
      rtl: true,
      title: 'پیام شما با موفقیت ارسال شد'
    });
  }
};
