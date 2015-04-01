## jade-static-brunch
Adds [Jade](http://jade-lang.com) support to [brunch](http://brunch.io), by
compiling templates into static html files. If you also want the
ability to compile into dynamic javascript modules, check out the
[jade-brunch](https://github.com/brunch/jade-brunch) plugin.

## Usage
Install the plugin via npm with `npm install --save jade-static-brunch`.

Or, do manual install:

* Add `"jade-brunch": "x.y.z"` to `package.json` of your brunch app.
  Pick a plugin version that corresponds to your minor (y) brunch version.
* If you want to use git version of plugin, add
`"jade-brunch": "git+ssh://git@github.com:stephenhutchings/jade-static-brunch.git"`.

## Options

```
exports.config =
  plugins:
    jadeStatic:
      locals: {}                    # Locals passed to the template
      formatPath: (path) -> path    # Formatter for path names (see below)
      extension: '.html'            # Extension of compiled templates
      pretty: true                  # Any other Jade API option
```

For example...

```
formatPath: (path) -> path.match(/^app(\/|\\)static(\/|\\)(.+)\.jade$/)[3]
```

...will convert `app/static/index.jade` to `/index.html` and `app/static/path/to/index.jade` to `path/to/index.html`.

## Watching and includes

Yes, overwriting an included jade file will recompile files that depend on it.

## Assumptions

When using Jade's basedir relative `include` and `extend`, the basedir will be assumed to be 'app' within the Brunch root. See [#989](https://github.com/visionmedia/jade/pull/989)

## License

The MIT License (MIT)

Copyright (c) 2012-2014 Stephen Hutchings (http://s-ings.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
