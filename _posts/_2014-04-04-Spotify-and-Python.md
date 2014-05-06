---
title: "DRAFT: Spotify & Python"
layout: post.html
tags: [spotify, python, features]
category: [talks, words]
url: /spotify-and-python/
date: April 4th, 2014
---

I just gave this as a talk at [Great Wide Open Conference][gwo] in Atlanta, Georgia on April 3rd, 2014.  This blog post is meant to be the accompaniment to the talk; video to follow, slides are [here][slides].

The title of the talk was “Python for the Enterprise”, which was proposed to me when invited to speak.  Sure! I said, but it was more from the point of view of a general company, rather than whatever you may associate with the word “Enterprise” (to me, I think of Red Hat :)).

This <span style="text-decoration:line-through;">talk</span> post practically wrote itself.  I was approached to talk about [Spotify][spotdev], for whom I love working, and Python, in which I love writing, and how Spotify uses Python.  I can't think of a better topic — to convince you why Python is awesome for a company.

I’ll give a short intro on Spotify, as well as Python, to bring everyone up to speed.  I’ll then discuss why we chose Python, and how/where we use the language, as well as issues we’ve faced.  I’ll wrap up with Spotify’s future with Python, and Python’s future as a language.

### About Spotify

[Spotify][spot] is a streaming music service that is available in [55 countries][countrylist] — and continually working to expand to “[Play Everywhere][playeverywhere]”.  Beta launched in 2007, and in [2011 it came to the US][uslaunch].  [As of writing of this post][stats], we have over 6 million paid subscribers, with 24 million monthly active users.  We have over 20 million unique songs — not including compilation albums and such.  We also pay 70-80% of our income to rights holders, totaling $1 billion dollars to date.

From a technical standpoint, we have about 4.5 terabytes of compressed data from users per day, and 400 gigabytes of data generated from services per day.  64 terabytes of data is generated every day by our 590-node Hadoop cluster.  We run about 7,500 Hadoop jobs per day, with it ever growing.  Just a few months ago, we were running 5,000 jobs per day.

### About Python

Shifting gears to Python.  Python is about 23 years old created by a Dutch dude named Guido van Rossum.  Latest versions are both 2.7.6 and 3.4.0 — those unfamiliar with Python may wonder why there are two latest releases — of which I’ll go over a little later.  Python is dynamically typed and has automatic memory management.  While it’s mostly considered a scripting language, it’s very prevalent in web development, networking, scientific computing, database management, 2 & 3D animation, natural language processing, info sec, artificial intelligent — not much left in terms of software engineering besides lower level software engineering like writing kernels and drivers.

The big items about Python are that scope is defined by whitespace — no semicolons or brackets giving a code base very “breathable”.  Folks that contribute to the core of Python often prefer readability of code rather than minor optimization.  

Python is also cross-platform — granted setting up a Windows machine for Python development can be a bit of a pain.  But major Linux flavors and Mac OS ship with Python on their systems.  

Python also has a few popular implementations, with more still in development.  The main one being CPython that is implemented in C — which is the one shipped with Linux & OS X.  There is also [PyPy][pypy], Python implemented in Python — which has proven to be faster than CPython with various tests, [including Twisted][twistedpypy], one of the most popular networking library.  There’s [Jython][jython] — which compiles into Java byte code, and [IronPython][ironpython], for the .NET runtime.

So that’s essentially the TL;DR of the language, but really quickly I just want to mention a few of my favorite things with Python.  

The language has some “sugar” baked in — one of my most loved is list & generator comprehensions, where one can condense a for-loop into a one-liner.  For example (inspired from the [Python wiki][wiki]):

```python
# for-loop

new_list = []
for word in old_list:
    new_list.append(word.upper())

# list comprehension
new_list = [w.upper() for w in old_list]

# generator comprehension
new_set = (w.upper() for w in old_list)
```

[SimpleHTTPServer][simplehttpserver] is one of my favorite tools from the standard library.  Need a quick server? Run `python -m SimpleHTTPServer`!  Super awesome for testing, debugging, or simply viewing your web site locally.

Another popular one that I use a lot is the [CSV][csv] module — allows for easy handling of comma-delimited files like `.xls` and `.csv`. 

