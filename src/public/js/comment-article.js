document.forms['comment-form'].addEventListener('submit', e => {
  send({ url: e.target.getAttribute('action') }, e, {
    name: e.target.name.value,
    email: e.target.email.value,
    description: e.target.description.value
  }).then(res => {
    if (res.type === 0) {
      iziToast.success({
        rtl: true,
        title: 'نظر شما با موفقیت ثبت شد',
        message: 'لطفا تا پذیرفتن آن توسط مدیران، صبر کنید'
      });
    } else {
      iziErr();
    }
  }).catch(() => iziErr());
});
