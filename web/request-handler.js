var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  console.log("Serving " + req.url + " with method " + req.method)
  var publicPath = './web/public'

  if (req.method === 'GET') {
    if (req.url === '/') {
      fs.readFile(publicPath + '/index.html', function(err, data) {
        if (err) {
          throw err
        } else {
          res.writeHead(200)
          res.end(data)
        }
      })
    } else if (req.url === '/styles.css') {
      fs.readFile(publicPath + '/styles.css', function(err, data) {
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
  }
  // res.end(archive.paths.list);
}
