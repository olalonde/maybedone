# maybedone

Small Node.js helper to wrap callbacks and only call those underlying
callback after X times or a predicate function returns true.

## install

```
npm install --save maybedone
```

## usage

**maybedone(cb, predicateFn|times)**

Arguments:

- **cb** underlying callback
- **predicateFn** a function that must return
true before cb is called
- **times** number of times `md` must be called
before the callback is called

Return:

maybedone returns a function `md` which has the following
behavior:

1) When called with an error, md will immediately call the
   underlying callback with the error.

2) Will always at most call a callback once.

3) Does not throw errors even if it is called too many times.

4) Calls the underlying callback after `times` times or
   `predicateFn()` returns true.

## Examples

```javascript
import maybedone from 'maybedone';
// var maybedone = require('maybedone');

const cb = () => { console.log('done'); };

const md = maybedone(cb, () => {
  return Math.random() > 0.5;
});
// var md = maybdone(cb, function() { /.../ });

md();
md();
md();
```

```javascript
import maybedone from 'maybedone';

const cb = () => { console.log('done'); };

const md = maybedone(cb, 3);

md();
md();
md();
// callback fires here
md();
md();
md();
```

```javascript
import maybedone from 'maybedone';

const cb = () => { console.log('done'); };

const md = maybedone(cb, 3);

md();
md('someerror');
// callback fires here with error
```
