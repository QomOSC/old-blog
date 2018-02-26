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
      } else if (data.type === 1) {
        iziToast.warning({
          title: 'خطا!',
          rtl: true,
          message: 'حساب شما هنوز توسط مدیران تایید نشده است'
        });
      } else if (data.type === 2) {
        if (data.text === 0) {
          iziToast.error({
            title: 'خطا!',
            rtl: true,
            message: 'رمز وارد شده اشتباه است'
          });
          login.password.select();
        } else if (data.text === 1) {
          iziToast.error({
            title: 'خطا!',
            rtl: true,
            message: 'چنین حسابی وجود ندارد'
          });
          login.email.select();
        } else if (data.text === 2) {
          iziErr();
        } else if (data.text === 3) {
          iziToast.error({
            title: 'خطا!',
            rtl: true,
            message: 'کد امنیتی وارد شده اشتباه است'
          });
          login.captcha.select();
        }
      }
    }).catch(() => {
      iziErr();
    });
  } else {
    iziToast.warning({
      title: 'هشدار',
      rtl: true,
      message: 'ایمیل وارد شده اشتباه است'
    });
  }
});
