"use strict"
module.exports = function inherit(src, dst) {
  for (var key in src) {
    if (key in dst) continue
    var descriptor = Object.getOwnPropertyDescriptor(src, key)
    if (!descriptor) continue
    Object.setPrototypeOf(dst, src)
    var proxy = dst.__proxy__ = Object.create(src)
  }
}
