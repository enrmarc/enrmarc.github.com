$(function() {

   setTimeout(function() {
      $('#num-repos').text(10);
   }, 1200);




   /*$.getJSON("https://api.github.com/users/enrmarc/repos?callback=?", function (result) {
      $(function() {
         $('#num-repos').text(result.data.length);
      });
   });*/
});
