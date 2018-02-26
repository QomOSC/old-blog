document.forms['recovery-form'].addEventListener('submit', e => {

  send({ url: '/recovery' }, e, {
    email: e.target.email.value,
    captcha: e.target.captcha.value
  }).then(res => {
    if (res.type === 0) {
      localStorage.setItem('recoveryLinkHasSentSuccess', 1);
      window.location.href = '/';
    } else if (res.type === 2) {
      if (res.text === 0) {
        iziToast.error({
          rtl: 'true',
          title: 'خطا',
          message: 'مقادیر را کامل کنید'
        });
      } else if (res.text === 1) {
        iziToast.error({
          rtl: 'true',
          title: 'اوپس',
          message: 'کد امنیتی اشتباه است'
        });
        e.target.captcha.select();
      } else if (res.text === 2) {
        iziErr();
      } else if (res.text === 3) {
        iziToast.error({
          rtl: 'true',
          title: 'خطا',
          message: 'ایمیل یافت نشد'
        });
        e.target.email.select();
      }
    }
  }).catch(() => iziErr());
});
