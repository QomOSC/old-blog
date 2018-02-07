const up = document.getElementById('upload');
const preview = document.getElementById('preview');
const crop = document.getElementById('crop');

up.addEventListener('change', () => {
  if (up.files && up.files[0]) {
    if (up.files[0].type === 'image/png' ||
    up.files[0].type === 'image/jpeg') {

      const reader = new FileReader();
      let cropper;

      reader.onload = function(e) {
        preview.src = e.target.result;

        cropper = new Cropper(preview, {
          aspectRatio: 1 / 1,
          // resizable: false,
          zoomable: false,
          // background: false
        });
      };

      reader.readAsDataURL(up.files[0]);

      crop.addEventListener('click', () => {

        // const imageData = cropper.getCroppedCanvas().toDataURL();
        // done.src = imageData;

        cropper.getCroppedCanvas().toBlob(blob => {
          const fd = new FormData();

          fd.append('croppedImage', blob);

          fetch('/u/setting/avatar', {
            method: 'POST',
            credentials: 'include',
            body: fd
          })
            .then(res => res.json())
            .then(data => {
              if (data.type === 0) {
                localStorage.setItem('avatarsettingdone', 1);
                window.location.href = '/u';
              }
            }).catch(() => {
              iziErr();
            });
        });
      });
    } else {
      iziToast.error({
        title: 'خطا!',
        rtl: true,
        message: 'فایل مورد نظر عکس نیست'
      });
    }
  }
});
