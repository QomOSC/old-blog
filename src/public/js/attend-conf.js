const attend = document.getElementById('attend-at-conf');

attend.addEventListener('click', e => {
  e.preventDefault();

  send({ url: `/u/conference/attend/${e.target.dataset.id}` }, e)
  .then(res => {  
    if (res.type === 0) {
      iziToast.success({
        rtl: true,
        title: 'شما با موفقیت عضو ارائه شدید'
      });

      e.target.style.display = 'none';

    } else if (res.type === 2) {

      if (res.text === 0) {
        iziToast.error({
          rtl: true,
          title: 'برای حظور در جلسه، باید وارد سایت شوید'
        });
      } else if (res.text === 1) {
        iziToast.error({
          rtl: true,
          title: 'کنفرانس پیدا نشد'
        });
      } else if (res.text === 2) {
        iziToast.warning({
          rtl: true,
          title: 'شما از قبل حظور خود را اعلام کرده اید'
        });
      } else if (res.text === 3) {
        iziErr();
      }

    }
  }).catch(() => iziErr());
});
