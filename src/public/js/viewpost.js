function bar() {
  let winScroll = document.body.scrollTop ||
  document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight -
  document.documentElement.clientHeight;
  let scrolled = winScroll / height * 100;
  document.getElementById('myBar').style.width = scrolled + '%';
}

const md = document.getElementById('markdowned-text');

// Convert to HTML
const converter = new showdown.Converter();
const text = md.innerHTML;
const html = converter.makeHtml(text);
// Show
setTimeout(() => {
  md.innerHTML = '';
  md.insertAdjacentHTML('afterend', html);
}, 100);

const header = document.getElementsByClassName('article-header')[0];
header.classList.add('minimize');

function minimize(arg) {
  arg.classList.remove('minimize');
}

function normal(arg) {
  arg.classList.add('minimize');
}

document.addEventListener('scroll', () => {
  if (window.scrollY < 100) {
    normal(header);
  } else {
    minimize(header);
    bar();
  }
});
