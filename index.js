const { fetchMyIP, fetchCoordsByIP } = require('./iss');

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
  
  latLongObj.latitude = data.latitude;
  latLongObj.longitude = data.longitude;
  console.log(latLongObj);
});