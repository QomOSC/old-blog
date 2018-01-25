const acc = document.getElementsByClassName('accept'),
      dec = document.getElementsByClassName('decline');

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener('submit', e => {
    e.preventDefault();

    fetch(acc[i].getAttribute('action'), {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      body: JSON.stringify({
        id: acc[i].id.value
      })
    }).then(res => res.json()).then(data => {
      if (data.type === 0) {
        iziToast.success({
          title: 'ارائه درخواستی پذیرفته شده',
          rtl: true
        });
        document
        .getElementById(acc[i].id.value)
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

for (let i = 0; i < dec.length; i++) {
  dec[i].addEventListener('submit', e => {
    e.preventDefault();

    fetch(dec[i].getAttribute('action'), {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      body: JSON.stringify({
        id: dec[i].id.value
      })
    }).then(res => res.json()).then(data => {
      if (data.type === 0) {
        iziToast.success({
          title: 'ارائه درخواستی با موفقیت حذف شد',
          rtl: true
        });
        document
        .getElementById(dec[i].id.value)
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
