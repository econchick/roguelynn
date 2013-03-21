---
layout: post.html
title: "The New Coder: A Path to Software Engineering"
tags: [tutorials, learning, pycon]
---

This post contains all the sources and thoughts behind my PyCon 2013 talk launching [newcoder.io][newcoder]. The [video][PyCon] and [slides][slides] are available

<img class="displayed" src="{{ get_asset('images/SoS-slide1.png') }}" width="370" height="300")/> 

If the influx of [private][1], [independent][2] [schools][3] for learning how to [code][4] is any indication, the ever-growing [list][20] of [moocs][21], or the [financial][5] [smack][6] in the [face][7] is a tell-tale sign: software engineering as a career is having its 15 minutes of fame. Looking at the pace of its overall growth in terms of jobs and earnings, it’s not too far from [Moore's Law][8].

But in the context of history, software engineering is merely just going through its industrial phase compared to other engineering fields. There’s no revolutionary way to build a bridge or a highway; we’ve perfected the assembly line; making a guitar or violin is now more of an art than a science. 

<img class="displayed" src="{{ get_asset('images/SoS-writing-classes.png') }}" width="370" height="300")/> 

Yet we’re still [arguing][9] how best to [approach][10] software engineering problems and rapidly [developing][11] new [languages][12].

## Learning how to code in our industrial revolution 

A textbook and a classroom is fine for learning more established engineering fields like architecture or manufacturing, but with revolutionary pace of software development, how best should we teach its principles? A four-year degree doesn’t merely grant you “l33t” status, certainly not by [researchers’ standards][13]: 

<img class="displayed" src="{{ get_asset('images/SoS-10-years.png') }}" width="370" height="300")/> 

One predominant theme I am seeing is that gap from learning syntax to becoming a passable junior developer. You went through [Learn Python the Hard Way][18], uh, now what? Sure – a for-loop is easy to identify, to code when told exactly what to do, but that’s not real life.

There’s [plenty][14] of [debate][15] on [how][16] to go about [learning][17] how to code. One major underlying theme among what I’ve both read and experienced is the notion of [**concepts for granted**][16] versus [**concepts for context**][16]:
>We’re less likely to develop an advanced understanding of what we’re trying to master, than if we’re searching for an underlying meaning, trying to integrate the newly-learned concepts into what we already know.

Learning from lectures and textbooks only go so far. With typical formal education, one learns that certain computer science concepts exist, like how to compile and install an OS, go deeper into how compiling or installing works, or why a particular code base does not work. But it does not necessarily bridge outside of those concepts to understand its application or how the whole works together with its parts.

We need something to create those connections outside of those isolated concepts; to build ourselves context while learning; give personal meaning while striving for understanding as a whole. We [construct][14] our learning rather than simply listen and regurgitate what is taught. So how can we apply that to learning how to code? 

## Project-based learning

I started off blowing bubbles - I did take one course in computer science (after I graduated); I would have failed if it weren’t for my crappy little final [project](22) shadowing the fact that I couldn’t code.

But I love it – the cold, chilly, 3am night never looked better to me. But who wants to pay $2000 for a single course whose credit won’t necessarily apply towards anything. I was drowning while from being told "this is how we chlorinate the water" to "here are the hydrodynamic equations that your body must follow in order to swim fast".

So I ditched traditional academia and I’ve been learning to code through completing projects.  It’s been a self-directed study with motivation to actually do this for a living. It's paid off - within a year, I am now a software engineer at Red Hat. Granted I still choke on water every once and a while, but I took to the water myself after studying what others do, how they code, and teaching others.

## Learning through frustration

I've certainly belly flopped a few times.  I tend to find myself learning more through frustration than being simply told what or how to do it. It usually ends success but not without tears and wasted time. It may not be the best way to go about learning, but it certainly challenges me to push myself through the hard times; builds up my endurance for longer races.

<img class="displayed" src="{{ get_asset('images/SoS-frustration.png') }}" width="370" height="300")/> 

But I see myself in a good position to teach what I’ve learned - I'm no olympic swimmer, I still have those fresh, n00b eyes when trying to understand a code base. Yet when I try to explain it to someone else, concepts do solidify – teaching others gives that personal meaning and understanding since I want to create that context that builds that cumulative learning.

## Passing on the frustration

In a selfish effort to further my understanding, I am here to coach you with 5 swim lessons: I’ve written five tutorials – well, three are complete, the other two have been coded out and need tutorial language behind it. These are meant to build on each other and thread that “concepts for context” for the new guppy in the water, but also be digestible and not overwhelming.

