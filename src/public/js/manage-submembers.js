const remove = document.getElementsByClassName('remove');
const removeIm = document.forms['remove-immidiately'];

for (let i = 0; i < remove.length; i++) {
  remove[i].addEventListener('submit', e => {

    send({ url: remove[i].getAttribute('action') }, e).then(res => {
      if (res.type === 0) {
        iziToast.success({
          title: 'کاربر از سایت حذف شد',
          rtl: true
        });
        document
        .getElementById(remove[i].username.value)
        .style.display = 'none';
      } else {
        iziErr();
      }
    }).catch(() => iziErr());
  });
}

removeIm.addEventListener('submit', e => {
  e.preventDefault();

  send({ url: e.target.getAttribute('action') + e.target.username.value }, e)
  .then(res => {
    if (res.type === 0) {
      iziToast.success({
        rtl: true,
        title: 'کاربر با موفقیت حذف شد'
      });
    } else if (res.type === 1) {
      iziToast.warning({
        rtl: true,
        title: 'شما اجازه حذف این کاربر را ندارید'
      });
    } else {
      iziErr();
    }
  });
});
