---
layout      : post
title       : Rewriting Cassandra (part 2)
summary     :
category    : software
permalink   : /blog/rewriting-cassandra-part-2
keywords    : cassandra react
images:
 - https://raw.githubusercontent.com/enrmarc/images/master/img/mock1_cass_web.png
 - https://raw.githubusercontent.com/enrmarc/images/master/img/mock2_cass_web.png
---

It takes time. I'm just uploading this here so I force myself to keep 
working on it. I actually came up with the UI/UX some time ago, but 
didn't find the time to share it.

{% assign pic = page.images[0] %}
{% include picture.html klass="s" pic=pic alt="Cassandra" wwidth="400" num="Fig. 1." caption="Main screen" %}

There is also some code for generate the arrival times for each bus for each busline for each
time of the day (because it's easier to generate the data once and have it in the
frontend, rather than query the server each time the app wants to know "at what time is 
coming the next bus?").

{% assign pic = page.images[1] %}
{% include picture.html klass="s" pic=pic alt="Cassandra" wwidth="400" num="Fig. 1." caption="Secondary screen" %}

Besides, these days I'm busy refreshing my knowledge about DDD, getting familiarized
(once again) with Docker and Kubernetes, and learning Go... yeah, microservices all the
way down.