const intro = document.getElementById('intro');
const enterBtn = document.getElementById('enter-btn');

enterBtn.addEventListener('click', () => {
  intro.classList.add('hidden');
  tryPlayAmbient();
  window.scrollTo(0, 0);
  document.body.classList.remove('pre-show');
  startPage();
  setTimeout(() => {
    intro.style.display = 'none';
  }, 1200);
});
