import izitoast from 'izitoast';

import send from 'Root/js/send';

export default async (data, push) => {
  const request = await send('/panel/articles/accept', data);

  if (request.type === 0) {
    izitoast.success({
      rtl: true,
      title: 'مقاله با موفقیت پذیرفته شد'
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
