---
layout: default
title : News
---
<div>
  <header>
    <div>
      <center><h1>{{ page.title }}</h1></center>
    </div>
  </header>

  <div class="post-list">
    <ol>
      {% for post in site.posts %}
      {% if post.ext_url %}
      <li>
        <span>{{ post.date | date: "%Y-%m-%d" }}</span>&nbsp;&nbsp;
        <a class="post-index-title" href="{{ post.ext_url }}">{{ post.title }}</a>
        <span class="post-category post-category-{{post.category}}">&nbsp;{{ post.category }}</span>
      </li> 
      {% else %}
      <li>
        <span>{{ post.date | date: "%Y-%m-%d" }}</span>&nbsp;&nbsp;
        <a class="post-index-title" href="{{ post.url }}">{{ post.title }}</a>
        <span class="post-category post-category-{{post.category}}">&nbsp;{{ post.category }}</span>
      </li>
      {% endif %}
      {% endfor %}
    </ol>
  </div>
</div>