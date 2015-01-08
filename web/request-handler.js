var path = require('path');
var archive = require('../helpers/archive-helpers');
var get = require('./routes.js').get
var post = require('./routes.js').post

exports.handleRequest = function (req, res) {
  console.log(req.method + " " + req.url)

  var return404 = function () {
    console.log('-> sending those fools a 404')
    res.writeHead(404)
    res.end()
  }

  if (req.method === 'GET') {
    if (get.hasOwnProperty(req.url)) {
      get[req.url](req, res)
    } else {
      return404()
    }
  } else if (req.method === 'POST') {
    post[req.url](req, res)
  } else {
    return404()
  }

}
