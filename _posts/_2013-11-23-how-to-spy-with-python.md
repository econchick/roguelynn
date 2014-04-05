---
title: "How to spy with Python: so easy, the NSA can do it"
layout: post.html
tags: [prism, NSA, mass surveillance, python, scapy]
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

First off, what makes me cringe, per Scapy’s [documentation][scapydocumentation]:

<pre class="ipynb">
>>> from scapy.all import *
</pre>

or from the terminal:

<pre class="ipynb">
$ sudo scapy
</pre>

To sniff the wireless, Scapy has a sniff function.  Here, tell Scapy to sniff on my wifi card, `en0`, which can be found via `ifconfig` functionality in your terminal.  If you don’t specify an interface, it will default to all listed when you type `conf` in the terminal.

I’m filtering by TCP traffic and listing on port 80 only.  As well, I’m limited the sniff packets to only 10.  If you do not limit the number of packets collected, then it will continue until you interrupt the process.


```python
>>> a = sniff(iface="en0", filter="tcp and port 80", count=10)
>>> a
<Sniffed: TCP:10 UDP:0 ICMP:0 Other:0>
```

To see all the packets, `a.res` returns a list with a barf of information, snipped below:

```python
>>> a.res

[<Ether  dst=00:1d:70:df:2d:11 src=14:10:9f:e1:54:9b type=0x800 |<IP  version=4L ihl=5L tos=0x0 len=64 id=650 flags=DF frag=0L ttl=64 proto=tcp chksum=0x9f88 src=10.25.3.61 dst=184.73.211.6 options=[] |<TCP  sport=53491 dport=http seq=3474155615 ack=0 dataofs=11L reserved=0L flags=S window=65535 chksum=0xecd6 urgptr=0 options=[('MSS', 1460), ('NOP', None), ('WScale', 4), ('NOP', None), ('NOP', None), ('Timestamp', (1224433615, 0)), ('SAckOK', ''), ('EOL', None)] |>>>,
# <--snip-->
```

Looking at the first packet:

```python
>>> a.res[0]  # first packet
<Ether  dst=00:1d:70:df:2d:11 src=14:10:9f:e1:54:9b type=0x800 |<IP  version=4L ihl=5L tos=0x0 len=64 id=650 flags=DF frag=0L ttl=64 proto=tcp chksum=0x9f88 src=10.25.3.61 dst=184.73.211.6 options=[] |<TCP  sport=53491 dport=http seq=3474155615 ack=0 dataofs=11L reserved=0L flags=S window=65535 chksum=0xecd6 urgptr=0 options=[('MSS', 1460), ('NOP', None), ('WScale', 4), ('NOP', None), ('NOP', None), ('Timestamp', (1224433615, 0)), ('SAckOK', ''), ('EOL', None)] |>>>
```

And with Scapy’s “pretty printing” function, `show`:

```python
>>> a.res[0].show()
###[ Ethernet ]###
    dst       = 00:1d:70:df:2d:11
    src       = 14:10:9f:e1:54:9b
    type      = 0x800
  ###[ IP ]###
       version   = 4L
       ihl       = 5L
       tos       = 0x0
       len       = 64
       id        = 650
       flags     = DF
       frag      = 0L
       ttl       = 64
       proto     = tcp
       chksum    = 0x9f88
       src       = 10.25.3.61
       dst       = 184.73.211.6
       \options   \
   ###[ TCP ]###
          sport     = 53491
          dport     = http
          seq       = 3474155615
          ack       = 0
          dataofs   = 11L
          reserved  = 0L
          flags     = S
          window    = 65535
          chksum    = 0xecd6
          urgptr    = 0
          options   = [('MSS', 1460), ('NOP', None), ('WScale', 4), ('NOP', None), ('NOP', None), ('Timestamp', (1224433615, 0)), ('SAckOK', ''), ('EOL', None)]
```

#### Query 1: Show me everyone that has searched for $Y term

**Approach:**

* Filter for tcp & host = google.com
* Parse packets for "q=" plus the search term, eg "q=ice+cream" (note: URL encoding!)

