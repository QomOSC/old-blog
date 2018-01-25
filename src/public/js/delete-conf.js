const delConf = document.getElementsByClassName('delete-conf');

for (let i = 0; i < delConf.length; i++) {
  delConf[i].addEventListener('submit', e => {
    e.preventDefault();

    fetch(delConf[i].getAttribute('action'), {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      body: JSON.stringify({
        id: delConf[i].id.value,
        provider: delConf[i].provider.value
      })
    }).then(res => res.json()).then(data => {
      if (data.type === 0) {
        iziToast.success({
          title: 'پیشنهاد ارائه شما با موفقیت حذف شد',
          rtl: true,
        });
        document.getElementById(delConf[i].provider.value)
          .style.display = 'none';
      } else if (data.type === 2) {
        iziToast.error({
          title: 'خطا!',
          rtl: true,
          message: 'مشکلی پیش آمده، بعدا امتحان کنید'
        });
      }
    }).catch(() => {
      iziToast.error({
        title: 'خطا!',
        rtl: true,
        message: 'مشکلی پیش آمده، بعدا امتحان کنید'
      });
    });
  });
}