There’s also a library that I should use more but is quite awesome — [profile][profile] (along with others) where you can profile a Python file to understand how it consumes OS resources.  One that complements profile is [timeit][timeit] to understand the time execution of some Python code.   Lastly, there’s [pdb][pdb] — the interactive debugger that is great tool <span style="text-decoration:line-through;">instead of flooding your codebase with print statements</span> to get in the habit of using regularly.

IPython notebook is sort of beyond words.  [IPython][ipython] is a different Python shell that is more interactive than the standard.  The [notebook][ipythonnotebook] is pretty awesome — it’s a web based interactive computational environment where you can execute code (Python _and_ Bash), write in Markdown, create graphs, and make slides.  It’s pretty fantastic because I could make a notebook, give it to you, and you can go ahead and run it in your own environment.  The web server runs locally, but you can host the notebook on a server and share with others.

Lastly, a few of my favorite & frequently-used 3rd party packages:

[Scapy][scapy] is basically tcpdump or Wireshark in Python — it allows you to sniff internet traffic and manipulate packets.  Not condoning this, but it’s pretty fun to play with scapy at a cafe with public wifi.  

[requests][requests] is another popular 3rd party package — it’s pitched as “HTTP for Humans”, as the url lib from the standard library isn’t too fun to work with.  It provides tools to not only get/post data, manipulate headers, etc, it also allows for authentication like OAuth, Kerberos, among others.  

Another popular library, and one of my favorites for quick development is [Flask][flask] — a micro web framework.  It’s easily extensible — both with more third party packages, or you can write your own pretty simply.   

Another package — and unfortunately I don’t get a lot of opportunities to work with it, but [NetworkX][networkx] is a great library for creating graph visualizations with simple ways to create edges and nodes.

Lastly — Twisted.  [Twisted][twisted] is a beast of a project but is a fantastic event-driven networking library.  What I like about Twisted is the core dev team is super smart; working with them really improves my code quality.  It also has a lot of goodies — you can easily create an IRC client and server, a DNS server, mail server, web server, a lot of great stuff.  

### How Spotify Uses Python

Way back when Spotify started in 2006, we implemented about 80% of everything that is Spotify in Python.  We chose the language because of its standard library & the 3rd party package ecosystem, because of its community, as well as it being fast where it counts.

#### Libraries & Packages

So first, looking at Python’s standard libraries — it’s pretty damn comprehensive.  It has many tools to interact with different protocols and data formats, ways to interact with the OS processes and sockets, data persistence with SQLite, easily create zip, gzip files, tar balls, and work with file input/output.  There are also modules for development like unit testing and doc testing, as well as logging, command line argument and option parsing.  Just take a look at it [all][all].

There’s also [PyPI][pypi], which is the Python Packaging Index, where folks upload packages/modules that they’ve developed for others to download and use.  To download packages, the “python” way is via [`pip`][pip] — stands for “python install python” — where on the command line you can run `pip install $packagename`, similar to `gem install` for Ruby.  For those familiar with easy_install, pip is its replacement.   

There are over 38,000 packages on PyPI, including packages for networking like [Gevent][gevent] and [Twisted][twistedpypi], web frameworks like [Django][django], [Flask][flaskpypi], and [Pyramid][pyramid], there are many other test frameworks and documentation tools. There are so many awesome packages, and the fact that one can install via the command line makes life a lot easier.

So what packages does Spotify use?  Definitely all of the listed above — I’ll mention what exactly in a little bit.  We also have are own internal [PyPI server][spotifypypi] so we can package Spotify-specific python packages for our Debian systems that easily hooks into our build system. We’re thinking of someday moving to [devpi][devpi] for our PyPI server. Someday.

#### Community

Another reason we elected to develop Spotify in Python is its community.  I mentioned PyPI before, the packaging index.  Pretty much, there’s a package for anything you could possibly imagine on PyPI.  The community also is very good at maintaining these packages, and if a package dies or is no longer being developed on, many times someone will take over maintenance and development, or make a substitute.

