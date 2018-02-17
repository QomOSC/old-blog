const page = parseInt(getQuery('page')) || 0,
      start = page * 12,
      stop = page * 12 + 12;

const previous = document.getElementById('previous'),
      next = document.getElementById('next'),
      cnf = document.getElementsByClassName('posts');

let previousLink =
`${window.location.origin}/tag/${tagname}?page=${page - 1}`,
nextLink =
`${window.location.origin}/tag/${tagname}?page=${page + 1}`;

if (start <= 0) {
  previous.style.display = 'none';
}

if (cnf.length < 12) {
  next.style.display = 'none';
}

previous.setAttribute('href', previousLink);
next.setAttribute('href', nextLink);
