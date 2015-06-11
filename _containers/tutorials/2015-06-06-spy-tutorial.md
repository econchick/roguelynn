---
title: "How to Spy with Python - Part 1"
layout: tutorial.html
tags: [python, scapy, spy]
category: [tutorial]
url: /how-to-spy/
given: "June 16th, 2015"
published: "June 16th, 2015"
---


## Installation

**Requirement:** Python 2.x  (scapy is not ready for 3.x)

### Ubuntu

Since `scapy` requires access to network interfaces, we need to run scapy as root. And since we have a VM, we'll install everything globally:

```bash
$ sudo apt-get install tcpdump graphviz imagemagick python-gnuplot python-crypto python-pyx
$ sudo apt-get install pip
$ sudo pip install ipython pyzmq jinja2 tornado mistune jsonschema pygments terminado functools32 scapy "requests[security]"
```
	

### Mac

Make a new virtualenv and install the following:

```bash
$ mkvirtualenv tutorial
# install libdnet into virtualenv
(tutorial) $ $ wget http://libdnet.googlecode.com/files/libdnet-1.12.tgz
(tutorial) $ tar xfz libdnet-1.12.tgz
(tutorial) $ cd libdnet-1.12
(tutorial) $ ./configure
(tutorial) $ make 
(tutorial) $ sudo make install
(tutorial) $ cd python
(tutorial) $ pip install -e . 
# install pylibpcap into virtualenv
(tutorial) $ wget http://dfn.dl.sourceforge.net/sourceforge/pylibpcap/pylibpcap-0.6.4.tar.gz
(tutorial) $ tar xfz pylibpcap-0.6.4.tar.gz
(tutorial) $ cd pylibpcap-0.6.4
(tutorial) $ pip install -e .
# install scapy & ipython[all]
(tutorial) $ pip install "ipython[all]" scapy "requests[security]"
```


	

## Notebook setup

1. Launch IPython notebook:

	1. From the Virtual Machine:
	    ```bash
	    (tutorial) $ sudo ipython notebook --no-browser --ip=0.0.0.0
	    ```

	2. From your local machine:
		```bash
		(tutorial) $ sudo ipython notebook
		```

