---
layout : post
title  : Colaborar en un proyecto alojado en GitHub
summary: Pasos a seguir para colaborar en un proyecto open source
tags   : github
---

Hace poco me encontré con un [framework de PHP][1] en el que me
gustaría colaborar. La manera usual de colaborar en proyectos alojados
en [GitHub][2] es hacer un fork del proyecto y luego un pull-request.

La [documentación oficial][3] sobre cómo hacer esto está bastante bien 
y este post es solo una forma de obligarme a escribirlo y que no se 
me olvide.

##Requisitos previos
Hay que tener una cuenta en GitHub, buscar un proyecto que nos llame 
la atención y entender algunos conceptos como rama, push, commit,
remote, etc.

##Abrir un incidente
Generalmente los proyectos open source tienen una lista de incidentes
(issues) que necesitan ser resueltos. Puedes coger uno y arreglarlo o
proponer uno nuevo. A cada incidente abierto se le asigna un número,
el cual usaremos más adelante.

##Hacer un fork
Hacer un fork del proyecto es como realizar una copia del mismo en
nuestra propia cuenta GitHub. De esta manera podemos hacer cambios en
el código sin fastidiar el original.
Para hacer un fork, hay que darle al botón "Fork" de la esquina superior
derecha de la pantalla del proyecto.

##Clonar el repositorio
Ahora tenemos un nuevo repositorio en nuestra cuenta GitHub con el mismo
nombre que el original, pero para poder empezar a hacer cambios en él
necesitamos tenerlo en nuestro disco duro.
Para esto hay que abrir una terminal, posicionarnos en el directorio
donde alojaremos el repositorio y hacer un clone:

{% highlight bash %}
git clone https://github.com/mikecao/flight.git
{% endhighlight %}

Este comando descargará el repositorio en nuestra disco duro de manera
que podamos trabajar localmente.

##Añadiendo remotos
En este momento tenemos un remoto llamado `origin` que apunta a nuestro
repositorio en GitHub, pero no tenemos ninguna referencia al repositorio
original (en el que queremos colaborar).
Es importante tener una referencia al repo original para poder obtener
los últimos cambios:

{% highlight bash %}
git remote add upstream https://github.com/mikecao/flight.git
{% endhighlight %}

Ya hemos creado un remoto llamado `upstream` que apunta al repo original,
que utilizaremos después.

##Crear una rama
Usando el número asignado al incidente que hemos abierto, creamos una nueva
rama y saltamos a ella (55 es el supuesto número del incidente. El nombre de
la rama es tan solo una convención):

{% highlight bash %}
git checkout -b issue55
{% endhighlight %}

Ahora podemos empezar a trabajar. Es aquí cuando podemos hacer uso del
remoto `upstream`: siempre es mejor trabajar sobre los últimos cambios
del repositorio original ya que si ha pasado mucho tiempo entre que hemos
clonado el repo y empezamos a trabajar en él, quizá el autor haya hecho
algunos cambios (¡incluso puede que ya hayan corregido el problema que
intentas solucionar!).
Descargamos los últimos cambios y hacemos un `merge`:

{% highlight bash %}
git fetch upstream
git merge upstream/master
{% endhighlight %}

Finalmente, podemos programar. Modifica, borra o añade todo el código que
creas conveniente y finaliza con un `commit`:

{% highlight bash %}
git commit -a -m "File.java: corregido metodo login(). Fixes #55"
{% endhighlight %}

El comentario del commit no está sujeto a normas, pero incluir
"Fixes #55" automáticamente asociará el pull-request con el incidente
número 55 en lugar de abrir un nuevo incidente.

##Enviar un pull-request
Una vez hechos todos los cambios, los subimos a **nuestro** repositorio en
GitHub:

{% highlight bash %}
git push origin issue55
{% endhighlight %}

Ve a la página de tu repositorio en GitHub y selecciona la nueva rama
"issue55". Selecciona el botón 'Pull request' que aparece debajo. Esto
te llevará a una página donde deberás describir el cambio realizado.

Finaliza pulsando "Send Pull Request". Esto avisará al autor **original**
del proyecto de los cambios que has realizado. Ahora solo queda esperar
su respuesta.


[1]: https://github.com/mikecao/flight
[2]: https://github.com/
[3]: https://help.github.com/articles/fork-a-repo
