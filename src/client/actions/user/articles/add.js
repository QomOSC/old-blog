import send from 'Root/js/send';

export default async (data, push) => {
  const request = await send('/panel/user/articles/add', data, 'formData');

  if (request.type === 0) {
    push('/panel/articles');
  }
};
