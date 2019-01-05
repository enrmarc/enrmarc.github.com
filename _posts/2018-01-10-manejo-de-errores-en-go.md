---
layout      : post
title       : Manejo de errores en Go
summary     : 
category    : software
permalink   : /blog/manejo-de-errores-en-Go
disqus      : false
keywords    : software go golang
hidden      : true
---

Al escribir funciones en Go es indispensable pensar sobre las circunstancias
en las que una función puede fallar. Es cierto que algunas funciones, como por 
ejemplo [`strconv.FormatBool`], nunca fallan (si obviamos escenarios 
catastróficos como no tener suficiente RAM):

{% highlight java %}
func FormatBool(b bool) string {
    if b {
        return "true"
    }
    return "false"
}
{% endhighlight java %}

Otras funciones tampoco fallan siempre y cuando se cumplan sus 
precondiciones (e.g., pasar como argumento de entrada una función a la 
función [`json.Marshal`]), pero en muchos otros casos, incluso en programas 
bien escritos, el que una función no falle depende de factores que el 
programador no controla, como la lectura y escritura de ficheros, o el conectarse 
con un servidor remoto. Los SSD pueden fallar y la red puede caerse, y como 
programadores no tenemos control sobre esto.

## La interfaz `error`
En Go las funciones pueden retornar múltiples valores y, por convención, si una 
función retorna un error éste debe especificarse como su último valor. Para ello, 
Go provee el tipo de dato `error` a modo de interfaz. En este post no hablaremos de 
lo que es una interfaz en Go, pero es suficiente con saber que un `error` puede
tener el valor `nil` (nulo) o no. 
Un `error` nulo implica que no existe error. Un `error` no nulo implica que sí 
existe un error y tiene un mensaje de error asociado---el cual puede imprimirse 
en la consola usando `fmt.Println`. Usualmente, cuando una función retorna un 
`error` no nulo, los otros valores retornados son indefinidos y deben ser 
ignorados por el código que llama a la función.

## Estrategias de manejo de errores
Cuando una función Go retorna un error, es responsabilidad del código cliente el
interpretar el error y actuar en consecuencia. Dependiendo de la situación, 
hay cinco estrategias para manejar errores en Go.

**1. Propagar el error**

Es decir, el error de la función pasa a ser el error del código que llama a la 
función. Por ejemplo, la siguiente función que se encarga de extraer el número de 
enlaces o links de una determinada página web puede fallar si la conexión con 
el servidor es interrumpida. En ese caso, la función retorna el error tal cual 
sin modificaciones al código cliente.

{% highlight java %}
func ExtraerLinks(url string) int, error {
    response, err := http.Get(url)
    if err != nil {
        return nil, err
    }
}
{% endhighlight java %}

La función `ExtraerLinks` utiliza [`http.Get`] que devuelve, en caso de fallo,
un `error` no nulo como segundo valor de retorno (asignado a la variable 
que hemos nombrado `err`). En caso de fallo, nuestra función simplemente 
devuelve `err` sin más, es decir, **propaga** el error que `http.Get` 
pueda producir.

Opcionalmente podemos propagar errores ofreciendo un poco mas de contexto 
al código llamante. Por ejemplo, digamos que tenemos una función `ParsearLinks` 
que se encarga de extraer la url de los links que una determina página web 
pueda tener.

{% highlight java %}
func ParsearLinks(url string) []string, error {
    body := ... // el "body" de la página web dada por `url`
    doc, err := html.Parse(body)
    body.Close()
    if err != nil {
        return nil, fmt.Errorf("parseando %s como HTML: %v", url, err)
    }
}
{% endhighlight java %}

¿Por qué no retornamos `err` sin más como en la función anterior `ExtraerLinks`?
El error que [`html.Parse`] retorna no dice nada---no ofrece ningun contexto, 
sobre qué página web estabamos intentando parsear. 
La lógica de `ParsearLinks` es bastante clara: como entrada recibe la url
de una página web y como salida devuelve una lista de cadenas que se corresponden
con cada una de las urls a las que la página web apunta. Si `ParsearLinks` falla,
nos interesa saber, en caso de error, con qué url la función ha fallado. 

Si bien es cierto que el código que llame a `ParsearLinks` puede saber ante 
qué `url` la función falló, es responsabilidad de la propia función el proveer 
este contexto.

