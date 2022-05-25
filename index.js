const {google} = require('googleapis');
let privatekey = require("./private_keys.json");

const auth = new google.auth.GoogleAuth({
    keyFile: "private_keys.json", //the key file
    //url to spreadsheets API
    scopes: ["https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive"], 
});

async function createAndUploadFile(auth){
  const driveService = google.drive({ version:'v3',auth })

  let  fileMetaData = {
    'name':'testSheet',
    'parent':['1WR2Asxw5lJoZwb0ljG_HavRZCAim-9b3']
  }

  // let media = {
  //   mimeType: 'image/png',
  //   body : FileSystem.crea
  // }
}

async function readData(){
const authClientObject = await auth.getClient();
const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });

//creating spread sheet through service account
const requestBody = {
  properties: {
    title: "testSheet3"
  },
};


googleSheetsInstance.spreadsheets.create({
  requestBody,
  fields: '',
}, (err, spreadsheet) =>{
  if (err) {
    // Handle error.
    console.log(err);
  } else {
    //console.log('spreadsheet', spreadsheet);
    let spId = spreadsheet.data.spreadsheetId;
    console.log(`Spreadsheet ID: ${spreadsheet.data.spreadsheetId}`);
    var permissions = [
      {
        'type': 'user',
        'role': 'writer',
        'emailAddress': 'ghiasali17@gmail.com'
      },
      // {
      //   'type': 'otheruser',
      //   'role': 'reader',
      //   'emailAddress': 'otheruser@gmail.com'
      // }
    ];

    var body = {
      'value': 'ghiasali17@gmail.com',
      'type': 'user',
      'role': 'reader',
      'emailAddress': 'ghiasali17@gmail.com',
     // 'pendingOwner': 'true'
    };

    var drive=google.drive({version: 'v3',auth});

    drive.permissions.create({
      'fileId': spId,  //sheetID returned from create sheet response
      'resource': body,
     // transferOwnership: 'true',
    }, function(err, response) {if (err) {
      console.error('error-------', err);
      return;
      } else{
        console.log(JSON.parse(JSON.stringify(response))) ;
      }
    });

    // write to the file
    googleSheetsInstance.spreadsheets.values.update({
      auth, //auth object
      spreadsheetId:spId,
      range: "Sheet1!C3", 
      valueInputOption: "RAW", 
      resource: {
          values: [['categories', 'b.ed']]
      },
  }, (err, result) => {
      if (err) {
        // Handle error
        console.log('error-------', err);
      } else {
        console.log(' cells updated.');
      }
    });
  }
});

// // spreadsheet id
// const spreadsheetId = "199MfsWshW5zGbpapi7_4yWX9oTzXOQ7KL7R-fqZTiUg";

// // Get metadata about spreadsheet
// const sheetInfo = await googleSheetsInstance.spreadsheets.get({
//     auth,
//     spreadsheetId,
// });

// //Read from the spreadsheet
// const readData = await googleSheetsInstance.spreadsheets.values.get({
//     auth, //auth object
//     spreadsheetId, // spreadsheet id
//     range: "Sheet1!A:A", //range of cells to read from.
// })

// //write data into the google sheets
// await googleSheetsInstance.spreadsheets.values.update({
//     auth, //auth object
//     spreadsheetId,
//     range: "Sheet1!C3", 
//     valueInputOption: "RAW", 
//     resource: {
//         values: [['categories', 'b.ed']]
//     },
// }, (err, result) => {
//     if (err) {
//       // Handle error
//       console.log('error-------', err);
//     } else {
//       console.log(' cells updated.');
//     }
//   });
}


readData()

