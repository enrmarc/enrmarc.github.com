---
layout: default
title : Blog
---
<div class="container main">
  <div class="row">
    <header>
      <div>
        <center><h1>{{ page.title }}</h1></center>
      </div>
      <!--center><span class="big-ornament">{% include ornament.html %}</span></center-->
    </header>
  </div>

  <div class="row">
    <div class="col-md-8 offset-md-2">

      {% for post in site.posts  %}
        {% capture this_year %}{{ post.date | date: "%Y" }}{% endcapture %}
        {% capture next_year %}{{ post.previous.date | date: "%Y" }}{% endcapture %}

        {% if forloop.first %}
          <h3 id="{{ this_year }}-ref">{{this_year}}</h3>
          <ul class="index-year">
        {% endif %}

        {% if post.ext_url %}
          <li>
            <a class="post-index-title" href="{{ post.ext_url }}">{{ post.title }}</a>
            <span class="post-category post-category-{{post.category}}">&nbsp;{{ post.category }}</span>
          </li>
        {% else %}
          <li>
            <a class="post-index-title" href="{{ post.url }}">{{ post.title }}</a>
            <span class="post-category post-category-{{post.category}}">&nbsp;{{ post.category }}</span>
          </li>
        {% endif %}


        {% if forloop.last %}
          </ul>
        {% else %}
          {% if this_year != next_year %}
            </ul>
            <h3 id="{{ next_year }}-ref">{{next_year}}</h3>
            <ul class="index-year">
          {% endif %}
        {% endif %}
      {% endfor %}
    </div>

    {% comment %}
    <div class="col-md-8 offset-md-2">
      {% for category in site.categories %}
        <h3>On {{ category | first }}</h3>
        <p>
          {% for posts in category %}
            <ul class="index-posts">
              {% for post in posts %}
                {% if post.ext_url %}
                  <li>
                    <span class="index-date">{{ post.date | date: "%Y-%m-%d" }}</span>
                    <a href="{{ post.ext_url }}">{{ post.title }}</a>
                  </li>
                {% elsif post.url %}
                  <li>
                    <span class="index-date">{{post.date | date: "%Y-%m-%d" }}</span>
                    <a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
                  </li>
                {% endif %}
              {% endfor %}
            </ul>
          {% endfor %}
        </p>
      {% endfor %}
    </div>
    {% endcomment %}

  </div>
</div>