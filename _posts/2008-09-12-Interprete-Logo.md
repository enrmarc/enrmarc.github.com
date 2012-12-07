---
layout  : project
title   : Intérprete de Logo
summary : Intérprete básico de un subconjunto del lenguaje de programación Logo.
link    : https://github.com/enrmarc/logo-interpreter
img     : /assets/img/logo.png
tags    :
- C
- logo
---

##Acerca de
Un intérprete básico de un subconjunto del lenguaje de programación
[Logo] escrito en C, ejecutable desde la terminal.

##Uso
Compilar:
{% highlight java %}
$ ./compile
{% endhighlight %}

Listado de primitivas del intérprete:
{% highlight console %}

   ayuda	Muestra esta ayuda
   av 'u'	La tortuga avanza 'u' unidades
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

Por ejemplo, para dibujar un octágono en la terminal:
{% highlight java %}
repite 8 [av 4; gd 45]
{% endhighlight %}

[Logo]: http://en.wikipedia.org/wiki/Logo_(programming_language) 
