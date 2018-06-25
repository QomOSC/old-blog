import izitoast from 'izitoast';

import send from 'Root/js/send';

export default async (code, push) => {
  const { type } = await send('/activate', { code });

  if (type === 0) {
    izitoast.success({
      rtl: true,
      title: 'حساب شما با موفقیت تایید شد'
    });

    return push('/login');
  }

  push('/notfound');
};
