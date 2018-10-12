var request = require('request');
var randomstring = require("randomstring");
var constants = require('./Constants');
var createOrderTokens = function createOrderTokens() {
  var formData = {
    "client_id":constants.PROD_CLIENT_ID,
    "client_secret":constants.PROD_CLIENT_SECRET,
    "grant_type": constants.GRANT_TYPE
  };
  request.post({url:constants.OAUTH_URL, formData: formData}, function optionalCallback(err, httpResponse, body) {
    if (err) {
      return console.error('upload failed:', err);
    }
    console.log('Upload successful!  Server responded with:', body);
    var json = JSON.parse(body);
    var accessToken = json['access_token'];
    var transactionId = randomstring.generate({
      length: 15,
      charset: 'alphanumeric'
    });
    console.log('transactionId is ' + transactionId);
    console.log('access token is ' + accessToken);
    var myJson = {
      access_token : accessToken,
      transaction_id : transactionId
    };
    console.log('json is ' + JSON.stringify(myJson));
    module.exports.myJson = myJson;
  });
}

module.exports.createOrderTokens = createOrderTokens;
