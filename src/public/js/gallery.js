const page = parseInt(getQuery('page') - 1);
const start = page * 12,
      stop = page * 12 + 12;

const previous = document.getElementById('previous'),
      next = document.getElementById('next');

const previousLink = `${window.location.origin}/gallery?page=${page - 2}`;
const nextLink = `${window.location.origin}/gallery?page=${page + 2}`;

console.log(start, stop);
if (start <= 0) {
  previous.style.display = 'none';
}

previous.setAttribute('href', previousLink);
next.setAttribute('href', nextLink);
