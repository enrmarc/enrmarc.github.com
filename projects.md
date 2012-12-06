---
layout: default
title: proyectos
---
##Proyectos personales
<div>
    <div id="projects">
        {% for post in site.posts %}
        {% if post.link %}  <!--- Solo listar proyectos --->
        <div class="project">
            <img src="{{ post.img }}" width="110" height="105" alt=""/>
            <div class="project-description">
                <h3>{{ post.title }}</h3>
                {{ post.summary }}
                <p><a target="_blank" href="{{ post.url }}">Visitar</a></p>
            </div>
        </div>
        {% endif %}
        {% endfor %}
    </div>
<div>
