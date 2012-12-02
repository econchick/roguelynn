---
layout: post.html
title: 'NetSec for n00bs, part III: Simple Intro Public Key Crypto'
tags: [cryptography, netsec, programming]
---

This is part 3 in a short intro series for netsec.  [Part I]({{ get_url("2012-10-01-netsec-for-n00bs-part-i-password-storage")}} "Password Storage"), [Part II]({{ get_url("2012-10-03-netsec-for-n00bs-part-ii-ciphers-symmetric") }} "Symmetric Ciphers"). [Riddle time][Riddle time]:

> Q: You live in a country with a corrupt mail system. They open every
> package if they can. You put a lock on the box. You can't mail a key.
> How does the receiving person open the box? A: Send the box with the
> lock to this person. He can't open it, but he can put another lock on
> this box. This person sends this box with the 2 locks back to you, you
> unlock your lock and send it back again. So there is just his lock on
> the box and he can finally open it...

This is how public/private key crypto, aka asymmetric encryption (also: remember this riddle for technical interviews). Essentially you have two keys.  One is private, which you can imagine, only your computer knows and has access to.  The other is public, which you can give out to any sort of service that wants to talk to your computer securely. Let's use GitHub for example - you are working on some code, commit locally, then finally make the decision (after you squash all your messy commits) to push to the remote repo on GitHub.  In order to do so, you need to give GitHub your public key. How do you get your public key? In your terminal:

    $ ssh-keygen -t rsa -C "your_email@youremail.com" 
    # generates a public key, saves it in ~/.ssh
    # you will be asked for a passphrase to associate with the public key
    $ pbcopy < ~/.ssh/id_rsa.pub
    # creates a copy of the public key to your clipboard

Then you pasted the key into your GitHub account (more solid directions [here][here]). Now GitHub has your public key, and can communicate with your computer when you want to push code to a GitHub-hosted remote repo. When you push/pull code from the remote repo, GitHub sends a scrambled message that only your private key can decode, and vice versa, your computer sends a message encoded by your private key that can only be decoded by your public key.  

If everything checks out, then the 'transaction' happens - push/pull code. The algorithm to compute public/private keys is based on prime numbers and the fact that it is difficult to deduce a private key from its associated public key.  It's simple to figure out the product of two prime numbers, [but it is much more difficult to factor a number][number] (e.g. 101 \* 113 = x is far more easier to figure out than x \* y = 11413). [To summarize][To summarize]:

---------------------------------------------------------------------------------------------------
> To do this:                                                   Use whose:           Kind of key:
> Send an encrypted message                                     Use the receiver's   Public key
> Send an encrypted signature                                   Use the sender's     Private key
> Decrypt an encrypted message                                  Use the receiver's   Private key
> Decrypt an encrypted signature (and authenticate the sender)  Use the sender's     Public key
---------------------------------------------------------------------------------------------------


[Riddle time]: http://www.reddit.com/r/AskReddit/comments/1198on/i_fucking_love_riddles_what_are_your_best_hardest/c6kfncq "AskReddit: Riddles"
[here]: https://help.github.com/articles/generating-ssh-keys "GitHub SSH key gen"
[number]: http://www.see.ed.ac.uk/it/online/memos/pkey.html "Intro to public key encryption"
[To summarize]: http://searchsecurity.techtarget.com/definition/PKI "What is PKI?"
