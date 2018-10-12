var request = require('request');
var constants = require('./Constants');

var getOrderStatus = function getOrderStatus(authHead, orderID, transactionID) {
  var statusURL = constants.PROD_URL;
  statusURL += '/v2/gateway/orders/';
  if (orderID === '') {
    statusURL += "transaction_id:" + transactionID + "/"
  } else {
    statusURL += "id:" + orderID + "/"
  };
  var options = {
    url: statusURL,
    headers: {
      'Content-Type' : 'application/x-www-form-urlencoded',
      'Authorization' : authHead
    }
  };
  request(options, function(error, res, body) {
      var info = JSON.parse(body);
      console.log('recieved JSON is ' + JSON.stringify(info));
      module.exports.info = info;
  });
};

module.exports.getOrderStatus = getOrderStatus;
