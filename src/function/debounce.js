/**
 * Perform function more than once,
 * Is not exceeded the interval between calls
 * @param {Function} func
 * @param {number=100} threshold
 * @param {boolean=false} atBeginning
 * @returns {Function}
 */
function debounce(func, threshold = 100, atBeginning = false) {
  let timerId;

  return function debounced(...rest) {
    if (timerId) {
      clearTimeout(timerId);
    } else if (atBeginning) {
      func.apply(this, rest);
    }

    timerId = setTimeout(() => {
      if (!atBeginning) {
        func.apply(this, rest);
      }
      timerId = 0;
    },
    threshold,
    );
  };
}

export default debounce;