Again, the ugly import:
```python
from scapy.all import *
```

We filter for TCP traffic and for host `search.yahoo.com`.  I chose Yahoo because they do not send search queries over HTTPS, which Google now does (at least in the US).

You can either sniff online:

```python
>>> pkts = sniff(filter="tcp and host search.yahoo.com", count=300)
>>> # saving for later
>>> wrpcap("data/yahoo_search.cap", pkts)
```

Or use a previously saved pcap file (from Scapy’s `wrpcap` function or from wireshark/tshark/tcpdump/etc.):

```python
# importing pcap file
>>> sample_http = 'data/yahoo_search.cap'
>>> pkts = sniff(offline=sample_http)
```

I see that I’ve collected 300 TCP packets:

```python
>>> pkts
<Sniffed: TCP:300 UDP:0 ICMP:0 Other:0>
```

Using Scapy’s `nsummary` function (output snipped a bit):

```python
>>> pkts.nsummary()
0000 Ether / IP / TCP 10.25.3.61:53261 > 74.6.239.58:http S
0001 Ether / IP / TCP 10.25.3.61:53262 > 74.6.239.58:http S
0002 Ether / IP / TCP 10.25.3.61:53263 > 74.6.239.58:http S
0003 Ether / IP / TCP 74.6.239.58:http > 10.25.3.61:53261 SA
0004 Ether / IP / TCP 10.25.3.61:53261 > 74.6.239.58:http A
# <--snip-->
```

I saw that packet 79 had A / Raw (as opposed to A / Raw / Padding or something else) from the `pkts.nsummary()` command.  Taking a look at that packet in particular:

```python
pkts[79].show()

     ###[ Ethernet ]###
       dst       = 00:1d:70:df:2d:11
       src       = 14:10:9f:e1:54:9b
       type      = 0x800
     ###[ IP ]###
          version   = 4L
          ihl       = 5L
          tos       = 0x0
          len       = 1420
          id        = 51853
          flags     = DF
          frag      = 0L
          ttl       = 64
          proto     = tcp
          chksum    = 0x2448
          src       = 10.25.3.61
          dst       = 74.6.239.58
          \options   \
     ###[ TCP ]###
             sport     = 53261
             dport     = http
             seq       = 3423577226
             ack       = 4075984347
             dataofs   = 8L
             reserved  = 0L
             flags     = A
             window    = 8192
             chksum    = 0xe4ca
             urgptr    = 0
             options   = [('NOP', None), ('NOP', None), ('Timestamp', (1222799014, 196990643))]
     ###[ Raw ]###
                load      = 'GET /search;_ylt=A0oG7mGUD49SBxcA3WpXNyoA;_ylc=X1MDMjc2NjY3OQRfcgMyBGJjawNmbWVsb2s1OTRqZ3UyJTI2YiUzRDQlMjZkJTNEOU15M2RnMXBZRUtpdVJyeG9BWlNlRGxLcjJFLSUyNnMlM0Q4ciUyNmklM0RTSjdlY2Y4ZURZakZnbS5DRWRucgRjc3JjcHZpZANHcC5VRjBnZXVyRDdPcmloVWtuRHdnWUFYWjUwR1ZLUEQ1UUFCc3hpBGZyA3lmcC10LTE0MARmcjIDc2ItdG9wBGdwcmlkA2NlVHN4WXhzUWIuOW51aGNlWG9TTUEEbXRlc3RpZANBRDAxJTNEU01FMzQxJTI2QURTUlAlM0RBRFNSUEMxJTI2QVNTVCUzRFZJUDI4OSUyNk1TRlQlM0RNU1kwMTAlMjZVSTAxJTNEVUlDMSUyNlVOSSUzRFJDRjA0NARuX3JzbHQDMTAEbl9zdWdnAzgEb3JpZ2luA3NlYXJjaC55YWhvby5jb20EcG9zAzAEcHFzdHIDBHBxc3RybAMEcXN0cmwDNgRxdWVyeQNNYWRyaWQEdF9zdG1wAzEzODUxMDczNTU4MzEEdnRlc3RpZANVSUMx?p=Madrid&fr2=sb-top&fr=yfp-t-140 HTTP/1.1\r\nHost: search.yahoo.com\r\nConnection: keep-alive\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8\r\nUser-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36\r\nReferer: http://search.yahoo.com/search;_ylt=ApD.LW7jivmrlmZzNKxChqqbvZx4?p=Python&toggle=1&cop=mss&ei=UTF-8&fr=yfp-t-140\r\nAccept-Encoding: gzip,deflate,sdch\r\nAccept-Language: en-US,en;q=0.8\r\nCookie: B=fmelok594jgu2&b=4&d=9My3dg1pYEKiuRrxoAZSeDlKr2E-&s=8r&i=SJ7ecf8eDYjFgm.CEdnr; AO=o=0; YLS=v=1&p=1&n=1; F=a=I.qqZFgMvSp1SMQ7oNaJGIBu5DAJGO25SeRxXSKxg6_KZLWHQMHEkeFQrEOxAH9BOvMhwKs-&b=.hBp; Y=v=1&n=fr6nunkr11qks&l=he6k4bodd/o&p=f2m0'
```

