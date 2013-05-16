---
layout: post.html
title: "Introduce Django to your old friends - or foes"
tags: [django, djangcon, conference, kerberos, integration]
category: [talks, words, circus]
---

This post is the write-up that goes along with my [DjangoCon EU talk](http://2013.djangocon.eu) with slides [here]() and video to come soon.  This is also an extention my previous Kerberos post, [Explain like I’m 5: Kerberos]( {{get_url("words/explain-like-im-5-kerberos/")}})

### Intro

Everyone has or has had a Pointy-Haired boss or client, right? micromanagement, incompetence, unaware?  …maybe I’m I the only one?

So your Pointy-haired boss/client needs an web application.  Perhaps it’s an internal web app that supposed to capitalize on synergy, streamline costs, leverage assets, all those other effing  <span id="buzzword">buzzwords</span>.

You hope to use postgres and django’s default auth mechanism, but no.  you have to use the corporate/internal authentication system. aka - single sign-on. We’re trying to avoid managing separate user credentials and needing to login to the required <span id="buzzword">mission-critical synergy</span> app.

Not to despair, my Djangonauts - you can <span id="buzzword">leverage</span> Django’s new custom user models!

### Problem: Make an internal Web App

So an overview of problem:

* need to integrate into internal authentication like Kerberos, LDAP, Active Directory
* can’t use Postgres for authentication - BUMMER
* leverage single sign-on within your app

### Crap. What is this single sign-on magic?!

* Enter: the new custom user model introduced in [Django 1.5](https://docs.djangoproject.com/en/dev/releases/1.5/#configurable-user-model)
    * allows for a different identifier than the basic User Model with username greater than 30 chars
    * username can be email, twitter, etc, or add those elements as requirements
    * great for Kerberos/LDAP/Active Directory authentication because often the username for those identity management systems is similar to email, `username@INTERNAL_DOMAIN`

### Scenario

Let’s create a dummy application: `./manage.py startapp synergizerApp`.  Just for the sake of simplicity, this is just a single django project with a single app.


#### Creating your custom user model

While you’re hooking into a pre-defined user database that will take care of authentication, and perhaps authorization, you’ll can still define a own custom model with inheriting from `AbstractUserBase` with your own additions, like so:

```python
# synergizerApp/models.py

from django.contrib.auth.models import AbstractBaseUser
from django.db import models

MAX_LENGTH = 254

class KerbUser(AbstractBaseUser):
    username = models.CharField(max_length=254, unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    email = models.EmailField(blank=True)
    syngery_level = models.IntegerField()
    is_team_player = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'syngery_level']

```

So now because you defined a custom user model, since we also require a synergy_level for the user, we’ll need to define a user manager to take care of creating users & superusers within Django.  

The key parts here are just defining what a user/superuser should have when creating one within Django, and referring to the UserManager within the user model itself.

```python
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class KerbUserManager(BaseUserManager):
    def create_user(self, email, synergy_level, password=None):
        user = self.model(email=email, synergy_level=synergy_level)
        # <--snip-->
        return user

    def create_superuser(self, email, synergy_level, password):
        user = self.create_user(email, synergy_level password=password)
        user.is_team_player = True
        user.save()
        return user


class KerbUser(AbstractBaseUser):
    username = models.CharField(max_length=MAX_LENGTH, unique=True)

    # <--snip-->

    objects = KerbUserManager()
``` 

Just a few variables should be set within `settings.py` file to make Django a <span id="buzzword">team player</span>:

```python
# settings.py

# <--snip-->
AUTH_USER_MODEL = 'synergizerApp.KerbUser'

MIDDLEWARE_CLASSES = (
    ...
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.RemoteUserMiddleware',
    ...
)

AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.RemoteUserBackend',
)

# <--snip-->
```


**Note:** The order of middleware is very important: the `AuthenticationMiddleware` must precede `RemoteUserMiddleware`.

If want to use `user` from the Kerberos' `user@REALM` as the username, you can simply extend `RemoteUserBackend`:
    
```python
# synergizerApp/krb5.py

from django.contrib.auth.backends import RemoteUserBackend

class Krb5RemoteUserBackend(RemoteUserBackend):
    def clean_username(self, username):
        # remove @REALM from username
        return username.split("@")[0] 
```

and `settings.py` for your custom backend defined above:

```python
# settings.py

# <--snip-->
AUTHENTICATION_BACKENDS = (
    'appname.krb5.Krb5RemoteUserBackend',
)
# <--snip-->
```

To access the user within the models for your application, you’ll refer to the custom user model like so:

```python
# synergizerApp/models.py

from django.conf import settings
from django.db import models

class Synergy(models.Model):
    money_sink = models.ForeignKey(settings.AUTH_USER_MODEL)
    # <--snip-->
```


### How do I Apache?

Alright, now that my application is done and the custom user is setup, how do I actually *hook* this into the internal network?

Apache is the <span id="antibuzz">anti-buzzword</span> if you will, but often you don’t have a choice.

#### Configuring Apache

On the host machine that will be running the Apache instance, make sure to install `mod_auth_kerb` for Kerberos, or `mod_authnz_ldap` for LDAP.

Within `/etc/httpd/conf.d/`, create another `.conf` file, for instance: `remote_user.conf`. You can also have this configuration within `.htaccess` in the desired protected directory itself. 

Configuration for Kerberos should look similar to:

```
# remote_user.conf or .htaccess
LoadModule auth_kerb_module modules/mod_auth_kerb.so
 
<Location /> 
    AuthName "DjangoConKerberos"
    AuthType Kerberos
    KrbMethodNegotiate On
    KrbMethodK5Passwd Off
    KrbServiceName HTTP/$FQDN
    KrbAuthRealms KERBEROS_DOMAIN
    Krb5KeyTab /path/to/http.keytab
    Require valid-user
 
    Order Deny,Allow
    Deny from all
</Location>
```

If using LDAP + Basic auth instead of Kerberos, Apache configuration should look similar to:

```
# remote_user.conf or .htaccess
LoadModule authnz_ldap_module modules/mod_authnz_ldap.so
 
<Location /> 
    AuthName "DjangoConLDAP"
    AuthType Basic
    AuthBasicProvider ldap
    AuthzLDAPAuthoritative Off
    AuthLDAPURL ldap://$LDAP_URL:389/CN=...
    AuthLDAPBindDN cn=myusername,cn=Users,...
    AuthLDAPBindPassword mypassword
    Require valid-user
 
    Order Deny,Allow
    Deny from all
</Location>
```

An important part of setting up Apache for an internal Kerberized system is getting a keytab for Apache.  Most likely, you won’t have access to get the needed keytab, and will need to request one from whoever manages the corporate identity system.  

However, it’s quite easy to spin up a test environment to see if the configuration is working correctly detailed [below](#setting-up-your-own-test-environment).

See [here](http://modauthkerb.sourceforge.net/configure.html) for more detailed information on the various configuration parameters for `mod_auth_kerb` + Apache, or [here](http://httpd.apache.org/docs/2.2/mod/mod_authnz_ldap.html) for LDAP + Apache configuration, and [here](http://www.netexpertise.eu/en/apache/authentication-against-active-directory.html) for Active Directory with LDAP + Apache configuration.

You will need to setup [wsgi configuration](https://docs.djangoproject.com/en/dev/howto/deployment/wsgi/) for Apache to actually serve your application.  

If, by some *odd* reason, you want or can use something other than Apache, there is a [mod_auth_kerb setup](https://github.com/fintler/nginx-mod-auth-kerb) for nginx.  **Disclaimer:** I have not used or tested nginx with Kerberos setup.

### Does it negotiate? Testing setup

#### cURL

I’d suggest to first try with `curl` to make sure the Apache + Kerberos setup is correct:

```
[vagrant@client]# kinit roguelynn
Password for roguelynn@ROOTCLOUD.COM:
[vagrant@client]# curl -I --negotiate -u : \
    https://synergizeapp.strategery.com

HTTP/1.1 401 Unauthorized
Date: Wed, 15 May 2013 09:10:18 GMT
Server: Apache/2.4.4 (Fedora)
WWW-Authenticate: Negotiate
Content-type text/html; charset=iso-8859-1

HTTP/1.1 200
Date: Wed, 15 May 2013 09:10:18 GMT
Server: Apache/2.4.4 (Fedora)
WWW-Authenticate: Negotiate sOmE_RanDom_T0k3n
...
```

The `--negotiate` flag flips on [SPNego](http://en.wikipedia.org/wiki/SPNEGO) for cURL, and the `-u :` forces cURL to pick up the authenticated user’s cached ticket from `kinit`’ing.  You can see your cached ticket with `klist`. 


#### requests.py

For `requests` fans:

```bash
$ kinit USERNAME
$ python
>>> import requests
>>> from requests_kerberos import HTTPKerberosAuth
>>> r = requests.get("$APACHE_PROTECTED_FQDN", auth=HTTPKerberosAuth())
>>> r.status_code
200
```

#### Browser

First, we’ll need to configure our browser to use Negotiate/SPNego:
        
* Safari – just “works”. Thanks, Apple.
* Chrome
    - Mac:

            open 'Google Chrome.app' --args\
                --auth-server-whitelist="*ROGUECLOUD.COM"\
                --auth-negotiate-delegate-whitelist="*KERBEROS_DOMAIN"\
                --auth-schemes="basic,digest,ntlm,negotiate"

    - Linux:

            google-chrome --enable-plugins --args\
                --auth-server-whitelist="*KERBEROS_DOMAIN"\
                --auth-negotiate-delegate-whitelist="*KERBEROS_DOMAIN"\
                --auth-schemes="basic,digest,ntlm,negotiate"
    - Windows: 

            chrome.exe --auth-server-whitelist="*KERBEROS_DOMAIN"\
                --auth-negotiate-delegate-whitelist="*ROGUECLOUD.COM"\
                --auth-schemes="basic,digest,ntlm,negotiate"
    - Firefox
        * Navigate to `about:config`
        * Search for "negotiate"
        * For `network.negotiate-auth.delegation-uris` add `.KERBEROS_DOMAIN`
        * For `network.negotiate-auth.trusted-uris` add `.KERBEROS_DOMAIN`
    - IE
        * Internet Options > Tools > Advanced Tab
        * Within Security section, select "Enable Integrated Windows Authentication"
        * Restart browser
       
* Authenticate yourself with `kinit USERNAME` within the terminal.  
* Finally, navigating to `$APACHE_PROTECTED_FQDN` within browser should then just work if everything is setup appropriately. 
* If prompted for Kerberos username/password, then Apache configuration maybe incorrect if you did not intend that, but should still authenticate with Kerberos credentials
    
### Authentication vs Authorization

So - I’m sure this isn’t news to anyone: there’s a difference between authentication and authorization.  First is who you are, the second is what you can do.  

Using RemoteUserBackend and Middleware doesn’t automatically grab what the user is authorized to do; it’s just authentication.  

However, if needed, there are ways to hook into the user database to grab permissions.

#### Accessing Permissions

Say your app needs to know if a user is defined as an Admin, or staff, a part of a particular group (e.g. "finance", "engineering") or something else that is already defined in your external auth system.  Customizing a backend is needed to connect directly to the external user datastore.

Typically, LDAP holds users in groups, through `memberOf` parameter or something similar.  By binding to the LDAP to find what group the user is a member of, you can then define what authorization that a user has within your own app logic.  e.g. if user is a member of “admins”, then create_superuser(user).  

* [django-auth-ldap](http://pythonhosted.org/django-auth-ldap) and/or [django-ldap-groups](https://code.google.com/p/django-ldap-groups) can be dropped into your Django app
* Or one of these snippets () - they are focused on Active Directory but so long as the configuration variables within your `settings.py` are correct, it should work with a standard LDAP or IPA setup:
    * [Active Directory](http://djangosnippets.org/snippets/501/)
    * [Active Directory over SSL](http://djangosnippets.org/snippets/901/)
    * [Active Directory/LDAP](http://djangosnippets.org/snippets/1397/)
    * [Active Directory with Groups](http://djangosnippets.org/snippets/2899/)
    
In a Kerberized environment, one approach may to be just getting another keytab for accessing the LDAP, although that requires the service to have wide read privileges.  

How I would approach it though, at least within an IPA environment (which stores its user information in an LDAP), is to capitalize on IPA’s use of [SSSD - System Security Services Daemon](https://fedorahosted.org/sssd/).  You can execute local system calls, like `getent group $USERNAME` and SSSD grabs the group the user is a member of.

### Setting up your own test environment

Naturally, you only care about coding and developing. I’ve made a [Vagrantfile](https://gist.github.com/econchick/99699a6fee2eb44d13b0) that spins up two VMs: an IPA server with a Kerberos KDC, and a client within the Kerberos realm that runs Apache, both on Fedora 18.

#### Setup your Kerberos test environment:

```
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

```
[vagrant@ipaserver]$ sudo ipactl status
[vagrant@ipaserver]$ sudo ipactl start
```

Be sure you can `kinit` on the server:

```
[vagrant@ipaserver]$ kinit admin
```

Now, ssh into the **client** via `vagrant ssh client`, then check to see if you can `kinit` to make sure this VM can connect to `ipaserver`’s KDC:

```
[vagrant@client]$ kinit admin
```

To push your app to the client VM, you can just copy your Django code to the `KerbTestEnvironment/synergizerApp/` directory we created earlier, and it will drop into Apache’s default directory, `/var/www/`.  You will need to configure Apache for wsgi. 

Then go on with the earlier described [testing](#does-it-negotiate-testing-setup).

#### Possible issues

* If you receive similar to the following error during `vagrant up $VM_NAME`: 

> The following SSH command responded with a non-zero exit status.
> Vagrant assumes that this means the command failed!
> /sbin/ifup p7p1 2> /dev/null

then apply [this](https://github.com/monvillalon/vagrant/commit/dc9830350a0f2be3bb7a4b4e9fcefaed66c6a26a) fix within Vagrant’s installation.  For my Mac OS X Mountain Lion + Vagrant v1.2.2 (most up-to-date at the time of this article), it was a bit tough to find the exact place where this fix should be made.  Wherever the vagrant gems are installed, find `plugins/guests/fedora/cap/configure_network.rb` to adjust the line that contains this:

```ruby
machine.communicate.sudo("/sbin/ifup p7p#{interface} 2> /dev/null")
```

to this:

```ruby
machine.communicate.sudo("/sbin/ifup p7p#{interface} 2> /dev/null",\
                          :error => false)
```

_(ya ya, a pull request containing this fix, or rather an update to ifup, should be made; who has time for that…)_

* If you get a clock skew error during `kinit` on the `ipaserver`, restart IPA via `sudo ipactl restart` and make sure `ntpd` is running with `service ntpd status`.

* If you get a clock skew error during `kinit` on the `client`, you’ll need to resync NTP. Try the following (you’ll have to do the `ntpdate` command at least twice to adjust the NTP clock to at most 300 seconds/5 minutes difference):

```
[vagrant@client]$ sudo killall ntpd
[vagrant@client]$ sudo ntpdate ipaserver.example.com
[vagrant@client]$ sudo ntpdate ipaserver.example.com
[vagrant@client]$ kinit admin
```

### Other resources

* [My post on How Kerberos Works]( {{ get_url("words/explain-like-im-5-kerberos/")}})
* [Using configurable user models in Django](http://procrastinatingdev.com/django/using-configurable-user-models-in-django-1-5/)
* [django-auth-ldap library](http://pythonhosted.org/django-auth-ldap)
* [Help with generic setup with django, virtualenv, and Apache’s mod_wsgi](http://www.sensibledevelopment.com/2011/01/a-generic-wsgi-file-for-deploying-django-with-virtualenv-and-mod_wsgi/) 
