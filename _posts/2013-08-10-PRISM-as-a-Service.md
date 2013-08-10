---
title: "PRISM-as-a-Service: Not Subject to American Law"
layout: post.html
tags: [prism, NSA, mass surveillance]
category: [talks, words]
url: /prism/
---

In the light of [PRISM][prismwiki]’s [whistle blowing][whistleblowing], many folks, like [here][apology], [here][notsubjecttoamericanlaw], and [here][prismkillscloud], are questioning whether the cloud is a viable option.

This write-up, originally presented at [PyCon Canada 2013][pyconca] ([slides](https://speakerdeck.com/roguelynn/prism-as-a-service-not-subject-to-american-law), and video coming soon) is a look at what PRISM is, how the cloud is affected, and how we can maintain privacy in the cloud.


#### Disclaimer

I am not a lawyer, nor have I studied law in anyway.  I’m a typical American with the [US Constitution][constitution] and the [Bill of Rights][billofrights] engrained in my soul.

Nor have I had any experience in three-letter-government-agencies-that-are-out-to-get-you, or currently work/have worked for a company involved in PRISM (or at least not that I’m aware of).

This post has no special insight nor conspiracy theories, just painting a story from publicly available research.


## Overview

#### What is PRISM?

PRISM stands for “Planning Tool for Resource Integration, Synchronization, and Management” and is a clandestine electronic data mining program for the purpose of mass surveillance.  PRISM aims to collect metadata that passes through US servers.

In general, the collected data [includes](http://www.washingtonpost.com/wp-srv/special/politics/prism-collection-documents/) email, voice & video chat, videos, photos, stored data, online social networking details, among others.

#### Who does it affect and who is involved?

It’s meant to target foreign communications and not specifically or intentionally target US citizens.

Starting with Microsoft in September 2007, PRISM [started collecting data](http://www.washingtonpost.com/wp-srv/special/politics/prism-collection-documents/).  Other companies include Yahoo (2008), Google (2009), Facebook (2009), PalTalk (2009), YouTube (2010), Skype (2011), AOL (2011), and Apple (2012).

#### How does it work?

From the NSA slides [posted](http://www.washingtonpost.com/wp-srv/special/politics/prism-collection-documents/) on Washington Post, and from the press releases from [Google](http://googleblog.blogspot.com/2013/06/what.html), [Facebook](https://www.facebook.com/zuck/posts/10100828955847631), [Apple](http://www.apple.com/apples-commitment-to-customer-privacy/), [Microsoft](http://www.microsoft.com/en-us/news/Press/2013/Jun13/06-06statement.aspx), and others, the NSA does not have _direct_ access to these companies' servers.  For the collection process, the FBI issues a directive to the company, and the company responds by supplying data (or, supposedly, denies or requests more information).

> The FBI uses government equipment on private company property to retrieve matching information from a participating company, such as Microsoft or Yahoo and pass it without further review to the NSA.
>
> [Source: Washington Post](http://www.washingtonpost.com/wp-srv/special/politics/prism-collection-documents/)


The NSA then [filters the data](http://www.washingtonpost.com/wp-srv/special/politics/prism-collection-documents/) by type (voice, video, call records, internet records, etc.) followed by foreign versus American subject to reduce the intake of information about Americans.


## Timeline
#### Mass Surveillance: Nothing New, and not just US

<script async class="speakerdeck-embed" data-id="e8a985f0e3730130e8c53a22532026d5" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

<small><span id="caption">[Timeline sources](https://www.eff.org/nsa-spying/timeline)</span></small>

## Unanswered Questions

The lack of detail in both the involved companies' statements and in the NSA slides and responses themselves leave a lot of questions.  For instance:

* How is a target’s “foreignness” determined?
* How exactly are they identifying non-US citizens?
* Are foreign-born US residents included as foreigners?
* What if a US citizen and a foreigner communicate?
* What about US citizens abroad, or US citizens using services abroad?
* [Does the NSA/FBI have jurisdiction on foreign persons/companies using services from US-based companies that are located/incorporated abroad](https://news.ycombinator.com/item?id=5860003)?  How does physical location of the person/company/service/hardware matter? If a [company like Twitter says no](https://news.ycombinator.com/item?id=5860038) to a request, can the NSA go to their PRISM-compliant hosts to get the desired information?
* What exactly do works like “backdoor”, “direct access”, and “intentional” mean?  Do participating companies not know they are participating, therefore unaware of a “backdoor”? Or are companies knowingly allow access to their servers?
* If the NSA is not intentionally targeting Americans, what do they do with the accidently-collected data? or the data received from Five Eyes that includes Americans?
* How is the PRISM-collected data handled by the NSA? Does the NSA maintain rigorous security measures to protect against threats?
* What exactly is the NSA doing with the data?  Are they merely collecting, or analyzing it?

## Effects on the cloud

The US cloud has started to feel the pain in the wake of PRISM being outed. The [Cloud Security Alliance](https://cloudsecurityalliance.org/) conducted a [survey](https://cloudsecurityalliance.org/research/surveys/#_nsa_prism) showing that 56% of foreign-based members are less likely to use US-based cloud providers, while 10% have all-out cancelled their contracts with US providers.

Governments themselves are starting to act: Germany has also [banned](http://www.heise.de/newsticker/meldung/PRISM-Datenschuetzer-stoppen-neue-Datentransfers-von-Firmen-in-die-USA-1922987.html) (in German) all future transfer of data to non-EU-based clouds.

More recently, the [Information Technology & Innovation Foundation](http://www.itif.org/) released a report quantifying [how much PRISM will cost the US computing industry](http://www2.itif.org/2013-cloud-computing-costs.pdf) (PDF):

> The U.S. cloud computing industry stands to lose $22 to $35 billion over the next three years as a result of the recent revelations about the NSA’s electronic surveillance programs.

Folks have [boycotted](http://www.theregister.co.uk/2013/06/08/what_about_a_us_tech_boycott/) US cloud, others are [experiencing](http://www.reddit.com/r/worldnews/comments/1fxg0d/nsa_prism_why_im_boycotting_us_cloud_tech_and_you/caespwn) a run on their own cloud services, and some are even [apologizing](http://fredlybrand.com/2013/06/23/an-apology-to-my-european-it-team/) to foreign co-workers on using US-based cloud services.


## What can we do?

It’s difficult to defend oneself against an attacker whose capabilities you do not know.  We should approach protecting our privacy by asking some questions, defining threat scenarios, and building defenses around that.

### Limit government exposure

There are, in general, three reasons a government may spy: industrial espionage, political reasons, and terrorism

By bringing cloud services within your company's national jurisdiction, you effectively eliminate industrial espionage by a foreign government.  It is very unlikely to be spied on for industrial espionage by your own government.

That said, it’s still unclear if the USA, UK, Europe, etc, can have access to data even if you host services within your own country.  However, that starts to require political solutions rather than technical.

In the end, we have no idea what the technical capabilities of these “attackers” are.  Random hackers usually do not have scale like governments do.  We have to assume government spies can do anything, but then protection costs skyrocket.  In general, though, a company’s data is not that important to governments.  It’s personal profiles that is a bit part of any kind of PRISM-like scheme.

### DIY Cloud

Solutions are simply moving your business elsewhere to your own jurisdiction.  I can’t answer whether using US company’s services abroad, like [Heroku’s european servers](https://blog.heroku.com/archives/2013/4/24/europe-region), will or will not protect you against the US government.

Being that hardware is getting a lot cheaper, do-it-yourself clouds like [OpenStack](http://www.openstack.org/), [OpenShift](https://www.openshift.com/), [ownCloud](http://owncloud.org/), [CloudStack](http://cloudstack.apache.org/), etc., will give you total knowledge of what is on your machines and total control of your response if and when a hacker (government or not) gets in.  I have my own personal cloud thanks to the raspberry pi.

In general, though, a company’s data is not that important to governments.  It’s personal profiles that is a bit part of any kind of PRISM-like scheme.

### As nerds ourselves

Now the question is: what level of granularity are you okay with that your government knows?  Or coming from a different direction, is it possible to go completely anonymous?  I may sound like I’m wearing a tinfoil hat, but bear with me – this is more of a proof of concept that no, it is not possible to go completely anonymous.

#### Location tracking

I would imagine most folks are okay with a government knowing *when* you are inside its nation.  But how granular are you okay with in being tracked?

It’s difficult to “go off the grid” entirely.  As long as you carry a phone, you’re trackable. If you live in [Maine](http://www.aclu.org/technology-and-liberty/new-law-requires-warrants-cell-phone-tracking) or [New Jersey](http://www.thetakeaway.org/2013/jul/22/new-jersey-supreme-court-warrant-required-acquire-cell-phone-location-data/), you’re lucky; but in the majority of the US, a search warrant is not needed to ask your cell phone carrier for your location data.  You can certainly turn off your phone, but as soon as you turn it on, location is recorded when connecting to a cell tower or wifi connection spot. In London, a [UK company is building smart trash cans that track every WiFi-enabled smartphone that passes by](http://arstechnica.com/security/2013/08/no-this-isnt-a-scene-from-minority-report-this-trash-can-is-stalking-you/). In a one-week period with just 12 cans installed, more than 4 million devices were tracked.

Sure, you could rotate through pay-as-you-go phones.  You’ll have to pay with cash, but it’s unclear if ATMs log bill numbers with account numbers.  If you do have unmarked bills, then where do you buy the phone?  What store reliably does not have security cameras? The phone has a barcode to scan when purchasing; would logs of purchases be tied to camera footage? You may ask, “would the government really care? Am I that dangerous to be tracked?” Yet in the UK for instance, [your every move is already being watched](http://www.theguardian.com/uk/2011/mar/02/cctv-cameras-watching-surveillance).

In terms of the internet, your internet service provider (ISP) will always know your connections, and can always be intercepted.  Even if you are not using a line that is tied to your name, your location can still be identified because of the MAC address associated with your connection.

Perhaps you write a script to change your MAC address after every connection to avoid being tracked.  There are other identifying factors: there is [OS fingerprinting](http://en.wikipedia.org/wiki/TCP/IP_stack_fingerprinting) and [browser fingerprinting](https://panopticlick.eff.org).

It’s not *truly* clear one can avoid location tracking if connected to the internet at all.

#### Behavior profiling

Assume that you can avoid being tracked by location.  You’re still trackable.

What you do online creates a nice [behavior profile](https://www.eff.org/issues/online-behavioral-tracking) on you.  When do you go online? Who do you email? What websites do you visit?  This behavior is always visible to your ISP because they need to route you.

Even when you flip open an incognito tab with Chrome, it clearly states what information is not being hidden:

<img class="displayed" src="{{ get_asset('/images/incognito.png')}}" width="650" height="550"/>

One popular way to increase anonymity is using the [Tor](http://www.movements.org/how-to/entry/how-to-surf-the-internet-anonymously-with-tor/) project. Note, however, simply using Tor does not encrypt all of your internet activities.  However, there are [certain habits](https://www.torproject.org/download/download.html.en#Warning) that can be done to increase the effectiveness of Tor.

Tor only gives you anonymity, though. It does *not* provide privacy. For instance, using Tor allows you to connect to sites without being traced back to you.  Privacy protests your data, anonymity protects you.  To protect privacy, VPN is your answer. When choosing a VPN, [be sure to do your research](http://torrentfreak.com/vpn-services-that-take-your-anonymity-seriously-2013-edition-130302/).  If you are to use both Tor and VPN, [be sure you know what you’re doing](http://www.slideshare.net/slideshow/embed_code/14380693?startSlide=138), or you may end up like [this guy](http://en.wikipedia.org/wiki/Sarah_Palin_email_hack).

The [EFF](https://www.eff.org/) has a great [graph](https://www.eff.org/pages/tor-and-https) of the potentially visible data to eavesdroppers with Tor, HTTPS, and neither or both.

Yet the status of Tor is now questionable with the owner of “Freedom Hosting” [arrested](https://openwatch.net/i/200/) due to a [JavaScript exploit](http://pastebin.com/pmGEj9bV) deployed against a Tor-user’s browser.  Even if you were to avoid these sorts of exploits, if an individual controls a relatively large percentage of Tor nodes (I can’t find the resource, but I believe about 15% is enough), the owner can de-anonymize you.

Assuming if both your Tor connection and your browser is secure, you’re using a trusty VPN service, and not downloading exploitable files, how can you avoid being profiled? It’s still difficult to hide pure browsing activity (unless you write scripts to simulate fake activity). At this point, not much else can be done.

What about email? PGP/GPG only encrypts the body of the email.  Therefore, who you email, any x-headers, routing information, and _subject_ of the email is not encrypted. Perhaps use an obfuscatory or minimal subject line.  If you _really_ don’t want folks knowing who you’re emailing, then perhaps a private, self-hosted forum is the way to communicate.  How far do you want to go?

#### Encryption


And SSL? Can we trust it? The general status of SSL should be considered unclear on a technical level.  With [BEAST](http://arstechnica.com/business/2011/09/new-javascript-hacking-tool-can-intercept-paypal-other-secure-sessions/), [CRIME](http://www.cert.sd/index928f.html), and [BREACH](http://breachattack.com) attacks on SSL presented in three consecutive years, is SSL enough?  There may be more attacks against SSL that is not public if two dudes are able to publicly present three SSL attacks three years in a row.

Assuming that SSL is technically secure, a [government can still go to a root Certificate Authority and demand its private key to facilitate man-in-the-middle attacks](http://arstechnica.com/security/2010/03/govts-certificate-authorities-conspire-to-spy-on-ssl-users/), or the CA itself [could be compromised](http://www.vasco.com/company/about_vasco/press_room/news_archive/2011/news_diginotar_reports_security_incident.aspx).  One way to ensure trusted certificates are being used and avoid MITM attacks is [certificate pinning](https://www.owasp.org/index.php/Certificate_and_Public_Key_Pinning).

One concern with PRISM is that the “[NSA logs very high volumes of internet traffic and retains captured encrypted communication for later cryptanalysis](http://news.netcraft.com/archives/2013/06/25/ssl-intercepted-today-decrypted-tomorrow.html)”.  [Perfect Forward Secrecy](http://en.wikipedia.org/wiki/Perfect_forward_secrecy) is one [defense](http://blogs.computerworld.com/encryption/22366/can-nsa-see-through-encrypted-web-pages-maybe-so) against this:

> When PFS is used, the compromise of an SSL site's private key does not necessarily reveal the secrets of past private communication; connections to SSL sites which use PFS have a per-session key which is not revealed if the long-term private key is compromised. The security of PFS depends on both parties discarding the shared secret after the transaction is complete (or after a reasonable period to allow for session resumption).
>
> [Source](http://news.netcraft.com/archives/2013/06/25/ssl-intercepted-today-decrypted-tomorrow.html)

Quick note though: PFS does _not_ protect against MITM attacks:

> Someone with access to the server's private key can, of course, perform an active man in the middle attack and impersonate the server. However, they can do that only when the communication is taking place. It is not possible to pile up a mountain of encrypted traffic and decrypt it later.
>
> [Source](https://community.qualys.com/blogs/securitylabs/2013/06/25/ssl-labs-deploying-forward-secrecy)


## Outlook

It essentially comes down to the questions:

* How do we deal with SSL?
* How much can we trust it?
* Do we need to “reboot” our encryption protocols and habits entirely?
* Should we reevaluate the whole idea of the certificate authority system?

Whether the NSA has “direct” access to PRISM-cooperating companies’ servers or has effectively [hacked cryptographic constructs](https://mailman.stanford.edu/pipermail/liberationtech/2013-June/008838.html), our privacy has been challenged.  Our data is being collected, and while it may seem trivial now, one day you may be deemed a terrorist like [this kid here](http://gawker.com/kid-who-rapped-about-marathon-bombing-now-faces-terro-486959354).

Finally,

> First they came for the Socialists, and I did not speak out– Because I was not a Socialist. Then they came for the Trade Unionists, and I did not speak out– Because I was not a Trade Unionist. Then they came for the Jews, and I did not speak out– Because I was not a Jew. Then they came for me– and there was no one left to speak for me.
>
> – Martin Niemöller





[constitution]: http://www.archives.gov/exhibits/charters/constitution.html
[billofrights]: http://www.archives.gov/exhibits/charters/bill_of_rights_transcript.html
[pyconca]: http://pycon.ca
[whistleblowing]: http://www.washingtonpost.com/investigations/us-intelligence-mining-data-from-nine-us-internet-companies-in-broad-secret-program/2013/06/06/3a0c0da8-cebf-11e2-8845-d970ccb04497_story.html
[apology]: http://fredlybrand.com/2013/06/23/an-apology-to-my-european-it-team/
[notsubjecttoamericanlaw]: http://www.theregister.co.uk/2013/06/08/what_about_a_us_tech_boycott/
[prismkillscloud]: http://blogs.computerworld.com/cloud-storage/22305/why-prism-kills-cloud
[prismwiki]: http://en.wikipedia.org/wiki/PRISM_(surveillance_program)