When Spotify was deciding whether to write code in Python or Ruby, we chose Python because of its documentation.  Back in 2006/2007, much of the Ruby’s documentation didn’t exist — you had to read the source code, which can be difficult and/or time consuming.  As well, any docs that were available was in Japanese.  

Looking at the Python community, it puts a lot of importance on documentation (and in English! with lots of internationalization movements!).  We even have a very popular documentation [conference][wtdconf] based on [Read the Docs][rtd], which hosts documentation for free built with [Sphinx][sphinx], which is also a documentation package originally written for Python.  Note that it’s a bit “shunned upon” to release a package without docs on how to install and work with said package. 

Lastly, the community embraces the “zen” of Python, which basically means: 

> Beautiful is better than ugly
> Explicit is better than implicit
> Simple is better than complex
> Complex is better than complicated
> Readability counts

To describe Python code as clever is _not_ a compliment.  The [Zen of Python][zen] essentially defines what it means to be Pythonic.  And so sure, there may be many ways approach solving a problem with Python, but unlike Perl where “there is more than one way to do it”, Python strives for one and only way — hopefully an obvious way.  

This Zen of Python really helps the development process — if the community naturally embraces being Pythonic, then code that we use from the standard library and from third-party packages will be readable and understandable, and therefore our _own_ code will be just that.  This “zen” is pretty important to the development process, which is a part of the next reason we chose Python.

#### Fast where it Counts

So where the Zen of Python comes into play for the “fast where it counts” is both during development time and code reviews.  Since being Pythonic and the embracing the Zen of Python is heavily engrained in the community, it contributes to very readable code.  Code reviews are then quicker since it’s easier to read — nothing too clever or obfuscatory.  The whitespace also helps — while its purpose is to define scope, it lends to very readable code since there is not a lot of syntax in the way.

As a Python developer, I physically write less code than if I were to code in another language such as C.  To not have to write such verbose code, not having to implement personal libraries for string manipulation, to quickly code out an idea within a few hours — that makes me a happy and productive developer.  

Developing in Python is in itself fast.  The startup time is instant — there’s no time wasted on starting up a VM, or compile time.  The minutes saved during debugging, testing, etc. really adds up.   Python is not edit-compile-link-execute-break-debug like C is.  Python is just edit & debug, forgoing lots of steps to develop something that works.

For a company, all that time saved is vital: the quicker code reviews, the physically writing less code, the start up time — it really augments the development cycle.  To get the initial viable product out the door so one can iterate over it is important.  The quicker you can iterate and improve upon a product, the higher probability the product will be successful.

Lastly, many folks like to argue that Python is physically not fast — and that argument needs to be taken into context.  CPython, the most popular implementation of Python, _is_ slow for CPU-bound tasks (a side note: PyPy, another Python implementation, [is much faster in this regard][pypycpython]).  This is because of the [global interpreter lock][gil].  Python’s memory management is not exactly thread-safe, so the GIL is required to prevent multiple threads running the same Python code at once.  Before you write off Python for being too slow, you really have to have a deep understanding of the GIL (which I do not, but [this dude][knupp] does), how it affects your application, how many cores you have, and where your application bottlenecks.  For Spotify, we are far more I/O bound versus CPU-bound.  We’re not writing software that does heavy computations like cryptography; a lot more is reading/writing to sockets, databases, that sort of thing.  And plus — machines are uber cheap, essentially eliminating any CPU-bound issues for us.

### Where Spotify uses Python

So where exactly do we use Python?  When Spotify began, about 80% of the codebase was Python.  Lately, it’s closer to 50% Python, 50% Java for our backend services.

But there are still a lot of services written in Python at Spotify, including the account creation and login system; our social system; payments uses a lot of Flask and Python in general; and all of our analytics jobs are in Python.  

We’ve written our own daemon and request handler in Python; our build scripts are in Python, and as I mentioned earlier, we have an internal PyPI that allows us to pip install Spotify-specific Python packages, or any backports we need from the regular PyPI.  

My latest projects are in Python, including an internally-released interactive API console to test out sample API calls, as well as a new API endpoint for interacting with our social graph that is currently in progress.  It’s definitely a Python developer’s paradise from my PoV.

### What Spotify uses

