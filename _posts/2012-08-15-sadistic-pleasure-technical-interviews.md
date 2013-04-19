---
layout: post.html
title: 'Sadistic/Masochistic pleasure: Technical Interviews'
tags: [algorithms, interviewing, pin]
category: [words, resources]
---

When I was in high school, I was in "IB" math - the international equivalent to AP courses, except harder.  I really, really, *really* enjoyed math.  My teacher would always mispronounce my name ("Wynn!"), but nonetheless, I loved the challenge.  I was the only one to receive 100% on the final exam, and one of a handful to take the IB exam.  I studied regularly, went over classmates' houses, worked through practice problems of vectors, differentiation, integration, goodness it was awesome.  I'd say that studying for this sort of stuff is very much like (if not the same concept) as the training I did for swimming: 2 hours/day in the pool, 6 days a week, extra hour each day of dry land training (side stepping the fact that right now, the most exercise I get is walking to/from cafes...). 

While it's been years since my crush on high school math, that same feeling comes again when studying for technical interviews.  Few hours/day, every day, until the interview.  I recently had the excitement of having a technical phone screen with Google, and I thought it went pretty well.  Not in terms of I think I can make it to the next round (I don't need to mention that the bar is set very high with them), but how I felt when comparing my last technical interview experience back in April.  I'd like to share how I prepared myself. I'll mention that I my CV reflects a lot of PyLadies work, as well as knowledge of Python (natch), SQL, git, and working with different APIs.

#### How I prepared:

I had about a week for preparation (contrary to my previous one, where I had about two weeks).  Really, it had all depended on scheduling, but I tried to push it out as far as I could :D. First I read through a couple of Python resources just to become familiar with the 'hidden gems' of the language that I may not use regularly or don't have exposure to:

-   memorizing all of the language's built in functions (easy peasy)
-   magic methods, as well as the difference between \_\_str\_\_ and \_\_repr\_\_
-   built in methods on data types (e.g. my\_string.split())
-   difference between New Style & Classic classes
-   range v xrange, generators v iterators, return v yield
-   default dicts w/ default factories, and other container datatypes

I also reviewed some SQL crap too:

-   difference between joins and outer left/right/both joins
-   schema design (e.g. pk, fk, indices)

