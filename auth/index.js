'use strict';
var admin = require("firebase-admin");
var config = require("../config");

const firebaseCert = config.firebase.cert;

admin.initializeApp({
    credential: admin.credential.cert(firebaseCert),
});

var tokenDecoder = function(req, res, next) {
    if (req.headers.id_token) {
        admin.auth().verifyIdToken(req.headers.id_token).then(function (decodedToken) {
            console.log(req.headers.id_token);
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