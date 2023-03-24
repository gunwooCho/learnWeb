export const throttle = (callback, limit = 1) => {
  let runable = true;
  return function throttleCallback(this: unknown, ...args: unknown[]) {
    let result = null;
    if (runable === false) {
      return result;
    }

    result = callback.apply(this, args);

    runable = false;
    setTimeout(() => {
      runable = true;
    }, limit);

    return result;
  }
};

export default null;