Then I spent a lot of time doing algorithms, graph transversals, data structures (without Python's help), etc.  I used Gayle Laakmann McDowell's book: [Cracking the Coding Interview][Cracking] since it gives a very well laid out path to study for the typical technical interview.  I found that Palantir (a tech/finance/info company that I have a hard crush on) has a great[how-to][how-to] on succeeding their technical/algorithm interviews (and I feel that applies to all aggressive tech companies).

My process each day would be to warm up with a couple of easy problems, then go onto a more difficult graph or algorithm problem.  A lot reflects Gayle's book, and in that book she uses Java (hence some of these problems can be easily implemented in Python with no thought).  I'll leave you to get her awesome book in order to read best approaches & the answers (literally, every example problem has a solution in the book, it's great).

In loose order of difficulty, starting with what I'd have for breakfast and ending towards what made me skip meals:

-   Strings/Arrays
    -   determine a string w/ all unique characters (both w/ and w/o
        additional data structures)
    -   write an algo to determine if a string is a palindrome
    -   write an algo such that if an element in an MxN matrix is 0, its
        entire row & column are set to 0.

-   Linked Lists (without Python's awesomesauce)
    -   creating a linked list
    -   find the kth element of a singly linked list
    -   remove duplicates from unsorted linked list

-   Stacks & Queues
    -   implement a stack/queue (and know the diff between each)
    -   use a single array to implement three stacks
    -   in addition to push/pop for a stack/queue, also design a min
        function to return the min node (operating in o(1) time)
    -   towers of Hanoi problem

-   Trees and graphs
    -   define a function to check if a binary tree is balanced
    -   write an algo that creates a binary search tree w/ minimal
        height
    -   Breadth/depth-first searches (not too hard esp after stacks &
        queues)
    -   implement a suffix tree
    -   Dijkstra's algorithm

-   Sorting & Searching
    -   you have two sorted arrays, A & B where A is large enough buffer
        at the end to hold B.  write a method to merge B into A in
        sorted order.
    -   find the index of a given integer in an array (unsorted)

-   moar graphs, algos and random but good
    -   write a power function
    -   implement an atoi function
    -   write a simple caesar cipher (both encoding & decoding)
    -   write a greedy algorithm that returns amount of change in coins
        (quarters, dimes, nickels, pennies)
    -   write an algorithm/mini program that, given a maze, a start & an
        end point, returns the path(s) needed to exit the maze (this was
        not fun to do at 8pm the night before the interview, but it is a
        damn good problem to attack).

For some reason, perhaps someone could enlighten me, I wasn't able to get [TopCoder][TopCoder]'s java applet running (although I could months ago). Those algo problems are great, challenging, and appeal to different levels.  TopCoder's problems would be a fantastic help to those prepping for the in-person technical interview.  Hopefully I'm the only one with the issue. A week or so after my interview, someone posted on [/r/learnprogramming][Reddit] in reddit what questions s/he was asked during a technical phone interview.  Very helpful (note that the interviewee is a C++ person interviewing for an entry level software engineer position at a mid-sized, well-known company):

-   What kind of data structure would you use to hold an arbitrary amount of objects in which retrieval is not an issue?
-   Follow up: what are the advantages and disadvantages of using a linked list over a dynamic array structure? [good time to talk about Big-O performance]
-   Describe the main properties of a binary search tree.
-   What would happen if you inserted a sorted list into a binary search tree?
-   Follow up: how can you avoid this problem?
-   Say you want to retrieve from a data set a person's name based on an alphanumeric ID number. What kind of data structure would you use?
-   Compare a hash table and a map type structure and their big-O performance on various common functionality (search, insert, etc.).
-   What is the worst case retrieval time for a hash table and how can this happen?
-   Briefly describe object oriented programming and it's main principles (MAKE SURE TO SAY: encapsulation, inheritance, and  polymorphism, (and abstraction if you want)).
-   He specifically asked me to elaborate more on encapsulation and polymorphism.  Why is polymorphism useful?
-   What is a join and an outer join? (SQL)

Reading through those redditor's interview questions, I actually felt that I can answer the majority of them.  Actually I didn't know what encapsulation was, but luckily I wasn't the one in the hot seat for that interview, and I googled it :D.

#### My weak points that I will work on:

-   Understanding what can be done to improve runtimes of an algorithm  (not just be able to tell the runtime).
-   Being more confident in my understanding of concepts.  For instance, I know what a RESTful API is, but how do I spit it back coherently? Same with explaining git.
-   Calm the f&ck down.

#### Things I thought I did well in:

-   Wrote & instantiated a class that would be used to make a graph, using the requested private variables/methods (he seemed a little impressed).  Although I do believe I mixed up new style v classic. /facepalm
-   Talking through each and every damn thing I was saying and writing (was not easy the first time).  And going back through what I coded to test simple cases & fixed typos/errors.
-   My understanding of repr v str (finally...).
-   Simple schema writing (from the first interview).
-   Before coding, switched the font/size to courier 8 (seriously, red flag to them if not using a fixed-width font when gdocs defaults to a variable-width one).

I'm certainly not counting on going further from that interview.  I quite like the set up I have now doing contracting with a friend's consulting + Harvard's project, and I seem to walk into new opportunities (then again, this is the Bay Area). Thankfully I'm also able to contribute to open source, give talks & go to conferences, put on workshops and events, etc.

But hey - you'd understand if Google came calling, right?  I actually look forward to the day where I can go in and code on a whiteboard, but that will take a lot more studying, understanding of more complex algorithms, better understanding of runtimes, perhaps systems architecture.  For those PyLadies and Women Who Code'ers in the Bay Area, WWC is hosting a [Technical Interview evening talk/mini-workshop][Technical] with Gayle Laakmann McDowell next week.  We're also looking for mentors (and food sponsors!), so hit me up if you're interested! **Update: **I was told not to divulge what questions I received from the interviewer as it reflects poorly.  So, let me just say: what I studied aligned pretty well with what I was asked :D  I just...wish I had a better memory! Another resource given to me: [Interview Street][Interview], and I forgot [CareerCup][CareerCup].


[Cracking]: http://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X/ref=sr_1_1?ie=UTF8&qid=1344972927&sr=8-1&keywords=cracking+the+coding+interview "Amazon link to Cracking the Coding Interview book"
[how-to]: http://www.palantir.com/2011/09/how-to-rock-an-algorithms-interview/ "Palantir's interview advice"
[TopCoder]: http://community.topcoder.com/tc "top coder"
[Reddit]: http://www.reddit.com/r/learnprogramming/comments/xwd16/had_a_technical_phone_interview_today_for_an/  "a self-post on reddit"
[Technical]: http://www.meetup.com/Women-Who-Code-SF/events/77224932/  "Women Who Code tech interviewing event"
[Interview]: https://www.interviewstreet.com/challenges/  "Interview Street Challenges"
[CareerCup]: http://www.careercup.com/   "Career Cup: Programming Interview Questions"