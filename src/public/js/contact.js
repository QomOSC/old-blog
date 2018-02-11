fetch('/captcha', {
  credentials: 'include'
}).then(checkStatus).then(res => res.json()).then(data => {
  document.getElementById('svg-captcha').innerHTML = data.captcha;
});

const form = document.forms['contact-form'];

form.addEventListener('submit', e => {
  e.preventDefault();

  if (validateEmail(form.email.value)) {
    fetch('/contact', {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      body: JSON.stringify({
        name: form.name.value,
        email: form.email.value,
        title: form.title.value,
        captcha: form.captcha.value,
        description: form.description.value
      })
    }).then(checkStatus).then(res => res.json()).then(data => {
      if (data.type === 0) {
        localStorage.setItem('opinionregisteredsuccessful', 1);
        window.location.href = '/';
      } else if (data.type === 2) {
        if (data.text === 0) {
          iziErr();
        } else if (data.text === 1) {
          iziToast.error({
            rtl: true,
            title: 'خطا',
            message: 'کد امنیتی وارد شده اشتباه است'
          });
        }
      }
    }).catch(() => {
      iziErr();
    });
  } else {
    iziToast.warning({
      rtl: true,
      title: 'هشدار',
      message: 'ایمیل وارد شده اشتباه است'
    });
  }
});
