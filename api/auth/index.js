'use strict';
var admin = require("firebase-admin");
const config = require('../config');

const serviceAccount = config.auth.loc;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://aetla-3bc05.firebaseio.com" // replace this line with your URL
});

var tokenDecoder = function(req, res, next) {
    if (req.headers.id_token) {
        admin.auth().verifyIdToken(req.headers.id_token).then(function (decodedToken) {
            // req.decodedToken = decodedToken;
            req.uid = decodedToken.uid;
            next();
        })
        .catch(function(error) {
            console.log("User token could not be verified");
            res.sendStatus(403);
        });
    }
    else {
        res.sendStatus(403);
    }
}

module.exports = {token: tokenDecoder};