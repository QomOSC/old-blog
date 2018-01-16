const login = document.forms['login-form'];

login.addEventListener('submit', e => {
  e.preventDefault();

  if (validateEmail(login.email.value)) {

    fetch('/login', {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        email: login.email.value,
        password: login.password.value,
        captcha: login.captcha.value
      })
    }).then(checkStatus).then(res => res.json()).then(data => {
      if (data.type === 0) {
        window.location.href = '/u';
      } else if (data.type === 2) {
        if (data.text === 0) {
          iziToast.error({
            title: 'خطا!',
            rtl: true,
            message: 'رمز وارد شده اشتباه است'
          });
        } else if (data.text === 1) {
          iziToast.error({
            title: 'خطا!',
            rtl: true,
            message: 'چنین حسابی وجود ندارد'
          });
        } else if (data.text === 2) {
          iziToast.error({
            title: 'خطا!',
            rtl: true,
            message: 'مشکلی پیش آمده، بعدا امتحان کنید'
          });
        } else if (data.text === 3) {
          iziToast.error({
            title: 'خطا!',
            rtl: true,
            message: 'کد امنیتی وارد شده اشتباه است'
          });
        }
      }
    }).catch(() => {
      iziToast.error({
        title: 'خطا!',
        rtl: true,
        message: 'مشکلی پیش آمده، بعدا امتحان کنید'
      });
    });
  } else {
    iziToast.warning({
      title: 'هشدار',
      rtl: true,
      message: 'ایمیل وارد شده اشتباه است'
    });
  }
});

fetch('/captcha', {
  credentials: 'include'
}).then(checkStatus).then(res => res.json()).then(data => {
  document.getElementById('svg-captcha').innerHTML = data.captcha;
});
