var path = require('path');
var archive = require('../helpers/archive-helpers');
var get = require('./routes.js').get
var post = require('./routes.js').post

exports.handleRequest = function (req, res) {
  console.log(req.method + " " + req.url)

  if (req.method === 'GET') {
    get[req.url](req, res)
  } else if (req.method === 'POST') {
    post[req.url](req, res)
  } else {
    res.writeHead(404)
    res.end()
  }

}