The tutorials aim to pick up where introductory or outdated tutorials leave off with fun projects. You learn how to tread water by playing water polo, not by someone dictating to move your arms and legs back and forth. 

So each has a purpose and a set of goals, ends on how these projects are used in real life, and where to explore afterwards in case the new coder wants to learn more in depth.

There is some subtlety baked into these projects though. In particular, the language used and how topics are presented. I’ve written each tutorial with a set of side effects in mind – indirect learning – that eventually become the goals of future tutorials. So we play water polo for treading water, but it also builds endurance and strength indirectly.

<img class="displayed" src="{{ get_asset('images/SoS-knowledge.png') }}" width="370" height="300")/> 

I want guppies to learn by doing. We can't read how to swim. You have to feel the water against your hands to learn how to paddle through; you must accidently snort up water to learn how to breathe.

### defined goals

As the new coder dives into the tutorial, s/he will be exposed to what Pythonic means through learning how to construct proper import statements in the proper order, how to write legible docstrings and comments, the language’s keywords when exploring file I/O.

S/he will work with third-party packages to get a soft intro to what it means to interact with a RESTful API, how to parse the data returned from that API with different data structures. Terminology of object-oriented programming are introduced when instantiating classes and methods versus calling a function.

Each tutorial has the same goal of developing one’s logic in approaching a problem through organization, reading others’ code, debugging, testing, and logging.

I’ve tried to write these in a way that addresses any “stupid” or “naive” questions by using sidebars or gently introducing new terminology. The difference between docstrings and comments may be obvious to some people, but not all – especially when just starting out.

### If you’re curious

The constructive learning is exercised by using “if you're curious” side-bars. 

Of course you’re curious as a new coder! Just a bit of positive language to entice folks to read a bit more advance topics; to push their endurance.

As more advanced topics are introduced through these side-bars, they are not meant to pressure anyone reading through them - you can take a break to catch your breathe - but they are guided to find out more information if the new coder is wanting to dive deeper.  If a s/he skips or doesn’t understand fully, it’s fine – the tutorial can still be completed with full understanding of the goals, and the “curious” concepts will be explored again in future tutorials.

### In Action

Many times, we’re given a project in school, and we wonder, “What good is this? Is this even used in real life? am I ever going to compete in the state championships?” The application of a project is the pitfall for a lot of folks. It can be discouraging to learn how to swim without a realm to show off one's skills.
I include an “in action” conclusion with how each project is used in the industry now. These are not meaningless exercises to learn data structures or how to make a graph with matplotlib. These tutorials use the learning of data structures _to_ build tools that are being used in real life.


### Where to go from here
Lastly, one main critique for new coders is “where do I go from here” after completing how-tos and guides. I made it to state champs, is that all? 
It’s extremely difficult to learn what you need to learn, yet not know what _should_ be learned. To not burn out our new flying fish, each tutorial ends with guidance on where to go to from the end, including how to build upon what was just coded out, and resources on the topics covered.

## The tutorials

So what exactly are the tutorials? What are my lesson plans?

### DataViz

The first tutorial is data visualization. While creating some graphs and plotting on Google maps, the purpose is for the new coder to understand how to:

* run a Python file from the command line
* import a Python file
* take a raw file and parse its data with Python’s data structures

The side effects of working through the dataviz tutorial are:

* Importing Python’s standard library as well a self-written module
* Installing and importing third party packages
* Licensing & copyrights when using third-party packages
* File Input/Output, Iterators, and Generators with using Python’s keywords and built-in functions
* Global variables, docstrings, list comprehensions


### API

