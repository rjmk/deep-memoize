var deepMemo = module.exports = function deepMemo (fn) {
  var cache = {};
  return function () {
    var hash = [].map.call(arguments, stringify).join('-');
    return hash in cache ?
        cache[hash] : addToCache(cache, hash, fn.apply(null, arguments));
  }
}

function addToCache (cache, hash, result) {
  return cache[hash] = (typeof result === 'function' ? deepMemo : id)(result);
}

function id (x) { return x; }

function stringify (x) { return JSON.stringify(x) || x.toString(); }