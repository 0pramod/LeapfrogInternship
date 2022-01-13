/**
 * @function
 * @param {number} max - end point for the range
 * @returns -random integer between 0 to max
 */

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
/**
 * @function
 * @param {number} min - starting point for the range
 * @param {number} max - end point for the range
 * @returns random integer between min and max
 */
function getRandomIntInRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
