const del = document.getElementsByClassName('delete-post');

for (let i = 0; i < del.length; i++) {
  del[i].addEventListener('submit', e => {
    e.preventDefault();

    iziToast.question({
        timeout: 10000,
        close: false,
        overlay: true,
        toastOnce: true,
        id: 'question',
        zindex: 999,
        rtl: true,
        title: 'مطمئنی؟',
        position: 'center',
        buttons: [
          ['<button><b>اره</b></button>', (instance, toast) => {
            instance.hide(toast, { transitionOut: 'fadeOut' }, 'button');

            fetch(del[i].getAttribute('action'), {
              method: 'POST',
              credentials: 'include',
              headers: new Headers({
                'Content-Type': 'application/json'
              })
            }).then(checkStatus).then(res => res.json()).then(data => {
              if (data.type === 0) {
                iziToast.success({
                  title: 'پست با موفقیت حذف شد',
                  rtl: true
                });
                document
                  .getElementById(del[i].id.value)
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
          }, true],
          ['<button>نه</button>', (instance, toast) => {
            instance.hide(toast, { transitionOut: 'fadeOut' }, 'button');
          }]
        ]
    });
  });
}
