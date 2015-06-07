---
layout: post.html
title: "Metrics-Driven Development: See the forest for the trees"
tags: [Spotify, Metrics, Data]
category: [words]
---

This post is an accompaniment to my [Metrics-driven development talk][0] at [Open Data Science Conference][1] in Boston in May 2015.  Slides [here][22] and video to be posted soon.

---

At Spotify, data is quite important.  We track user-generated data, like sign ups, logins, activity within the application, even tweets (good and bad), etc. We also track server-generated data, including requests to various services, response times, and response status codes, among a million other things.

Each squad owns what they want to collect, how and when, and how they will consume such data.  We have analysts that run thousands of Hadoop jobs a day to glean insight from user activity, answering questions like “how many paying subscribers to we have at this moment?”, or “was this partnership financially beneficial for us?”.

We have data scientists and machine learning engineers analyzing listening behavior and trends that power the Discovery, Browse, and Radio behind the platform.

Engineers behind the platform watch usage rates of our Web APIs, login failure rates, and feature usage.  This only scratches the surface of what data we collect.

We use various technologies related to data, including Hadoop, as well as Cassandra, Postgres, and [Elasticsearch][2]).  All of the user-generated data sits in Hadoop, with which we run jobs against using either Java, Python, or directly query with Hive (side note: we’ve open-sourced our [Python framework][3]!).  I’ve even discovered we have an IPython notebook server setup.

For the backend side, some of our service activity gets parked in Elasticsearch, where we have [Kibana][4] setup.  The rest/majority of said service activity is handled by a home-grown system, which includes our open-sourced [ffwd][5] (pronounced “fast forward”) written in Ruby.

Yet with all this setup, all this technology, I am embarrassed to say my team did a lot of development in the dark.  We were not tracking anything; we didn’t know how successful our feature integrations were doing; we hadn’t a clue how our backend services we “maintained” were holding up.

This is a story of “self-discovery” to become a better, more effective team.  And we did this by capitalizing on understanding our own data.  Not everyone can be data scientists, statisticians, econometricians; but everyone can grasp why it’s important that 70% of users can’t log in.  This is a story of a practical application of data science.

## The Agile Approach

Spotify has been very public with [how][6] [it][7] [uses][8] [Agile][9] in its software development process.  One key aspect of agile is iteration, and we certainly iterate over our product.  But we also iterate over ourselves, trying to find what works best for us as a company, as a squad, and everything in between.

Late last year, my [squad][10] began participating in an internal program deemed the “Effective Squad Circle.”  Its purpose was to hone-in on the squad itself.  There were monthly challenges set up to figure out the team’s current condition and comparing it the desired condition terms of delivering the product/feature/service we were meant to.

### Finding Our Target Condition

The first challenge was to find our target condition.  Where do we want to be?  It’s certainly difficult to establish a goal without context, without an understanding of where we are now.  To figure out our baseline, we sat down to answer a few questions as a group.

<p class="lead">Question 1: What do we deliver?</p>

A seemingly easy question, right?  Yet myself and the squad initially struggled to answer this right away.  It certainly wasn’t immediately on the tip of our tongues.

