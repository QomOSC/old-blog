document.forms['contact-form'].addEventListener('submit', e => {
  send({ url: '/contact', method: 'POST' }, e, {
    name: e.target.name.value,
    email: e.target.email.value,
    title: e.target.title.value,
    captcha: e.target.captcha.value,
    description: e.target.description.value
  }).then(res => {
    if (res.type === 0) {
      localStorage.setItem('opinionregisteredsuccessful', 1);
      window.location.href = '/';
    } else if (res.type === 2) {
      if (res.text === 0) {
        iziErr();
      } else if (res.text === 1) {
        iziToast.error({
          rtl: true,
          title: 'خطا',
          message: 'کد امنیتی وارد شده اشتباه است'
        });
      }
    }
  }).catch(() => iziErr());
});
