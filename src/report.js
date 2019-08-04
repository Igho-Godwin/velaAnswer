const { getTrips } = require('api');
const report = require('../fixtures/report.json');

/**
 * This function should return the data for drivers in the specified format
 *
 * Question 4
 *
 * @returns {any} Driver report data
 */
async function driverReport() {
  // Your code goes here
  return report;
}

module.exports = driverReport;
