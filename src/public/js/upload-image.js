const up = document.getElementById('upload');
const preview = document.getElementById('preview');
const crop = document.getElementById('crop');

up.addEventListener('change', () => {
  if (up.files && up.files[0]) {
    const reader = new FileReader();
    let cropper;

    reader.onload = function(e) {
      preview.src = e.target.result;

      cropper = new Cropper(preview, {
        aspectRatio: 1 / 1
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
          body: fd,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          }
        })
          .then(res => res.text())
          .then(data => {
            console.log(0);
            console.log(data);
          }).catch(e => {
            console.log(1);
            console.log(e);
          });
      });
    });
  }
});
