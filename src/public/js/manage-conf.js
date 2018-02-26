const acc = document.getElementsByClassName('accept'),
      dec = document.getElementsByClassName('decline');

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener('submit', e => {

    send({ url: acc[i].getAttribute('action') }, e, {
      id: acc[i].id.value
    }).then(res => {
      if (res.type === 0) {
        iziToast.success({
          title: 'ارائه درخواستی پذیرفته شده',
          rtl: true
        });
        document
        .getElementById(acc[i].id.value)
        .style.display = 'none';
      } else {
        iziErr();
      }
    }).catch(() => iziErr());
  });
}

for (let i = 0; i < dec.length; i++) {
  dec[i].addEventListener('submit', e => {

    send({ url: dec[i].getAttribute('action') }, e, {
      id: dec[i].id.value
    }).then(res => {
      if (res.type === 0) {
        iziToast.success({
          title: 'ارائه درخواستی با موفقیت حذف شد',
          rtl: true
        });
        document
        .getElementById(dec[i].id.value)
        .style.display = 'none';
      } else {
        iziErr();
      }
    }).catch(() => iziErr());
  });
}
