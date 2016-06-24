# generator-generator-nodemodule [![Build Status](https://secure.travis-ci.org/mpneuried/generator-mpnodemodule.png?branch=master)](https://travis-ci.org/mpneuried/generator-mpnodemodule)

> [Yeoman](http://yeoman.io) generator

This generator installs a simple node module skeleton

## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```bash
npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-mpnodemodule from npm, run:

```bash
npm install -g generator-mpnodemodule
```

Finally, initiate the generator:

```bash
yo generator-mpnodemodule
```

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).

## Release History
|Version|Date|Description|
|:--:|:--:|:--|
|0.3.5|2016-06-20|Appveyor windows test fix|
|0.3.4|2016-06-20|Fixed link to appveyor windows test; code beautify by [Christopher Zotter](https://github.com/Nachbarshund)|
|0.3.3|2016-05-19|optimized docker tests|
|0.3.2|2016-05-17|Added badge and config file for automated windows tests via appveyor|
|0.3.1|2016-05-13|Typo fix|
|0.3.0|2016-05-13|Some small fixes; better test call; added test docs; added docker tests; optimized travis; optimized gruntfile;|
|0.2.2|2016-04-08|Optimized ignorefiles|
|0.2.1|2016-04-07|Fixed gruntfile and ignore files|
|0.2.0|2016-04-07|Updated deps (lodash 4.x) and switched from `grunt-regarde` to `grunt-watch` with `grunt-newer`|
|0.1.1|2015-12-17|Fixed yeoman 1.5 issues|
|0.1.0|2015-12-17|Updated to yeoman 1.5 and made some fixes|
|0.0.12|2015-11-30|Optimized config files; Bugfixes|
|0.0.11|2015-02-09|Added node 0.12 and iojs to travis.yml|
|0.0.10|2015-01-29|removed prepublish script [npm#3059](https://github.com/npm/npm/issues/3059) and fixed travis.yml|
|0.0.9|2015-01-29|Default modulename by current folder; bugfixes|
|0.0.8|2015-01-29|Added `nodei.co` images to readme|
|0.0.7|2015-01-29|Better `.npmignore and prepublish call for `grunt build-dev`; bugfixes|
|0.0.6|2015-01-26|fixed username, some comments and more tests|
|0.0.5|2015-01-23|renamed main file to `main.coffee` used class valid version of modulename|
|0.0.2|2014-11-18|Fixed travis.yml and package json for correct travis.ci handling + added ask for min. node version|
|0.0.1|2014-11-18|Initial commit|

## The MIT License (MIT)

Copyright © 2013 Mathias Peter, http://www.tcs.de

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
