const page = parseInt(getQuery('page')) || 0;
const start = page * 12,
      stop = page * 12 + 12;

console.log(page, start, stop);

const previous = document.getElementById('previous'),
      next = document.getElementById('next'),
      cnf = document.getElementsByClassName('cnf');

const previousLink =
`${window.location.origin}/gallery?page=${page - 1}`;
const nextLink =
`${window.location.origin}/gallery?page=${page + 1}`;

// if (start <= 0) {
//   previous.style.display = 'none';
// }
//
// if (cnf.length < 12) {
//   next.style.display = 'none';
// }



previous.setAttribute('href', previousLink);
next.setAttribute('href', nextLink);
