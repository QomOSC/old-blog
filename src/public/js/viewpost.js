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
