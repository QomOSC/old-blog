import izitoast from 'izitoast';

import send from 'Root/js/send';

export default async (data, push) => {
  const request = await send('/panel/articles/edit', data);

  if (request.type === 0) {
    izitoast.success({
      rtl: true,
      title: 'مقاله با موفقیت تغییر یافت',
      message: ' تا زمان تایید دوباره آن توسط مدیران صبر کنید'
    });

    push('/panel');
  }

  else if (request.type === 2) {
    izitoast.error({
      rtl: true,
      title: 'خطا! بعدا امتحان کنید'
    });
  }
};
