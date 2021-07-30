const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

fetchCoordsByIP('99.246.97.83', (error, data) => {
  if (error) {
    console.log("Didn't work!", error);
  }
  let latLongObj = {};
  
  latLongObj.latitude = data.latitude.toString();
  latLongObj.longitude = data.longitude.toString();
  console.log(latLongObj);
});

fetchISSFlyOverTimes({ latitude: '43.5639', longitude: '-79.7172' }, (error, data) => {
  if (error) console.log(error);

  console.log(data);
});

