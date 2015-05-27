---
layout: post.html
title: "Metrics-Driven Development: See the forest for the trees"
tags: [Spotify, metrics, data]
category: [words]
---

This post is an accompaniment to my [Metrics-driven development talk][0] at [Open Data Science Conference][1] in Boston in May 2015.

---

At Spotify, data is quite important.  We track user-generated data, like sign ups, logins, activity within the application, even tweets (good and bad), etc. We also track server-generated data, including requests to various services, response times, and response status codes, among a million other things.

Each squad owns what they want to collect, how and when, and how they will consume such data.  We have analysts – not technically a part of “tech” in the company – that run thousands of Hadoop jobs a day to glean insight from user activity, answering questions like “how many paying subscribers to we have at this moment?”, or “was this partnership financially beneficial for us?”.

We have data scientists and machine learning folks analyzing listening behavior and trends that power the Discovery, Browse, and Radio behind the platform.

Engineers behind the platform watch usage rates of our Web APIs, login failure rates, and feature usage.  This only scratches the surface of what data we collect.

We use various technologies related to data, including Hadoop, as well as Cassandra, Postgres, and Elastic (formerly [Elasticsearch][2]).  All of the user-generated data sits in Hadoop, with which we run jobs against using either Java, Python, or directly query with Hive (side note: we’ve open-sourced our [Python framework][3]!).  I’ve even discovered an IPython notebook server

For the backend side, some of our service activity gets parked in Elastic, where we have [Kibana][4] setup.  The rest/majority of said service activity is handled by a home-grown system, which includes our open-sourced [ffwd][5] (pronounced “fast forward”) written in ruby.

Yet with all this setup, this technology, I am embarrassed to say my team did a lot of development in the dark.  We were not tracking anything; we didn’t know how successful our feature integrations were doing; we hadn’t a clue how our backend services we “maintained” were holding up.

This is a story of “self-discovery”: in an effort to become a better, more effective team, we ...

## The Effective Squad

Spotify has been very public with [how][6] [it][7] [uses][8] [Agile][9] in its software development process.  One key aspect of agile is iteration, and we certainly iterate over our product.  But we also iterate over ourselves, trying to find what works best for us as a company, as a squad, and everything in between.

Late last year, my [squad][10] began participating in an internal program deemed the “Effective Squad Circle.”  Its purpose was to hone-in on the squad itself.  There were monthly challenges set up to figure out how ...effective... we were at delivering the product/feature/service we were meant to.

However, as I mentioned just a few lines above, the squad was a bit lost at what we were meant to deliver.

### Question 1: What the h*ll are we doing here?

What do we deliver?

### Question 2: Who are our customers?

* Who actually defines our work?
* Who uses our work/product/service?

### Question 3: What are their expectations?

* What's important to our customers?
    * On time delivery? Predictable vs productive?
    * Delivered according to specification?
* Do they expect solutions to problems they didn’t know existed?
* Expectations on non-measurables like quality, usability, etc?
* Expectations on how we work? Updates, progress, problems, etc?

### Question 4: Do we actually meet them?

How do we know we’ve met our customers’ expectations?

## Implementing Feedback Loops

A “feedback loop” is a generic term that any team – not just tech – can use to understand how feedback is given.  For our squad, one of the main feedback loop we chose was metrics.  We wanted all them snazzy looking dashboards! With eye-candy graphs and visuals using the latest technology that will be obsolete tomorrow.

In all seriousness, we wanted an immediate visual of various metrics.  But what did we want to see?  What questions did we want to answer?

### The Spaghetti Board

In line with the idiom, to throw spaghetti on the wall to “see what sticks”, the squad brainstormed for a while, trying to come up with any question for which we’d like to see the answer.

### So much forest

We had many ideas -

* grouped together similar metrics
* weeded out the extraneous

### Appreciating the trees

* Focus on one main question for partnership integration: how will we know an integration is successful?
*


## Questions to consider

* How often do you check in on metrics?
    * dashboards are never looked at - how do you make dashboards more visible? daily screenshot
        * things to think about:
            * too sensitive to broadcast (e.g. a TV where vistors can see)
* if you do check in, how do you drive towards your goal?
    * how to achieve the % left?
* how do metrics map to business goals?
* How do you prioritize different goals you want to drive? which is most important? does it mean you're going to neglect the others? or allot time by priority?
* create dashboards that are actually actionable - measure only metrics where we can be actionable
    * what is the goal
    * how can we drive the goal

### Unknowns
* how do you characterize the unknown?
* how to approach the unknowns?
* what _is_ unknown?
    * e.g. we know X-amount of Russians have services enabled, but X+20% android devices, why not?
        - 1/2 of them are too old to enable services, what abut the other 1/2?
* how do you figure out the percentages of all the speculated unknowns?
* left with the unknown unknowns

### When to reassess
* for the things we don't reach 100% of our goals (the gap between baseline and goal line) need to assess the difference - why does it exist? is it even solvable?
* If you look at the dashboard, what actions are you actually going to take?
    * if it doesn't have a goal line or an alert, do not create a dashboard






[0]: metricsdrivendevtalk
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
