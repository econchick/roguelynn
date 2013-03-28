---
layout: post.html
title: "Explain like I'm 5: Kerberos"
tags: [eli5, kerberos]
---

Explain like I’m 5 years old: Kerberos – what is Kerberos, and why should I care?

### In a nutshell

Basically, Kerberos comes down to just this:

* a protocol for authentication
* uses tickets to authenticate
* involves a trusted 3rd-party
* built on symetric-key crypto

You have a **ticket** – your username encrypted with the requested service’s key – and so long as it’s valid, you can access the requested service that is within a Kerberos realm.

Typically, this is used within corporate/internal environments. Perhaps you want to access the internal benefits site. Rather than re-entering your user/password credentials, your ticket (cached on your system) is used to authenticate allowing for single sign-on.

Your ticket is refreshed when you sign on to your computer, or when you `kinit USER` within your terminal.

For the trivia-loving folks, Kerberos’ name comes from [Greek mythology][Greek], the three-headed guard dog of [Hades](http://en.wikipedia.org/wiki/Hades). It’s pretty fitting since it takes a third-party (a Key Distribution Center) to authenticate between a client and a service or host machine.

<img class="displayed" src="http://upload.wikimedia.org/wikipedia/commons/7/71/Hades-et-Cerberus-III.jpg" width="300" height="450"/>


Now, the gritty details on how it works: 

### Kerberos Realm

An admin (or two, or many) creates a realm (or multiple) – the Kerberos realm – that will encompass all that is available to access.  Granted, **you** may not have access to certain services or host machines that is defined within the policy management – developers should not access anything finance related, stuff like that. But the realm(s) define what Kerberos manages in terms of who can access what. 

Your machine, the Client, lives within this realm, as well as the service you want to request and the Key Distribution Center (KDC).  In the example below, I separate out the Authoritative Server and the Ticket Granting Server, but both are within the KDC.

The example below describes what happens when you request something from an internal HTTP Service – like information on your benefits within your corporate intranet.

<img class="displayed" src="/assets/images/Kerb.001.jpg" width="500" height="400" alt="Kerberos Realm"/>


### You and the Authentication Server

You log into your machine with your username and password. Behind the scenes, your machine has created a secret key, a hash of your username and password.

You want to access an HTTP Service, so a plaintext request is sent to an Authentication Server, a part of the KDC.

<img class="displayed" src="/assets/images/Kerb.002.jpg" width="500" height="400" alt="Request"/>

The Authentication Server will check if you are in its database (e.g. LDAP) as well as the requested service (the HTTP service).

<img class="displayed" src="/assets/images/Kerb.003.jpg" width="500" height="400" alt="DB check"/>

If all is good, it will generate your Client Secret Key, based on your username and password, that you can decrypt. This is a shared secret between you and the Authentication Server.

The Authentiation Server will then send two messages back to you. One message is a Client Session Key for the Ticket Granting Server (also a part of the KDC) that is encrypted with your Client Secret Key.  Because your machine has the Client Secret Key, it can decrypt the Client/Ticket Granting Service Session Key.

<img class="displayed" src="/assets/images/Kerb.004.jpg" width="500" height="400" alt="Auth2Client"/>


The second message is the Ticket Granting Ticket that includes your client ID, network address, validity period of the ticket and the Client/Ticket Granting Server Session Key. This second message is encrypted with the Ticket Granting Server Secret Key.

<img class="displayed" src="/assets/images/Kerb.005.jpg" width="500" height="400" alt="ClientDecryptAuth"/>

### You and the Ticket Granting Server

Your machine can’t decode the second message (the Ticket Granting Ticket), so it sends two messages to the Ticket Granting Server.  One message is Ticket Granting Ticket that is encrypted with the Ticket Granting Server Secret Key, plus the identifier of the service that you want (access to the HTTP Service).

<img class="displayed" src="/assets/images/Kerb.006.jpg" width="500" height="400" alt="Client2TGS"/>

The other message that is sent to the Ticket Granting Service is an Authenticator that contains your client ID as well as a timestamp that is encrypted with the Client/Ticket Granting Server Session Key from the very first message received from the Authentication Server.

The Ticket Granting Server decrypts the first message and receives the Ticket Granting Ticket.

<img class="displayed" src="/assets/images/Kerb.007.jpg" width="500" height="400" alt="TGSDecrypt"/>

In order for the Ticket Granting Server to confirm your Client ID, timestamps and validity period of the Ticket, it decrypts the second message you sent, the Authenticator, with your Client/Ticket Granting Server Session Key it got from decrypting the Ticket Granting Ticket. 

The Ticket Granting Server then sends you two messages: the first is a ticket for you to talk to the HTTP service that contains information about your ID, the validity period of this ticket, network address, and a Client/HTTP Service Session Key, and is encrypted with the HTTP Service Secret Key. Only the HTTP Service can decrypt this new ticket.

<img class="displayed" src="/assets/images/Kerb.008.jpg" width="500" height="400" alt="TGS2Client"/>

The second message is the Client/HTTP Service Session Key that’s encrypted with the Client/Ticket Granting Server Session Key.

### You and the HTTP Service

Your machine then decrypts the last message with the Client/Ticket Granting Server Session key to obtain the Client/HTTP Service Session key. Your machine can’t, however, decrypt the ticket for the HTTP Service since it’s encrypted with the HTTP Service Secret Key.

<img class="displayed" src="/assets/images/Kerb.009.jpg" width="500" height="400" alt="ClientDecryptTGS"/>

Your machine then sends the first message that the Ticket Granting Server sent you, the ticket for the HTTP Service that is encrypted with the HTTP Service Secret Key. Your machine also then sends an Authenticator that contains your client ID plus a timestamp that is encrypted with the Client/Ticket Granting Server Session Key.

<img class="displayed" src="/assets/images/Kerb.010.jpg" width="500" height="400" alt="Client2HTTP"/>

The HTTP Service then decrypts your first message with its secret key to get your client ID, network address, validity period, and the Client/HTTP Service Session Key.

<img class="displayed" src="/assets/images/Kerb.011.jpg" width="500" height="400" alt="HTTPDecrypt"/>

It then decrypts your second message using the Client/HTTP Service Session Key. It can then compare the second message’s client ID and timestamp to the information decrypted from your first message.

The HTTP Service then sends an Authenticator message to you confirming its identity to you, with a message containing timestamp + 1 and is encrypted with the Client/HTTP Service Session key.

<img class="displayed" src="/assets/images/Kerb.012.jpg" width="500" height="400" alt="HTTPAuth"/>

Your machine receives the Authenticator message, and knows that it has to receive a message with timestamp + 1. It decrypts the message with the Client/HTTP Service Session Key.

<img class="displayed" src="/assets/images/Kerb.013.jpg" width="500" height="400" alt="ClientDecryptHTTP"/>

And now both you and the HTTP Service have been authenticated!

<img class="displayed" src="/assets/images/Kerb.014.jpg" width="500" height="400" alt="Authed"/>

In a future post, I’ll write up how to actually setup a server for Kerberos authentication.

---

Some current implementations of Kerberos:

* [Windows Active Directory](http://technet.microsoft.com/en-us/library/bb742516.aspx)
* [freeIPA](http://freeipa.org)
* [Heimdal](http://www.h5l.org/) 
* [GNU Shishi](http://www.gnu.org/software/shishi/)

Other resources for Kerberos:

* [Moron's Guide to Kerberos](http://content.hccfl.edu/pollock/AUnixSec/MoronsGuideToKerberos.htm)
* Video: [Kerberos Authentication Guide](http://www.youtube.com/watch?v=7-LjpO2nTJo)
* [RFC 4120: The Kerberos Network Authentication Service v5](http://www.ietf.org/rfc/rfc4120.txt)


[Greek]: "http://en.wikipedia.org/wiki/Kerberos_(protocol)#History_and_development"