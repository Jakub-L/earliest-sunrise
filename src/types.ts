/**
 * @typedef {Object} Coordinates
 * @property {number} lat - Latitude represented as float between -90 (90 °S) and 90 (90 °N)
 * @property {number} lng - Longitude represented as float between -180 (180 °W) and 180 (180 °E)
 */
export type Coordinates = {
  lat: number;
  lng: number;
};
