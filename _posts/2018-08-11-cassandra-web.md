---
layout      : post
title       : Rewriting Cassandra
summary     : 
category    : software
permalink   : /blog/rewriting-cassandra
keywords    : cassandra react material design
images:
 - https://github.com/enrmarc/images/raw/master/img/cassandra-shadow.png
 - https://github.com/enrmarc/images/raw/master/img/cassandra-first-commit.png
---

I launched [Cassandra](https://play.google.com/store/apps/details?id=org.coyotev.cassandra)
4 years ago to solve a problem the city I was living in (Palencia, Spain) had
at that time: the lack of online information about the timetable of local buses.

Since then, Cassandra has been installed over 6000 times and it's average
rate in Google Play Store is 4.0. It was my first Android application and the 
first personal project that I managed to publish online. I was involved in everything; 
from the UI and logo design, to the backend code, to the generation 
of QR code stickers (linking to Google Play Store) that I pasted in bus 
stops, to the social media in Twitter. 

{% assign pic = page.images[0] %}
{% include picture.html pic=pic alt="Cassandra logo" wwidth="75" num="Fig. 1." caption="Cassandra logo" %}

It took me around three months from conception to publishing, and one thing I realise now is
that both the date of the first commit and the date of the publication of the app
in Google Play Store happened to be during late hours at night (02:50am and 1:23am, 
respectively) since I was working fulltime during that time.

If you ask me, I feel very satisfied; nevertheless [software gets rotten](https://en.wikipedia.org/wiki/Software_rot), although not in the way the physical things
do. The way the application was designed didn't allow me to update the timetable
without releasing an update to Google Play. The timetable wasn't being updated by the
local bus company so often, so I didn't think it was worth it to make Cassandra
get timetable updates online. I released 4 versions of Cassandra which corresponded
to the 4 times the local bus company changed their timetables. The last update was
in December 2014.

{% assign pic = page.images[1] %}
{% include picture.html pic=pic alt="First commit" wwidth="640" num="Fig. 2." caption="Cassandra's first commit" %}

Reasons for not updating Cassandra were many:
- lack of time
- rustiness of my Android programming skills
- the changes in the timetable weren't so drastic, and people weren't complaining too much

But of course, as time passed, Cassandra was getting more and more inaccurate to the point
many more people were asking for an update (the main reason the average rate dropped
drastically the last years). Unfortunately, the first two reasons for not updating Cassandra
were still the same.

### Web apps
I do want to keep maintaining Cassandra useful to their users, but I do not have a lot
of time to learn again the latest Android APIs, nor I want to deal with the whole process
of publishing in the Play Store. The answer, fortunately, seems simple: make Cassandra a 
web app.

- I do have a lot more of experience with JavaScript and the whole web stack than 4 years ago
- publishing or updating a web app is way more faster than doing it via Google Play Store
- it's time for Cassandra to get a new look and feel

I'm planning to rewrite Cassandra using [React](https://reactjs.org/) and 
[Material Design](https://material.io/). Let's see how it goes :)
