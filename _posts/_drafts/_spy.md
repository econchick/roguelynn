---
title: "How to spy with Python: so easy, the NSA can do it"
layout: post.html
tags: [prism, NSA, "mass surveillance", python, scapy]
category: [talks, words]
url: /spy/
date: November 23rd, 2013
---

I’ve previously spoken about [PRISM](http://www.roguelynn.com/prism) at both [PyCon Canada][pyconca] and [PyCon Ireland][pyconie].  For [PyConES][pycones] in Madrid this year, I decided to combine the PRISM talk with a bit of Python.  Because, why not?  Slides from PyConES can be found [here][slides].


#### Disclaimer

I am not a lawyer, nor have I studied law in anyway.  I’m a typical American with the [US Constitution][constitution] and the [Bill of Rights][billofrights] engrained in my soul.

Nor have I had any experience in three-letter-government-agencies-that-are-out-to-get-you, or currently work/have worked for a company involved in PRISM (or at least not that I’m aware of).

This post has no special insight nor conspiracy theories, just painting a story from publicly available research.


#### Overview & Context

To read more about what PRISM and XKeyScore is, I detail the history and context in my [previous post](http://www.roguelynn.com/prism).


## How to Spy with Python

Below are a few proof of concepts that take the published spy queries on the NSA’s XKeyScore slides.  These are meant to be simplistic and not scalable.

### Tools used

* [Scapy][scapy]
* [pygeoip][pygeoip]
* [geojson][geojson]
* [python-nmap][python-nmap]

### Quick How-to with Scapy

A downloadable [iPython Notebook](http://nbviewer.ipython.org/7590571).

*TODO* Embed iPython notebook

<iframe src=http://nbviewer.ipython.org width=700 height=350></iframe>

#### Query 1: Show me everyone that has searched for $Y term

**Approach:**

* Filter for tcp & host = google.com
* Parse packets for "q=" plus the search term, eg "q=ice+cream" (note: URL encoding!)

A downloadable [iPython Notebook](http://nbviewer.ipython.org/7589025).

**TODO** Embed iPython notebook

#### Query 2: How me everyone from $X country that has visited $Y extremist forum

**Approach:**

* Filter for source IP & destination IP, and traceroute those IPs: [iPython Notebook](http://nbviewer.ipython.org/7588949)
* Filter for GET term like above [iPython Notebook](http://nbviewer.ipython.org/7589025)

**TODO** Embed iPython notebook

#### Query 3: Give me all emails with $X in the body of the email

**Approach:**

* Filter for HTTP traffic and "POST" for sent - if sent via web interface then will probably be over HTTPS (save packet for decryption later!)
* OR Filter for port 25
* Once packets are collected, parse packets


* Download and save this [sample pcap file](http://wiki.wireshark.org/SampleCaptures?action=AttachFile&do=get&target=smtp.pcap) from Wireskark [Sample Captures](http://wiki.wireshark.org/SampleCaptures) for an example of smtp traffic.
* Now parsing and putting together the raw data (decoded base64 if needed), you can do a simple search for key terms: [iPython Notebook](http://nbviewer.ipython.org/7589033)

**TODO** Embed iPython notebook

#### Query 4: Give me PGP usage from $Z country

**Approach:**
Very similar to above, sniff for SMTP traffic.  Then just parse/search for 'multipart/encrypted' and/or 'protocol="application/pgp-encrypted"' within "Content-Type" header of the email.  This just tells you that the email has been encrypted with PGP.  Now, we already have a database collections/hosts of PGP/GPG keys, so I'm sure the NSA is getting their cryptographers on it!

**TODO** Embed iPython notebook

* [iPython Notebook](http://nbviewer.ipython.org/7589056)


#### Query 5: Show me chats for $X user during $Y timeframe

**Approach:**
You will need to disable your SSL connection to the chat server.  Then just sniff for XMPP traffic (Jabber, Facebook, gchat) or IRC traffic (TCP + port 6667 (typically)).

* [iPython Notebook](http://nbtest.herokuapp.com/gist/econchick/7589075) -> test viewer given to me because current one can't support such long JSON file :D
* [gist](https://gist.github.com/econchick/7589338) -> need to post to nbviewer when app is back up

**TODO** Embed iPython notebook

#### Query 6: Find all exploitable machines in $Z Country

**Approach:**

* Create a port sniffer - responses return OS
* Geolocate machines with the resolved IP addresses
* Either search for a specific machine, or combile and/or query a database needed of known exploitable machines (e.g. [shodan](http://www.shodanhq.com/))

**TODO** Embed iPython notebook

* [iPython Notebook](http://nbviewer.ipython.org/7589366)
* [gist](https://gist.github.com/econchick/7589366)


#### Other easy tricks

* VoIP calls: protocol filter = SIP
* Can easily read Chrome/Firefox/Skype sqlite databases once inside someone's machine
* Physical location of where you've connected to - can get the SSID via wireshark/scapy, and use wigle.net to search by SSID



[constitution]: http://www.archives.gov/exhibits/charters/constitution.html
[billofrights]: http://www.archives.gov/exhibits/charters/bill_of_rights_transcript.html
[pyconca]: http://pycon.ca
[pyconie]: http://python.ie/pycon/2013/
[scapy]:
[pygeoip]:
[geojson]:
[python-nmap]:
[pycones]:
[slides]:
