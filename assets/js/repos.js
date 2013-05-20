(function($, undefined) {
   $(function() {
      $.getJSON('http://enrmarc.github.io/data/repos.json?callback=?', f);
   });

})(jQuery);

function f(result) {

   var desc = {
      'conwayjs': 'El juego de la vida de Conway.',
      'enrmarc.github.com': 'Página personal usando Jekyll y Twitter Bootstrap. ¡Es responsive!',
      'javamines': 'El Buscaminas implementado en Java usando Swing.',
      'jekyll-tagcloud': 'Un pequeño hack en Jekyll para crear una nube de tags sin usar plugins.',
      'logo-interpreter': 'Intérprete de un subconjunto del lenguaje de programación Logo.',
      'tms': 'Simulador de la Máquina de Turing.',
      'vim-config': 'Archivos de configuración de vim.',
      'python-brainfuck': 'Intérprete de Brainfuck en Python.'
   }

   var language = {
      'jekyll-tagcloud': 'Jekyll'
   }

   $(function() {
      var repos = 0;
      setTimeout(function() {
         $.each(result.data, function(i, repo) {
            if (!repo.fork) { 
               ++repos; 
               add(repo);
            }
         });
         $('#num-repos').text(repos);
      }, 1000 /* un poco de suspense */);
   });

   function add(repo) {
      var $item = $("<li>").addClass("repo span3 " + (repo.language || '').toLowerCase());
      var $link = $("<a>").attr("href", repo.html_url).appendTo($item).attr('target', '_blank');
      $link.append($("<h2>").text(repo.name));      
      $link.append($("<h3>").text(repo.language || language[repo.name]));
      $link.append($("<p>").text(/*repo.description*/desc[repo.name]));
      $item.appendTo("#repos");
   }
}
