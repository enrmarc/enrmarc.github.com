---
layout      : post
title       : Thesis - Part II
summary     : Writings about my master's thesis on Learning Analytics
category    : others
permalink   : /blog/thesis-part-ii
disqus      : false
keywords    : master thesis learning-analytics germany nlp
---

So, what's my thesis about? *Supporting teachers to manage
semantic diversity in the classroom in inquiry-based learning scenarios*.
That's quite a title (temporary, by the way). The research group I'm working
with is focused in the big field of Learning Analytics (LA), so let's first
talk about (Learning) Analytics.

## Analytics

I'm sure you've heard about the term *Analytics* before (e.g. Google Analytics,
Adobe Analytics, software analytics); basically, it's a tool organizations
can use to interpret their big amount of data and get some benefits from it:
marketing optimization, processes enhancement, patterns in the usage of some
especific piece of software, etc. The term became [trendy] in November 2005
when Google launched Google Analytics (GA) and took over the Analytics
market in less than a month offering a freemium service that
tracked and reported website traffic[^1].

[^1]: Nowadays it does a lot more (review online campaigns, identify poorly \\
      performing pages, track sales activity and performance...).

## Learning Analytics (LA)

So, recollect, analyze and report. That's the basic cycle the Analytics
processes follow whatever the field it is applied to. In relation to
knowledge, teaching and learning, institutions can make use of the data
learners throw off in the process of accessing learning materials,
interacting with educators and peers, and creating new content [^2].
Recently [MOOCs] have emerged as a popular mode of learning and reveal
the need for specific tools for analyzing big amount of data.

[^2]: https://tekri.athabascau.ca/analytics/

The research group I'm working with is focused in the LA field and among other
things they've developed a series of tools in the context of the [Go-Lab Project]
which opens up online science laboratories for large-scale use in school
education.

> The overall aim of the Go-Lab Project is to encourage young people aged from
 10 to 18 to engage in science topics, acquire scientific inquiry skills,
 and experience the culture of doing science by undertaking active guided experimentation.
 To achieve this aim, the Go-Lab project creates the Go-Lab Portal allowing
 science teachers finding online labs and inquiry learning applications
 appropriate for their class, combining these in Inquiry Learning Spaces (ILSs)
 supporting particular lesson scenarios, and sharing the ILSs with their students.
 Using the ILSs, the students receive the opportunity to perform personalized
 scientific experiments with online labs in a structured learning environment [^3].

[^3]: http://www.go-lab-project.eu/

One of the apps the research group created is the Concept Cloud (CC). The CC
offers a structured visual representation of semantic concepts based on
a group-oriented model student knowledge. This model is extracted from the
material the learners have produced during the inquiry phases (Wiki articles,
concept map tools and hypothesis tools). The main goal of the app is to support
learners in reflecting their own knowledge (the CC is displayed at the end
of the inquiry process and learners can go back to improve their material if they
think the CC doesn't represent what they intended), as well as teachers in
supervising their students during the process of learning.

## Semantic tools

One of the core foundations of the CC is that it extracts semantic information
from the material the learners have produced. Each artefact consists of a set
of knowledge items that refers to specific concepts in the domain of the
learning space. The extraction of these concepts is performed via semantic tools
such as [AlchemyAPI] and [DBPedia Spotlight]; in this way at the end of the day we
transform a Wiki article produced by the learner into a set of semantic key concepts
contained in that article.

The CC app is fine as a visualisation tool, but it can be improved by analyzing
its semantic features. One thing teachers would like to know is "are the learners
using consistently the key concepts that are relevant for the topic under study?", and
if not, "which students deviate the most from the rest?". Furthermore, the current
layout of the CC doesn't provide any semantic information about its items:
they are placed randomly on the screen.

The topic of my thesis aims to support teachers in managing the semantic diversity
of the classroom using the CC data model as input:

 - Teachers can know in which grade the CC produced by the learners is consistent.
   The more *semantically diverse* the CC is, the less consistent the concepts
   produced by the learners are.

 - With this semantic information, it's possible to provide a new layout for the
   CC in which semantic related terms appear closer in the cloud of words.


For the next entry: semantic diversity in depth.

[trendy]: https://www.google.com/trends/explore?cat=32&date=all&q=analytics
[MOOCs]: https://en.wikipedia.org/wiki/Massive_open_online_course
[Go-Lab Project]: http://www.go-lab-project.eu/
[AlchemyAPI]: http://www.alchemyapi.com/
[DBPedia Spotlight]: https://github.com/dbpedia-spotlight/dbpedia-spotlight