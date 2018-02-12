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
console.log(cnf.length);

if (cnf.length < 12) {
  next.style.display = 'none';
}

previous.setAttribute('href', previousLink);
next.setAttribute('href', nextLink);

// Get the modal
var modal = document.getElementById('myModal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById('myImg');
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.onclick = function(){
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}
