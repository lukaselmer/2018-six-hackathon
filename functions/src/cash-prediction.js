// import express from "express";
// import figo from "figo";
// import R from "r-script";
// import firebase from "firebase";

// var app = express();

// app.get('/', function (req, res) {

//   // Demo client
//   var client_id = 'CaESKmC8MAhNpDe5rvmWnSkRE_7pkkVIIgMwclgzGcQY'; // Demo client ID
//   var client_secret = 'STdzfv0GXtEj_bwYn7AgCVszN1kKq5BdgEIKOM_fzybQ'; // Demo client secret

//   var connection = new figo.Connection(client_id, client_secret);

//   var access_token = '';

//   connection.credential_login('demo@figo.me', 'demo1234', null, null, null, null, function (error, token) {
//     if (error) {
//       console.error(error);
//     } else {

//       get_transactions(res, token.access_token);
//     }
//   });
// });

// function get_transactions(res, access_token) {

//   var session = new figo.Session(access_token);

//   session.get_transactions(null, function (error, transactions) {
//     if (error) {
//       console.error(error);
//     } else {
//       transaction_csv = '';
//       transactions_R = [{}]; 
//       i = 0;

//       transactions.forEach(function (transaction) {
//         var t = [{}]; 
//         // Do whatever you want
//         //transaction_csv = transaction_csv + 
//          /* + ';' + transaction.name
//           + ';' + transaction.amount
//           + ';' + transaction.currency + "\n";*/
//         transactions_R[i] = {

//           booking_date : transaction.booking_date,
//           booking_text: transaction.booking_text
//         };
//         i++;
//       });
//       //res.send(transaction_csv);

//       // Write to Firebase



//       // Call R to create cashflow predictions
//       R("cash-prediction.R").data(
//           { transactions: transactions_R, 
//             nGroups: 3, 
//             fxn: "mean" }
            
//       ).call(function(err, d) {
//         if (err) throw err;
        
//         res.send(d[0]);
//       });
//     }
//   });

// }

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });
