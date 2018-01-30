const unsub = document.forms['unsub-form'];

unsub.addEventListener('submit', e => {
  e.preventDefault();

  console.log(unsub.email.value);
});

fetch('/captcha', {
  credentials: 'include'
}).then(checkStatus).then(res => res.json()).then(data => {
  document.getElementById('svg-captcha').innerHTML = data.captcha;
});