A big difference that we see when talking to other Python shops is we get the question, “so what are you using, Django, turbogears?” when that question is more for web dev shops.  And back in 2006, it was certainly different or odd to be using Python for something other than serving web pages.  

Spotify _does_ use many 3rd party packages, both popular and not-so, some for internal projects and processes, some that are client facing.  Some popular web frameworks for apps we’ve built use [Django][djangosite], [Pyramid][pyramid], and [Flask][flask].  We did start with [Twisted][twisted], and we still have some Twisted code, but we predominantly use [gevent][geventsite] for networking, as well as [Celery][celery] for task management.  [requests][requests] is a favorite internally for simple stuff.  We heavily use [SQLAlchemy][sqla] for database ORMs.   The label record companies give us metadata in the form of XML, which we parse with the [lxml][lxml] library.  There’s a Python wrapper for [Zookeeper][zookeeper] called [Kazoo][kazoo], allowing us to orchestrate loading music metadata indices to over 200 production servers.

### How we’ve given back

Spotify “takes” a lot — Python is open source, there are no fees to use the language.  But Python and its packages being open source (released under a [GPL-compatible license][license]) means that one can “take” from the community without giving back pretty easily.  Spotify is very appreciative of the Python community so we’ve given back in a few ways.

We’ve open sourced a few libraries, including [Luigi][luigi] and [Snakebite][snakebite] — both very popular for working with Hadoop and general complex pipelines of batch jobs.  We’ve also recently released [dh-virtualenv][dhv], which allows you to build a Debian package that essentially runs in a virtual environment.  It will pip install python packages that are required for running and create a nice deb package.  This is especially nice if Debian does not have your desired python packages bundled up in apt.

We’ve also submitted patches to one of our most widely used package — Gevent.  We also have a few folks that contribute to CPython itself.  Of course, there’s always more we can do, always more we can open source and contribute back.

Lastly — and one of the main reasons I joined Spotify — is their commitment to diversity.  Before I started there, the folks in Stockholm invited me up to host a [PyLadies][pyl] workshop.  They wanted to get a local PyLadies chapter started, and since then, [it has been very successful][pylsto].  My team in SF is especially enthusiastic, always happy to host the local chapter, as well as join as mentors for workshops.  

Spotify doesn’t limit their diversity efforts to just the Python community — we’ve started conversations to implement a Code of Conduct required for any meetup or conference the company sponsors.  We’ve also contributed to other tech diversity movements like Rails Girls.

So Python has served us very well, and we’ve tried to give back to its community to help it grow.

### Not All Sunshine and Rainbows

But Spotify and Python is not without its issues.

#### Issues Spotify has Faced with Python

First off — while the community is big, there are a number of tools not publicly available that would address our needs.  As I mentioned earlier, we wrote our own daemon, and our own request handler because the popular frameworks out there have too much — we don’t need batteries included.  

We also have very specific and unique problems to solve, so we tend to write our own packages.  This is starting to bleed into other packages that are already publicly available, like an HTTP client.  We have our own — partly because every library is missing something whether it be the ability to chunk requests or timeouts don’t work properly, and partly because we have this “not invented here” syndrome after building a lot of homegrown solutions.  

Spotify actually started with Twisted rather than gevent — and folks found it very difficult to “twistify” their applications and services.  We found that Twisted and Postgres did not want to play nicely either.  So we moved to gevent, but that wasn’t a panacea either.  memcache and our gevent setup does not work well together.

We also use Debian packages for *everything*.  Before dh-virtualenv handling installation of Python packages from PyPI for a Debian package, we either had to backport the library that we wanted to Debian, or grab the code itself to use in our own projects.  

So yes, now we have [dh-virtualenv][dhv] — which literally just became available about six months ago — but it doesn’t solve everything.  We are able to pip install packages when building a Debian package from either our internal PyPI server or the regular PyPI, but — scarily enough — we don’t review the code that we grab from third parties.  The way that the main PyPI (the pypi.python.org one) is setup, anyone can upload packages, and there are no security reviews.  So theoretically, we (and anyone who uses pip to install from non-vetted PyPI servers) could install a malicious Python package within our Debian package, and deploy it to our servers.  :-!   Yes, developers have the option to upload their PGP keys to their accounts in PyPI, but that just proves identity, not necessarily the safety of their packages.  This is more of an Python packaging ecosystem issue, not just a Spotify-specific issue. This is an issue for the Ruby community and other languages as well.


