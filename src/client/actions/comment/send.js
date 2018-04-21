import izitoast from 'izitoast';

import { error } from 'Root/js/messages';
import send from 'Root/js/send';

export default async (description, email, name, id) => {
  const { type } = await send('/article/comment/send', {
    description,
    email,
    name,
    id
  });

  if (type === 0) {
    izitoast.success({
      rtl: true,
      title: 'نظر شما با موفقیت ثبت شد، تا زمان تایید آن صبر کنید'
    });
  }

  else if (type === 2) {
    error();
  }
};
