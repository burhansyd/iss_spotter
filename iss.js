const request = require('request');
const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) callback(error, null);
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const finalIP = JSON.parse(body).ip;
    callback(null, finalIP);
  });
};

const fetchCoordsByIP = function(IP, callback) {
  request(`https://freegeoip.app/json/${IP}`, (error, response, body) => {
    if (error) callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const newData = JSON.parse(body);
    callback(null, newData);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching flyover times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const finalData = JSON.parse(body).response;
    callback(null, finalData);
  });
};

// iss.js

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, finalIP) => {
    if (error) callback(error, null);

    fetchCoordsByIP(finalIP, (error, newData) => {
      if (error) callback(error, null);

      fetchISSFlyOverTimes(newData, (error, finalData) => {
        if (error) callback(error, null);

        callback(null, finalData);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };