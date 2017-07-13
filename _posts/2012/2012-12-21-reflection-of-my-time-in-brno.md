---
layout: post.html
title: "Reflection of my time in Brno"
tags: [programming, OpenShift, ruby, python]
category: [words]
---

I'm just returning to San Francisco from spending two months at [Red Hat Czech][map] in Brno, Czech Republic. It had its ups and downs, but most of all, I found it important and pivotal to my career as I develop into an engineer.

But I need to be honest: throughout 7 of the 8 weeks I spent in Brno, I felt completely and utterly lost. I struggle with the lack of guidance given, especially being brand new into engineering as a profession.  

My job for the next year is to integrate freeIPA into [OpenShift][OpenShift], followed by a few more prominent OSS projects. During my one-on-one phone calls with my manager, he says, literally, "You need to develop a deep understanding of the freeIPA project," and "You need to figure out what you don't know, and learn it," without any further guidance other than that I need to accomplish by end of February: to have a proof of concept of integration of IPA -> OpenShift.

In other words: 

<img class="displayed" src="{{ get_asset('images/reflection-brno/no_idea_dog.png')}}" title="I have no idea what I'm doing dog meme" alt="I have no idea what I'm doing dog meme"/>

### From email setup to patch submission in 8 days, then what?

I previously [wrote]( {{ get_url('words/from-email-setup-to-patch-submission-in-8-days')}} 'From email setup to patch submission in 8 days') about the progress I was making.  TL;DR - I submitted a patch in the first two weeks of working (mind you, it was immediately NACKed and a lesson was learned in testing).  But not much followed other than a handful of other patches. 

Sure, I learned bits of the IPA package in detail in regards to code and moving parts, and on the grand scale of how LDAP, DNS, AD trusts, Kerberos, Daemon, NTP, Certificate Authority, etc, all talk to each other and _why_ it makes freeIPA appealing to sys admins, developers, etc. But it was (and still is) excruciatingly difficult to develop an understanding of what parts need to be integrated, and when I need to take step back and learn the deep, dark corners of DNS, BIND, and Apache. 

Thank god for mentors outside of my team as well; stupid questions about the Python language, like "Isn't it bad to have import *? Why?" were met with impatience at work. That's not to say my team mates weren't helpful; I had many ELI5 moments with them.

### My Expectations

I had this idea in my head that I would write more than ~15-20 lines of code for the IPA project. Correction: I assumed I'd write more _Python_ code during this time here in Brno. I wanted to learn how to write good code, the design pattern of the project, maybe write a test or two.

### What I learned

What I actually ended up learning was the overall Linux file system (naturally), Vim, git, the process of submitting patches for review, public versus private errors, virtual machines (and the many ways to break them), and git blame, [git reset HEAD@{1 hour ago}][git1], and [git-by-a-bus][git2]. 

Other things I'm sure some take for granted like iptables, key-bindings & keyboard shortcuts (using those make me feel like a baller), vimrc, simple bash commands & scripting, and the like.

And yes, I also learned a bit of Ruby. To be honest, I've written more Ruby code for OpenShift than Python code for freeIPA. I've started to make a list of grievances of the Ruby language when coming from Python. #snark

I also learned the structure of OpenShift - the two Apache servers it uses, the broken installation scripts, the larger picture of what of freeIPA needs to be integrated where.

### What I need to learn

I still have a ways to go in learning to program in Ruby, but it's understandably easier when I have an okay grasp on programming in Python.

Apache is still a black hole to me, but I've begun to understand what pieces need to be added to OpenShift.

I also have no freaking clue how _exactly_ to integrate a project that's written in Python into a Ruby-based project.

I also need to develop a better understanding of GSSAPI (supposedly an implementation of an API, written in Python, Ruby, whatever, that appropriately talks to Kerberos, written in C). This understanding will needed for when the DNS dynamically updates hosts (through nsupdate) and there needs to be a Kerberos-based authentication handshake.

### What troubles me

This task I am meant to do is complex; it's not an application where I can go bug my dev friends for the best library or approach. These are two different projects where the integration happens at a level that folks have experience in either but not both. *I* am the integration point; *I* am supposed to have an understanding of these two systems, how they differ and compare in setup. This requires a deep understanding of how the internet works, of Linux systems, and of security implementations, among other things that I can't even conceive of right now.

What scares the sh!t out of me is that there is no one that knows how to do this better than me. #wat 

The fear of failure has never been stronger, but it is a great motivator.


[map]: https://maps.google.com/maps?q=red+hat+czech&ll=49.226623,16.581266&spn=0.007875,0.017424&hq=red+hat+czech&t=m&z=16&iwloc=A "Red Hat Czech"
[OpenShift]: http://openshift.rhc.com "OpenShift"
[git1]: http://andyjeffries.co.uk/articles/25-tips-for-intermediate-git-users "Tips for intermediate git users"
[git2]: https://github.com/tomheon/git_by_a_bus "Git by a Bus"
