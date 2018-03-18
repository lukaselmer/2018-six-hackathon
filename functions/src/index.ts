import * as functions from 'firebase-functions';
// import * as figo from 'figo';
// import * as R from 'r-script';
import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDd7LzhPE4iCunAmldCA7wrKu5MoruRslw',
  authDomain: 'six-hackathon.firebaseapp.com',
  databaseURL: 'https://six-hackathon.firebaseio.com',
  projectId: 'six-hackathon',
  storageBucket: 'six-hackathon.appspot.com',
  messagingSenderId: '1058451606912'
};
firebase.initializeApp(config);

const database = firebase.database();

export const dreamsProgress = functions.https.onRequest((request, res) => {
  let goalParam = request.query.goal;
  const resetParam = request.query.reset;

  if (goalParam === null) {
    goalParam = '0';
  }

  database.ref('app/customers/0/subscribedGoals/' + goalParam).once('value', function(g) {
    const goalVal = g.val();
    const goalNewVal = g.val();

    if (resetParam === 'true') {
      goalNewVal.progress = 20;
      goalNewVal.remainingDays = 200;
      goalNewVal.actualBalance = 4980;
    } else {
      if (parseInt(goalVal.progress) <= 90) {
        goalNewVal.progress = parseInt(goalVal.progress) + 10;
      }
      if (parseInt(goalVal.remainingDays) > 0) {
        goalNewVal.remainingDays = parseInt(goalVal.remainingDays) - 25;
      }
      goalNewVal.actualBalance = parseInt(goalVal.actualBalance) + 150;
    }

    database
      .ref('app/customers/0/subscribedGoals/0')
      .set(goalNewVal)
      .then(() => {
        res.send({ goalParam, goalVal, goalNewVal });
      });
  });
});

// export const dreamsPrediction = functions.https.onRequest((request, res) => {
//   // Demo client
//   const client_id = 'CaESKmC8MAhNpDe5rvmWnSkRE_7pkkVIIgMwclgzGcQY'; // Demo client ID
//   const client_secret = 'STdzfv0GXtEj_bwYn7AgCVszN1kKq5BdgEIKOM_fzybQ'; // Demo client secret

//   const connection = new figo.Connection(client_id, client_secret);

//   connection.credential_login('demo@figo.me', 'demo1234', null, null, null, null, function(error: any, token: any) {
//     if (error) {
//       console.error(error);
//     } else {
//       get_transactions(res, token.access_token, connection);
//     }
//   });
// });

// function get_transactions(res: any, access_token: any, connection: any) {
//   const session = new figo.Session(access_token);

//   session.get_transactions(null, function(error: any, transactions: any) {
//     if (error) {
//       console.error(error);
//     } else {
//       const transactions_R = [{}];
//       let i = 0;

//       console.log(transactions[0].booking_date);

//       transactions.forEach(function(transaction: any) {
//         transactions_R[i] = {
//           booking_text: transaction.booking_text,
//           booking_date: transaction.booking_date.toISOString().substring(0, 10),
//           id: transaction.transaction_id,
//           name: transaction.name,
//           amount: transaction.amount,
//           currency: transaction.currency
//         };
//         i++;
//       });

//       // Write to Firebase, Read from R, Direct handover not possible JSON too large
//       database
//         .ref('api/transactions/')
//         .set(transactions_R)
//         .then(() => {
//           // Call R to create cashflow predictions
//           R('src/cash-prediction.R')
//             .data({
//               transactions: transactions_R[0],
//               nGroups: 3,
//               fxn: 'mean'
//             })
//             .call(function(err, d) {
//               if (err) throw err;

//               res.status(200).send(d);
//             });
//         });
//     }
//   });
// }
