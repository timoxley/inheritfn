"use strict"
module.exports = function inherit(src, dst) {
  for (var key in src) {
    if (key in dst) continue
    var descriptor = Object.getOwnPropertyDescriptor(src, key)
    if (!descriptor) continue
    dst.__proto__ = src
    var proxy = dst.__proxy__ = Object.create(src)
    Object.defineProperty(dst, key, {
      configurable: descriptor.configurable,
      enumerable: descriptor.enumerable,
      get: function() {
        return proxy[key]
      },
      set: function(value) {
        return proxy[key] = value
      }
    })
  }
}