#### Issues Python Faces

Python is not a perfect language as well — and in my point of view, there are three main issues Python the language and its developers face.

##### The Great Debate: Python 2 versus 3

Earlier, I mentioned that there are two latest releases of Python, 2.7.6 and 3.4.0.  Most folks coming into Python think, “oh, I’ll just get the latest release”.  This is problematic in a few ways.

Except for Windows, downloading and setting up Python 3 can create issues because the major Linux flavors like Ubuntu, Debian, Fedora, as well as Mac OS X _already_ have Python installed — but it’s Python 2.

So as folks gets started, they think they may be running their Python programs in 3 when `python myprogram.py` will pull up the system python (unless folks know what they’re doing and symlink `python` to Python 3. But even then, whichever programs or scripts your system runs with Python may break since version 3 is not backwards compatible with 2).  Properly setting up one’s system for both versions is definitely not beginner-friendly.

Many big projects are compatible for Python 3, but many of the smaller, less popular, and non-web development-related packages are not. I’m sure many developers can relate to having a project or five depend on some obscure package. This can influence the adaptation of Python 3 for a non-web dev type of company like Spotify.

Beyond that, Python 3 adaptation is slacking.  A lot of packages are being made compatible for Python 3, but not a lot of development is targeted to 3.  There’s also no big company running 3 in production, or not publicly saying so.  Spotify is sort of waiting to see someone do exactly that before we take the plunge.  There also hasn’t been fast adoption to 3 because there are no “big ticket” features like the removing the GIL; folks see no benefit in upgrading that would outweigh the cost of migrating, as [Alex Gaynor pointed out][alex].

And for Spotify, as well as I’m sure a lot of other folks, our servers run Debian stable, which means Python 2.6.  Having Debian or Red Hat, Fedora, Ubuntu ship Python 3 would also be a big boost.  I know that Red Hat-flavored Linux and Ubuntu recently released parallel support, but again, there’s no huge benefit in upgrading to Python 3, at least for us, so even if it is supported, that isn’t removing a blocking factor.

##### The GIL

I previously mentioned CPU-bound performance versus I/O bound — which has to do with the Global Interpreter Lock.  The GIL allows Python programs to be threadsafe, allowing only one thread to be executed at a time.  Multithreading often doesn’t work to improve performance, and often actually degrades a program’s speed.  The GIL is actually one of Python’s hardest problems™ — it’s very difficult to understand thoroughly, and one needs a deep understanding in order to optimize an application where the GIL is the bottleneck.  It’s also not trivial to remove from the CPython implementation.  But the GIL may be a good thing — using multiple processes instead of multiple threads is far easier to develop and debug, and is in general a safer concurrency model. 

##### Python on Windows

Lastly — and a personal issue that I face a lot — is Python on Windows.  Granted, spin up a Linux VMs for Python development, but developing on a VM is not ideal since it often slows down your computer, as well as it’s a pain to properly setup networking when your on your corporate VPN. 

