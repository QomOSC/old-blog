const delConf = document.getElementsByClassName('delete-conf');

for (let i = 0; i < delConf.length; i++) {
  delConf[i].addEventListener('submit', e => {

    send({
      url: delConf[i].getAttribute('action'),
      method: 'POST'
    },
    e,
    {
      id: delConf[i].id.value,
      provider: delConf[i].provider.value
    }).then(res => {
      if (res.type === 0) {
        iziToast.success({
          title: 'پیشنهاد ارائه شما با موفقیت حذف شد',
          rtl: true,
        });
        document.getElementById(delConf[i].provider.value)
          .style.display = 'none';
      } else if (res.type === 2) {
        iziErr();
      }
    }).catch(() => iziErr());
  });
}