So we looked at our past and listed out the integration projects we delivered and the services currently maintain.  It includes [Uber][11],  [Last.fm][13], [Yahoo!][14], [SoundHound][15], [Twitter #music][16], among others.  The most critical is certainly our [Facebook][12] login and new user registration as about 70% of our user base logs in via Facebook.

<small>Side note: there seems to be a misconception that one must sign up/log in via Facebook to use Spotify. [Not true][19]!</small>


<p class="lead"> Question 2: Who are our customers?</p>

Who actually defines our work? At Spotify, we believe the leadership is meant to convey a vision, and the squad is meant to implement that vision in the matter that they choose.  There isn’t micromanagement; a lot of trust actually.  But our lead team defines the direction our squad takes.

With the many integrations we’ve done, we have a lot of external partners.  Thankfully, the squad is a bit shielded from direct communication.  But that makes our business development team another customer.

But then who depends on us internally?  And who actually uses our work/product/service?  As I mentioned earlier, about 70% or so of users log in with Facebook.  It's a pretty integral system to the Spotify platform.  So we certainly have to not f*ck it up when Facebook makes breaking changes – announced or not – to their login protocol.  There’s also other teams within Spotify that plug into the system for social aspects, e.g. sharing from within the platform.

<p class="lead">Question 3: What are their expectations?</p>

When trying to answer this question, it occurred to us that we never really asked our customers what their expectations are.  So we did!  We wanted to know what exactly was important to them with what we deliver.  Was it on-time delivery?  Predictable versus productive?  Do they expect solutions to problems they didn’t know existed?  What were their expectations on quality, usability, and other non-measurables?  Were there expectations with how we worked as a squad; did they want updates on progress, problems, etc.?

We couldn’t ask all our customers; asking 60 million users would be a bit much.  And expectations would be different for different customers.  Internal teams expected our Facebook service to be reliable and scalable.  Business development wanted us to be clear on what we can feasibly implement.  It’s safe to assume users will want to log in or sign up via Facebook if they choose to, and for it to just work.

<p class="lead">Question 4: Do we actually meet them?</p>

How do we know we’ve met our customers’ expectations?  This is where we stopped dead in our tracks.  No, we didn’t know if our systems could handle extra internal load.  Or if/when users couldn’t log in.  Or how many users have activated Spotify with Uber, and of those, does the experience actually work?

Being people that have an affinity for tech and automation, naturally we wanted to implement a technical solution.

## Implementing Feedback Loops

A “feedback loop” is a generic term that any team – not just tech – can use to understand how feedback is given.  For our squad, one of the main feedback loops we chose was metrics.  We wanted all them snazzy looking dashboards! With eye-candy graphs and visuals using the latest technology that will be obsolete tomorrow.

In all seriousness, we wanted an immediate visual of various metrics.  But what did we want to see?  What questions did we want to answer?

### Measurements We Wanted to See

In line with the idiom, to throw spaghetti on the wall to “see what sticks”, the squad brainstormed for a while, trying to come up with any question for which we’d like to see the answer.  Some ideas included:

* Signup/auth flow abandonment
* Facebook-connected users – percentage of total users, trend over time
* Percent of users that sign up through Facebook per hour/day/week
* Facebook-related errors
* Daily Active Users by Partner/Feature
* Registrations, subscription rate, and referrals by Partner
* Web API usage by Partner
* Squad-focused Twitter feed ("uber + spotify," etc.) – what’s being complained about that neither the partner or we may not see?
* Outstanding JIRA issues
* Request count by internal requesting service/team


We grouped together similar metrics and questions into buckets: Usage, System Health, and Business Performance Indicators.  These buckets will eventually be their own dashboard cycled through one of our big office monitors.

We also created a few processes based on the questions above.  One process reviews our progress as a squad.  Every [retrospective][20], we will look at a couple of metrics that deals with the squad performance, e.g. how many bugs we closed in the past sprint period.  We will also judge if this is a metric we’d like to continue seeing, if we can actively improve upon it (if we understand what needs to be improved), and what new – if any – measurable items we should look at for next retro.

Another is to have goal targets at the start of every integration project we do (which may span multiple sprints).  For example, “we will know we’re successful when this integration brings us x-amount of users.”  It’s true this sort of goal line can only be judged based on historical user acquisition numbers, so we definitely have some work to do beforehand.  It will also feed into our retrospectives.

We also have a few post-integration questions for business development folks to ask of external partners on behalf of the squad.  These questions include understanding our responsiveness, how are developer tools are, and if their company goals were met.  We may think an integration was super successful, but they may have some insight that we do not.



## The Big Picture

We’ve only been “caring” about metrics for the past few months.  So this is certainly only the beginning for us.  But it’s allowing us to iterate and give a hard look at what we track and why. You can certainly track [everything that moves][21], but will you get innundated? Certainly so if you’re counting each leaf of each branch for every tree in the forest.  So how can we tell what’s important?

This goes back to understanding your customers’ expectations, and essentially boils down to business value.  How can you maintain and improve upon the business value of your service/product?  How does counting every Facebook-connected user help us better ourselves?

When thinking about implementing various metrics for our feedback loops, I came across various questions to help me see the forest for the trees:


<p class="lead">Creating a new metric</p>
* How do metrics map to business goals?
* How do you prioritize different goals you want to drive? which is most important? Does it mean you're going to neglect the others? or allot time by priority?
* How can we create dashboards that are actually actionable? What is the goal, and more importantly, _how_ can we drive the goal?

<blockquote style="display:block;margin-left:auto;margin-right:auto;" class="twitter-tweet" lang="en"><p lang="en" dir="ltr">Switching my Spotify to private so that my Facebook friends can’t see me listening to Clay Aiken.</p>&mdash; BriiMonster (@BriiMonster) <a href="https://twitter.com/BriiMonster/status/604210734621282304">May 29, 2015</a></blockquote>


<small style="text-align: center;display:block;">Putting a Twitter feed of “Spotify + Facebook” is certainly turning into noise.</small>

<p class="lead">Representing metrics</p>

* How do we correctly measure what we care about?
* We have many tools to help us create <span class="rogue-hover" data-toggle="tooltip" data-placement="top" title="# of registered users right now">gauges</span>, <span class="rogue-hover" data-toggle="tooltip" data-placement="top" title="# of open connections">counters</span>, <span class="rogue-hover" data-toggle="tooltip" data-placement="top" title="# of requests/second">meters</span>, <span class="rogue-hover" data-toggle="tooltip" data-placement="top" title="distribution of the # of registered users connected with Facebook">histograms</span>, and <span class="rogue-hover" data-toggle="tooltip" data-placement="top" title="latency: # of requests/sec over time">timers</span>.  But what representation is best for each question?

<img class="img-responsive img-rounded" src="{{ get_asset('images/metrics_facebook_service.png') }}" title="Incoming requests by service" alt="Incoming requests by service"/>

<small style="text-align: center;display:block;">Another metric displayed on our dashboard</small>

<p class="lead">Consuming metrics</p>
* How often do you check in on metrics?
* Dashboards are never looked at; they become background noise. How do you make dashboards more visible?
* If you make them more visible by slapping them up on a TV monitor, are the metrics too sensitive to broadcast (e.g. where vistors can see)

<p class="lead">Iterating over current metrics</p>

* For the things we don't reach 100% of our goals (the gap between baseline and goal line) need to assess the difference – why does it exist? is it even solvable?
* If you look at the dashboard, what actions are you actually going to take?  Should you even create a dashboard if a goal or an alert isn’t set up? (probably not)
* What about the unknowns? What _is_ unknown? e.g. we know `x`-amount of mobile users have connected their accounts to Uber; but how many don’t use it because of the driver has an Android phone versus driver isn’t aware of the service?
* How to approach the known unknowns?  Are there different ways or avenues to track? or is it even actionable?
* You’re then left with the unknown unknowns; how to you figure out the % of known knowns, known unknowns, and unknown unknowns? What level of known and unknown unknowns are you comfortable with?


## TL;DR

Ultimately, the goal in us answering these questions is to give us both a shorten decision-making cycle as well as make more informed decisions about strategy and partnerships. It’s super easy to get lost in the forest.  It doesn’t help that it’s kind of fun to get all that instant feedback. We are placing current values in historical context in order to see patterns developing.


## MOAR Resources

Once you’ve thoughtfully address what you want to measure, take a look at the following:

* [Beyond Grep: Practical Logging and Metrics][17] by Hynek Schlawack – a practical and very thorough guide in setting up proper error notifications; metrics tracking, collecting/aggregating, and storing/viewing; and centralize logging.
* [Metrics, Metrics Everywhere][18] presentation from Coda Hale – making decisions based off of metrics to avoid confusion and alleviate the unknowns.

<script>
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
</script>


[0]: http://opendatascicon.com/schedule/metric-driven-development-see-the-forest-for-the-trees/
[1]: http://opendatascicon.com/
[2]: https://www.elastic.co/
[3]: https://github.com/spotify/luigi
[4]: https://www.elastic.co/products/kibana
[5]: https://github.com/spotify/ffwd
[6]: https://www.youtube.com/watch?v=Mpsn3WaI_4k
[7]: https://www.youtube.com/watch?v=X3rGdmoTjDc
[8]: http://techcrunch.com/2012/11/17/heres-how-spotify-scales-up-and-stays-agile-it-runs-squads-like-lean-startups/
[9]: http://agilemanifesto.org/
[10]: http://cdn.tshirtonomy.com/wp-content/uploads/Unishark-T-Shirt.jpg
[11]: https://get.uber.com/spotify/
[12]: https://news.spotify.com/us/2011/09/21/spotify-and-facebook/
[13]: http://www.engadget.com/2014/01/29/spotify-last-fm-partnership/
[14]: https://investor.yahoo.net/releasedetail.cfm?releaseid=686833
[15]: https://news.spotify.com/us/2014/02/21/add-to-spotify-with-soundhound/
[16]: http://www.digitaltrends.com/social-media/twitter-revisits-music-with-an-integrated-spotify-app/
[17]: https://hynek.me/talks/beyond-grep/
[18]: https://www.youtube.com/watch?v=czes-oa0yik
[19]: https://www.spotify.com/us/signup/
[20]: https://www.mountaingoatsoftware.com/agile/scrum/sprint-retrospective
[21]: https://codeascraft.com/2011/02/15/measure-anything-measure-everything/
[22]: https://speakerdeck.com/roguelynn/metrics-driven-development-see-the-forest-for-the-trees