So, sure — it’s not that hard to download Python on a Windows machine.  But there are many hurdles to get your Windows system setup properly for Python development.  [virtualenv][venv] — a popular python tool that allows one to contain libraries and Python versions from clashing with multiple projects — and [virtualenvwrapper][venvw], a nice little command line wrapper around virtualenv — is very difficult to properly setup with Windows.  Of all the workshops I’ve hosted for PyLadies, Windows users take the longest time to setup for development (there are indeed other ways to setup a Windows or otherwise unruly *nix-like machine for a beginner’s workshop, but I’ve always tried to set folks up the right way™ .  

There are many Python packages that have C extensions.  How do you compile the C extensions on Windows?  Welp, you have to download a C compiler for Windows.  What about running from the command line? Wait — Windows doesn’t have a *nix-like command line! Better download a CLI tool for Windows.  Windows is great for development using Visual Studio IDE — but Visual Studio only has built in support for C/C++, C#, .NET, Visual Basic, and the like.  Time to download another tool to use Visual Studio & Python!  Other languages have these issues too, like Ruby, and git.  

Python development and packaging tends to focus on *nix-like machines.  The fact that OSX and Linux ships with Python makes it quite easy to setup the development environment.  The OS package managers like apt-get and brew make it very easy to install packages specific to your OS flavor, version, and architecture, something that Windows lacks.  Setup is just not as easy as `apt-get install` or `brew install`.

### Looking Forward

So what’s the future for Spotify & Python?  

Well — we’ve decided to move (someday...) from Debian stable to Ubuntu, which will allow us to revisit Python 3 support.  Some folks are already writing their Python code to be Python 3 compatible.  

As I mentioned earlier, lately about 50% of our backend services are in Python, with the other 50% Java.  This is pretty much because there’s no “corporate mandate” that we must write everything in Python — that teams and squads can choose whatever language & tools they want.  And related to that — it’s been difficult to find good Python programmers™ so we started hiring Java programmers, which has been having a noticeable impact on the tools we select (side note — we're [hiring][hiring]).

Lastly, we’re hoping to include Python into our desktop client.  Right now, it’s written in C++, but it’d be nice to use Python for the business logic with C++ for the graphics/GUI elements.

I hope the talk I gave and this accompanying post helps give some perspective to our choices, and highlights Python’s features for product/project/processes development.


[gwo]: http://greatwideopen.org
[slides]: http://rogue.ly/pfte
[spotdev]: https://developer.spotify.com/
[spot]: https://www.spotify.com
[countrylist]: https://support.spotify.com/us/learn-more/faq/#!/article/Availability-in-overseas-territories
[playeverywhere]: http://
[uslaunch]: http://news.spotify.com/us/2011/07/14/hello-america-spotify-here/
[stats]: http://press.spotify.com/us/information/
[pypy]: http://pypy.org
[jython]: http://www.jython.org
[ironpython]: http://ironpython.net
[wiki]: https://wiki.python.org/moin/PythonSpeed/PerformanceTips
[simplehttpserver]: https://docs.python.org/2/library/simplehttpserver.html
[csv]: https://docs.python.org/2/library/csv.html
[profile]: https://docs.python.org/2/library/profile.html
[timeit]: https://docs.python.org/2/library/timeit.html
[pdb]: https://docs.python.org/2/library/pdb.html
[ipython]: http://ipython.org/
[ipythonnotebook]: http://ipython.org/notebook.html
[scapy]: http://www.secdev.org/projects/scapy/
[requests]: http://docs.python-requests.org/en/latest/
[flask]: http://flask.pocoo.org/
[networkx]: http://networkx.github.io/
[twisted]: http://twistedmatrix.com
[all]: https://docs.python.org/2/library/
[pypi]: https://pypi.python.org
[pip]: http://www.pip-installer.org/en/latest/
[gevent]: https://pypi.python.org/pypi/gevent/1.0
[twistedpypi]: https://pypi.python.org/pypi/Twisted/13.2.0
[django]: https://pypi.python.org/pypi/Django/1.6.2
[flaskpypi]: https://pypi.python.org/pypi/Flask/0.10.1
[pyramid]: https://pypi.python.org/pypi/pyramid/1.5b1
[devpi]: http://doc.devpi.net/latest/
[spotifypypi]: https://pypi.python.org/pypi/pypiserver
[wtdconf]: http://conf.writethedocs.org/
[rtd]: https://readthedocs.org
[sphinx]: https://sphinx-doc.org
[zen]: http:
[gil]: http:
[knupp]: http:
[pyramid]: http:
[djangosite]: http:
[sqla]: http:
[lxml]: http:
[zookeeper]: http:
[kazoo]: http:
[license]: http:
[luigi]: http:
[snakebite]: http:
[dhv]: https://github.com/spotify
[pyl]: http://www.pyladies.com
[pylsto]: http:
[hiring]: http:
[twistedpypy]: http:
[pypycpython]: http:
[geventsite]: http:
[celery]: http:
[alex]: http:
[venv]: http:
[venvw]: http: