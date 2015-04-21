---
title: "RAMLfications: A RAML parser in Python"
layout: project.html
tags: [python, raml, REST API]
category: [projects, resume]
proj_url: https://ramlfications.readthedocs.org
---

[RAMLfications][4] is a Python package that parses RAML and validates it based on the [specification][5] into Python objects.

A quick look at the library itself:

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

### What is RAML?

RAML stands for "RESTful API Modeling Language" and is described as “a simple and succinct way of describing practically-RESTful APIs”, extremely similar goal of [Swagger][1].  From [raml.org][0]'s site,

> ... you declare which version of RAML you are using, and then document basic characteristics of the API - the title, version, and baseURI.

> RAML allows you to define patterns using traits, resourceTypes, and securitySchemes, and then use them within a API to minimize repetition.

> Externalize those patterns, store them on the web, and import them with an `!include`.

> Easily define resources and methods, then add as much detail as you want. Apply traits and other patterns, or add parameters and other details specific to each call.

A simple example of a RAML file (note: not Spotify's actual RAML file):

```yaml
#%RAML 0.8
title: Spotify Web API Demo - Simple Tree
version: v1
protocols: [ HTTPS ]
baseUri: https://api.spotify.com/{version}
mediaType: application/json

/tracks:
  displayName: several-tracks
  get:
    description: |
      [Get Several Tracks](https://developer.spotify.com/web-api/get-several-tracks/)
    queryParameters:
      ids:
        displayName: Spotify Track IDs
        type: string
        description: A comma-separated list of IDs
        required: true
        example: '7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B'
  /{id}:
    displayName: track
    uriParameters:
      id:
        type: string
        displayName: Spotify Track ID
        example: 1zHlj4dQ8ZAtrayhuDDmkY
    get:
      description: |
        [Get a Track](https://developer.spotify.com/web-api/get-track/)
/users/{user_id}/playlists:
  uriParameters:
    user_id:
      displayName: User ID
      type: string
      description: The user's Spotify user ID.
      example: smedjan
  displayName: playlists
  get:
    description: |
      [Get a List of a User's Playlists](https://developer.spotify.com/web-api/get-list-users-playlists/)
  /{playlist_id}:
    put:
      description: |
        [Change a Playlist's Details](https://developer.spotify.com/web-api/change-playlist-details/)
      body:
        application/x-www-form-urlencoded:
          formParameters:
            name:
              displayName: Playlist Name
              description: Name of the new playlist
              type: string
              required: true
              example: Awesomesauce
```

Other examples can be found [here][11], including Twitter, GitHub, Instagram, and LinkedIn.


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
[11]: https://github.com/mulesoft/api-console/tree/master/dist/examples
