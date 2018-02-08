const page = parseInt(getQuery('page')) || 0;
const start = page * 12,
      stop = page * 12 + 12;

const previous = document.getElementById('previous'),
      next = document.getElementById('next');

const previousLink = `${window.location.origin}/gallery?page=${page - 1}`;
const nextLink = `${window.location.origin}/gallery?page=${page + 1}`

if (start <= 0) {
  previous.style.display = 'none';
}

previous.setAttribute('href', previousLink);
next.setAttribute('href', nextLink);
