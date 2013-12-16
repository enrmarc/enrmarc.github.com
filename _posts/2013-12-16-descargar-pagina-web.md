---
layout : post
title  : Descargar una web completa
summary: Cómo descargar una web completa usango wget
tags   : wget web
---

Otra de esas cosas que siempre se me olvida.

{% highlight bash %}
wget -m -p -E -k -K -np http://www.example.com
{% endhighlight %}

El [man-page] de `wget` describe las opciones ...

[man-page]: http://unixhelp.ed.ac.uk/CGI/man-cgi?wget