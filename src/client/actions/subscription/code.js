import izitoast from 'izitoast';

import send from 'Root/js/send';

export default async (_id, push) => {
  const request = await send('/unsubscribe/remove', { _id });

  if (request.type === 2) {
    push('/notfound');
  }

  else if (request.type === 0) {
    izitoast.success({
      rtl: true,
      title: 'ایمیل با موفقیت از خبر نامه حذف شد'
    });

    push('/');
  }
};
