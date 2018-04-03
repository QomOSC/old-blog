import izitoast from 'izitoast';

import send from 'Root/js/send';

export default async (data, push) => {
  const request = await send('/panel/user/articles/add', data, 'formData');

  if (request.type === 0) {
    izitoast.success({
      rtl: true,
      title: 'مقاله شما با موفقیت به ثبت رسید',
      message: 'تا زمان تایید آن صبر کنید'
    });

    push('/panel/articles');
  }

  else if (request.type === 2) {
    izitoast.error({
      rtl: true,
      title: 'خطا! بعدا امتحان کنید'
    });
  }
};