2. Then navigate to [localhost:8888](http://localhost:8888) in your local browser (not on the VM) to see the server (if it didn't pop up already)
3. In the upper right corner of your browser, you should see a button that says "New", select "Python 2":

	<img src="{{ get_asset('images/spytutorial/screenshot1.png') }}" class="img-responsive img-rounded center-block"/>

4. Once the new notebook launches:

	1. click on the "Untitled" text at the top: 
	
		<img src="{{ get_asset('images/spytutorial/screenshot2.png') }}" class="img-responsive img-rounded center-block"/>

	2.  then create the title for your notebook (anything you want!):
	
		<img src="{{ get_asset('images/spytutorial/screenshot3.png') }}" class="img-responsive img-rounded center-block"/>


## Quick intro to scapy

Within the notebook, follow along with these commands:

1. Import scapy (yes that _is_ an `import *` - it's per the documentation, I swear!)

	```pycon
	>>> from scapy.all import *
	```
	
2. Sniff traffic.  We'll use an already generated `cap` file so we're all on the same page:
	
	```pycon
	>>> import requests
	>>> URL = "http://wiki.wireshark.org/SampleCaptures?action=AttachFile&do=get&target=http.cap"
	>>> resp = requests.get(URL)
	>>> content = resp.content
	>>> sample_sniff = "http.cap"
	>>> with open(sample_sniff, "w") as f:
	    f.write(content)
	>>> pkts = sniff(offline=sample_sniff)
	```
		
3. Inspect a few packages by playing with the following commands:

	```pycon
	>>> pkts
	>>> pkts.res
 	>>> pkts.res[3]
 	>>> pkts.res[3].show()
 	>>> pkts.res[3].getlayer(Raw)
 	>>> raw = pkts.res[3].getlayer(Raw)
 	>>> load = raw.fields.get('load')
 	>>> print load
 	```

## Now the fun stuff!!

The following "spy tactics"/queries have been inspired by The Guardian's [article](http://www.theguardian.com/world/2013/jul/31/nsa-top-secret-program-online-data) and release of an internal [presentation](http://www.theguardian.com/world/interactive/2013/jul/31/nsa-xkeyscore-program-full-presentation) both on XKeyScore, the NSA's tool that "collects nearly everything a user does on the internet".

**DISCLAIMER**

We are *not* sniffing live traffic.  All traffic (in `cap` or `pcap` files) were either found in a [common repository](http://wiki.wireshark.org/SampleCaptures) for testing purposes or _my own traffic_ that I'm not shy to share.  

In no way is this tutorial teaching how one can capture live traffic from unknowing victims, nor is it storing such traffic.

I am not condoning sitting in a cafe with free & unprotected wifi and [capturing your fellow coffee & free wifi lovers' traffic](https://wiki.wireshark.org/CaptureSetup/WLAN).  

## 1. Show me "everyone" that has search for $X term
 
_Inspired by [page 13](http://www.theguardian.com/world/interactive/2013/jul/31/nsa-xkeyscore-program-full-presentation) of the XKeyscore presentation._
 
Notes:

* This uses a pre-generated pcap file of Yahoo! search traffic that I generated, **TODO** where will the `cap` file be? already on the system or do they have to request it?
* Sniffing search traffic with Yahoo! or Google no longer works (as easily) now that every search is over HTTPS - but I wouldn't put it passed the NSA _at all_ to still be able to sniff HTTPS traffic <sup>[1](http://www.spiegel.de/international/germany/inside-the-nsa-s-war-on-internet-security-a-1010361.html)</sup>
* While generating this traffic, I made a number of search queries that `scapy` captured.

### Tutorial code!

First thing's first: import scapy.

```pycon
>>> from scapy.all import *
```

Load the already sniffed `cap` file:  **TODO** for blog, put data somewhere to download

```pycon
>>> sniffed = "data/yahoo_search.cap"
>>> pkts = sniff(offline=sniffed)
```

From printing `pkts` we can see there are 300 TCP packets sniffed:

```pycon
>>> pkts
<Sniffed: TCP:300 UDP:0 ICMP:0 Other:0>
```

We can visualize all the 300 packets nicely with the `nsummary` method.  Here, we see the packet number, the layers each packet touched (`Ether`, `IP`, `TCP`), the from & to IP address & port (`10.25.3.61:53261 > 74.6.239.58:http`, and the associated TCP flag(s) (e.g. `S` for SYN, `SA` for SYN-ACK, `A` for ACK, etc).

```pycon
>>> pkts.nsummary()
0000 Ether / IP / TCP 10.25.3.61:53261 > 74.6.239.58:http S
0001 Ether / IP / TCP 10.25.3.61:53262 > 74.6.239.58:http S
0002 Ether / IP / TCP 10.25.3.61:53263 > 74.6.239.58:http S
0003 Ether / IP / TCP 74.6.239.58:http > 10.25.3.61:53261 SA
0004 Ether / IP / TCP 10.25.3.61:53261 > 74.6.239.58:http A
0005 Ether / IP / TCP 74.6.239.58:http > 10.25.3.61:53263 SA
0006 Ether / IP / TCP 10.25.3.61:53263 > 74.6.239.58:http A
0007 Ether / IP / TCP 74.6.239.58:http > 10.25.3.61:53262 SA
# <-- snipped -->
```

I went through this myself and picked out my own search queries. I didn't go through each and every one.  

Looking at the `nsummary` print out helped a bit:

* The first packets (about up to #7 or #8) was the [three-way handshake](http://en.wikipedia.org/wiki/Transmission_Control_Protocol#Connection_establishment) that my browser & Yahoo's servers were doing.
* It looks like the browser actually sends out three initial requests (packets 0-2) from different ports (`53261`, `53262` and `53263`).  All of them are answered by Yahoo, but only one (looks like the one that was first answered) is maintained since around packets 69-78 the extra connections are closed.
* Looking at the first packet that has a payload (`Raw`) - #9 - it's actually a request for a GIF file (initiated by JavaScript as `search.yahoo.com` was loading).  Packet #10 is TCP acknowledging the request, followed by packet #11  answering that request (and #12 was my computer sending an ACK back):

```pycon
>>> print pkts[9].getlayer(Raw).fields.get("load")
GET /beacon/tpc.gif?1385107348163 HTTP/1.1
Host: search.yahoo.com
Connection: keep-alive
Accept: image/webp,*/*;q=0.8
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36
Referer: http://www.yahoo.com/
Accept-Encoding: gzip,deflate,sdch
Accept-Language: en-US,en;q=0.8
Cookie: B=fmelok594jgu2&b=4&d=9My3dg1pYEKiuRrxoAZSeDlKr2E-&s=8r&i=SJ7ecf8eDYjFgm.CEdnr; AO=o=0; YLS=v=1&p=1&n=1; F=a=I.qqZFgMvSp1SMQ7oNaJGIBu5DAJGO25SeRxXSKxg6_KZLWHQMHEkeFQrEOxAH9BOvMhwKs-&b=.hBp; Y=v=1&n=fr6nunkr11qks&l=he6k4bodd/o&p=f2m0000012000000&r=s2&lg=en-US&intl=us; PH=fn=y6c0g_45mcwg7KWXkw--&l=en-US&i=us; T=z=ON/aSBOhmfSB1lHkNiODnkPNjE3NAY2Tzc2MzM3NE80TjU1Tz&a=QAE&sk=DAAF.nnTb.zm2Z&ks=EAAYagoFcceuicuyKS3Hedvyw--~E&d=c2wBTVRZd013RXhPREF4TkRRd016Z3pPVEl5T0RFeE9BLS0BYQFRQUUBZwFLQlpRU1ZQUUU2M08ySzZZSFhLNUhJM0lTNAFzY2lkAVhVcFJteThneVhoaHBnQTFtUFNFWFpuNGhRby0BYWMBQUEubXY1WFkBdGlwAXl3RUk2QgFzYwF3bAF6egFPTi9hU0JBN0U-; RMBX=fmelok594jgu2&b=3&s=d3&t=272; ucs=bnas=0; ypcdb=ed5b0797a14f0ea18283ede3ea93b8da; HP=0; U=mt=NLhoXp2MhYjabR2j3EWFBE6cyG.VfVjaXaxIUeuQ&ux=S.wjSB&un=fr6nunkr11qks; DNR=1
```

```pycon
>>> pkts[11].getlayer(Raw).fields.get("load")
HTTP/1.1 200 OK
Date: Fri, 22 Nov 2013 08:01:09 GMT
P3P: policyref="http://info.yahoo.com/w3c/p3p.xml", CP="CAO DSP COR CUR ADM DEV TAI PSA PSD IVAi IVDi CONi TELo OTPi OUR DELi SAMi OTRi UNRi PUBi IND PHY ONL UNI PUR FIN COM NAV INT DEM CNT STA POL HEA PRE LOC GOV"
Cache-Control: public, max-age=3600
Last-Modified: Thu, 21 Nov 2013 04:17:03 GMT
Accept-Ranges: bytes
Content-Length: 43
Content-Type: image/gif
Age: 78
Connection: keep-alive
Server: ATS/4.0.1

GIF89a����!�,D;
```

Cool! 

After the `ACK` of that packet is my first search query!  Let's take a look at the packet itself:

```pycon
>>> pkts[13].show()
###[ Ethernet ]###
  dst       = 00:1d:70:df:2d:11
  src       = 14:10:9f:e1:54:9b
  type      = 0x800
###[ IP ]###
     version   = 4L
     ihl       = 5L
     tos       = 0x0
     len       = 1326
     id        = 46863
     flags     = DF
     frag      = 0L
     ttl       = 64
     proto     = tcp
     chksum    = 0x3824
     src       = 10.25.3.61
     dst       = 74.6.239.58
     \options   \
###[ TCP ]###
        sport     = 53261
        dport     = http
        seq       = 3423575952
        ack       = 4075941136
        dataofs   = 8L
        reserved  = 0L
        flags     = PA
        window    = 8192
        chksum    = 0xe264
        urgptr    = 0
        options   = [('NOP', None), ('NOP', None), ('Timestamp', (1222792299, 196988544))]
###[ Raw ]###
           load      = 'GET /search;_ylt=ApD.LW7jivmrlmZzNKxChqqbvZx4?p=Python&toggle=1&cop=mss&ei=UTF-8&fr=yfp-t-140 HTTP/1.1\r\nHost: search.yahoo.com\r\nConnection: keep-alive\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8\r\nUser-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36\r\nReferer: http://www.yahoo.com/\r\nAccept-Encoding: gzip,deflate,sdch\r\nAccept-Language: en-US,en;q=0.8\r\nCookie: B=fmelok594jgu2&b=4&d=9My3dg1pYEKiuRrxoAZSeDlKr2E-&s=8r&i=SJ7ecf8eDYjFgm.CEdnr; AO=o=0; YLS=v=1&p=1&n=1; F=a=I.qqZFgMvSp1SMQ7oNaJGIBu5DAJGO25SeRxXSKxg6_KZLWHQMHEkeFQrEOxAH9BOvMhwKs-&b=.hBp; Y=v=1&n=fr6nunkr11qks&l=he6k4bodd/o&p=f2m0000012000000&r=s2&lg=en-US&intl=us; PH=fn=y6c0g_45mcwg7KWXkw--&l=en-US&i=us; T=z=ON/aSBOhmfSB1lHkNiODnkPNjE3NAY2Tzc2MzM3NE80TjU1Tz&a=QAE&sk=DAAF.nnTb.zm2Z&ks=EAAYagoFcceuicuyKS3Hedvyw--~E&d=c2wBTVRZd013RXhPREF4TkRRd016Z3pPVEl5T0RFeE9BLS0BYQFRQUUBZwFLQlpRU1ZQUUU2M08ySzZZSFhLNUhJM0lTNAFzY2lkAVhVcFJteThneVhoaHBnQTFtUFNFWFpuNGhRby0BYWMBQUEubXY1WFkBdGlwAXl3RUk2QgFzYwF3bAF6egFPTi9hU0JBN0U-; RMBX=fmelok594jgu2&b=3&s=d3&t=272; ucs=bnas=0; ypcdb=ed5b0797a14f0ea18283ede3ea93b8da; HP=0; U=mt=NLhoXp2MhYjabR2j3EWFBE6cyG.VfVjaXaxIUeuQ&ux=S.wjSB&un=fr6nunkr11qks; DNR=1\r\n\r\n'
```

Ah that looks like an interesting `Raw` payload!  We can take a look at it again with it printed nicely:

```pycon
>>> print pkts[13].getlayer(Raw).fields.get("load")

GET /search;_ylt=ApD.LW7jivmrlmZzNKxChqqbvZx4?p=Python&toggle=1&cop=mss&ei=UTF-8&fr=yfp-t-140 HTTP/1.1
Host: search.yahoo.com
Connection: keep-alive
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36
Referer: http://www.yahoo.com/
Accept-Encoding: gzip,deflate,sdch
Accept-Language: en-US,en;q=0.8
Cookie: B=fmelok594jgu2&b=4&d=9My3dg1pYEKiuRrxoAZSeDlKr2E-&s=8r&i=SJ7ecf8eDYjFgm.CEdnr; AO=o=0; YLS=v=1&p=1&n=1; F=a=I.qqZFgMvSp1SMQ7oNaJGIBu5DAJGO25SeRxXSKxg6_KZLWHQMHEkeFQrEOxAH9BOvMhwKs-&b=.hBp; Y=v=1&n=fr6nunkr11qks&l=he6k4bodd/o&p=f2m0000012000000&r=s2&lg=en-US&intl=us; PH=fn=y6c0g_45mcwg7KWXkw--&l=en-US&i=us; T=z=ON/aSBOhmfSB1lHkNiODnkPNjE3NAY2Tzc2MzM3NE80TjU1Tz&a=QAE&sk=DAAF.nnTb.zm2Z&ks=EAAYagoFcceuicuyKS3Hedvyw--~E&d=c2wBTVRZd013RXhPREF4TkRRd016Z3pPVEl5T0RFeE9BLS0BYQFRQUUBZwFLQlpRU1ZQUUU2M08ySzZZSFhLNUhJM0lTNAFzY2lkAVhVcFJteThneVhoaHBnQTFtUFNFWFpuNGhRby0BYWMBQUEubXY1WFkBdGlwAXl3RUk2QgFzYwF3bAF6egFPTi9hU0JBN0U-; RMBX=fmelok594jgu2&b=3&s=d3&t=272; ucs=bnas=0; ypcdb=ed5b0797a14f0ea18283ede3ea93b8da; HP=0; U=mt=NLhoXp2MhYjabR2j3EWFBE6cyG.VfVjaXaxIUeuQ&ux=S.wjSB&un=fr6nunkr11qks; DNR=1
```

Now - since while I was searching, I took note of how the search query was sent over the URL (query parameters).  We can also see the actual URL that was requested after I pressed "Enter" with my search query from the `GET` URL:

```
GET /search;_ylt=ApD.LW7jivmrlmZzNKxChqqbvZx4?p=Python&toggle=1&cop=mss&ei=UTF-8&fr=yfp-t-140
```

Taking a look towards the end of the string, we see `?p=`.  So the actual text after the `?p=` and before the first `&` is what we're looking for.  Doing some quick parsing:

```pycon
>>> raw_layer_13 = pkts[13].getlayer(Raw)
>>> first_query = raw_layer_13.fields.get("load").split("?p=")[1].split("&")[0]
>>> print first_query
Python
```

Well, duh :) what else would I dummy-search for?!

Let's look at some other packets.  Feel free to inspect packets beyond the listed below.  However, there were only a total of 4 search queries (if I remember correctly...) including the one that we just did.

So here's my second search:

```pycon
>>> pkts[79].show()
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

```pycon
>>> print pkts[79].getlayer(Raw).fields.get("load")
GET /search;_ylt=A0oG7mGUD49SBxcA3WpXNyoA;_ylc=X1MDMjc2NjY3OQRfcgMyBGJjawNmbWVsb2s1OTRqZ3UyJTI2YiUzRDQlMjZkJTNEOU15M2RnMXBZRUtpdVJyeG9BWlNlRGxLcjJFLSUyNnMlM0Q4ciUyNmklM0RTSjdlY2Y4ZURZakZnbS5DRWRucgRjc3JjcHZpZANHcC5VRjBnZXVyRDdPcmloVWtuRHdnWUFYWjUwR1ZLUEQ1UUFCc3hpBGZyA3lmcC10LTE0MARmcjIDc2ItdG9wBGdwcmlkA2NlVHN4WXhzUWIuOW51aGNlWG9TTUEEbXRlc3RpZANBRDAxJTNEU01FMzQxJTI2QURTUlAlM0RBRFNSUEMxJTI2QVNTVCUzRFZJUDI4OSUyNk1TRlQlM0RNU1kwMTAlMjZVSTAxJTNEVUlDMSUyNlVOSSUzRFJDRjA0NARuX3JzbHQDMTAEbl9zdWdnAzgEb3JpZ2luA3NlYXJjaC55YWhvby5jb20EcG9zAzAEcHFzdHIDBHBxc3RybAMEcXN0cmwDNgRxdWVyeQNNYWRyaWQEdF9zdG1wAzEzODUxMDczNTU4MzEEdnRlc3RpZANVSUMx?p=Madrid&fr2=sb-top&fr=yfp-t-140 HTTP/1.1
Host: search.yahoo.com
Connection: keep-alive
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36
Referer: http://search.yahoo.com/search;_ylt=ApD.LW7jivmrlmZzNKxChqqbvZx4?p=Python&toggle=1&cop=mss&ei=UTF-8&fr=yfp-t-140
Accept-Encoding: gzip,deflate,sdch
Accept-Language: en-US,en;q=0.8
Cookie: B=fmelok594jgu2&b=4&d=9My3dg1pYEKiuRrxoAZSeDlKr2E-&s=8r&i=SJ7ecf8eDYjFgm.CEdnr; AO=o=0; YLS=v=1&p=1&n=1; F=a=I.qqZFgMvSp1SMQ7oNaJGIBu5DAJGO25SeRxXSKxg6_KZLWHQMHEkeFQrEOxAH9BOvMhwKs-&b=.hBp; Y=v=1&n=fr6nunkr11qks&l=he6k4bodd/o&p=f2m0
```

```pycon
>>> raw_layer_79 = pkts[79].getlayer(Raw)
>>> first_query = raw_layer_79.fields.get("load").split("?p=")[1].split("&")[0]
>>> print first_query
Madrid
```

Can you tell I did this as I was preparing for [PyCon Spain 2013](https://www.youtube.com/watch?v=VlfxlXXkAGg&index=39&list=PLahUDl6AAwrjN_L2TtIC6e4tXqC7SJkva) in Madrid? :D

My third search:

```pycon
>>> pkts[148].show()
###[ Ethernet ]###
  dst       = 00:1d:70:df:2d:11
  src       = 14:10:9f:e1:54:9b
  type      = 0x800
###[ IP ]###
     version   = 4L
     ihl       = 5L
     tos       = 0x0
     len       = 1420
     id        = 53279
     flags     = DF
     frag      = 0L
     ttl       = 64
     proto     = tcp
     chksum    = 0x1eb6
     src       = 10.25.3.61
     dst       = 74.6.239.58
     \options   \
###[ TCP ]###
        sport     = 53261
        dport     = http
        seq       = 3423579272
        ack       = 4076030170
        dataofs   = 8L
        reserved  = 0L
        flags     = A
        window    = 8192
        chksum    = 0xc77f
        urgptr    = 0
        options   = [('NOP', None), ('NOP', None), ('Timestamp', (1222808453, 196997434))]
###[ Raw ]###
           load      = 'GET /search;_ylt=A0oG7mGbD49Sk08A791XNyoA;_ylc=X1MDMjc2NjY3OQRfcgMyBGJjawNmbWVsb2s1OTRqZ3UyJTI2YiUzRDQlMjZkJTNEOU15M2RnMXBZRUtpdVJyeG9BWlNlRGxLcjJFLSUyNnMlM0Q4ciUyNmklM0RTSjdlY2Y4ZURZakZnbS5DRWRucgRjc3JjcHZpZANSRGg3WmtnZXVyRDdPcmloVWtuRHdnTzlYWjUwR1ZLUEQ1c0FCQXNyBGZyA3lmcC10LTE0MARmcjIDc2ItdG9wBGdwcmlkA0w3SnkybzF6UUFpTFpHdjRzM3ZZbUEEbXRlc3RpZANBRDAxJTNEU01FMzQxJTI2QURTUlAlM0RBRFNSUEMxJTI2QVNTVCUzRFZJUDI4OSUyNk1TRlQlM0RNU1kwMTAlMjZVSTAxJTNEVUlDMSUyNlVOSSUzRFJDRjA0NARuX3JzbHQDMTAEbl9zdWdnAzgEb3JpZ2luA3NlYXJjaC55YWhvby5jb20EcG9zAzAEcHFzdHIDBHBxc3RybAMEcXN0cmwDMTYEcXVlcnkDSSBsb3ZlIGNob2NvbGF0ZQR0X3N0bXADMTM4NTEwNzM2NTQwMwR2dGVzdGlkA1VJQzE-?p=I+love+chocolate&fr2=sb-top&fr=yfp-t-140 HTTP/1.1\r\nHost: search.yahoo.com\r\nConnection: keep-alive\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8\r\nUser-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36\r\nReferer: http://search.yahoo.com/search;_ylt=A0oG7mGUD49SBxcA3WpXNyoA;_ylc=X1MDMjc2NjY3OQRfcgMyBGJjawNmbWVsb2s1OTRqZ3UyJTI2YiUzRDQlMjZkJTNEOU15M2RnMXBZRUtpdVJyeG9BWlNlRGxLcjJFLSUyNnMlM0Q4ciUyNmklM0RTSjdlY2Y4ZURZakZnbS5DRWRucgRjc3JjcHZpZANHcC5VRjBnZXVyRDdPcmloVWtuRHdnWUFYWjUwR1ZLUEQ1UUFCc3hpBGZyA3lmcC10LTE0MARmcjIDc2ItdG9wBGdwcmlkA2NlVHN4WXhzUWIuOW51aGNlWG9TTUEEbXRlc3RpZANBRDAxJTNEU01FMzQxJTI2QURTUlAlM0R'
```

```pycon
>>> print pkts[148].getlayer(Raw).fields.get("load")
GET /search;_ylt=A0oG7mGbD49Sk08A791XNyoA;_ylc=X1MDMjc2NjY3OQRfcgMyBGJjawNmbWVsb2s1OTRqZ3UyJTI2YiUzRDQlMjZkJTNEOU15M2RnMXBZRUtpdVJyeG9BWlNlRGxLcjJFLSUyNnMlM0Q4ciUyNmklM0RTSjdlY2Y4ZURZakZnbS5DRWRucgRjc3JjcHZpZANSRGg3WmtnZXVyRDdPcmloVWtuRHdnTzlYWjUwR1ZLUEQ1c0FCQXNyBGZyA3lmcC10LTE0MARmcjIDc2ItdG9wBGdwcmlkA0w3SnkybzF6UUFpTFpHdjRzM3ZZbUEEbXRlc3RpZANBRDAxJTNEU01FMzQxJTI2QURTUlAlM0RBRFNSUEMxJTI2QVNTVCUzRFZJUDI4OSUyNk1TRlQlM0RNU1kwMTAlMjZVSTAxJTNEVUlDMSUyNlVOSSUzRFJDRjA0NARuX3JzbHQDMTAEbl9zdWdnAzgEb3JpZ2luA3NlYXJjaC55YWhvby5jb20EcG9zAzAEcHFzdHIDBHBxc3RybAMEcXN0cmwDMTYEcXVlcnkDSSBsb3ZlIGNob2NvbGF0ZQR0X3N0bXADMTM4NTEwNzM2NTQwMwR2dGVzdGlkA1VJQzE-?p=I+love+chocolate&fr2=sb-top&fr=yfp-t-140 HTTP/1.1
Host: search.yahoo.com
Connection: keep-alive
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36
Referer: http://search.yahoo.com/search;_ylt=A0oG7mGUD49SBxcA3WpXNyoA;_ylc=X1MDMjc2NjY3OQRfcgMyBGJjawNmbWVsb2s1OTRqZ3UyJTI2YiUzRDQlMjZkJTNEOU15M2RnMXBZRUtpdVJyeG9BWlNlRGxLcjJFLSUyNnMlM0Q4ciUyNmklM0RTSjdlY2Y4ZURZakZnbS5DRWRucgRjc3JjcHZpZANHcC5VRjBnZXVyRDdPcmloVWtuRHdnWUFYWjUwR1ZLUEQ1UUFCc3hpBGZyA3lmcC10LTE0MARmcjIDc2ItdG9wBGdwcmlkA2NlVHN4WXhzUWIuOW51aGNlWG9TTUEEbXRlc3RpZANBRDAxJTNEU01FMzQxJTI2QURTUlAlM0R
```

```pycon
>>> raw_layer_148 = pkts[148].getlayer(Raw)
>>> second_query = raw_layer_148.fields.get("load").split("?p=")[1].split("&")[0]
>>> print second_query
I+love+chocolate
```

Yeah I was getting _very_ uncreative.  Really hard to creatively think on the spot when scapy is listening to your every move...

My last search query:

```pycon
>>> pkts[227].show()
###[ Ethernet ]###
  dst       = 00:1d:70:df:2d:11
  src       = 14:10:9f:e1:54:9b
  type      = 0x800
###[ IP ]###
     version   = 4L
     ihl       = 5L
     tos       = 0x0
     len       = 1420
     id        = 41135
     flags     = DF
     frag      = 0L
     ttl       = 64
     proto     = tcp
     chksum    = 0x4e26
     src       = 10.25.3.61
     dst       = 74.6.239.58
     \options   \
###[ TCP ]###
        sport     = 53261
        dport     = http
        seq       = 3423581915
        ack       = 4076082191
        dataofs   = 8L
        reserved  = 0L
        flags     = A
        window    = 8192
        chksum    = 0xbedd
        urgptr    = 0
        options   = [('NOP', None), ('NOP', None), ('Timestamp', (1222823977, 197006887))]
###[ Raw ]###
           load      = 'GET /search;_ylt=A0oG7mGkD49SBxcAgG1XNyoA;_ylc=X1MDMjc2NjY3OQRfcgMyBGJjawNmbWVsb2s1OTRqZ3UyJTI2YiUzRDQlMjZkJTNEOU15M2RnMXBZRUtpdVJyeG9BWlNlRGxLcjJFLSUyNnMlM0Q4ciUyNmklM0RTSjdlY2Y4ZURZakZnbS5DRWRucgRjc3JjcHZpZANMNXJWdlVnZXVyRDdPcmloVWtuRHdnWVBYWjUwR1ZLUEQ2UUFET0k3BGZyA3lmcC10LTE0MARmcjIDc2ItdG9wBGdwcmlkA2RwX1hiWmQuUWFhUHJMeEkwX0RtT0EEbXRlc3RpZANBRDAxJTNEU01FMzQxJTI2QURTUlAlM0RBRFNSUEMxJTI2QVNTVCUzRFZJUDI4OSUyNk1TRlQlM0RNU1kwMTAlMjZVSTAxJTNEVUlDMSUyNlVOSSUzRFJDRjA0NARuX3JzbHQDMTAEbl9zdWdnAzgEb3JpZ2luA3NlYXJjaC55YWhvby5jb20EcG9zAzAEcHFzdHIDBHBxc3RybAMEcXN0cmwDMTcEcXVlcnkDQmx1ZSBCb3R0bGUgQ29mZmUEdF9zdG1wAzEzODUxMDczODExMjEEdnRlc3RpZANVSUMx?p=Blue+Bottle+Coffe&fr2=sb-top&fr=yfp-t-140 HTTP/1.1\r\nHost: search.yahoo.com\r\nConnection: keep-alive\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8\r\nUser-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36\r\nReferer: http://search.yahoo.com/search;_ylt=A0oG7mGbD49Sk08A791XNyoA;_ylc=X1MDMjc2NjY3OQRfcgMyBGJjawNmbWVsb2s1OTRqZ3UyJTI2YiUzRDQlMjZkJTNEOU15M2RnMXBZRUtpdVJyeG9BWlNlRGxLcjJFLSUyNnMlM0Q4ciUyNmklM0RTSjdlY2Y4ZURZakZnbS5DRWRucgRjc3JjcHZpZANSRGg3WmtnZXVyRDdPcmloVWtuRHdnTzlYWjUwR1ZLUEQ1c0FCQXNyBGZyA3lmcC10LTE0MARmcjIDc2ItdG9wBGdwcmlkA0w3SnkybzF6UUFpTFpHdjRzM3ZZbUEEbXRlc3RpZANBRDAxJTNEU01FMzQxJTI2QURTUlAlM0'
```

```pycon
>>> print pkts[227].getlayer(Raw).fields.get("load")
GET /search;_ylt=A0oG7mGkD49SBxcAgG1XNyoA;_ylc=X1MDMjc2NjY3OQRfcgMyBGJjawNmbWVsb2s1OTRqZ3UyJTI2YiUzRDQlMjZkJTNEOU15M2RnMXBZRUtpdVJyeG9BWlNlRGxLcjJFLSUyNnMlM0Q4ciUyNmklM0RTSjdlY2Y4ZURZakZnbS5DRWRucgRjc3JjcHZpZANMNXJWdlVnZXVyRDdPcmloVWtuRHdnWVBYWjUwR1ZLUEQ2UUFET0k3BGZyA3lmcC10LTE0MARmcjIDc2ItdG9wBGdwcmlkA2RwX1hiWmQuUWFhUHJMeEkwX0RtT0EEbXRlc3RpZANBRDAxJTNEU01FMzQxJTI2QURTUlAlM0RBRFNSUEMxJTI2QVNTVCUzRFZJUDI4OSUyNk1TRlQlM0RNU1kwMTAlMjZVSTAxJTNEVUlDMSUyNlVOSSUzRFJDRjA0NARuX3JzbHQDMTAEbl9zdWdnAzgEb3JpZ2luA3NlYXJjaC55YWhvby5jb20EcG9zAzAEcHFzdHIDBHBxc3RybAMEcXN0cmwDMTcEcXVlcnkDQmx1ZSBCb3R0bGUgQ29mZmUEdF9zdG1wAzEzODUxMDczODExMjEEdnRlc3RpZANVSUMx?p=Blue+Bottle+Coffe&fr2=sb-top&fr=yfp-t-140 HTTP/1.1
Host: search.yahoo.com
Connection: keep-alive
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36
Referer: http://search.yahoo.com/search;_ylt=A0oG7mGbD49Sk08A791XNyoA;_ylc=X1MDMjc2NjY3OQRfcgMyBGJjawNmbWVsb2s1OTRqZ3UyJTI2YiUzRDQlMjZkJTNEOU15M2RnMXBZRUtpdVJyeG9BWlNlRGxLcjJFLSUyNnMlM0Q4ciUyNmklM0RTSjdlY2Y4ZURZakZnbS5DRWRucgRjc3JjcHZpZANSRGg3WmtnZXVyRDdPcmloVWtuRHdnTzlYWjUwR1ZLUEQ1c0FCQXNyBGZyA3lmcC10LTE0MARmcjIDc2ItdG9wBGdwcmlkA0w3SnkybzF6UUFpTFpHdjRzM3ZZbUEEbXRlc3RpZANBRDAxJTNEU01FMzQxJTI2QURTUlAlM0
```

```pycon
>>> raw_layer_227 = pkts[227].getlayer(Raw)
>>> third_query = raw_layer_227.fields.get("load").split("?p=")[1].split("&")[0]
>>> print third_query
Blue+Bottle+Coffe
```

Yes, I did in fact misspell coffee. Hush.