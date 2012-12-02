---
layout: post.html
title: 'From email setup to patch submission in 8 days.'
tags: [python, programming]
---

Hellz yea, I'm a freaking engineer (sounds more hilarious in my head then it reads). Now who the hell wouldn't want to be an engineer? Fellow PyLady, Julia Grace, [asked][JuliaG] about my expectations of being an engineer versus what I actually experienced.  Here's the basic run down: 

#### TL;DR: It's awesome.

#### Asked advice from Systers & DevChix Mailing List 
(exact quotes, but leaving anonymous):

<ul>
<li> Curiosity will keep you from becoming one of the 'not my job' people.</li>
<li>  Remember that a lot of engineers don't have the best people skills so some 'rude' people are that way unintentionally.</li>
<li>  If they dont answer questions, it is most likely because they dont know the answers.</li>
<li> Build relationships if possible. Never miss a happy hour type of thing.</li>
<li> "Where did you learn that?" is an interesting question
<li>  Figure out the ways in which you like to work- and others like to work- first.</li>
<li>  Many guys truly don't think that women can or should be coding as equals.</li>
<li>  At least 89% of the time, by the time I have really defined my question, I have figured out the answer.</li>
</ul>

#### Expectations and Preformed Thoughts & Concerns: 

<ul>
<li>  I would have to wind down my community engagements to an 'acceptable' level, e.g. only x amount of non-Red Hat related conferences.</li>
<li>  Thrown into code to fix a bug/patch/whatever
<li>  Spend wayyyy too much time thinking over a trivial aspect of said bug/patch/whatever.</li>
<li>  Many naive questions from me, met with a poor/mean/unadjusted attitude, or worse, lack of any sort of emotional response (I'd rather -know- I annoy you than wonder if you loathe my questions).</li>
<li>  I'd be restricted from doing certain things; "when you're ready for it" aka "when I'm ready to give this piece of my job up and move on to something better."</li>
</ul>

#### I set expectations for *myself* too:
<ul>
<li>  Learn this shit fast.</li>
<li>  Be awesome.</li>
<li>  Make a 'mark' of myself (in terms of fixing bugs, finding errors in code or optimizing, helping users of the project, etc).</li>
<li>  Learn faster than what is thrown at me.</li>
<li>  Submit a patch by the end of the 3rd week (end of the 1st full week in Brno).</li>
<li>  Maintain awesomeness.</li>
</ul>

#### How the first few weeks actually went:
<ul>
<li>  Crash course on LDAP & Kerberos, how to create VMs both on my local machine and on remote servers (I feel dangerous now).</li>
<li>  My last name _is_ awesome.  However, sometimes I misread my terminal prompt:</li></ul>
<code>

	[lroot @ remote-server] $ vim /accessible/by/root.conf
	Must be root to setup this server!
	/me what? I thought I...oh damn
</code>
<ul>
<li>  Learning Linux machines like woah.</li>
<li>  Sometimes just restarting does work.</li>
<li>  Have achieved new levels of git-fu. (git rebase, squash & reflog are a n00b's best tools)</li>
<li>  Realized Macs are only popular for their GUIs and Aluminum casing (not giving mine up anytime soon, though)</li>
<li>  These folks have a lot of patience for someone just learning like me.  Very comforting.</li>
<li>  People don't need free meals/fish deliveries/spousal salaries upon death to be happy to work somewhere.</li>
<li>  It is SO freaking nice not to worry about being in the office during the same time as your manager (precious 'face time'); clocking every minute of every hour that has any relation to work.</li>
<li>  Engineers are so relaxed and fun to work with. I feel no pressure, and therefore no nerves when asking questions.  Little things like, 'here are the IRC channels we're in...' and 'Thursday's the best because it's breakfast day.'</li>
<li>  My manager flat out said "I won't read it" when I forwarded him [my post]({{ get_url("2012-10-21-community-ftw-kicking-of-the-pycarolinas-community")}} "Community FTW") about the community talk I gave at PyCarolinas (among other questions & discussion points). Damn that guy is awesome. No nonsense, no bs, no coddling, very helpful, thinks outside the box, and brilliant.</li>
<li>  My manager also flat out said "That's why we hired you" when I asked him about being invited to speak at conferences. hellz yea.</li>
<li>  I can surprise a few people with the little Czech knowledge I've retained.  *"jedno velky pivo, prosim."* </li>
<li>  I was assigned 5 tickets on day \#2 in Brno. This will probably be the only time I will be excited to be assigned tickets. They seem to be the types of tickets that are 'easy pickens' but also give the challenge of making you dig through the whole freaking code base only to find the issue comes from an outside package. /phew </li>
<li> [I SUBMITTED MY FIRST PATCH](http://www.redhat.com/archives/freeipa-devel/2012-October/msg00556.html) (day \#3 in Brno. 8 days of learning terms/code/git/processes, ignoring travel days, orientation, blah). _Side note: that patch broke everything. I learned a lesson in tests the following day._ </li>
</ul>

#### Cultural Differences:

I was also [asked][JuliaE] about what differences I've seen in the engineering cultures, and the [moving abroad experience][experience] in general.  Immediately, my memory is refreshed on how hyper-sexualized women are dressed here.  I wear converse or pumas everyday -\> flag for 'I'm not from here!' as many women where heals (not crazy tall ones, although some do).  And hygiene can be an issue for some folks (lulz).  Also, while it's still relatively cheap in Czech Rep (2006: 22-24 Kc to 1 USD, now: 20 Kc to 1 USD), cost of living has gone up. Food is more expensive, housing, Ikea.

Immediate engineering culture differences are hard to pick up right now, and I hope to be able to have a better PoV after 2 months.  Every so often, I get a surprised look when I ask a question, giving me the impression that I'm not as much of a n00b as was thought.  I think that more comes from the reputation that preceded me, the discussions that were had before I arrived.  I don't read into this at all.  I mean - no one told me to read into the package code before arriving... but I did, and it's
helped a lot.  I haven't been approached inappropriately, scoffed at, or met with impatience.

All in all: this _job_ lifestyle is utterly fantastic.  I got hired because I like to speak AND code AND continually learn. And I have expectations for myself to continue to speak AND code AND learn.  Look at that? all aligned! Just one drawback: I dream in test failures now.


[JuliaG]: https://twitter.com/jewelia/status/262665853483499520 "Tweet from Julia Grace"
[patch]: http://www.redhat.com/archives/freeipa-devel/2012-October/msg00556.html  "My Patch Email & Diff"
[JuliaE]: https://twitter.com/juliaelman/status/262666318715707392%20 "Julia Elman's tweet"
[experience]: https://twitter.com/aesptux/status/262668691731263488 "Adrian Espinosa's tweet"
