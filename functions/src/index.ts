import * as functions from 'firebase-functions';
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript


import * as express from "express";
import * as figo from "figo";
import * as R from "r-script";
import * as firebase from "firebase";

export const dreamsPrediction = functions.https.onRequest((request, res) => {

  // Demo client
  var client_id = 'CaESKmC8MAhNpDe5rvmWnSkRE_7pkkVIIgMwclgzGcQY'; // Demo client ID
  var client_secret = 'STdzfv0GXtEj_bwYn7AgCVszN1kKq5BdgEIKOM_fzybQ'; // Demo client secret

  var connection = new figo.Connection(client_id, client_secret);

  var access_token = '';

  connection.credential_login('demo@figo.me', 'demo1234', null, null, null, null, function (error, token) {
    if (error) {
      console.error(error);
    } else {

      get_transactions(res, token.access_token, connection);
    }
  });
});

function get_transactions(res, access_token, connection) {

  var session = new figo.Session(access_token);

  session.get_transactions(null, function (error, transactions) {
    if (error) {
      console.error(error);
    } else {
      const transaction_csv = '';
      const transactions_R = [{}]; 
      let i = 0;

      transactions.forEach(function (transaction) {
        var t = [{}]; 
        // Do whatever you want
        //transaction_csv = transaction_csv + 
         /* + ';' + transaction.name
          + ';' + transaction.amount
          + ';' + transaction.currency + "\n";*/
        transactions_R[i] = {

          booking_date : transaction.booking_date,
          booking_text: transaction.booking_text
        };
        i++;
      });
      //res.send(transaction_csv);

      // Write to Firebase



      // Call R to create cashflow predictions
      R("src/cash-prediction.R").data(
          { transactions: transactions_R[0], 
            nGroups: 3, 
            fxn: "mean" }
            
      ).call(function(err, d) {
        if (err) throw err;
        
        res.send(d);
      });
    }
  });

}
