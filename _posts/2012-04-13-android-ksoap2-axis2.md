---
layout    : post
title     : Android, Axis2 y Ksoap2
summary   : Enviar y recibir objetos complejos utilizando la librería KSoap2 para Android.
tags      : Axis2 Android Ksoap2 WebServices Java Http
category  : note
permalink : /blog/android-ksoap2-axis2
disqus      : true
---

Combinar en un mismo proyecto Android, Axis2 y SOAP es como el <em>Inferno</em> de Dante, sobre todo
si lo que quieres es enviar objetos complejos. Solo escribo una de tantas formas de hacerlo.
(Es necesario tener instalado y configurado [Axis2] e incluir la librería [Ksoap2] en el directorio `libs/` del proyecto Android ).

##Servidor
La manera más rápida de desplegar un servicio web en Axis2 es creando un
[POJO] (Plain Old Java Object). El POJO utilizado para ilustrar el ejemplo
representará a una persona.
{% highlight java %}
package org.entidades;

public class Persona {
    private String nombre;
    private int edad;
    private double peso;

    public Persona() {}

    public Persona(String nombre, int edad, double peso) {
        this.nombre = nombre;
        this.edad = edad;
        this.peso = peso;
    }

    public void   setNombre(String nombre) { this.nombre = nombre;}
    public void   setEdad(int edad) { this.edad = edad;}
    public void   setPeso(double peso) { this.peso = peso;}
    public int    getEdad() { return edad;}
    public double getPeso() { return peso;}
    public String getNombre() { return nombre;}
}
{% endhighlight %}

La clase que expondrá el servicio web será:
{% highlight java %}
package org;

import org.entidades.Persona;

public class Service {
    public Persona test(Persona persona) {
        return new Persona(persona.getNombre(), persona.getEdad(),
             persona.getPeso());
    }
}
{% endhighlight %}

El fichero de configuración `services.xml` indica la clase que representará el servicio web:
{% highlight console %}
<service name="objetos" scope="application">
   <description>Enviar y recibir objetos complejos</description>
   <parameter name="ServiceClass">org.Service</parameter>
   <messageReceivers>
      <messageReceiver
         mep="http://www.w3.org/2004/08/wsdl/in-only"
         class="org.apache.axis2.rpc.receivers.RPCInOnlyMessageReceiver"/>
      <messageReceiver
         mep="http://www.w3.org/2004/08/wsdl/in-out"
         class="org.apache.axis2.rpc.receivers.RPCMessageReceiver"/>
   </messageReceivers>
</service>
{% endhighlight %}

La estructura de directorios en el servidor queda así:
{% highlight console %}
objetos/
├── META-INF
│   └── services.xml
└── src
    └── org
        ├── entidades
        │   └── Persona.java
        └── Service.java
{% endhighlight %}

##Cliente
El código Android utiliza la librería [Ksoap2] para poder gestionar los mensajes
[SOAP]. Para que un objeto complejo pueda ser enviado en un mensaje SOAP, debe
implementar la interfaz `KvmSerializable`.
{% highlight java %}
package com.objetos;

import org.ksoap2.serialization.KvmSerializable;
import org.ksoap2.serialization.PropertyInfo;

import java.util.Hashtable;

public class Persona implements KvmSerializable {
    private String nombre;
    private int edad;
    private double peso;

    public Persona() {}

    public Persona(String nombre, int edad, double peso) {
        this.nombre = nombre;
        this.edad = edad;
        this.peso = peso;
    }

    public void setNombre(String nombre) { this.nombre = nombre;}
    public void setEdad(int edad) { this.edad = edad;}
    public void setPeso(double peso) { this.peso = peso;}
    public String getNombre() { return nombre;}
    public int getEdad() { return edad;}
    public double getPeso() { return peso;}

    /* Ksoap */
    public Object getProperty(int arg0) {
        switch (arg0) {
            case 0: return nombre;
            case 1: return edad;
            case 2: return peso;
        }
        return null;
    }

    public int getPropertyCount() { return 3;}

    public void getPropertyInfo(int index, Hashtable arg1,
            PropertyInfo propertyInfo) {
        switch (index) {
            case 0:
                propertyInfo.name = "nombre";
                propertyInfo.type = PropertyInfo.STRING_CLASS;
                break;
            case 1:
                propertyInfo.name = "edad";
                propertyInfo.type = PropertyInfo.INTEGER_CLASS;
                break;
            case 2:
                propertyInfo.name = "peso";
                propertyInfo.type = Double.class;
                break;
            default:
                break;
        }
    }

    public void setProperty(int index, Object value) {
        switch (index) {
            case 0:
                this.nombre = value.toString();
                break;
            case 1:
                this.edad = Integer.parseInt(value.toString());
                break;
            case 2:
                this.peso = Double.parseDouble(value.toString());
                break;
            default:
                break;
        }
    }
}
{% endhighlight %}

