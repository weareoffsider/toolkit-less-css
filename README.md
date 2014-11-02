# Toolkit for Less CSS
## Install

```
npm install toolkit-less-css
```

## Functions
Functions must be loaded directly onto the `less` module being used for
rendering to add custom functions, at least until an API is exposed for this in
standard `less.render` options. Loading onto `less` directly:

```javascript
var toolkit = require("toolkit-less-css");
var less = require("less");
toolkit.loadFunctions(less);
```

If you use a tool like `gulp-less` or `grunt-contrib-less` you will need to
require the `less` module inside it's `node_modules`. For example:

```javascript
var toolkit = require("toolkit-less-css");
var less = require("gulp-less/node_modules/less");
toolkit.loadFunctions(less);
```

Functions documented in index.js.

Some functions use a base size, which defaults to 16px. You may set the REM Base using:
```javascript
var toolkit = require("toolkit-less-css");
toolkit.setRemBase(14);
```




## Less
Code is annotated, read that instead.
