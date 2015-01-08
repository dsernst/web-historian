var fs = require('fs')
var httpHelper = require('./http-helpers.js')
var archive = require('../helpers/archive-helpers.js')

exports.get = {
  '/': function(req, res){httpHelper.serveAssets(res, './web/public/index.html')},
  '/styles.css': function(req, res){httpHelper.serveAssets(res, './web/public/styles.css')},
  '/loading.html': function(req, res){httpHelper.serveAssets(res, './web/public/loading.html')}
}

exports.post = {
  '/': function(req, res){submitURL(req, res)},
  '/loading.html': function(req, res){submitURL(req, res)}
}


var submitURL = function (req, res) {
  var chunkedData = ''
  req.on('data', function(chunk) {
    chunkedData += chunk
  })
  req.on('end', function(){
    var url = chunkedData.slice(4)
    console.log('They want ' + url)
    archive.isUrlArchived(url, function(isArchived) {
      if (isArchived) {
        res.writeHead(303, {location: '/' + url})
        res.end('yo')
      } else {
        fs.appendFile('./archives/sites.txt', url+'\n', function(){
          res.writeHead(303, {location: '/loading.html'})
          res.end('yo')
        })
      }
    })
  })
}
