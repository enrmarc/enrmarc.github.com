---
layout   : post
title    : Python y la Streaming API de Twitter
summary  : Leyendo tweets
tags     : Python API Twitter streaming OAuth Http
category : note
permalink: /blog/Python-y-la-Streaming-API-de-Twitter
disqus   : true
---

Me he apuntado al curso online [Introduction to
Data Science] de [Coursera] y me ha gustado mucho
el ejercicio sobre el análisis semántico de tweets.
En esta entrada solo hablaré sobre cómo bajar tweets de
la [API de Twitter], quizá más adelante hable sobre el
análisis semántico.

Bien, la API de Twitter tiene muchas cosas interesantes,
puedes buscar tweets, usuarios, hashtags; puedes hasta publicarlos
y quien sabe qué demonios más (no me he leído toda la documentación).
También tiene ese que llaman la [Streaming API], que es como abrir
el grifo de Twitter: puedes descargar tweets en tiempo real.
Se puede usar cualquier lenguaje para conectarte. Yo usaré
Python, porque estoy fuertemente enganchado a él.

####Autenticación
La API de Twitter es *gratis*, pero debes pedir permiso. Twitter usa [OAuth]
para proveer acceso autorizado a su API.
Lo primero que hay que hacer es obtener los *tokens de acceso* desde
[la consola] y eligir  *Create New App*.
Sigue los pasos y listo ya tienes tus tókens.
Twitter tiene algunas librerías para tratar con
OAuth, pero en esta ocasión tiraré de Python plano porque
lo único que Twitter requiere es que se añada
la cabecera `Authorization` a cada petición que se envíe especificando
los tókens necesarios. Algo así:

{% highlight python %}
api_key = 'TU_API_KEY'
api_secret = 'TU_API_SECRET'
access_token_key = 'TU_ACCESS_TOKEN_KEY'
access_token_secret = 'TU_ACCESS_TOKEN_SECRET'

oauth_token = oauth.Token(key=access_token_key, secret=access_token_secret)
oauth_consumer = oauth.Consumer(key=api_key, secret=api_secret)
signature_method_hmac_sha1 = oauth.SignatureMethod_HMAC_SHA1()

http_handler  = urllib.HTTPHandler(debuglevel = 0)
https_handler = urllib.HTTPSHandler(debuglevel = 0)
{% endhighlight %}

Algo de terminología. En el mundo OAuth, los tókens (el *access token* y
la parte secreta) son usados en lugar de los usuales usuario y
contraseña. Las *consumer credentials* son la forma en la que
Twitter tiene de identificar tu aplicación.
HMAC-SHA1 es el método que soporta Twitter para generar la firma.
El resto es la inicialización de los handlers para HTTP.
Ahora solo queda construir la petición y autenticarla con OAuth.

{% highlight python %}
def build_req(url, method, params):
  req = oauth.Request.from_consumer_and_token(
    oauth_consumer, token=oauth_token, http_method=method, http_url=url, parameters=params)
  req.sign_request(signature_method_hmac_sha1, oauth_consumer, oauth_token)

  opener = urllib.OpenerDirector()
  opener.add_handler(http_handler)
  opener.add_handler(https_handler)
  response = opener.open(req.to_url(), None)
  return response
{% endhighlight %}

La petición se crea añadiendo las credenciales y firmándola
con HMAC-SHA1.

####Leyendo tweets
La API devuelve una muestra aleatoria
de tweets en formato JSON. Solo hay que imprimir tweet a tweet:

{% highlight python %}
def fetch():
  url = "https://stream.twitter.com/1/statuses/sample.json"
  response = build_req(url, 'GET', [])
  for line in response:
     print line.strip()
{% endhighlight %}

El código en [GitHub].

[Introduction to Data Science]: https://www.coursera.org/course/datasci
[API de Twitter]: https://dev.twitter.com/
[Streaming API]: https://dev.twitter.com/docs/api/streaming
[la consola]: https://apps.twitter.com/app/new
[OAuth]: http://oauth.net/
[GitHub]: https://github.com/enrmarc/twitter-api-python