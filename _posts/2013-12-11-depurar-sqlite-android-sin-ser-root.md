---
layout   : post
title    : Depurar SQLite en Android sin ser root
summary  : Unos scripts
tags     : Android SQLite debugging root
category : note
permalink: /blog/depurar-sqlite-android-sin-ser-root
disqus   : true
---

Si tenéis un nuevo y reluciente dispositivo Android que no queréis rootear
(un Nexus 5 por ejemplo) y sois desarrolladores, seguramente leer y escribir
en una base de datos [SQLite] de una de vuestras aplicaciones sea tarea
común.
Lo siguiente son dos scripts para leer y escribir una base de datos sin
la necesidad de ser root.

#### Lectura
{% highlight bash%}
#! /usr/bin/env bash

DEFAULT_APP="org.company.app"
DEFAULT_DB="cassandra.db"
DEFAULT_OUTPUT="/sdcard/Download/$DEFAULT_DB"

APP=${1:-$DEFAULT_APP}
DB=${2:-$DEFAULT_DB}
OUTPUT_DIR=${3:-$DEFAULT_OUTPUT}

cmd="run-as $APP cat /data/data/$APP/databases/$DB > $OUTPUT_DIR"
adb -d shell "$cmd"
adb pull $OUTPUT_DIR

sqlite3 --version &> /dev/null
if [ $? -eq 0 ]; then
   sqlite3 $DB
else
   echo "$DB ok"
fi
{% endhighlight %}

Dale permisos de ejecución y cópialo en tu directorio bin personal. El script
lanza `adb` usando `run-as` bajo los permisos del nombre del paquete que
le pases como primer argumento (o el especificado por defecto en `DEFAULT_APP`).
De esta manera tiene permisos sobre la base de datos (`DEFAULT_DB` o
lo que especifiques como segundo argumento) para copiarla a un
directorio público (`DEFAULT_OUTPUT` o lo que especifiques como tercer argumento).
Luego con `adb pull` se copia la base de datos a tu disco duro.

Necesitarás `sqlite3` en tu ordenador para leer el fichero. Si lo tienes,
el script abre directamente el fichero recién descargado.

#### Escritura
{% highlight bash %}
#! /usr/bin/env bash

DEFAULT_APP="org.company.app"
DEFAULT_DB="cassandra.db"

APP=${1:-$DEFAULT_APP}
DB=${2:-$DEFAULT_DB}

cmd1="run-as $APP chmod 666 /data/data/$APP/databases/$DB"
adb shell "$cmd1"
chmod 666 $DB
adb push $DB /data/data/$APP/databases/$DB

#### Restore original permissions
cmd2="run-as $APP chmod 660 /data/data/$APP/databases/$DB"
adb shell "$cmd2"
{% endhighlight %}

El script de escritura es parecido, usa `run-as` con el mismo
propósito. Aunque para escribir en el directorio de la aplicación
antes hay que cambiar los permisos. Una vez escrita la base
de datos, los permisos se restauran.

Nombra los scripts como `pull` y `push` y cuando
depures una base de datos puedes hacer `pull` para
abrirla, editarla de la manera usual, salir de sqlite3 (Ctrl-D) y
ejecutar `push` para escribir los cambios (todo esto suponiendo
que sobreescribas las variables por defecto del script).

[SQLite]: http://www.sqlite.org/
