/**
 * Generates a random floating point number within the specified range
 * @param {number} min - Lower bound (inclusive) of the range
 * @param {number} max - Upper bound (exclusive) of the range
 * @returns {number} A random float falling within the range
 * @throws {RangeError} The lower bound cannot be larger than the upper bound.
 */
const randomFloat = (min: number, max: number): number => {
  if (min > max) {
    throw RangeError('The lower bound cannot be higher than the upper bound');
  }
  return Math.random() * (max - min) + min;
};

