const reject = document.getElementsByClassName('reject');
const accept = document.getElementsByClassName('accept');

for (let i = 0; i < reject.length; i++) {
  reject[i].addEventListener('submit', e => {
    send({ url: accept[i].getAttribute('action') }, e).then(res => {
      if (res.type === 0) {
        iziToast.success({
          rtl: true,
          title: 'نظر با موفقیت حذف شد'
        });
        document
          .getElementById(reject[i].id.value)
          .style.display = 'none';
      } else {
        iziErr();
      }
    }).catch(() => iziErr());
  });
}

for (let i = 0; i < accept.length; i++) {
  accept[i].addEventListener('submit', e => {
    send({ url: accept[i].getAttribute('action') }, e, {
      answer: accept[i].answer.value
    }).then(res => {
      if (res.type === 0) {
        iziToast.success({
          rtl: true,
          title: 'نظر با موفقیت ثبت شد'
        });
        document
          .getElementById(accept[i].id.value)
          .style.display = 'none';
      } else {
        iziErr();
      }
    }).catch(() => iziErr());
  });
}
