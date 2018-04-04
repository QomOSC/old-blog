import izitoast from 'izitoast';

import send from 'Root/js/send';

export default async (email, push) => {
  const request = await send('/recovery', { email });

  if (request.type === 0) {
    izitoast.success({
      rtl: true,
      title: 'با موفقیت ارسال شد'
    });

    push('/');
  }

  else if (request.type === 2) {

    if (request.text === 0) {
      izitoast.error({
        rtl: true,
        title: 'چنین حسابی وجود ندارد'
      });
    }

    else if (request.text === 1) {
      izitoast.error({
        rtl: true,
        title: 'خطا! بعدا امتحان کنید'
      });
    }
  }
};
