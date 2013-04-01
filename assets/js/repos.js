(function($, undefined) {
   $(function() {
     $.getJSON('http://enrmarc.github.com/data/repos.json?callback=?', f);
   });

})(jQuery);

function f(result) {
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
      $link.append($("<h3>").text(repo.language || ''));
      $link.append($("<p>").text(repo.description));
      $item.appendTo("#repos");
   }
}