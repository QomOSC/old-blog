const decline = document.getElementsByClassName('decline');
const accept = document.getElementsByClassName('accept');

for (let i = 0; i < accept.length; i++) {
  accept[i].addEventListener('submit', e => {

    send({ url: accept[i].getAttribute('action') }, e).then(res => {
      if (res.type === 0) {
        iziToast.success({
          title: 'کاربر به سایت اضافه شد!',
          rtl: true
        });
        document
        .getElementById(accept[i].username.value)
        .style.display = 'none';
      } else {
        iziErr();
      }
    }).catch(() => iziErr());
  });
}

for (let i = 0; i < decline.length; i++) {
  decline[i].addEventListener('submit', e => {

    send({ url: decline[i].getAttribute('action') }, e).then(res => {
      if (res.type === 0) {
        iziToast.success({
          title: 'کاربر از سایت حذف شد',
          rtl: true
        });
        document
        .getElementById(decline[i].username.value)
        .style.display = 'none';
      } else {
        iziErr();
      }
    }).catch(() => iziErr());
  });
}
