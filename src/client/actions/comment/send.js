import send from 'Root/js/send';

export default async (description, email, name, id) => {
  const request = await send('/article/comment/send', {
    description,
    email,
    name,
    id
  });

  console.log(request);
};
