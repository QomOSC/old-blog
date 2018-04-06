import izitoast from 'izitoast';

import send from 'Root/js/send';

export default async id => {
  const request = await send('/panel/articles/reject', { id });

  if (request.type === 0) {
    izitoast.success({
      rtl: true,
      title: 'مقاله شما با موفقیت به ثبت رسید',
      message: 'تا زمان تایید آن صبر کنید'
    });
  }

  else if (request.type === 2) {
    izitoast.error({
      rtl: true,
      title: 'خطا! بعدا امتحان کنید'
    });
  }
};
