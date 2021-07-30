// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP('99.246.97.83', (error, data) => {
//   if (error) {
//     console.log("Didn't work!", error);
//   }
//   
//   console.log(latLongObj);
// });

// fetchISSFlyOverTimes({ latitude: '43.5639', longitude: '-79.7172' }, (error, data) => {
//   if (error) console.log(error);

//   console.log(data);
// });

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${dateTime} for ${duration} seconds!`)
  }
}

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});