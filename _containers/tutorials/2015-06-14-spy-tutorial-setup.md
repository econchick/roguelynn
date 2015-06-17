---
title: "Computer Setup"
layout: tutorial.html
tags: [python, scapy, spy]
category: [tutorial]
given: "June 16th, 2015"
published: "June 16th, 2015"
---

# Overview

* <input type="checkbox"></input> General Requirements
* <input type="checkbox"></input> System-specific Setup: [Mac](#mac) | [Linux](#linux) | [Windows](#windows) | [Within your Browser](#within-your-browser) (last resort!)
* <input type="checkbox"></input> Check your setup

# Installation

**Requirements:**

* <input type="checkbox"></input> Python 2.x  (scapy is not ready for 3.x)
* <input type="checkbox"></input> virtualenv
* <input type="checkbox"></input> <a href="https://www.wireshark.org/download.html">Wireshark</a>


### Mac

##### Step 1

```bash
$ brew install nmap tcpdump graphviz imagemagick
```

##### Step 2

Virtual env:

```bash
(env) $ pip install "ipython[all]" scapy python-nmap pygeoip geojson pycrypto pypcap
# install libdnet into virtualenv
(env) $ $ wget http://libdnet.googlecode.com/files/libdnet-1.12.tgz
(env) $ tar xfz libdnet-1.12.tgz
(env) $ cd libdnet-1.12
(env) $ ./configure
(env) $ make
(env) $ sudo make install
(env) $ cd python
(env) $ pip install -e .
# install pylibpcap into virtualenv
(env) $ wget http://dfn.dl.sourceforge.net/sourceforge/pylibpcap/pylibpcap-0.6.4.tar.gz
(env) $ tar xfz pylibpcap-0.6.4.tar.gz
(env) $ cd pylibpcap-0.6.4
(env) $ pip install -e .
```

If installing `ipython[all]` doesn't work for some reason, you can download each package instead:

```bash
(env) $ pip ipython pyzmq jinja2 tornado mistune jsonschema pygments terminado functools32
```

### Linux

#### Ubuntu/Debian

##### Step 1

```bash
$ sudo apt-get install python-dev graphviz python-crypto nmap tcpdump  imagemagick libpcap0.8-dev libdnet
```

##### Step 2

Virtualenv:

```bash
(env) $ pip install "ipython[all]" scapy python-nmap pygeoip geojson pycrypto pypcap
```

If installing `ipython[all]` doesn't work for some reason, you can download each package instead:

```bash
(env) $ pip ipython pyzmq jinja2 tornado mistune jsonschema pygments terminado functools32
```

#### Fedora/RHEL/CentOS

*Caution* Not sure if this is the complete setup or if it works, sorry :-/

##### Step 1

```bash
$ sudo yum install python-devel graphviz python-crypto libpcap-devel nmap tcpdump imagemagick libdnet
```

##### Step 2

Virtualenv:

```bash
(env) $ pip install "ipython[all]" scapy python-nmap pygeoip geojson pycrypto pypcap
```

If installing `ipython[all]` doesn't work for some reason, you can download each package instead:

```bash
(env) $ pip ipython pyzmq jinja2 tornado mistune jsonschema pygments terminado functools32
```

### Windows

To be honest, I am not at all familiar with the Python On Windows ecosystem - here are links to system tools that need to be installed:

##### Step 1

[Scapy installation instructions](http://www.secdev.org/projects/scapy/doc/installation.html#windows) with the following packages (the rest we'll either pip install in a virtualenv, or do not need):

* <input type="checkbox"></input> pywin32
* <input type="checkbox"></input> WinPcap
* <input type="checkbox"></input> libdnet
* <input type="checkbox"></input> graphviz
* <input type="checkbox"></input> nmap


##### Step 2

Within a virtualenv:

```bash
(env) $ pip install "ipython[all]" scapy python-nmap pygeoip geojson pycrypto pypcap
```

If installing `ipython[all]` doesn't work for some reason, you can download each package instead:

```bash
(env) $ pip ipython pyzmq jinja2 tornado mistune jsonschema pygments terminado functools32
```

# Within your browser

**Sh*t not installing?**

If there is too much hassle, you can use my [tmpnb](https://github.com/jupyter/tmpnb) setup within your browser!

1. Navigate to [rogue.ly/spy-tmpnb](http://rogue.ly/spy-tmpnb)
2. Once you see your notebook (after tmpnb creates one for you) take note of the URL - that is unique to *you* and if you do not remember it, **YOUR NOTEBOOK IS LOST**.

I will *not* be keeping this tmpnb website up after tutorial (Amazon costs $$!) but I will show you how you can save your notebooks (via git and exporting individual files).

You can skip to #3 of **Notebook setup**.



# Check IPython Notebook setup

1. Launch IPython notebook (**must** be ran with `sudo`!):

```bash
(env) $ sudo ipython notebook
```

2. Then navigate to [localhost:8888](http://localhost:8888) in your local browser (not on the VM) to see the server (if it didn't pop up already)
3. In the upper right corner of your browser, you should see a button that says "New", select "Python 2":

	<img src="{{ get_asset('images/spytutorial/screenshot1.png') }}" class="img-responsive img-rounded center-block"/>

4. Once the new notebook launches:

	1. click on the "Untitled" text at the top:

		<img src="{{ get_asset('images/spytutorial/screenshot2.png') }}" class="img-responsive img-rounded center-block"/>

	2.  then create the title for your notebook (anything you want!):

		<img src="{{ get_asset('images/spytutorial/screenshot3.png') }}" class="img-responsive img-rounded center-block"/>


# Check env setup

Within the notebook, follow along with these commands.


1. Import scapy (yes that _is_ an `import *` - it's per the documentation, I swear!)

	```pycon
	>>> from scapy.all import *
	```

2. Import all other packages we'll be using:

	```pycon
	>>> import nmap
	>>> import pygeoip
	>>> import geojson
	```

## Issues
Did you get this OSError while trying to import scapy:


	OSError: Device not configured

Open up the scapy package in your virtualenv (e.g. `~/.virtualenvs/ipython-scapy/lib/python2.7/site-packages/scapy/`), within `arch/unix.py` file, around lines 32-37, add ` | grep -v vboxnet` within the `f.open` line (choose the OS thats appropriate (Mac OSX is in the `else` block, not `freebsd`)).  So for mac, change this:

```python
	else:
		f=os.popen("netstat -rn") # -f inet
```

to:

```python
	else:
		f=os.popen("netstat -rn | grep -v vboxnet") # -f inet
```
