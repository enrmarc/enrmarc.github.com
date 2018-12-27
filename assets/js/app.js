document.addEventListener('DOMContentLoaded', function(event) {
  // Random phrases
  var descriptions = [
    "Asteroid Blues",
    "Waltz for Venus",
    "Ganymede Elegy",
    "Jupiter Jazz",
    "Cowboy Funk",
  ];

  var notes = [
    'Noto un desespero enfermizo en tu risa.',
    'Go ahead HQ.',
    'Esto no debería presentar ningún problema significativo.',
    'Sick Boy: Para ser vegetariano, Rents, eres un tirador de lo más sanguinario.',
    'Enviad más paramédicos.',
    'In the pipe, 5 by 5.',
    "There's no beef in here",
    "Bang!",
  ];

  var descriptionEl = document.querySelector('.nav-desc');
  if (descriptionEl) {
    descriptionEl.innerHTML = descriptions[Math.floor(Math.random() * descriptions.length)];
  }

  var el = document.querySelector('.paramedics');
  if (el) {
    el.innerHTML = notes[Math.floor(Math.random() * notes.length)];
  }

  // Highlight current tab pagename

  [].forEach.call(document.querySelectorAll('.navigation-content a'), function(el) {
    el.classList.remove('nav-item-selected');

    if (el.pathname != '/') {el.pathname += '/';}

    if (window.location.pathname == el.pathname) {
      el.classList.add('nav-item-selected');
    }
  });

  var h4 = document.getElementsByTagName('h4');
  [].forEach.call(h4, function(el) {el.className = 'subhead';});

  document.querySelectorAll('code.language-bash, code.language-console, code.shell').forEach(function(el) {
    el.style.cssText = 'padding-left: 0 !important; background: white !important;';
    el.parentElement.parentElement.style.cssText = 'width: 100%; margin-left: 0;';
  });
});

console.log('Bang!');