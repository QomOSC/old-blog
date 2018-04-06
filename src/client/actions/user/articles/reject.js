import izitoast from 'izitoast';

import send from 'Root/js/send';

export default async (id, push) => {
  const request = await send('/panel/articles/reject', { id });

  if (request.type === 0) {
    izitoast.success({
      rtl: true,
      title: 'این مقاله با موفقیت حذف شذ'
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
