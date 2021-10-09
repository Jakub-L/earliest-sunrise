import * as R from 'ramda';

// TYPE DEFINITIONS
/**
 * @typedef {Object} Coordinates
 * @property {number} lat - Latitude represented as float between -90 (90 °S) and 90 (90 °N)
 * @property {number} lng - Longitude represented as float between -180 (180 °W) and 180 (180 °E)
 */
export type Coordinates = {
  lat: number;
  lng: number;
};

// MAIN MODULE
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

/**
 * Creates random latitude-longitude pair
 * @returns {Coordinates} Random coordinates
 */
const randomCoordinates = (): Coordinates => ({
  lat: randomFloat(-90, 90),
  lng: randomFloat(-180, 180)
});

/**
 * Returns an array of a specified length, populated by random coordinates
 * @param {number} count - Desired length of output array
 * @returns {Array.<Coordinates>} Array of random coordinates
 * @throws {RangeError} Count must be greater than 0
 */
const randomLocations = R.ifElse(
  R.gt(0),
  () => {
    throw RangeError('Count must be greater than 0');
  },
  R.compose(R.map(randomCoordinates), R.range(0))
);
