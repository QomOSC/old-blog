import izitoast from 'izitoast';

import send from 'Root/js/send';

export default async (data, push) => {
  const request = await send('/////', data);

  push('////');

  izitoast();

  console.log(request);
};
