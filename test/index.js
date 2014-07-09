"use strict"

var test = require('tape')
var fninherit = require('../')

test('keys exhibit copy-on-write behaviour', function(t) {

  function original() {
    return original.value
  }

  original.value = 10

  t.equal(original(), 10)

  function wrapper() {
    return wrapper.value
  }

  t.equal(wrapper(), undefined)

  fninherit(original, wrapper)

  t.equal(wrapper(), 10)

  original.value = 20
  t.equal(wrapper(), 20)
  t.equal(original(), 20)

  // copy-on-write!
  wrapper.value = 100

  t.equal(wrapper(), 100)
  t.equal(original(), 20)

  // __proto__ simulation
  t.equal(wrapper.__proto__, original)

  t.end()
})
