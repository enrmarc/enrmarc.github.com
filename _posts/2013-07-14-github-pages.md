---
layout  : post
title   : Sitio web para un repositorio en GitHub
summary : Usar GitHub Pages para generar un sitio estátic
tags    : github
---

Suponiendo que ya tienes alojado un repositorio en [GitHub] y que está clonado, 
lo siguiente es crear la rama gh-pages :

~~~bash
$ git checkout -b gh-pages
~~~

Ahora puedes crear la página en esta rama y hacer un commit cuando
todo esté listo (a menos que ya la tuvieras en
la rama master, en ese caso hay que hacer `git merge master` para copiar
la rama master en gh-pages).

Al final hay que subirlo a GitHub:

~~~bash
$ git push origin gh-pages
~~~

(Puede que haga falta la opción `-f` si ya habíamos creado la rama desde
github.com).

**Nota**: a partir de la versión 1.7.2 de GitHub se puede utilizar
`git checkout --orphan gh-pages`
 
[GitHub]: https://github.com/ 
