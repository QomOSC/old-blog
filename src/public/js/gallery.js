const page = parseInt(getQuery('page')) || 0;
const start = page * 12,
      stop = page * 12 + 12;

const previous = document.getElementById('previous'),
      next = document.getElementById('next'),
      cnf = document.getElementsByClassName('gallery-posts');

let previousLink, nextLink;

if (getQuery('q')) {
  previousLink =
  `${window.location.origin}/gallery?page=${page - 1}&q=${getQuery('q')}`;
  nextLink =
  `${window.location.origin}/gallery?page=${page + 1}&q=${getQuery('q')}`;
} else {
  previousLink =
  `${window.location.origin}/gallery?page=${page - 1}`;
  nextLink =
  `${window.location.origin}/gallery?page=${page + 1}`;
}

if (start <= 0) {
  previous.style.display = 'none';
}

if (cnf.length < 12) {
  next.style.display = 'none';
}

previous.setAttribute('href', previousLink);
next.setAttribute('href', nextLink);

// Get the modal
let modal = document.getElementById('myModal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
let img = document.getElementsByClassName('myImg');

let modalImg = document.getElementById('img01');
let captionText = document.getElementById('caption');


for (let i = 0; i < img.length; i++) {
  img[i].onclick = function() {
      modal.style.display = 'block';
      modalImg.src = this.src;
      captionText.innerHTML = this.alt;

  };
}

modal.onclick = function() {
  modal.style.display = 'none';
};

// Get the <span> element that closes the modal
let span = document.getElementsByClassName('close')[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = 'none';
};
