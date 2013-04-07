---
layout    : post
title     : Jekyll-tagcloud
summary   : Tag cloud for Jekyll without plugins.
tags      : jekyll proyectos liquid c++ c++
---

jekyll-tagcloud is a little hack to create a tag cloud and their respective 
posts for your [Jekyll] generated site hosted in [GitHub Pages], using Liquid
and JavaScript (jQuery); without plugins.
jekyll-tagcloud uses a logarithmic assessment (very simple) in order to weight tags.

You can do the same using Jekyll plugins, but that means 
you should have to run Jekyll locally and post the produced files into your repo
(because GitHub Pages does not allow Jekyll plugins). I don't like that solution, 
hence jekyll-tagcloud.

Just include the next template `tags.html` :

{% highlight html %}
{% raw %}
---
layout : default
title  : tags
---
<div class="tag-cloud">
   {% for tag in site.tags %}
      <a href="#posts-tag" id="{{ forloop.index }}" class="__tag" style="margin: 5px">{{ tag[0] }}</a>
      <ul id="list_{{ forloop.index }}" style="display:none;">
         {% for post in tag[1] %}
            <li><a href="{{ post.url }}">{{ post.title }}</a></li>
         {% endfor %}
      </ul>
   {% endfor %}
</div>

<div id="posts-tags" class="post-list" style="margin: 50px;"></div>

<script type="text/javascript">
$(function() {
   var minFont = 15.0,
       maxFont = 40.0,
       diffFont = maxFont - minFont,
       size = 0;
       
       {% assign max = 1.0 %}
       {% for tag in site.tags %}
          {% if tag[1].size > max %}
             {% assign max = tag[1].size %}
          {% endif %}
       {% endfor %}
            
       {% for tag in site.tags %}
          size = (Math.log({{ tag[1].size }}) / Math.log({{ max }})) * diffFont + minFont;
          $("#{{ forloop.index }}").css("font-size", size + "px");
       {% endfor %}

       $('.tag-cloud a[class^="__tag"]').click(function() {
          $('.post-list').empty();
          $('#list_' + $(this).attr('id')).each(function() {
             $('.post-list').append('<ul>' + $(this).html() + '</ul>');
          });
       });
   });
</script>
{% endraw %}
{% endhighlight %}

Replace 
{% highlight javascript %}
{% raw %}
---
layout : default
title  : tags
---
{% endraw %}
{% endhighlight %}
with your personal configuration.

[Demo]

[Jekyll]: https://github.com/mojombo/jekyll 
[GitHub Pages]: http://pages.github.com/ 
[Demo]: /tags.html 
