var test = require('tape');
var deep_memo = require('../')
var test_funcs = require('./fixtures.js')

test('memoizing functions returns a function', function (t) {
  t.ok(typeof deep_memo(test_funcs.fib) === 'function', 'deep_memo returns func')
  t.end()
})

test('the output from a memoized function is the same as the normal output',
    function (t) {
      t.equal(deep_memo(test_funcs.fib)(3), test_funcs.fib(3), 'outputs match');
      t.end();
    }
)

test('the result is cached', function (t) {
  var new_obj = deep_memo(make_obj);
  var obj = new_obj();
  t.deepEqual(obj, {}, 'set up correctly');
  t.equal(new_obj(), obj, 'new_obj\'s result was cached');
  t.notEqual(new_obj('blah'), obj, 'new_obj can create new objects');
  t.end();
})

test('a memoization of a function returning a function preserves output',
    function (t) {
      t.equal(deep_memo(test_funcs.thunk_fib)(3)(), test_funcs.thunk_fib(3)());
      t.end();
    }
)

test('a memoized inner function has cached results', function (t) {
  var new_obj = deep_memo(function () { return make_obj; });
  var obj = new_obj()();
  t.equal(new_obj()(), obj, 'result was cached');
  t.end()
})

function make_obj () { return {}; }
