import izitoast from 'izitoast';

export default (data, captcha, push) => {
  fetch('/signup', {
    method: 'POST',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }),
    body: JSON.stringify({
      data,
      captcha
    })
  }).then(res => res.json()).then(data => {
    console.log(data);
    console.log(push);
  });
};
