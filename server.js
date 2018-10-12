const tokens = require('./CreateOrderTokens');
const orderStatus = require('./GetOrderStatus');
const http = require('http');
const express = require('express');

const app = express();

app.get('/create', function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next()
}, function (req, res) {
  tokens.createOrderTokens();
  res.set('Content-Type', 'application/json');
  res.send(JSON.stringify(tokens.myJson));
});

app.get('/status', function (req, res) {
  console.log('url is' + req.url);
  console.log('Authorization header is ' + req.query.authorization);
  console.log('Order ID is ' + req.query.id);
  console.log('Transaction ID is ' + req.query.transaction_id);
  orderStatus.getOrderStatus(req.query.authorization, req.query.id, req.query.transaction_id);
  res.send(JSON.stringify(orderStatus.info));
});

app.get('/deepak', function (req, res) {
  res.send('I Made This FUCKIN Node.js app!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
});

app.listen(process.env.PORT, function () {
  console.log('Now listening for requests!!!!');
});
