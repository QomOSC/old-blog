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

function minimize(arg) {
  arg.classList.remove('normal');
  arg.classList.add('minimize');
}

function normal(arg) {
  arg.classList.add('normal');
  arg.classList.remove('minimize');
}

document.addEventListener('scroll', () => {
  if (window.scrollY === 0) {
    normal(header);
  } else if (window.scrollY !== 0) {
    minimize(header);
  }
});