Además, para los tipo `double` es necesario implementar la interfaz `Marshal`.
{% highlight java %}
package com.objetos;

import java.io.IOException;

import org.ksoap2.serialization.Marshal;
import org.ksoap2.serialization.PropertyInfo;
import org.ksoap2.serialization.SoapSerializationEnvelope;
import org.xmlpull.v1.XmlPullParser;
import org.xmlpull.v1.XmlPullParserException;
import org.xmlpull.v1.XmlSerializer;

public class MarshalDouble implements Marshal {
    public Object readInstance(XmlPullParser parser, String namespace,
           String name, PropertyInfo expected)
           throws IOException, XmlPullParserException {
        return Double.parseDouble(parser.nextText());
    }

    public void register(SoapSerializationEnvelope cm) {
        cm.addMapping(cm.xsd, "double", Double.class, this);
    }

    public void writeInstance(XmlSerializer writer, Object obj)
           throws IOException {
        writer.text(obj.toString());
    }
}
{% endhighlight %}

Y por último la Activity:
{%highlight java %}
package com.objetos;

import org.ksoap2.SoapEnvelope;
import org.ksoap2.serialization.SoapObject;
import org.ksoap2.serialization.SoapPrimitive;
import org.ksoap2.serialization.SoapSerializationEnvelope;
import org.ksoap2.transport.HttpTransportSE;
import org.ksoap2.transport.HttpTransportSE;
import org.ksoap2.serialization.PropertyInfo;
import org.ksoap2.SoapFault;

import android.app.Activity;
import android.os.Bundle;
import android.os.AsyncTask;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.TextView;
import android.widget.EditText;
import android.widget.Button;
import android.app.ProgressDialog;

public class Main extends Activity {

    private String NAMESPACE = "http://org";
    private String TARGET_NAMESPACE = "http://entidades.org/xsd";
    private String URL = "http://10.0.2.2:8080/axis2/services/objetos/";
    private String METHOD_NAME = "test";
    private Button send;
    private EditText etNombre, etEdad, etPeso;
    private TextView tvNombre, tvEdad, tvPeso;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        etNombre = (EditText)findViewById(R.id.etNombre);
        etEdad = (EditText)findViewById(R.id.etEdad);
        etPeso = (EditText)findViewById(R.id.etPeso);

        tvNombre = (TextView)findViewById(R.id.tvNombre);
        tvEdad = (TextView)findViewById(R.id.tvEdad);
        tvPeso = (TextView)findViewById(R.id.tvPeso);

        send = (Button)findViewById(R.id.send);
        send.setOnClickListener(new OnClickListener() {
            public void onClick(View view) {
                new Test().execute(
                    new Persona(
                        etNombre.getText().toString(),
                        Integer.parseInt(etEdad.getText().toString()),
                        Double.parseDouble(etPeso.getText().toString())));
            }
        });
    }

    private class Test extends AsyncTask {
        private ProgressDialog dialog = new ProgressDialog(Main.this);
        protected void onPreExecute() {
            dialog.setMessage("Enviando ...");
            dialog.show();
        }

        protected Persona doInBackground(Persona... args) {
            return enviar(args[0]);
        }

        protected void onPostExecute(Persona persona) {
            if (dialog.isShowing()) {
                dialog.dismiss();
            }

            if (persona != null) {
                tvNombre.setText(persona.getNombre());
                tvEdad.setText(Integer.toString(persona.getEdad()));
                tvPeso.setText(Double.toString(persona.getPeso()));
            }
        }
    }

    private Persona enviar(Persona p) {
        HttpTransportSE transport = new HttpTransportSE(URL);
        SoapObject request = new SoapObject(NAMESPACE, METHOD_NAME);
        request.addProperty(p.getClass().getSimpleName(), p);
        SoapSerializationEnvelope envelope =
            new SoapSerializationEnvelope(SoapEnvelope.VER11);
        envelope.dotNet = true;
        envelope.setOutputSoapObject(request);
        envelope.addMapping(
            TARGET_NAMESPACE, p.getClass().getSimpleName(), p.getClass());
        MarshalDouble md = new MarshalDouble();
        md.register(envelope);

        try {
            transport.call(NAMESPACE + METHOD_NAME, envelope);
            Persona persona = (Persona)envelope.getResponse();
            return persona;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
{% endhighlight %}


[Axis2]: http://axis.apache.org/axis2/java/core/
[POJO]: http://axis.apache.org/axis2/java/core/docs/pojoguide.html
[Ksoap2]: http://code.google.com/p/ksoap2-android/
[SOAP]: http://en.wikipedia.org/wiki/SOAP
