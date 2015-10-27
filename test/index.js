import test from 'tape';
import maybedone from '../src';

test('maybedone(cb, predicateFn)', (t) => {
  t.plan(1);
  const cb = () => {
    t.pass('cb called');
  };

  let i = 0;
  const md = maybedone(cb, () => {
    return i > 3;
  });

  md();
  md();
  md();
  md();
  i = 4;
  md();
  t.end();
});

test('maybedone(cb, number)', (t) => {
  t.plan(1);
  const cb = () => {
    t.pass('cb called');
  };

  const md = maybedone(cb, 5);

  md();
  md();
  md();
  md();
  md();
  md();
  md();
  t.end();
});
