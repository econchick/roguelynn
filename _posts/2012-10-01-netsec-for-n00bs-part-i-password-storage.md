---
layout: post.html
title: 'NetSec for n00bs, part I: Password Storage'
tags: [netsec, programming]
category: [words]
---

In prepping for my interviews for my [newly acquired position]({{ get_url("/words/2012-09-25-from-n00b-to-engineer-in-one-year")}} "N00b to engineer") with Red Hat for the [FreeIPA][FreeIPA] project, I did my own crash course in studying net security/applied cryptography.  It's a very important subject, and I feel a lot of new developers rely on frameworks or libraries to implement this sort of 'stuff' for them without knowing what's going on.  So for those who are oblivious (like I was) to NetSec topics and concerns, here is some lo-down.


Back when I was in banking, on my local desktop I had a password-protected Excel spreadsheet of logins & passwords.  I thought I was one step above just saving my passwords in a plain-text file.  Since then, the bank has implemented a one-password storage system (although it added about 30 seconds for each system we wanted to log into).  A password-locked file is quite easy to break if someone wanted to.

Currently, it is expected that passwords are stored on systems not in plain text, known as hashes.  A [hash function][hash function] is used to produce a hash.  This type of function is considered 'one-way', where the hash algorithm will take a plain text phrase (e.g. a password, or anything like a name, social security number, etc) and put out a hash, but would not be able to reverse it - take the hash and put out the plain text.  If you put a hash into a hash function, you would get a new hash.  Common types of hash functions: [MD5][MD5], [SHA-1][SHA-1], [SHA-2][SHA2] 

MD5: "Message Digest Algorithm" produces a 128-bit hash.  While it is still widely used, since 1996 flaws have been discovered, making it very conceivable to break hashes. SHA-1: "Secure Hash Algorithm" produces a 160-bit hash.  Also widely used but also has security flaws in the algorithm itself (found around 2005). 

SHA-2: consists of 4 hash functions producing 244, 256, 384 or 512 bit hashes. While no attacks have been successful on SHA-2, its algorithm is similar to SHA-1.  It's still considered safe, but time is ticking. 

These hash functions are still decent enough for message passing, just not password storage. Another hash algorithm, [Bcrypt][Bcrypt], is thought to be more resistant to brute-force attacks.  This is because the algorithm adapts over time, basically lengthening the time it takes to create a hash, making it difficult to leverage increases in computer power. 

#### Two things to note with hash functions:
1. Don't implement your own hash function. Just don't.
2. Speed should not be a factor when hashing passwords.  Basically, the longer it takes to hash a password, the longer it takes for brute-force attacks.  Speedier algorithms like MD5 or SHA-1 is fine for message-passing and source verification, but not good for storing sensitive information. 

#### Is a hash enough?
No. Storing a hash of a password isn't enough.  If only a hash function is used to store a hash of plaintext, it'd be pretty easy to break it. For instance, if your password was 'password', it would have the same hash value as someone else who also uses the same password.  If someone were to break into a database of hashed passwords, it'd be very simple to do a quick frequency analysis, whichever hash is the most popular would probably be 'password' or something like '1234'. This is essentially called a [Rainbow Table][Rainbow Table], a set of reverse-engineered hashed passwords.  It is reasonable (in the amount of time spent, aka brute force) to create a rainbow table of passwords up to about 8 characters in length. 

#### So then what now? 
In order to combat the ease of creating rainbow tables, a [salt][salt] is added to the password before it is hashed.  It is very important that this salt is used only once, and is unique per user/password. For instance, if you use 'password' as your password, your salt could be (which would be decided behind the scenes) '1\$0-1209-1!@fkjl', so the input for the hash algorithm would be 'password'+'1\$0-1209-1!@fkjl'.  Your salt would not be used for anyone else's password.  So if someone else uses 'password', their salt would be something totally different, like 'sl;--90(d%', baring a different hash value for the same plaintext password. 

#### Side note 
If you're interested in the history of cryptography, breaking passwords and frequency analysis as well as a great history on computing, I would highly suggest [The Code Book: The Science of Secrecy from Ancient Egypt to Quantum Cryptography][The Code Book]. 

[Part II - Ciphers]({{ get_url("/words/2012-10-03-netsec-for-n00bs-part-ii-ciphers-symmetric")}} "Symmetric Ciphers")


[FreeIPA]: http://freeipa.org/page/Main_Page "FreeIPA"
[hash function]: http://en.wikipedia.org/wiki/Hash_function "Wiki: Hash Function"
[MD5]: http://en.wikipedia.org/wiki/MD5 "wiki: md5"
[SHA-1]: http://en.wikipedia.org/wiki/SHA-1 "Wiki: SHA-1"
[SHA-2]: http://en.wikipedia.org/wiki/SHA-2 "Wiki: SHA-2"
[Bcrypt]: http://en.wikipedia.org/wiki/Bcrypt "Wiki: Bcrypt"
[Rainbow Table]: http://en.wikipedia.org/wiki/Rainbow_table "Wiki: Rainbow table"
[salt]: http://en.wikipedia.org/wiki/Salt_(cryptography) "Wiki: Salt"
[The Code Book]: http://www.amazon.com/gp/product/B004IK8PLE/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B004IK8PLE&linkCode=as2&tag=roglyn-20 "The Code Book"
