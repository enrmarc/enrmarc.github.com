---
layout      : post
title       : Classes Versus Objects
category    : software
permalink   : /blog/classes-vs-objects-js
disqus      : false
keywords    : javascript classes objects delegation-behaviour YDKJS
---

I've been reading the book series [You Don't Know JS] (YDKJS) and I find them
a good reference if you want to dig into the core concepts of JavaScript.
Although books like [JavaScript: The Definitive Guide] and
[JavaScript: The Good Parts] are always referenced for achieving
the same goal, these two books present in my opinion a few caveats:

  - Crockford's book, as its title suggests, presents you
    a partial view of JavaScript (the good parts). This is great if by
    reading that book you are introducing yourself to the language,
    but as you get more experience your lack of understanding of
    the more complex aspects of the language can play against you.

  - Flanagan's book is more than 1000 pages (six times Crockford's book).
    Again, as its title suggests, the book can be considered the
    “definitive guide” if by "definitive" we understand "you don't have
    to keep looking for more info around the web, this book is enough".
    And certainly, it covers most of the aspects of the language
    that you are going to use in your day to day work (debugging time
    included). Unfortunately, reading the whole book can be a hard job
    for newcomers.

  - None of them mention the new incorporations added in ES6.

On the other hand, the YDKJS book series seems to be a good intermediate
point:
  - It does cover the good and bad parts of the language, and
  - It does it in a way that it's easy to follow and understand... and
    in less than 1000 pages.

This is not a book review of the YDKJS series, just
something I found interesting. If you really want to know more about this
topic then you should check the third book [this & Object Prototypes].

## Classes Versus Objects
Especifically, I'd like to write about one of the most discussed topics
about JavaScript: **classical inheritance versus behaviour delegation**.

Classical inheritance mechanism is all about *copying*. The child class
inherits the behaviour of its parent class copying its behaviour (data values and
methods) but at the same time it's allowed to the child to override part of this
behaviour (polymorphism).

In JS there is no such things as classes [^1], all we have are objects;
so how do we share behaviour in JS? Via delegation: we let some object A provide
a delegation (to another object B) for property or method references if they
are not found on the object itself (A).
So rather than viewing the relationship between your objects as an strictly
child-parent structure, we can think of objects as peers with any direction
of delegation links between them.

[^1]: ES6 introduces the `class` keyword and despite the syntactic \\
      improvements, JS still operates on top of the Prototype mechanism.

Let's implement some functionality using the approaches mentioned.

### Simulating classical inheritance

{% highlight javascript %}
function Glyph(name) {
  this.name = name;
}

Glyph.prototype.draw = function(){
  console.log('Drawing...');
};

function Rectangle(name, point1, point2) {
  Glyph.call(this, name);
  this.point1 = point1;
  this.point2 = point2;
}

Rectangle.prototype = Object.create(Glyph.prototype);

// Override original `draw`
Rectangle.prototype.draw = function() {
  Glyph.prototype.draw(this);
  console.log('Drawing ' + this.name + ' at position ' + this.point1 + ',' + this.point2);
};

var r = new Rectangle("rec", 0, 0);
r.draw();
{% endhighlight %}

We think of `Rectangle` as a child of `Glyph` and override the `draw` behaviour.

### Using behaviour delegation

{% highlight javascript %}
var Glyph = {
  init: function(name) {
    this.name = name;
  },

  draw: function() {
    console.log('Drawing...');
  }
};

var Rectangle = Object.create(Glyph);

Rectangle.setup = function(name, point1, point2) {
  this.init(name);
  this.point1 = point1;
  this.point2 = point2;
};

Rectangle.display = function() {
  this.draw();
  console.log('Drawing ' + this.name + ' at position ' + this.point1 + ',' + this.point2);
}

Rectangle.setup('rec', 0, 0);
Rectangle.display();
{% endhighlight %}

With this approach we don't think of `Rectangle` as a child of `Glyph` but rather
as an object that requires some behaviour of `Glyph` (its `draw` and `init` methods)
achieving this using delegation. We deliberately use a different name (`display`
instead of `draw`) to express the idea that `Rectangle` and `Glyph` are two
standalone objects and the former requires a specific behaviour of the latter.

ES6 besides, we see that some mental overhead has been eliminated:
no `new` operator, no `prototype` references, no pseudopolymorphism
(`Glyp.call` and `Glyph.prototype.draw`); all we got are objects and delegate
calls to the `this` object.

[You Don't Know JS]: https://github.com/getify/You-Dont-Know-JS
[JavaScript: The Definitive Guide]: https://www.amazon.com/JavaScript-Definitive-Guide-Activate-Guides/dp/0596805527
[JavaScript: The Good Parts]: https://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742/
[this & Object Prototypes]: https://github.com/getify/You-Dont-Know-JS/tree/master/this%20%26%20object%20prototypes