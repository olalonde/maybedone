const maybedone = (cb, isDone) => {
  if (typeof isDone === 'number' && isDone >= 1) {
    let i = 0;
    const max = isDone;
    return maybedone(cb, () => {
      i++;
      return i === max;
    });
  }

  if (typeof isDone !== 'function' || typeof cb !== 'function') {
    throw new Error('invalid arguments. usage: maybedone(cb, predicate) or maybedone(cb, number)');
  }

  let cbCalled = false;

  const _cb = (...args) => {
    cbCalled = true;
    return cb(...args);
  };

  return (...args) => {
    if (cbCalled) return undefined;
    const [ err ] = args;
    // call callback immediately if error
    if (err) return _cb(...args);
    if (isDone()) return _cb(...args);
  };
};

export default maybedone;