The second one uses the techniques from the dataviz tutorial to graph data grabbed from a public API. The project is to fetch video game platform information from [Giantbomb.com][gb], combine that with [CPI](http://research.stlouisfed.org/fred2/data/CPIAUCSL.txt) data to adjust the value of the US dollar over time and generate a bar chart to show the price development.

The goals :

* Solidify how to build a simple graph in matplotlib and file I/O
* Interact with a public API
* Intro to REST
* Parsing command line arguments


What else folks will be exposed to:

* Python 2 versus Python 3’s print keyword/function
* Logging
* Validating data

### Web scraping

The web scraping tutorial is meant to show folks are able to grab data without the use of an API.  The project builds a web scraper using [Scrapy](http://scrapy.org/) to scroll through [LivingSocial](http://www.livingsocial.com) and save local deals to Postgres. It also includes a quick how-to on cronjobs, so folks can run this script daily. So rather than getting those annoying emails, folks can query a database when they want a deal on sky diving or hot yoga.

The goals of this particular tutorial are to:

* Develop a more solid understanding of Python classes and inheritance
* Python’s generators & iterators
* Reading and writing to a database


The subtle concepts folks will be exposed to are:

* Using an ORM
* Import *
* Making a portable application

What’s great about this tutorial is that if folks have already gone through the Django tutorial, the models should be familiar, or would be a good primer for moving onto Django.

As a means of inspiration and to build a bit of personal context, the project finishes with a story of how one gal was able to continually scrape the London Olympics’ website in order to grab a ticket to the gymnastics final. 

Since [Scrapy][25] makes use of Twisted, it creates that familiar ground when moving onto the next tutorial.

### IRC bot

I just had to make a tutorial based off of [Twisted][23]. The project is actually based off of Jessamyn Smith’s IRC bot – the [talkbackbot][24], where if anyone would say “That’s what she said”, the bot would reply with a notable quote from a woman (that’s what she _really_ said!).

The purpose for the new coders is to:

* Get an intro to “how the internet works”
* Making a portable application
* Logging


while indirectly being exposed to:

* Event-driven programming
* IRC protocol
* Testing
* The antiquated means of communication that a lot of engineers use

Of course, software engineering is more than the internet. 

### Sudoku Game

The final tutorial walks new coders through building a GUI with a Sudoku game. With the least amount of hand-holding, the tutorial walks through how to build a game board as well as how to approach programming the logic that makes Sudoku.

The goals for new coders to take away are:

* Understanding Python’s vast standard library
* Drawing a custom GUI
* Approach logic challenges
* Testing


while indirectly being exposed to:

* try & excepts
* User-driven programming
* “private” methods


## newcoder.io

So because we’re in software engineering’s industrial revolution, we need to have a revolutionary way of learning how to code. 

<img class="displayed" src="{{ get_asset('images/SoS-lightbulb.png') }}" width="370" height="300")/> 

As the lifeguard and coach, I advise our Python guppies to not get discouraged.  The way we are learning to code leaves us on the edge of the pool expecting us to compete after reading a chapter on human hydrodynamics.  

Try out my swim lessons at **[newcoder.io](http://newcoder.io)** - give feedback, contribute, spread it around, and use it to teach others.

So please - don’t drown. Swim safe!



[1]: http://hackbright.com
[2]: http://hackerschool.com
[3]: http://www.appacademy.io
[4]: http://devbootcamp.com
[5]: http://www.bloomberg.com/news/2011-06-14/pandora-media-raises-234-9-million-in-ipo-after-pricing-stock-above-range.html
[6]: http://online.wsj.com/article/SB10001424052748704816604576333132239509622.html
[7]: http://stream.wsj.com/story/facebook-ipo/SS-2-9640/
[8]: http://en.wikipedia.org/wiki/Moore's_law "Moore's law"
[9]: http://www.youtube.com/watch?v=o9pEzgHorH0 "Write fewer classes"
[10]: http://lucumr.pocoo.org/2013/2/13/moar-classes/ "Write more classes"
[11]: http://docs.topazruby.com/en/latest/ "Topaz Ruby"
[12]: http://www.rust-lang.org/ "Rust Programming Language"
[13]: http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.100.9130 "Learning and teaching programming: A review and discussion"
[14]: http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.23.924 "Constructivism in Computer Science"
[15]: http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.92.4923 "Learning Programming by Solving Problems"
[16]: http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.96.6748 "Students learn cs in different ways. insights from an empirical study"
[17]: http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.60.5278 "Why Complicate Things? Introducing Programming in High School Using Python"
[18]: http://learnpythonthehardway.com "LPTHW"
[19]: http://diveintopython.net
[20]: http://www.mooc-list.com/
[21]: http://en.wikipedia.org/wiki/Massive_open_online_course
[22]: http://inflatr.com
[fred]: http://research.stlouisfed.org/fred2/
[gb]: http://www.giantbomb.com/api/
[23]: http://twistedmatrix.com/trac/
[24]: https://github.com/jessamynsmith/talkbackbot
[25]: http://www.scrapy.org
[pycon]: https://www.youtube.com/watch?v=5hBMlTFfOJg
[newcoder]: http://newcoder.io
[slides]: https://speakerdeck.com/pyconslides/sink-or-swim-5-life-jackets-to-throw-to-the-new-coder-by-lynn-root