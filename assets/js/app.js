var app = app || {};

app.topColorBars = function() {
   var el = document.getElementsByClassName('color-bars')[0];

   var base = Math.round(Math.random() * 360);
   var mul = 10 + Math.round(Math.random() * 30);

   for (var i = 0; i < 6; i++) {
      var bar = document.createElement('div');
      bar.className = 'bar';
      bar.style.backgroundColor = 'hsl(' + (base + (i * mul)) % 360 + ', 70%, 60%)';
      el.appendChild(bar);
   }
};