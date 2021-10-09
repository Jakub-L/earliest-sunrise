import * as R from 'ramda';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'; // import plugin

import getSunsetSunrise from './api';
import { Coordinates } from './types';

dayjs().format();
dayjs.extend(customParseFormat);
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

/**
 * Sorting helper function for sorting time strings
 *
 * Interprets time strings in the "h:mm:ss A" format, i.e. 0-12 hours (no padding), 00-59 minutes
 * (padded to length 2), 00-59 seconds (padded to length 2), separated by colons. Followed by
 * AM/PM designation in capital letters, separated by a space from the time.
 *
 * @param {string} a - First time to compare
 * @param {string} b - Second time to compare
 * @returns {number} Second difference between time A and time B
 */
const timeSorter = (a: string, b: string): number =>
  dayjs(a, 'h:mm:ss A').unix() - dayjs(b, 'h:mm:ss A').unix();

/**
 * The main function.
 *
 * Queries the Sunrise and Sunset Times API for a given number of random locations. These locations
 * are then sorted by the time of their sunrise and the length of the day for the day with the
 * earliest sunrise is printed to the console.
 *
 * @param {number} count - The count of locations to request
 */
const main = async (count: number) => {
  const response = await getSunsetSunrise(randomLocations(count));
  const results = R.map(R.prop('results'), response);

  const sortBySunrise: Array<any> = [...results].sort(
    (location1: any, location2: any) =>
      timeSorter(location1.sunrise, location2.sunrise)
  );

  console.log(sortBySunrise[0].day_length);
};

main(100);
