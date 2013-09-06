---
layout  : post
title   : Rootear Android 4.2.1
summary : Cómo rooter un Jiayu con Android 4.2.1 desde Ubuntu
tags    : android smartphone root ubuntu
---

Este es un breve tutorial de cómo rootear un [Jiayu 3GS Turbo] con 
Android 4.2.1 desde Ubuntu. Seguramente sirva para otros modelos, 
pero no lo he probado.

**Requisitos**

Tener instalado el [SDK de Android]. En realidad lo único que hace falta es el `adb`, pero
no sé si se puede instalar aisladamente.

##Paso 1
Desde la página de Jiayu hay que descargar el siguiente [zip]. 
Contiene [busybox], una serie de utilidades UNIX; 
el binario su y el apk Superuser.

##Paso 2
Descomprime de la manera habitual y cambia de directorio:
{% highlight bash %}
unzip Root4.2.1.zip
cd Root.4.2.1
{% endhighlight %}

##Paso 3
Conecta tu dispositivo y activa la depuración por USB.
Ahora teclea todos estos comandos:
{% highlight bash %}
adb kill-server
adb wait-for-device
adb push tools/pwn /data/local/tmp/pwn
adb shell chmod 755 /data/local/tmp/pwn
adb push tools/su /data/local/tmp/su
adb push tools/busybox /data/local/tmp/busybox
adb install tools/Superuser.apk
adb shell /data/local/tmp/pwn
adb shell rm /data/local/tmp/pwn
adb shell rm /data/local/tmp/su
adb shell rm /data/local/tmp/busybox
adb reboot
adb kill-server
{% endhighlight %}

Ya podeemos hacer `adb shell` y luego `su` y seremos superusuario.


[busybox]: http://www.busybox.net/
[SDK de Android]: http://developer.android.com/sdk/index.html
[Jiayu 3GS Turbo]: http://www.jiayu.es/es/jiayu-moviles/23-jiayu-g3s-turbo-quadcore-plata.html
[zip]: http://www.jiayu.es/desarrollo/ANDROID/Root4.2.1.zip
