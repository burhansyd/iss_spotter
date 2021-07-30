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

module.exports = { fetchMyIP, fetchCoordsByIP };