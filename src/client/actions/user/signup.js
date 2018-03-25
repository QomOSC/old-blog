import izitoast from 'izitoast';

export default (data, captcha, push) => {
  fetch('/signup', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }),
    body: JSON.stringify({
      data,
      captcha,
      captchaToken: localStorage.getItem('captchaToken')
    })
  }).then(res => res.json()).then(data => {
    console.log(data);
    console.log(push);
  });
};
