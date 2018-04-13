import izitoast from 'izitoast';

import send from 'Root/js/send';

export default async (description, email, name, id) => {
  const request = await send('/article/comment/send', {
    description,
    email,
    name,
    id
  });

  if (request.type === 0) {
    izitoast.success({
      rtl: true,
      title: 'نظر شما با موفقیت ثبت شد، تا زمان تایید آن صبر کنید'
    });
  }

  else if (request.type === 2) {
    izitoast.error({
      rtl: true,
      title: 'خطا! بعدا امتحان کنید'
    });
  }
};
