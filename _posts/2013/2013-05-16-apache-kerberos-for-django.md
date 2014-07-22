---
layout: post.html
title: "Part 2: Apache and Kerberos for Django Authentication + Authorization"
tags: [django, djangcon, apache, kerberos, authentication, remote user]
category: [talks, words, circus, kerberos]
---

This is part 2 of a series of posts on setting up Django to use external authentication.  This post explains how to setup Apache for Django to use a corporate/internal authentication environment.


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

However, it’s quite easy to spin up a test environment to see if your configuration is working correctly.  I detail how to set one up in [part 3]({{ get_url("words/setting-up-a-kerberos-test-environment")}}) of this series.

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
>>> r = requests.get("$APACHE_PROTECTED_FQDN",\
                     auth=HTTPKerberosAuth())
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

Say your app needs to know if a user is defined as an admin, or staff, a part of a particular group (e.g. "finance", "engineering") or something else that is already defined in your external auth system.  Customizing a backend is needed to connect directly to the external user datastore.

Typically, LDAP holds users in groups, through `memberOf` parameter or something similar.  By binding to the LDAP to find what group the user is a member of, you can then define what authorization that a user has within your own app logic.  e.g. if user is a member of “admins”, then create_superuser(user).  

* [django-auth-ldap](http://pythonhosted.org/django-auth-ldap) and/or [django-ldap-groups](https://code.google.com/p/django-ldap-groups) can be dropped into your Django app
* Or one of these snippets (they are focused on Active Directory but so long as the configuration variables within your `settings.py` are correct, it should work with a standard LDAP or IPA setup):
    * [Active Directory](http://djangosnippets.org/snippets/501/)
    * [Active Directory over SSL](http://djangosnippets.org/snippets/901/)
    * [Active Directory/LDAP](http://djangosnippets.org/snippets/1397/)
    * [Active Directory with Groups](http://djangosnippets.org/snippets/2899/)
    
In a Kerberized environment, one approach may to be just getting another keytab for accessing the LDAP, although that requires the service to have wide read privileges.  

How I would approach it though, at least within an IPA environment (which stores its user information in an LDAP), is to capitalize on IPA’s use of [SSSD - System Security Services Daemon](https://fedorahosted.org/sssd/).  You can execute local system calls, like `getent group $USERNAME` and SSSD grabs the group the user is a member of.

### Resources

* [Help with generic setup with django, virtualenv, and Apache’s mod_wsgi](http://www.sensibledevelopment.com/2011/01/a-generic-wsgi-file-for-deploying-django-with-virtualenv-and-mod_wsgi/)
* Part 0: [Explain like I’m 5: Kerberos]( {{get_url("words/explain-like-im-5-kerberos/")}})
* Part 1: [Django 1.5 Custom User Models]( {{get_url("words/django-custom-user-models")}})
* Part 3: [Setting up a Kerberos test environment]({{ get_url("words/setting-up-a-kerberos-test-environment")}})