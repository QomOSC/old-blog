const form = document.forms['add-post'];
const preview = document.getElementById('preview');
const up = document.getElementById('upload');
const imgPreview = document.getElementById('img-preview');
let fd = new FormData();
const placeholder = document.getElementById('post-content');

function beforeAddingPhoto(e) {
  e.preventDefault();

  iziToast.warning({
    rtl: true,
    title: 'پست شما باید عکس داشته باشد'
  });
}

form.addEventListener('submit', beforeAddingPhoto);

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
          // resizable: false,
          zoomable: false,
          // background: false
        });
      };

      reader.readAsDataURL(up.files[0]);

      form.removeEventListener('submit', beforeAddingPhoto);

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
              window.location.href = '/u';
              localStorage.setItem('sentPost', 1);
            } else if (data.type === 2) {
              iziErr();
            }
          }).catch(() => {
            iziErr();
          });
        });
      });
    }
  }
});

document.getElementById('add-photo-to-post').addEventListener('change',
e => {
  const PD = new FormData();

  if (e.target.files && e.target.files[0]) {
    if (e.target.files[0].type === 'image/png' ||
    e.target.files[0].type === 'image/jpeg') {
      console.log(e.target.files[0]);
      PD.append('postPhoto', e.target.files[0]);

      fetch('/u/post/addonephoto', {
        method: 'POST',
        credentials: 'include',
        body: PD
      }).then(checkStatus).then(res => res.json()).then(data => {
        form.content.value += `![Photo](/img/${data.filename})`;
      }).catch(() => {
        iziErr();
      });
    }
  }
});
