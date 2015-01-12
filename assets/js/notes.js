document.addEventListener('DOMContentLoaded', function(event) {
   var notes = [
      'Noto un desespero enfermizo en tu risa',
      'Esto no debería presentar ningún problema significativo',
      'Sick Boy: Para ser vegetariano, Rents, eres un tirador de lo más sanguinario',
   ];
   document
      .getElementById('notas')
      .innerHTML = notes[Math.floor(Math.random() * notes.length)];
});