let {google} = require('googleapis');
let privatekey = require("./private_keys.json");
// configure a JWT auth client
let jwtClient = new google.auth.JWT(
    privatekey.client_email,
    null,
    privatekey.private_key,
    ['https://www.googleapis.com/auth/spreadsheets',
     'https://www.googleapis.com/auth/drive']);
//authenticate request
jwtClient.authorize(function (err, tokens) {
if (err) {
console.log(err);
return;
} else {
console.log("Successfully connected!");
}
})

;//Google Sheets API credential
let spreadsheetId = '199MfsWshW5zGbpapi7_4yWX9oTzXOQ7KL7R-fqZTiUg';
let range = 'Sheet1!A2:B4'
let sheets = google.sheets('v4');
let valueInputOption = "RAW";


//  Google drive access
//Google Drive API
// let drive = google.drive('v3');
// drive.files.list({
//    auth: jwtClient,
//    q: "name contains 'TV'"
// }, function (err, response) {
//    if (err) {
//        console.log('The API returned an error: ' + err);
//        return;
//    }
//    var files = response.files;
//    if (files.length == 0) {
//        console.log('No files found.');
//    } else {
//        console.log('Files from Google Drive:');
//        for (var i = 0; i < files.length; i++) {
//            var file = files[i];
//            console.log('%s (%s)', file.name, file.id);
//        }
//    }
// });

// getting data from  google sheet
sheets.spreadsheets.values.get({
   auth: jwtClient,
   spreadsheetId: spreadsheetId,
   range: range
}, function (err, response) {
   if (err) {
       console.log('The API returned an error: ' + err);
   } else {
    console.log('Users list from Google Sheets:', response.data.values);
    
   }
});


//  writing to google sheets
let values = [
    [
      'tacknowliz','b.ed'
    ],
  ];
  const requestBody = {
    values,
  };
  sheets.spreadsheets.values.update({
    auth:jwtClient,
    spreadsheetId,
    range:"Sheet1!C3",
    valueInputOption,
    requestBody,
  }, (err, result) => {
    if (err) {
      // Handle error
      console.log('error-------', err);
    } else {
      console.log('%d cells updated.', result.updatedCells);
    }
  });

