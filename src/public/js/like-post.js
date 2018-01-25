const likeDislike = document.getElementById('like-dislike-btn');

likeDislike.addEventListener('click', () => {
  if (likeDislike.getAttribute('data-status') === 'like') {
    fetch(`/post/like/${likeDislike.getAttribute('data-id')}`, {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }).then(res => res.json()).then(data => {
      console.log('Like');
      console.log(data);
      if (data.type === 0) {
        likeDislike.setAttribute('data-status', 'dislike');
        likeDislike.classList.remove('disliked');
        likeDislike.classList.add('liked');

        if (data.text === 0) {
          // Increment
        }
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
  } else if (likeDislike.getAttribute('data-status') === 'dislike') {
    fetch(`/post/dislike/${likeDislike.getAttribute('data-id')}`, {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }).then(res => res.json()).then(data => {
      console.log('Dislike');
      console.log(data);
      if (data.type === 0) {
        likeDislike.setAttribute('data-status', 'like');
        likeDislike.classList.remove('liked');
        likeDislike.classList.add('disliked');

        if (data.type === 0) {
          // Decrement
        }
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
  }
});
