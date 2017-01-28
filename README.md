# rollup joi 

Running `node build.js` creates:

```js
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var joi = _interopDefault(require('joi'));

var Joi = joi;

var index = {
  'string,null': Joi.string().allow(null),
  'object,null': Joi.object().allow(null),
};

var main = function () {
	console.log(index);
};

module.exports = main;
//# sourceMappingURL=index.js.map
```

That's correct, except since Joi does some async declaration of classes or other such nonsense, it will error because "Joi.string is not a function".  Because it doesn't exist -- yet.

By hand-patching the rollup output for `_types/index.js`, I get this and everythign works correctly:

```js
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var joi = _interopDefault(require('joi'));

var Joi = joi;

let nodeDeps = {};
let nodeCache = {};

Object.defineProperty(nodeDeps, 'index', {
  get: () => {
    const nodeModule = nodeCache.index = nodeCache.index || {
	  'string,null': Joi.string().allow(null),
	  'object,null': Joi.object().allow(null),
	};
    return nodeModule;
  }
});

var main = function () {
	console.log(nodeDeps.index);
};

module.exports = main;
//# sourceMappingURL=index.js.map
```

 
