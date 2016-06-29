---
layout : default
title  : Blog
summary: "Noto un desespero enfermizo en tu risa"
---

<div style="height:1em"></div>
<ul class="index children">

  {% for post in site.posts %}
    <li>
      {% if post.ext_url %}
        <a href="{{ post.ext_url }}" class="xref">
          {{ post.title }} <span class="ddate">{{ post.date | date: "%m.%d.%Y" }}</span>
        </a>
      {% else %}
        <a href="{{ post.url }}" class="xref">
          {{ post.title }} <span class="ddate">{{ post.date | date: "%m.%d.%Y" }}</span>
        </a>
      {% endif %}
    </li>

  {% endfor %}
</ul>