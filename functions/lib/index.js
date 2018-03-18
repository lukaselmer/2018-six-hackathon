"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const figo = require("figo");
const R = require("r-script");
const firebase = require("firebase");
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
exports.dreamsProgress = functions.https.onRequest((request, res) => {
    const goalParam = request.query.goal;
    const resetParam = request.query.reset;
    if (goalParam == null) {
        const goalParam = '0';
    }
    database.ref('app/customers/0/subscribedGoals/' + goalParam).once('value', function (g) {
        const goalVal = g.val();
        const goalNewVal = g.val();
        if (resetParam == 'true') {
            goalNewVal.progress = 20;
            goalNewVal.remainingDays = 200;
            goalNewVal.actualBalance = 4980;
        }
        else {
            if (parseInt(goalVal.progress) <= 90) {
                goalNewVal.progress = parseInt(goalVal.progress) + 10;
            }
            if (parseInt(goalVal.remainingDays) > 0) {
                goalNewVal.remainingDays = parseInt(goalVal.remainingDays) - 25;
            }
            goalNewVal.actualBalance = parseInt(goalVal.actualBalance) + 150;
        }
        database.ref('app/customers/0/subscribedGoals/0').set(goalNewVal).then(() => {
            res.send({ goalParam, goalVal, goalNewVal });
        });
    });
});
exports.dreamsPrediction = functions.https.onRequest((request, res) => {
    // Demo client
    var client_id = 'CaESKmC8MAhNpDe5rvmWnSkRE_7pkkVIIgMwclgzGcQY'; // Demo client ID
    var client_secret = 'STdzfv0GXtEj_bwYn7AgCVszN1kKq5BdgEIKOM_fzybQ'; // Demo client secret
    var connection = new figo.Connection(client_id, client_secret);
    var access_token = '';
    connection.credential_login('demo@figo.me', 'demo1234', null, null, null, null, function (error, token) {
        if (error) {
            console.error(error);
        }
        else {
            get_transactions(res, token.access_token, connection);
        }
    });
});
function get_transactions(res, access_token, connection) {
    var session = new figo.Session(access_token);
    session.get_transactions(null, function (error, transactions) {
        if (error) {
            console.error(error);
        }
        else {
            const transactions_R = [{}];
            let i = 0;
            console.log(transactions[0].booking_date);
            transactions.forEach(function (transaction) {
                var t = [{}];
                transactions_R[i] = {
                    booking_text: transaction.booking_text,
                    booking_date: transaction.booking_date.toISOString().substring(0, 10),
                    id: transaction.transaction_id,
                    name: transaction.name,
                    amount: transaction.amount,
                    currency: transaction.currency
                };
                i++;
            });
            // Write to Firebase, Read from R, Direct handover not possible JSON too large
            database.ref('api/transactions/').set(transactions_R).then(() => {
                // Call R to create cashflow predictions
                R("src/cash-prediction.R").data({
                    transactions: transactions_R[0],
                    nGroups: 3,
                    fxn: "mean"
                }).call(function (err, d) {
                    if (err)
                        throw err;
                    res.status(200).send(d);
                });
            });
        }
    });
}
//# sourceMappingURL=index.js.map