Let’s just grab the “Raw” layer specifically:

```python
>>> pkts[79].getlayer(Raw)
<Raw  load='GET /search;_ylt=A0oG7mGUD49SBxcA3WpXNyoA;_ylc=X1MDMjc2NjY3OQRfcgMyBGJjawNmbWVsb2s1OTRqZ3UyJTI2YiUzRDQlMjZkJTNEOU15M2RnMXBZRUtpdVJyeG9BWlNlRGxLcjJFLSUyNnMlM0Q4ciUyNmklM0RTSjdlY2Y4ZURZakZnbS5DRWRucgRjc3JjcHZpZANHcC5VRjBnZXVyRDdPcmloVWtuRHdnWUFYWjUwR1ZLUEQ1UUFCc3hpBGZyA3lmcC10LTE0MARmcjIDc2ItdG9wBGdwcmlkA2NlVHN4WXhzUWIuOW51aGNlWG9TTUEEbXRlc3RpZANBRDAxJTNEU01FMzQxJTI2QURTUlAlM0RBRFNSUEMxJTI2QVNTVCUzRFZJUDI4OSUyNk1TRlQlM0RNU1kwMTAlMjZVSTAxJTNEVUlDMSUyNlVOSSUzRFJDRjA0NARuX3JzbHQDMTAEbl9zdWdnAzgEb3JpZ2luA3NlYXJjaC55YWhvby5jb20EcG9zAzAEcHFzdHIDBHBxc3RybAMEcXN0cmwDNgRxdWVyeQNNYWRyaWQEdF9zdG1wAzEzODUxMDczNTU4MzEEdnRlc3RpZANVSUMx?p=Madrid&fr2=sb-top&fr=yfp-t-140 HTTP/1.1\r\nHost: search.yahoo.com\r\nConnection: keep-alive\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8\r\nUser-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36\r\nReferer: http://search.yahoo.com/search;_ylt=ApD.LW7jivmrlmZzNKxChqqbvZx4?p=Python&toggle=1&cop=mss&ei=UTF-8&fr=yfp-t-140\r\nAccept-Encoding: gzip,deflate,sdch\r\nAccept-Language: en-US,en;q=0.8\r\nCookie: B=fmelok594jgu2&b=4&d=9My3dg1pYEKiuRrxoAZSeDlKr2E-&s=8r&i=SJ7ecf8eDYjFgm.CEdnr; AO=o=0; YLS=v=1&p=1&n=1; F=a=I.qqZFgMvSp1SMQ7oNaJGIBu5DAJGO25SeRxXSKxg6_KZLWHQMHEkeFQrEOxAH9BOvMhwKs-&b=.hBp; Y=v=1&n=fr6nunkr11qks&l=he6k4bodd/o&p=f2m0' |>
```

