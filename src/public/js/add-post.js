const form = document.forms['add-post'];
const preview = document.getElementById('preview');
const up = document.getElementById('upload');
const imgPreview = document.getElementById('img-preview');
let fd = new FormData();

preview.addEventListener('click', e => {
  // Convert to HTML
  const converter = new showdown.Converter();
  const text = form.content.value;
  const html = converter.makeHtml(text);
  // Show
  document.getElementById('show').innerHTML = '';
  document.getElementById('show').insertAdjacentHTML('afterend', html);
});


up.addEventListener('change', () => {
  if (up.files && up.files[0]) {
    if (up.files[0].type === 'image/png' ||
    up.files[0].type === 'image/jpeg') {

      const reader = new FileReader();
      let cropper;

      reader.onload = function(e) {
        imgPreview.src = e.target.result;

        cropper = new Cropper(imgPreview, {
          aspectRatio: 1 / 1,
          // resizable: false,
          zoomable: false,
          // background: false
        });
      };

      reader.readAsDataURL(up.files[0]);

      form.addEventListener('submit', e => {
        e.preventDefault();

        const minutes = Math.ceil(form.content.value.length / 386);

        cropper.getCroppedCanvas().toBlob(blob => {
          fd.append('croppedImage', blob);

          // Send
          fd.append('title', form.title.value);
          fd.append('content', form.content.value);
          fd.append('minutes', minutes);

          fetch('/u/post/add', {
            method: 'POST',
            credentials: 'include',
            body: fd
          }).then(checkStatus).then(res => res.json()).then(data => {
            if (data.type === 0) {
              iziToast.success({
                title: 'موفق',
                rtl: true,
                message: 'پیام شما با موفقیت پست شد'
              });
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
      });
    }
  }
});
