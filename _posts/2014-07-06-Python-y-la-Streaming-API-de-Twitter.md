---
layout  : post
title   : Python y la Streaming API de Twitter
summary : Python y la Streaming API de Twitter
tags    : python api twitter streaming leer tuits oauth http
---

*Este y los siguientes posts estarán dirigidos al futuro Enrique.
Supongo que algún día los reelerá.*

Ahora que estás inscrito en el curso [Introduction to
Data Science] es hora de que te pongas a escribir sobre algo
relacionado a eso, ¿no crees? Y qué mejor que usar el mayor estercolero
de mensajes del planeta: Twitter.

Bien, la [API de Twitter] tiene muchas cosas interesantes.
Puedes buscar tweets, usuarios, hashtags; hasta publicarlos
y quien sabe qué demonios más (no me he leído toda la documentación).
Pero te has fijado, te has interesado, en la [Streaming API].
Es como abrir el grifo de Twitter; una vez te conectas... *fluyen*
tweets. Puedes acceder usando cualquier lenguaje. Usa el lenguaje
al que estés fuertemente enganchado. En esta ocasión, supondré
que usarás Python.

#Autenticación
La API de Twitter es *gratis*, pero debes pedir permiso. Twitter usa [OAuth]
para proveer acceso autorizado a su API, de modo que lo tienes fácil.
Lo primero que debes hacer es obtener los *tokens de acceso*.
Accede a [la consola] y elige  *Create New App*.
Sigue los pasos, (¿puedes, verdad Enrique?) y listo. Ya tienes
tus tókens.
Ya sabes que Twitter tiene algunas librerías para tratar con
OAuth, pero, bueno, no sé por qué te empeñas en usar Python plano.
En realidad todo lo que Twitter requirere es que añadas
la cabecera `Authorization` a cada petición que envíes y en esa
cabecera especificas los tókens necesarios.

Ésto es lo que necesitarás:

{% highlight python %}
api_key = 'TU_API_KEY'
api_secret = 'TU_API_SECRET'
access_token_key = 'TU_ACCESS_TOKEN_KEY'
access_token_secret = 'TU_ACCESS_TOKEN_SECRET'

oauth_token = oauth.Token(key=access_token_key, secret=access_token_secret)
oauth_consumer = oauth.Consumer(key=api_key, secret=api_secret)

signature_method_hmac_sha1 = oauth.SignatureMethod_HMAC_SHA1()

http_handler  = urllib.HTTPHandler(debuglevel=0)
https_handler = urllib.HTTPSHandler(debuglevel=0)
{% endhighlight %}

Terminología. En el mundo OAuth, los tókens (el *access token* y
la parte secreta) son usados en lugar de los usuales usuario y
contraseña. Las *consumer credentials* son la forma en la que
Twitter tiene de identificar tu aplicación.
HMAC-SHA1 es el método que soporta Twitter para generar la firma.
El resto es la inicialización de los handlers para HTTP.

#Autenticando la petición
Ahora solo queda construir la petición y autenticarla con OAuth.

{% highlight python %}
def build_req(url, method, params):
  req = oauth.Request.from_consumer_and_token(
    oauth_consumer, token=oauth_token, http_method=method, http_url=url,
    parameters=params
  )

  req.sign_request(signature_method_hmac_sha1, oauth_consumer, oauth_token)

  opener = urllib.OpenerDirector()
  opener.add_handler(http_handler)
  opener.add_handler(https_handler)

  response = opener.open(req.to_url(), None)

  return response
{% endhighlight %}

La petición se crea añadiendo las credenciales antes creadas y firmándola
con HMAC-SHA1. Como solo quieres leer el stream de datos, la petición será
un `GET` y pasaremos todos los tókens por la URL, de ahí el `req.to_url()`.

#Leyendo tweets
Vas a leer del stream *sample*. Éste devuelve una muestra aleatoria
de tweets en formato JSON. Luego imprimes línea a línea (tweet a tweet).

{% highlight python %}
def fetch():
  url = "https://stream.twitter.com/1/statuses/sample.json"
  response = build_req(url, 'GET', [])
  for line in response:
     print line.strip()
{% endhighlight %}

El código de una sola pieza en [GitHub].

[Introduction to Data Science]: https://www.coursera.org/course/datasci
[API de Twitter]: https://dev.twitter.com/
[Streaming API]: https://dev.twitter.com/docs/api/streaming
[la consola]: https://apps.twitter.com/app/new
[OAuth]: http://oauth.net/
[GitHub]: https://github.com/enrmarc/twitter-api-python
