# inheritfn

Prototypical inheritance for functions.

Enables you to wrap a function with another function without losing
access to values defined on the original function.

`inheritfn` implements copy-on-write behaviour similarly to regular
Object prototypical inheritance via `Object.create`.

## Deprecated.

TIL that you can set the lookup prototype on functions too.

```js
Object.setPrototypeOf(dst, src)
// or maybe
dst.__proto__ = src
```

## Example

```js
var inheritfn = require('inheritfn')

function original() {
  return original.value
}

function wrapper() {
  return wrapper.value
}

original.value = 10

fncreate(original, wrapper)

// wrapper inherits values from original
console.log(original()) // => 10
console.log(wrapper()) // => 10

// changing original.value changes wrapper.value
original.value = 20
console.log(wrapper()) // => 20
console.log(original()) // => 20
```

### copy on write!

`inheritfn` implements copy-on-write behaviour similarly to regular
Object prototypical inheritance via `Object.create`:

```js
// write to wrapper.value
wrapper.value = 100

// wrapper.value becomes no longer linked to original
console.log(wrapper()) // => 100

// original is unchanged
console.log(original()) // => 20
```

* If a value on the original function changes, this is reflected on the
new function.
* If you write to a key on the new function, access to the original
function's value with the same key is shadowed by this new value.

### Caveats
Unlike regular JavaScript prototypical inheritance:
* **deleting a key
on the new function will not restore access to the original function's
key**. You'll need to delete the key from `newFn.__proxy__`.
* New properties created on the original function will not appear on the
new function.

### `__proto__`

To round out the prototypical inheritance 'simulation' a bit more.
```js
wrapper.__proto__ == original // => true
```

## See Also

* [timoxley/beforefn](http://github.com/timoxley/beforefn)
* [timoxley/afterfn](http://github.com/timoxley/afterfn)
* [timoxley/guardfn](http://github.com/timoxley/guardfn)

## License

MIT
