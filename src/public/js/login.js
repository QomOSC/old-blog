document.forms['login-form'].addEventListener('submit', e => {

  send({ url: '/login' }, e, {
    email: e.target.email.value,
    password: e.target.password.value,
    captcha: e.target.captcha.value
  }).then(res => {
    if (res.type === 0) {
      window.location.href = '/u';
    } else if (res.type === 1) {
      iziToast.warning({
        title: 'خطا!',
        rtl: true,
        message: 'حساب شما هنوز توسط مدیران تایید نشده است'
      });
    } else if (res.type === 2) {
      if (data.text === 0) {
        iziToast.error({
          title: 'خطا!',
          rtl: true,
          message: 'رمز وارد شده اشتباه است'
        });
        e.target.password.select();
      } else if (res.text === 1) {
        iziToast.error({
          title: 'خطا!',
          rtl: true,
          message: 'چنین حسابی وجود ندارد'
        });
        e.target.email.select();
      } else if (res.text === 2) {
        iziErr();
      } else if (res.text === 3) {
        iziToast.error({
          title: 'خطا!',
          rtl: true,
          message: 'کد امنیتی وارد شده اشتباه است'
        });
        e.target.captcha.select();
      }
    }
  }).catch(() => iziErr());
});
