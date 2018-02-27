const accept = document.getElementsByClassName('accept-form');
const reject = document.getElementsByClassName('reject-form');

for (let i = 0; i < accept.length; i++) {
  accept[i].addEventListener('submit', e => {

    send({ url: accept[i].getAttribute('action') }, e, {
      answer: accept[i].answer.value
    }).then(res => {
      if (res.type === 0) {
        iziToast.success({
          rtl: true,
          title: 'موفق',
          message: 'نظر با موفقیت در سایت نشان داده میشود'
        });
      } else if (res.type === 2) {
        if (res.text === 0) {
          iziErr();
        } else if (res.text === 1) {
          iziToast.warning({
            rtl: true,
            title: 'شما مدیر نیستید',
          });
        }
      }
      document.getElementById(accept[i].id.value).style.display = 'none';
    }).catch(() => iziErr());
  });
}

for (let i = 0; i < reject.length; i++) {
  reject[i].addEventListener('submit', e => {

    send({ url: reject[i].getAttribute('action') }, e).then(res => {
      if (res.type === 0) {
        iziToast.success({
          rtl: true,
          title: 'موفق',
          message: 'نظر با موفقیت حذف شد'
        });
      } else if (res.type === 2) {
        if (res.text === 0) {
          iziErr();
        } else if (res.text === 1) {
          iziToast.warning({
            rtl: true,
            title: 'شما مدیر نیستید',
          });
        }
      }
      document.getElementById(reject[i].id.value).style.display = 'none';
    }).catch(() => iziErr());
  });
}
