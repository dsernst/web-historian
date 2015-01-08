var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  console.log(req.method + " " + req.url)
  var publicPath = './web/public'

  var routes = {
    '/': '/index.html',
    '/styles.css': '/styles.css'
  }

  if (req.method === 'GET') {
    if (routes[req.url] !== undefined) {
      fs.readFile(publicPath + routes[req.url], function(err, data) {
        if (err) {
          throw err
        } else {
          res.writeHead(200)
          res.end(data)
        }
      })
    } else {
      res.writeHead(404)
      res.end()
    }
  } else if (req.method === 'POST') {
    var chunkedData = ''
    req.on('data', function(chunk) {
      chunkedData += chunk
    })
    req.on('end', function(){
      console.log(chunkedData)
    })
  }
  // res.end(archive.paths.list);
}
