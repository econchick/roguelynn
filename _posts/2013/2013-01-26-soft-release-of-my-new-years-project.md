---
layout: post.html
title: "Soft release of my New Year's project: Salarly"
tags: [django, d3.js, xCharts]
category: [words]
---

Finally, I can actually do some show & tell!

The US is trying to recover from the economic crises of the late decade. We're still a bit high on unemployment at [7.8%][unemployment], and a bit too low with inflation below [2%][inflation]. People are *depressed* - job hunting, competing with hundreds of other candidates for *one* job opening, only to be ousted by the second cousin of the manager, right?

Thought you couldn't be any more depressed? 

I present to you **[Salarly][Salarly]** - a way for you to browse all the internationally employed workers in the United States from 2011 - 2012.

<p><a href="http://www.salar.ly/salaries?title=Financial+Engineer&company=&location=" alt="Financial Engineer H-1B salaries"><img class="displayed" src="{{ get_asset("/images/salarly/salarly.png")}}" height="318px" width="552px" title="Financial Engineer H-1B salaries" alt="Financial Engineer H-1B salaries" /></a></p>

Thought your salary was good? Take a look at what a [Financial Analyst][FA] can make on an H-1B visa.  Or maybe you're not convinced of the [wealth][wealth] that makes Silicon Valley so popular.  Thinking of moving somewhere? How about to where all the [engineers][engineers] are?

Don't take my word for it, check it out [yourself][Salarly]. This is all public data from the [US Department of Labor][data], lightly cleaned up for awful administrative typos, rendered using [d3.js][d3] and [xCharts][xCharts], some async calls with jQuery, with Django under the hood, hosted on Heroku. Mind you, we haven't figured out appropriate memory management - I'm certain it will crash/timeout after 5 people make some queries. We're also not designers - don't judge.



[unemployment]: https://www.google.com/publicdata/explore?ds=z1ebjpgk2654c1_&met_y=unemployment_rate&idim=country:US&fdim_y=seasonality:S&dl=en&hl=en&q=us%20unemployment%20rate "Unemployment Rate via Google"
[inflation]: http://www.usinflationcalculator.com/inflation/current-inflation-rates/ "Inflation Rate"
[Salarly]: http://www.salar.ly "Salar.ly"
[FA]: http://www.salar.ly/salaries/?title=Financial+Analyst&company=&location= "Salarly: Financial Analyst"
[wealth]: http://www.salar.ly/salaries/?title=&company=&location=Mountain+View%2C+CA "Salarly: Mountain View"
[engineers]: http://www.salar.ly/heatmaps/?title=engineer "Salarly: Heatmap of Engineers"
[data]: http://www.foreignlaborcert.doleta.gov/quarterlydata.cfm "US DoL"
[d3]: http://d3js.org/ "d3.js"
[xCharts]: http://tenxer.github.com/xcharts/ "xCharts"
