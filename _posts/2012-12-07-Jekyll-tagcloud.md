---
layout  : project
title   : Jekyll-tagcloud
summary : Tag cloud for Jekyll without plugins.
link    : https://github.com/enrmarc/jekyll-tagcloud
img     : /assets/img/jekyll-tagcloud.png
tags    : jekyll proyectos liquid
---

## About
`jekyll-tagcloud` is a little hack to create a tag cloud and their respective 
posts for your [Jekyll] generated site hosted in [GitHub Pages], using Liquid
and JavaScript (jQuery); without plugins.
`jekyll-tagcloud` uses a logarithmic assessment (very simple) in order to weight tags.

Of course you can do the same using Jekyll plugins, but that means that
you would have to run Jekyll locally and post the produced files into your repo
(because GitHub Pages does not allow Jekyll plugins). I dont like that solution, 
hence `jekyll-tagcloud`.

##Usage
Just include the next template `tags.html`:

{% highlight javascript %}
{% raw %}
---
layout : default
title  : tags
---
<div class="tag-cloud">
    {% for tag in site.tags %}
        <a class="__{{ tag[0] }}">{{ tag[0] }}</a>
        <ul class="list_{{ tag[0] }}" style="display:none;">
            {% for post in tag[1] %}
                <li><a href="{{ post.url }}">{{ post.title }}</a></li>
            {% endfor %}
        </ul>
    {% endfor %}
</div>

<div class="post-list" style="margin: 50px;"></div>

<script type="text/javascript">
    $(function() {
            var minFont = 10.0,
                maxFont = 35.0,
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
                $(".__{{ tag[0] }}").css("font-size", size + "px");
            {% endfor %}

            $('.tag-cloud a[class^="__"]').click(function() {
                $('.post-list').empty();
                $('.list_' + $(this).text()).each(function() {
                    $('.post-list').append($(this).html());
                });
             });
    });
</script>
{% endraw %}
{% endhighlight %}

Replace 
{% highlight console %}
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
[Demo]: http://enrmarc.github.com/tags.html 
