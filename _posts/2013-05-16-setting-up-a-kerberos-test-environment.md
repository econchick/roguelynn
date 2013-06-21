---
layout: post.html
title: "Part 3: Setting up a Kerberos test environment"
tags: [django, djangcon, apache, kerberos, authentication, remote user]
category: [talks, words, circus]
---

This is part 3 of a series of posts on setting up Django to use external authentication.  This post explains how to setup your own environment to test Django authentication against Apache and Kerberos/Active Directory/LDAP.

### Setting up your own test environment

Naturally, you only care about coding and developing. I’ve made a [Vagrantfile](https://gist.github.com/econchick/99699a6fee2eb44d13b0) that spins up two VMs: an IPA server with a Kerberos KDC, and a client within the Kerberos realm that runs Apache, both on Fedora 18.

#### Setup your Kerberos test environment:

```bash
$ git clone\
      https://gist.github.com/econchick/99699a6fee2eb44d13b0\
      KerbTestEnvironment
$ cd KerbTestEnvironment

# for a synced folder between local and Vagrant VM
$ mkdir synergizerApp  

# to spin up both machines at the same time:
$ vagrant up

# to spin up machines individually:
$ vagrant up ipaserver
$ vagrant up client
```

#### Using the test environment

To use your Kerberos test environment, make sure both VMs are up and running with `vagrant status`.  

First, ssh into the **server** via `vagrant ssh ipaserver` then check to see if the IPA service is up and running, and if not, start it up:

```bash
[vagrant@ipaserver]$ sudo ipactl status
[vagrant@ipaserver]$ sudo ipactl start
```

Be sure you can `kinit` on the server:

```bash
[vagrant@ipaserver]$ kinit admin
```

Now, ssh into the **client** via `vagrant ssh client`, then check to see if you can `kinit` to make sure this VM can connect to `ipaserver`’s KDC:

```bash
[vagrant@client]$ kinit admin
```

To push your app to the client VM, you can just copy your Django code to the `KerbTestEnvironment/synergizerApp/` directory we created earlier, and it will drop into Apache’s default directory, `/var/www/`.  You will need to configure Apache for wsgi. 

Then go on with the earlier described [testing](#does-it-negotiate-testing-setup).

#### Possible issues

* If you receive a similar error message during `vagrant up $VM_NAME`: 

> The following SSH command responded with a non-zero exit status.
> Vagrant assumes that this means the command failed!
> /sbin/ifup p7p1 2> /dev/null

then apply [this](https://github.com/monvillalon/vagrant/commit/dc9830350a0f2be3bb7a4b4e9fcefaed66c6a26a) fix within Vagrant’s installation.  For my Mac OS X Mountain Lion + Vagrant v1.2.2 (most up-to-date at the time of this article), it was a bit tough to find the exact place where this fix should be made.  Wherever the vagrant gems are installed, find `plugins/guests/fedora/cap/configure_network.rb` to adjust the line that contains this:

```ruby
machine.communicate.sudo("/sbin/ifup p7p#{interface} 2>\
                          /dev/null")
```

to this:

```ruby
machine.communicate.sudo("/sbin/ifup p7p#{interface} 2>\ 
                          /dev/null", :error_check => false)
```

_(ya ya, a pull request containing this fix, or rather an update to ifup, should be made; who has time for that…)_

* If you get a clock skew error during `kinit` on the `ipaserver`, restart IPA via `sudo ipactl restart` and make sure `ntpd` is running with `service ntpd status`.

* If you get a clock skew error during `kinit` on the `client`, you’ll need to resync NTP. Try the following (you’ll have to do the `ntpdate` command at least twice to adjust the NTP clock to at most 300 seconds/5 minutes difference):

```bash
[vagrant@client]$ sudo killall ntpd
[vagrant@client]$ sudo ntpdate ipaserver.example.com
[vagrant@client]$ sudo ntpdate ipaserver.example.com
[vagrant@client]$ kinit admin
```

### Resources

* [Setting up IPA](https://docs.fedoraproject.org/en-US/Fedora/17/html/FreeIPA_Guide/index.html)
* [User-contributed How-tos for IPA](http://freeipa.org/page/HowTos), including working with IPA, Interoperability with other systems, and 3rd party implementations.
* Part 0: [Explain like I’m 5: Kerberos]( {{get_url("words/explain-like-im-5-kerberos/")}})
* Part 1: [Django 1.5 Custom User Models]( {{get_url("words/django-custom-user-models")}})
* Part 3: [Setting up a Kerberos test environment]({{ get_url("words/setting-up-a-kerberos-test-environment")}})
