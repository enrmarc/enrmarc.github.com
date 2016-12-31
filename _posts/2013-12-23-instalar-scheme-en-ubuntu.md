---
layout   : post
title    : Instalar Scheme en Ubuntu
summary  : Scheme en Ubuntu (10.04)
tags     : Ubuntu Scheme Racket
category : software
permalink: /blog/instalar-scheme-en-ubuntu
disqus   : true
---

Resulta mas cómodo tener instalado un intérprete de [Scheme]
y usar la línea de comandos que tener que usar alguna de esas
[webs] que compilan/interpretan un montón de lenguajes.

Una opción es instalar [Racket]. Con `apt-get` usando los
[ppa]:

{% highlight bash %}
sudo add-apt-repository ppa:plt/racket
sudo apt-get update
sudo apt-get install racket
{% endhighlight %}

Un ejemplo para comprobar que todo ha ido bien:
{% highlight racket %}
#lang scheme

(define (sum-of-squares a b)
   (+ (square a) (square b))
)

(define (square a) (* a a))

(sum-of-squares 5 5)
{% endhighlight %}

Y desde la terminal:

{% highlight bash %}
$ racket -t test.lisp
{% endhighlight bash %}

Ahora ya puedes seguir leyendo el SICP.

[Scheme]: http://www.gnu.org/software/mit-scheme/
[webs]: http://repl.it/
[Racket]: http://racket-lang.org/
[ppa]: https://launchpad.net/~plt/+archive/racket