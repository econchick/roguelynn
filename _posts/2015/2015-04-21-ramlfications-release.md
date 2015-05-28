---
layout: post.html
title: "RAMLfications - Python package to parse RAML"
tags: [RAML, REST API, OSS, Spotify]
category: [words, projects]
updated_at: "May 14, 2015"
lead:
---

<p class="lead"><i>Update</i>: I gave a presentation to the <a href="http://www.meetup.com/sfpython/events/222323217/" alt="SF Python">SF Python</a> Meetup group about the new library, including why you'd use a descriptive language for your API, why RAML, and why Spotify chose RAML.

If you're into IPython Notebooks, mine can be found <a href="https://github.com/econchick/raml-ipynb/blob/master/ramlfications.ipynb" alt="IPython Notebook">here</a>, with <a href="http://ipython.org/ipython-doc/1/interactive/nbconvert.html" alt="IPython nbconvert docs">slides</a> generated from IPython <a href="http://ramlfications-sf.herokuapp.com" alt="talk slides">here</a>.
</p>
<hr>

A few of us at Spotify are infatuated with [RAML][0] - a RESTful API Modeling Language described as “a simple and succinct way of describing practically-RESTful APIs”, extremely similar goal of [Swagger][1].

I'm pleased to announce the initial release of [RAMLfications][11], a Python package that parses RAML and validates it based on the [specification][5] into Python objects.

```python
>>> from ramlfications import parse
>>> RAML_FILE = "/path/to/some/file.raml"
>>> api = parse(RAML_FILE)
>>> api.base_uri
'https://{subdomain}.example.com/v1/{communityPath}'
>>> api.resources
[ResourceNode(method='get', path='/widgets'),
 ResourceNode(method='get', path='/widgets/{id}'),
 ResourceNode(method='get', path='/widgets/{id}/gizmos'),
 ResourceNode(method='get', path='/thingys')]
```

```python
>>> widget = api.resources[1]
>>> widget.name
'/{id}'
>>> widget.description
[Get a Widget](https://developer.example.com/widgets/)
>>> widget.description.html
u'<p><a href="https://developer.example.com/widgets/">Get a Widget</a></p>\n'
>>> widget.uri_params
[URIParameter(name='id'), URIParameter(name='communityPath')]
```

It's available on [PyPI][6] with documentation on [Read the Docs][4] and code released under the [Apache 2.0][7] license available on Spotify's [GitHub][8].

There are still some [features that need to be implemented][9], and I am sure there are some bugs (please [report][10] them!), hence the initial beta release.

### Why?

Last year, I built our developer [API console][2], allowing folks a playground for understanding our [Web APIs][3].  The console first parses a RAML file that defines the API, then creates a set of forms based off of RAML, allowing a user-friendly way to directly interact with our Web API service.

One of the highlights of this console is the fact that *none* of the application itself (except for the HTML/CSS) is Spotify specific.  This allows others to easily maintain the app, only editing our RAML file then restarting the service.

### What's next

I have plans to open source our API console that uses RAMLfications so others can easily create their own interactive environment.

My next hack project is to also write a documentation generator based off of RAML (of course, using `ramlfications`).  Currently, RAML supports Markdown (and plaintext) for `description` and `documentation` elements within a RAML file.  So using `ramlfications`, I'll probably end up hacking on top of a static site generator.  Stay tuned!



[0]: http://raml.org/
[1]: http://swagger.io/
[2]: https://developer.spotify.com/web-api/console
[3]: https://developer.spotify.com/web-api/
[4]: https://ramlfications.readthedocs.org
[5]: http://raml.org/spec.html
[6]: https://pypi.python.org/pypi/ramlfications
[7]: https://www.apache.org/licenses/LICENSE-2.0
[8]: https://github.com/spotify/ramlfications
[9]: https://github.com/spotify/ramlfications/issues?q=is%3Aopen+is%3Aissue+label%3Afeature
[10]: https://github.com/spotify/ramlfications/issues
[11]: http://www.roguelynn.com/projects/ramlfications
