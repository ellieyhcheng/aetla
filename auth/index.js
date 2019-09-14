'use strict';
var admin = require("firebase-admin");
const config = require('../config');

const serviceAccount = config.auth.loc;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.REACT_APP_DATABASE_URI,
});

var tokenDecoder = function(req, res, next) {
    if (req.headers.id_token) {
        admin.auth().verifyIdToken(req.headers.id_token).then(function (decodedToken) {
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