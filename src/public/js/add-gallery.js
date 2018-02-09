const form = document.forms['add-photo'];

form.addEventListener('submit', e => {
  e.preventDefault();

  if (e.target.photo.files[0] && e.target.photo.files[0]) {
    if (e.target.photo.files[0].type === 'image/png' ||
    e.target.photo.files[0].type === 'image/jpeg') {

      const PD = new FormData();

      PD.append('galleryPhoto', e.target.photo.files[0]);
      PD.append('title', e.target.title.value);

      fetch('/u/gallery/add', {
        method: 'POST',
        credentials: 'include',
        body: PD
      }).then(checkStatus).then(res => res.json()).then(data => {
        if (data.type === 2) {
          iziErr();
        } else if (data.type === 0) {
          localStorage.setItem('addgalleryphoto', 1);
          window.location.href = '/u';
        }
      }).catch(() => {
        iziErr();
      });
    }
  } else {
    iziToast.warning({
      rtl: true,
      title: 'عکس انتخاب کنید'
    });
  }
});
