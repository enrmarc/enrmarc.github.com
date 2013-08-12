---
layout  : post
title   : GitHub Pages
summary : Sitio estático para un repositorio de GitHub
tags    : github github-pages
---

Suponiendo que ya se tiene alojado un repositorio en [GitHub] y que está clonado, 
lo siguiente es crear la rama gh-pages :

{% highlight bash %}
$ git checkout -b gh-pages
{% endhighlight %}

Crear la página en esta rama y hacer un commit cuando
todo esté listo (a menos que el contenido ya estuviera en
la rama master, en ese caso hay que hacer `git merge master` para copiar
la rama master en gh-pages).

Al final hay que subirlo a GitHub:

{% highlight bash %}
$ git push origin gh-pages
{% endhighlight %}

(Puede que haga falta la opción `-f` si ya se había creado la rama desde
github.com).

**Nota**: a partir de la versión 1.7.2 de GitHub se puede utilizar
`git checkout --orphan gh-pages`
 
[GitHub]: https://github.com/ 
