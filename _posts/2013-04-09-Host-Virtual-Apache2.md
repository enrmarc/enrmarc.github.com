---
layout  : post
title   : Host virtual en Apache
summary : Configuración de un Host virtual en Apache2
tags    : apache linux
---

Lo que sigue es un recordatorio de cómo configurar un host virtual bajo Apache. Siempre
se me olvida, asi que por qué recordarlo si puedo anotarlo. El hecho de usar un 
Host virtual permite desplegar varios proyectos web en directorios diferentes
al usual `/var/www/`.

Crea el fichero de configuración del host virtual
en el directorio `/etc/apache2/sites-available` :

{% highlight bash %}
sudo touch /etc/apache2/sites-available/fichero-host
{% endhighlight %}

{% highlight apache %}
<VirtualHost *:80>
    ServerName nombreDelSitio
    DocumentRoot /home/enrmarc/tmp/app/webroot
    SetEnv APPLICATION_ENV "development"
    <Directory /home/enrmarc/tmp/app/webroot > 
        AllowOverride All
        Order allow,deny
        Allow from all
    </Directory>
</VirtualHost>
{% endhighlight %}

Crea el enlace simbólico en `/etc/apache2/sites-enabled` para habilitarlo:
{% highlight bash %}
sudo ln -s /etc/apache2/sites-available/fichero-host /etc/apache2/sites-enabled/fichero-host
{% endhighlight %}

Añade el nuevo host al fichero `/etc/hosts` :
{% highlight bash %}
127.0.0.1 nombreDelSitio
{% endhighlight %}

Reinicia apache: 
{% highlight bash %}
sudo service apache2 restart
{% endhighlight %}

Ahora puedes acceder a tu sitio usando la url: `http://nombreDelSitio`

