---
layout: post.html
title: "Part 1: Django 1.5 Custom User Models"
tags: [django, djangcon, custom user models]
category: [talks, words, circus, kerberos]
topic: kerberos
---

This is part 1 of a series of posts on setting up Django to use external authentication.  This post explains how to setup Django with custom user models for corporate/internal authentication methods.

### Intro

Everyone has or has had a Pointy-haired boss or client, right? micromanagement, incompetence, unaware?  Maybe you’re lucky?

So your Pointy-haired boss/client needs an web application.  Perhaps it’s an internal web app that supposed to capitalize on synergy, streamline costs, leverage assets, all those other effing  <span id="buzzword">buzzwords</span>.

You hope to use postgres and Django’s default auth mechanism, but no – you have to use the corporate/internal authentication system, a.k.a - [single sign-on](http://en.wikipedia.org/wiki/Single_sign-on). We’re trying to avoid managing separate user credentials and needing to login to the required <span id="buzzword">mission-critical synergy</span> app.

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

While you’re hooking into a pre-defined user database that will take care of authentication, and perhaps authorization, you can still define your own custom model by inheriting from `AbstractUserBase` with your own additions, like so:

```python
# synergizerApp/models.py

from django.contrib.auth.models import AbstractBaseUser
from django.db import models


class KerbUser(AbstractBaseUser):
    username = models.CharField(max_length=254, unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    email = models.EmailField(blank=True)
    synergy_level = models.IntegerField()
    is_team_player = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'synergy_level']

```

Because you defined a custom user model – requiring a `synergy_level` for the user – you’ll need to define a user manager to take care of creating users & superusers within Django.  

The key parts here are just defining what a user/superuser should have, and referring to the UserManager within the user model itself.

```python
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager)
from django.db import models

class KerbUserManager(BaseUserManager):
    def create_user(self, email, synergy_level, 
                    password=None):
        user = self.model(email=email, 
                          synergy_level=synergy_level)
        # <--snip-->
        return user

    def create_superuser(self, email, synergy_level,
                         password):
        user = self.create_user(email, synergy_level, 
                                password=password)
        user.is_team_player = True
        user.save()
        return user


class KerbUser(AbstractBaseUser):
    username = models.CharField(max_length=254, ...)

    # <--snip-->

    objects = KerbUserManager()
``` 

Within your custom user model, `KerbUser`, you will also need to define `get_full_name` and `get_short_name`, and `is_active` which defaults to `True`.

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

To access within your views:

```python
# synergizerApp/views.py

from django.contrib.auth import get_user_model

User = get_user_model()

# <--snip-->
```


### Other resources

* Part 0: [How Kerberos Works]( {{ get_url("words/explain-like-im-5-kerberos/")}})
* Part 2: [Apache and Kerberos for Django Authentication + Authorization]({{ get_url("words/apache-kerberos-for-django")}})
* Part 3: [Setting up a Kerberos test environment]({{ get_url("words/setting-up-a-kerberos-test-environment")}})
* [Using configurable user models in Django](http://procrastinatingdev.com/django/using-configurable-user-models-in-django-1-5/)

