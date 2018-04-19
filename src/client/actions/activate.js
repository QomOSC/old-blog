import izitoast from 'izitoast';

import send from 'Root/js/send';

export default async (code, push) => {
  const request = await send('/activate', { code });

  if (request.type === 0) {
    izitoast.success({
      rtl: true,
      title: 'حساب شما با موفقیت تایید شد'
    });

    push('/login');
  }

  else {
    push('/notfound');
  }
};
