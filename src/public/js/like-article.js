const likeDislike = document.getElementById('like-dislike-btn');
const likeSpn = document.getElementById('like-and-dislike-number');

likeDislike.addEventListener('click', () => {
  if (likeDislike.getAttribute('data-status') === 'disliked') {
    fetch(`/article/like/${likeDislike.getAttribute('data-id')}`, {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }).then(res => res.json()).then(data => {
      if (data.type === 0) {
        likeDislike.setAttribute('data-status', 'liked');
        likeDislike.classList.remove('disliked');
        likeDislike.classList.add('liked');

        if (data.text === 0) {
          // Increment
          likeSpn.innerHTML = parseInt(likeSpn.innerHTML) + 1;
        }
      } else if (data.type === 2) {
        if (data.text === 0) {
          iziErr();
        } else {
          iziToast.warning({
            title: 'برای انجام اینکار باید عضو سایت شوید',
            rtl: true,
          });
        }
      }
    }).catch(() => {
      iziErr();
    });
  } else if (likeDislike.getAttribute('data-status') === 'liked') {
    fetch(`/article/dislike/${likeDislike.getAttribute('data-id')}`, {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }).then(res => res.json()).then(data => {
      if (data.type === 0) {
        likeDislike.setAttribute('data-status', 'disliked');
        likeDislike.classList.remove('liked');
        likeDislike.classList.add('disliked');

        if (data.type === 0) {
          // Decrement
          likeSpn.innerHTML = parseInt(likeSpn.innerHTML) - 1;
        }
      } else if (data.type === 2) {
        if (data.text === 0) {
          iziErr();
        } else {
          iziToast.warning({
            title: 'برای انجام اینکار باید عضو سایت شوید',
            rtl: true,
          });
        }
      }
    }).catch(() => {
      iziErr();
    });
  }
});