**2. Intentar de nuevo**

Ante determinados errores, tiene sentido el intentar de nuevo la operación que 
falló. Un ejemplo típico es el reconectar con un servidor si la primera
conexión no tuvo éxito.

{% highlight java %}
func ConectarConServidor(url string) error {
    const timeout = 1 * time.Minute
    deadline := time.Now().Add(timeout)
    for tries := 0; time.Now().Before(deadline); tries++ {
        _, err := http.Head(url)
        if err != nil {
            return nil // success
        }
        log.Printf("servidor no responde %s, reconectando...", err)
        time.Sleep(time.Second << uint(tries))
    }
    return fmt.Errorf("no se pudo conectar con el servidor %s", url)
}
{% endhighlight java %}

`ConectarConServidor` intenta conectar con el servidor especificado por `url`. Lo
intenta por un minuto (variable `timeout`) y si no lo consigue reporta un error.
La función sigue la estrategia de [exponential backoff]: esto es, la primera vez
que no podamos conectarnos con el servidor, la función espera 1 segundo 
(usando [`time.Sleep`]) para intentar conectarse de nuevo. La segunda vez que 
no podamos conectarnos, la funcion esperará 2 segundos, la tercera 4, la cuarta 
8, y así hasta que agotemos el minuto. El intervalo de espera se duplica cada vez 
(de ahí que el método sea exponencial).

**3. Detener el programa**

¿Qué hacer si la llamada a `ConectarConServidor` falla incluso después de intentarlo 
durante un minuto? Bueno, una opción es detener el programa con un mensaje de error.

{% highlight java %}
err := ConectarConServidor(url)
if err != nil {
    fmt.Printf(os.Stderr, "No se pudo conectar con el servidor: %v\n", err)
    os.Exit(1)
}
{% endhighlight java %}

Aquí simplemente mostramos un mensaje de error con `fmt.Printf` y
detenemos el programa con [`os.Exit`].

**4. Añadir el error a un Log**

En algunos casos es suficiente con "loggear" el error y continuar con
el funcionamiento normal del programa.

{% highlight java %}
err := Ping()
if err != nil {
    log.Printf("ping fallo: %v", err)
}
{% endhighlight java %}

Como vemos, simplemente damos cuenta del error, pero no hacemos nada más
ya sea porque el error no es fatal o porque simplemente no estamos interesados
en manejar el error.

**5. Ignorar el error**

En contadas ocasiones podemos, de forma segura, ignorar un error.

{% highlight java %}
dir, err := ioutil.TempDir("", "scratch")
if err != nil {
    return fmt.Errorf("no se pudo crear el directorio temporal: %v", err)
}
os.RemoveAll(dir) // ignorar el error. El OS ya se encarga de eliminar dir. temporales
{% endhighlight java %}

La llamada a [`os.RemoveAll`] (que se encarga de eliminar el directorio 
que le pasemos como argumento) puede fallar, pero nuestro programa ignora el error
ya que el sistema operativo ya se encarga de eliminar directorios temporales de
manera automática (después de un reinicio, por ejemplo).
En este ejemplo, el ignorar el error se hace de manera intencional ya que
la lógica del programa sigue siendo la misma se maneje o no el posible error.

[`strconv.FormatBool`]: https://golang.org/pkg/strconv/#FormatBool
[`json.Marshal`]: https://golang.org/pkg/encoding/json/#Marshal
[`http.Get`]: https://golang.org/pkg/net/http/#Get
[`html.Parse`]: https://godoc.org/golang.org/x/net/html#Parse
[exponential backoff]: https://en.wikipedia.org/wiki/Exponential_backoff
[`time.Sleep`]: https://golang.org/pkg/time/#Sleep
[`os.Exit`]: https://golang.org/pkg/os/#Exit
[`os.RemoveAll`]: https://golang.org/pkg/os/#RemoveAll

{% comment %}
Total time: 1h 10 min without review. I guess around 10 min for review => 1h 20min total!
Around: 1050 words. 160 lines
21:37
22:48
EdTeam random post: around 400 words. 89 lines.

Revision: start at 16:38. End 17:00 -> 20 min.

Total: 1h 30 min -> around 1000 words.
{% endcomment %}