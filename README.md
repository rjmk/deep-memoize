# deep-memoize

This module allows you to recursively [memoize][memoize-wiki] the output of higher-order functions.
This is pretty helpful in combination with [currying][curry-wiki]
(e.g. https://github.com/dominictarr/curry).

[curry-wiki]: https://en.wikipedia.org/wiki/Currying
[memoize-wiki]: https://en.wikipedia.org/wiki/Memoization

## Example Usage

```js
var deep_memoize = require('deep-memoize')

var fast_and_thunky = deep_memoize(fib_thunk)

fast_and_thunky(40)() // may take awhile
fast_and_thunky(40)() // will be superfast!
fast_and_thunky(40)('silly arg') // will be slow again

function fib_thunk (n) {
  return function () { fib(n) }
}

function fib (n) {
  return n < 2 ? 1 : fib(n-1) + fib(n-2)
}
```

## Gotchas

* Functions that differ based on variables they have access to will be treated as the same function.
* Functions that are recursively defined are not memoized while they run.
This can be avoided by defining the unmemoized version in terms of the memoized version
and the memoized version in terms of the unmemoized version!
Pretty cray, right?