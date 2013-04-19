---
layout: post.html
title: "Avoid Drowning: Swim your way through a new code base"
tags: [n00b, engineering, presentation]
category: [words]
---
A month or two ago, I signed up for a lightning talk for [today's][wwc] Women Who Code event. I didn't submit a title - I was more, "sure, I could talk!"

Only on Tuesday did I find out I was actually on the bill to speak! Welp, here's a just-in-time presentation. My slides are [here][slides] - but basically this post flows through what's presented on.

## My experience
---
Coming back from Brno, and having just started a new engineering position, I feel like I knew this topic well: how to swim your way through a new code base. There may be other/better advice, but this was my take away from my first three months at Red Hat.


## N![no_diving]({{ get_asset("/images/no_diving_small.png")}} )  Diving!
---
You might feel inclined to jump into the code base. FFS you're a coder! Why wouldn't you want to jump in?

As most lifeguards might say of pools with shallow depths: you'll break your neck and drown.

Let's take a more holistic approach - I'll walk you through how I am fumbling through getting to know two (!) code bases with questions I asked myself. Mind you, not all these questions are relevant to your situation; it all depends on your code base, naturally.


## T![droplet]({{ get_asset("/images/droplets_small.png")}} )  p-down approach
---
### Overview
- What is the purpose of this project or product?
- What problems does it solve for its target audience?
- What are its overall strengths and weaknesses; its selling points?
- What competitive projects or products are out there?


### Architecture
- What major components make up the code base?
- How do they all fit together?
- How do they communicate with each other?


### Break it apart
- What's this component or chunk's purpose?
- What problem does it solve for this project?
- Strength & weaknesses of this chunk or component?
- How does it fit with another chunk(s)?


## Lather, rinse, repe![repeat]({{ get_asset("/images/repeat_small.png")}} )t.
---
Continue on until you drill down to the very lowest component, the lowest before you hit the code to answer your questions.

You should be reviewing documentation and architecture diagrams & walk-throughs, talking to the architect of the product/project, and your team mates.


## Go with the ![flow]({{ get_asset("/images/fish_small.png")}} ) flow ![flow]({{ get_asset("/images/fish_small.png")}} )
---
Now it's time to figure out the flow of the project or product.

### User
- Who is the target audience? Other developers, IT professionals, non-tech folks?
- How is this project used?
- What is the learning curve for the user?

### Sys Admin
- How are users set up?
- How is it maintained, updated, upgraded, supported, etc?
- How does it work with the existing systems?

### Your Manager
- What are the goals of the project? Future feature implementations? Direction that this product is going?
- What are the release cycles or pressure dates?
- What other teams do you need to work with? QE? Support? Other complementary/necessary projects/products?

### Developer (YOU)
- How do you submit and fix a bug?
- How is the code tested?
- Who are the go-to people for certain aspects of the project?


## Ease in  ![ease]({{ get_asset("/images/ease_in_small.png")}} )  the water's a bit cold
---
Alright - git pull that code.

### File Hierarchy
* Top-down approach again: how is this project organized? What files/modules depend on what? 
* How does the file structure match up with the architecture you saw earlier?
* Where is the documentation (both for developer and user/admin)? The source code/moving parts? The test suite? (Who tests the tests!?)
* What modules are used? Look what's being used from the language's standard library, the modules defined in the package itself, and third-party packages.


### Dependencies
* What are the operating system requirements? Hardware reqs?
* Software requirements: is there an assumption that users have the default database needed? Or other libraries already on your machine?
* What are the build requirements for the project?


### Swim floaties (remember those things around your arms?!)
* '`$ git log`'  for commit logs (watch out - it could go back years). Check out git's pretty print documentation for more readable output.
* '`$ git blame`' is, of course, a great tool. Include -L flag for to/from line numbers, and -e flag to see emails of the contributors.
* [git-by-a-bus][git] is a great tool goes through the logs of the code and gives you html to visually see who are the biggest contributors to which parts of the library. Highly recommend.


### Challenge yourself
* Write up documentation that's missing.
* Fix a bug & submit a patch. This really forces you to understand the code, how it was written, conventions of the project, and how small pieces fit together.
* Write more tests to increase test coverage.


## Lifes![life]({{ get_asset("/images/life_preserver_small.png")}} )vers
---
### Mentors
* Find an internal mentor to bug about package/product questions. It may be your lead, or someone who's been there for a while.
* An external mentor is great to have too - perhaps you have a language question and you don't want to look stupid in front of your coworkers.  It's also great to get a different point of view for how the development process works elsewhere.
* Your manager - yep, s/he is by default a mentor, whether good or bad, or absent. Learn how to manage up if you're not getting what you need at first. Avoid detailed questions and ask bigger questions like "how is my approach in this?", or "am I learning at an acceptable speed?"


### Research
* I highly recommend keeping a personal/private wiki as you learn new terms, processes, etc.
* Also - a bookmarking service that helps you organize your research for quick retrieval (I recommend [Pinboard][Pinboard]).
* Old fashioned post-its, whiteboarding, paper+pen, anything. Physically writing down a piece of information (typically architecture diagrams) helped me solidify concepts better.


### Suggested Reading

* [The Pragmatic Programmer][Prag]
* A language-specific cookbook (keep near your work computer)
* [The New Programmer's Survival Manual][Manual]
* [The Developer's Code: What Real Programmers Do][Code]



## Swim safely! ![scuba]({{ get_asset("/images/scuba_small.png")}} )

<br />

[wwc]: http://www.meetup.com/Women-Who-Code-SF/events/93965402/ "WWC Lightning Talk Event"
[slides]: http://www.slideshare.net/roguelynn/avoid-drowning
[git]: http://dev.hubspot.com/blog/bid/57694/Git-by-a-Bus "Git By a bus"
[pinboard]: http://pinboard.in "Pinboard"
[Prag]: http://pragprog.com/book/tpp/the-pragmatic-programmer "The Pragmatic Programmer"
[Manual]: http://pragprog.com/book/jcdeg/new-programmer-s-survival-manual "New Programmer's Survival Manual"
[Code]: http://pragprog.com/book/kcdc/the-developer-s-code "Developer's Code"