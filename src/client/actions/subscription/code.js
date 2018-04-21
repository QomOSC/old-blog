import izitoast from 'izitoast';

import send from 'Root/js/send';

export default async (_id, push) => {
  const { type } = await send('/unsubscribe/remove', { _id });

  if (type === 0) {
    izitoast.success({
      rtl: true,
      title: 'ایمیل با موفقیت از خبر نامه حذف شد'
    });

    push('/');

    return;
  }

  push('/notfound');
};