We start to see something a little bit more interesting.  I’m going to parse this a little bit.  When physically searching via Yahoo, I noticed that the search term comes after `?p=` and before `&` in my browser, so I’ll do some splitting:

```python
>>> first_query = pkts[79].getlayer(Raw)
>>> print first_query.fields.get('load').split('?p=')[1].split('&')[0]
Madrid
```

Ha! I searched for Madrid!  Let’s check some other queries out: 

```python
>>> second_query = pkts[148].getlayer(Raw)
>>> print second_query.fields.get('load').split('?p=')[1].split('&')[0]
I+love+chocolate
```

I misspelled my favorite coffee place when searching:

```python
>>> third_query = pkts[227].getlayer(Raw)
>>> print third_query.fields.get('load').split('?p=')[1].split('&')[0]
Blue+Bottle+Coffe
```



#### Query 2: How me everyone from $X country that has visited $Y extremist forum

**Approach:**

* Filter for source IP & destination IP, and traceroute those IPs:

<iframe src="http://nbviewer.ipython.org/7588949" width="900" height="500"></iframe>

* Filter for GET term like above:

<iframe src="http://nbviewer.ipython.org/7589025" width="900" height="500"></iframe>

#### Query 3: Give me all emails with $X in the body of the email

**Approach:**

* Filter for HTTP traffic and "POST" for sent - if sent via web interface then will probably be over HTTPS (save packet for decryption later!)
* OR Filter for port 25
* Once packets are collected, parse packets


* Download and save this [sample pcap file](http://wiki.wireshark.org/SampleCaptures?action=AttachFile&do=get&target=smtp.pcap) from Wireskark’s [Sample Captures](http://wiki.wireshark.org/SampleCaptures) for an example of smtp traffic.
* Now parsing and putting together the raw data (decoded base64 if needed), you can do a simple search for key terms.

<iframe src="http://nbviewer.ipython.org/7589033" width="900" height="500"></iframe>

#### Query 4: Give me PGP usage from $Z country

**Approach:**
Very similar to above, sniff for SMTP traffic.  Then just parse/search for 'multipart/encrypted' and/or 'protocol="application/pgp-encrypted"' within "Content-Type" header of the email.  This just tells you that the email has been encrypted with PGP.  Now, we already have a database collections/hosts of PGP/GPG keys, so I'm sure the NSA is getting their cryptographers on it!

<iframe src="http://nbviewer.ipython.org/7589056" width="900" height="500"></iframe>

#### Query 5: Show me chats for $X user during $Y timeframe

**Approach:**
You will need to disable your SSL connection to the chat server.  Then just sniff for XMPP traffic (Jabber, Facebook, gchat) or IRC traffic (TCP + port 6667 (typically)).

<iframe src="http://nbtest.herokuapp.com/gist/econchick/7589075" width="900" height="500"></iframe>

#### Query 6: Find all exploitable machines in $Z Country

**Approach:**

* Create a port sniffer - responses return OS
* Geolocate machines with the resolved IP addresses
* Either search for a specific machine, or combile and/or query a database needed of known exploitable machines (e.g. [shodan](http://www.shodanhq.com/))

<iframe src="http://nbviewer.ipython.org/7589366" width="900" height="500"></iframe>

#### Other easy tricks 

* VoIP calls: protocol filter = SIP
* Can easily read Chrome/Firefox/Skype sqlite databases once inside someone's machine
* Physical location of where you've connected to - can get the SSID via wireshark/scapy, and use wigle.net to search by SSID



[constitution]: http://www.archives.gov/exhibits/charters/constitution.html
[billofrights]: http://www.archives.gov/exhibits/charters/bill_of_rights_transcript.html
[pyconca]: http://pycon.ca
[pyconie]: http://python.ie/pycon/2013/
[scapy]: http://blah
[pygeoip]: http://blah
[geojson]:http://blah
[python-nmap]: http://blah
[pycones]: http://blah
[slides]: http://blah
[scapydocumentation]: http://blah