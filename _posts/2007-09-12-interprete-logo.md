---
layout  : post
title   : Intérprete de Logo
summary : Intérprete de un subconjunto del lenguaje de programación Logo.
tags    : C logo proyectos
---

Esto es de lo primero que hice allá por el 2007. Se trata de un intérprete del lenguaje
[Logo], escrito en C. En realidad solo interpreta un subconjunto del lenguaje: el que más
fácil me resultó escribir.

Puedes compilarlo y ejecutarlo desde una terminal:

{% highlight java %}
$ ./compile
{% endhighlight %}

Este es un listado de las acciones que puedes ejecutar:
{% highlight console %}
ayuda	Muestra esta ayuda
 av 'u'  La tortuga avanza 'u' unidades
 re 'u'	La tortuga retrocede 'u' unidades
 gd 'g'	La tortuga gira en sentido horario 'g' grados (multiplos de 45)
 gi 'g'	La tortuga gira en sentido antihorario 'g' grados (multiplos de 45)
 sl    	EL lapiz de la tortuga esta arriba (No dibuja al moverse)
 bl    	El lapiz de la tortuga esta abajo (Por defecto)
 bp    	Borra la pantalla y coloca la tortuga en el centro
 ot    	Oculta la tortuga
 mt    	Muestra la tortuga
 salir 	Salir de SimpleLogo
 repite 'x' [comando1; comando2; ...]   Repite una serie de comandos 'x' veces
{% endhighlight %}

Por ejemplo, para dibujar un octágono:
{% highlight java %}
repite 8 [av 4; gd 45]
{% endhighlight %}

<br>
<a id="view_banner" target="_blank" href="https://github.com/enrmarc/logo-interpreter">Código fuente</a>


[Logo]: http://en.wikipedia.org/wiki/Logo_(programming_language) 
