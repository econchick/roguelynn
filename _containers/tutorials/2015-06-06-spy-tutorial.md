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

