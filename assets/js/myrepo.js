(function($, undefined) {
   $(function() {
     $.getJSON('http://enrmarc.github.com/data/repos.json?callback=?', f);
   });

})(jQuery);

function f(result) {
   $(function() {
      setTimeout(function() {
         $('#num-repos').text(result.data.length);
      }, 1000);

      $.each(result.data, function(i, repo) {
         if (!repo.fork) {
           add(repo);
         }
      });
   });


   function add(repo) {
      var $item = $("<li>").addClass("repo span3 " + (repo.language || '').toLowerCase());
      var $link = $("<a>").attr("href", repo.html_url).appendTo($item);
      $link.append($("<h2>").text(repo.name));      
      $link.append($("<h3>").text(repo.language || ''));
      $link.append($("<p>").text(repo.description));
      $item.appendTo("#repos");
   }
}
