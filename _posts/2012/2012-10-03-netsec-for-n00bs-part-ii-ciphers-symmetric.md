---
layout: post.html
title: 'NetSec for n00bs, part II: Ciphers (symmetric)'
tags: [cryptography, netsec, programming]
category: [words]
---

A continuation of [NetSec for n00bs, part I: Password Storage]({{ get_url("/words/2012-10-01-netsec-for-n00bs-part-i-password-storage")}} "Netsec for n00bs Part I") A cipher is basically an algorithm to perform encryption and decryption. 

Important to note: cipher algorithms, as opposed to hash algorithms, go both ways, meaning if you process a plain text to encrypted text using a cipher, you use that same cipher to decrypt the encrypted text back to plain text, aka symmetric key encryption. 

A very simple, widely known example (and not at all secure) is called a [Caesar Cipher][Caesar Cipher].  Let's say you are in primary school, and you want to write a note to your neighbor saying 'I think Jon is cute.'  But god forbid that either Jonor your teacher intercepts such a note!  Instead you are clever; for each letter in that phrase, you shift it in the alphabet by 3.

<pre>
    Plain :  ABCDEFGHIJKLMNOPQRSTUVWXYZ
    Cipher:  DEFGHIJKLMNOPQRSTUVWXYZABC
</pre>

Your message would read as: "l wklqn mrq lv fxwh." This would be pretty easy to break, no?  All you'd have to do is try each shift 25 times.  Or you can look at the ciphered text and see 'l' is used three times, once alone at the start of the phrase, once in the middle of the second word, and again in the fourth.  

In the English language, A & I are the only letters that can stand by themselves.  Seeing as how we intercepted a primary school girl's note, one can assume that the message would have herself as the subject of the phrase.  Assuming l = i, you have figured out the shift of the Caesar cipher, and can easily figure out the rest of the message. 

Adding some complexity to the Caesar cipher is the [Vigenère cipher][Vigenère cipher].  This one is very similar, but uses multiple Caesar ciphers based on a keyword. To expound on our example, let's say our keyword will be 'playground.'  We'd then use the (not so) [super secret decoder ring][super secret decoder ring] that Vigenere developed to encode with the keyword.

<pre>
    PLAINTEXT: ITHINKTHATJONISCUTE
    KEY WORD : PLAYGROUNDPLAYGROUN
    ENCRYPTED: XEHGTBHBNWYZNGYTINR
</pre>

The letter 'i' is paired up with 'p', so you'd use column 'i' and row 'p' in the super secret decoder ring, aka the Vigenere square, to get the ciphered letter.  This way, you'd only have to keep the keyword secret. In symmetric key encryption, the drawback is that both parties, the sender & the (intended) receiver of the message, need to know what the key is, as opposed to public-key encryption (will be part III of this series). 

Currently, the [Advanced Encryption Standard][Advanced Encryption Standard] (AES) is a well-respected specification for symmetric-key encryption, and became federal standard in the early 2000s and deemed suitable for 'secret' and 'top secret' information (with varying degrees of key length needed depending on which level of confidentiality is needed). While the algorithm is itself difficult to break (an attack on the algorithm itself [happened around 2009][happened around 2009] on certain versions of AES), side-channeling is effectively attacking an implementation of AES with a longer known history of attacks. 

Side-channeling is quite cool and devious, if I may say.  Attackers use information that the implemented AES system gives off: timing info, power consumption, etc.   If using a timing attack, one would 'listen' for how long it takes the hardware that holds the algorithm to compute cryptographic operations. Using statistical analysis, one can sometimes figure out the whole key. Alright I think that completes the part II of NetSec for n00bs.  Part III will continue on with asymmetric encryption/public key crypto.

[Part III - Public Key Crypo]({{ get_url("/words/2012-10-15-netsec-for-n00bs-part-iii-simple-intro-public-key-crypto")}} "Public Key Crypto")


[NetSec for n00bs]: http://www.roguelynn.com/2012/10/01/netsec-for-n00bs-part-i-password-storage/ "NetSec for n00bs, part I: Password Storage"
[Caesar Cipher]: http://en.wikipedia.org/wiki/Caesar_cipher "Wiki: Caesar Cipher"
[Vigenère cipher]: http://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher "wiki Vigenere cipher"
[super secret decoder ring]: http://en.wikipedia.org/w/index.php?title=File:Vigen%C3%A8re_square_shading.svg&page=1 "Vigenere square"
[Advanced Encryption Standard]: http://en.wikipedia.org/wiki/Advanced_Encryption_Standard "Wiki: AES"
[happened around 2009]: http://en.wikipedia.org/wiki/Advanced_Encryption_Standard#Known_attacks "Wiki: AES known attacks"
