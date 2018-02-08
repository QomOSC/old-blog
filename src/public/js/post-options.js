const p = document.getElementById('post-content');

document.getElementById('add-bold-text').addEventListener('click',
 () => {
  p.value += '**';
  p.focus();
});

document.getElementById('add-italic-text').addEventListener('click',
() => {
  p.value += '_';
  p.focus();
});

document.getElementById('add-line-through-text').addEventListener('click',
() => {
  p.value += '~~';
  p.focus();
});

document.getElementById('add-code-text').addEventListener('click', () => {
  p.value += '`';
  p.focus();
});

document.getElementById('add-link-text').addEventListener('click', () => {
  p.value += '\n';
  p.value += '[TEXT HERE](URL HERE)';
  p.focus();
});
