document.addEventListener('DOMContentLoaded', function(event) {
  var notes = [
    'Noto un desespero enfermizo en tu risa.',
    'Go ahead HQ.',
    'Esto no debería presentar ningún problema significativo.',
    'Sick Boy: Para ser vegetariano, Rents, eres un tirador de lo más sanguinario.',
    'Enviad más paramédicos.',
    'In the pipe, 5 by 5.',
  ];
  var el = document.querySelector('.paramedics');
  if (el) {
    el.innerHTML = notes[Math.floor(Math.random() * notes.length)];
  }

  [].forEach.call(document.querySelectorAll('#headernav li a'), function(el) {
    el.classList.remove('selected');

    if (window.location.pathname == el.pathname) {
      el.classList.add('selected');
    }
  });
});