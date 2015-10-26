module.exports = {
  fib: fib,
  thunk_fib: thunk_fib
}

function fib (n) { return n < 2 ? n : fib(n-1) + fib(n-2); }

function thunk_fib (n) { return function () { return fib(n); }; }
