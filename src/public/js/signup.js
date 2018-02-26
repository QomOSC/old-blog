document.forms['signup-form'].addEventListener('submit', e => {
  send({ url: '/signup' }, e, {
    fname: e.target.fname.value,
    lname: e.target.lname.value,
    username: e.target.username.value,
    email: e.target.email.value,
    password: e.target.password.value,
    captcha: e.target.captcha.value
  }).then(res => {
    if (res.type === 2) {
      if (res.text === 0) {
        iziToast.error({
          title: 'خطا!',
          rtl: true,
          message: 'ایمیل توسط شخص دیگری گرفته شده'
        });
        e.target.email.select();
      } else if (res.text === 1) {
        iziToast.error({
          title: 'خطا!',
          rtl: true,
          message: 'موارد ضروری مقدار دهی نشده اند'
        });
      } else if (res.text === 2) {
        iziErr();
      } else if (res.text === 3) {
        iziToast.error({
          title: 'خطا!',
          rtl: true,
          message: 'یوزرنیم توسط شخص دیگری گرفته شده'
        });
        e.target.username.select();
      } else if (res.text === 4) {
        iziToast.error({
          title: 'خطا!',
          rtl: true,
          message: 'ایمیل توسط شخص دیگری گرفته شده است'
        });
        e.target.email.select();
      } else if (res.text === 5) {
        iziToast.error({
          title: 'خطا!',
          rtl: true,
          message: 'کد امنیتی اشتباه است'
        });
        e.target.captcha.select();
      }
    } else if (res.type === 0) {
      localStorage.setItem('signedupsuccessfully', 1);
      window.location.href = '/';
    }
  }).catch(() => iziErr());
});
