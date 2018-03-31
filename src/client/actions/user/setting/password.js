import izitoast from 'izitoast';

import send from 'Root/js/send';

export default async (old, fresh) => {
  const request = await send('/panel/user/setting/password', { old, fresh });

  if (request.type === 0) {
    izitoast.success({
      rtl: true,
      title: 'با موفقیت به روز رسانی شد'
    });
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
        title: 'رمز صحیح نیست'
      });
    }

    else if (request.text === 2) {
      izitoast.error({
        rtl: true,
        title: 'رمز قبلی اشتباه است'
      });
    }

    else if (request.text === 3) {
      izitoast.error({
        rtl: true,
        title: 'خطا! بعدا امتحان کنید'
      });
    }
  }
};
