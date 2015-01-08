var fs = require('fs')
var httpHelper = require('./http-helpers.js')
exports.get = {
  '/': function(req, res){httpHelper.serveAssets(res, './web/public/index.html')},
  '/styles.css': function(req, res){httpHelper.serveAssets(res, './web/public/styles.css')}
}

exports.post = {
  '/': function (req, res) {
    var chunkedData = ''
    req.on('data', function(chunk) {
      chunkedData += chunk
    })
    req.on('end', function(){
      res.writeHead(302)
      var url = chunkedData.slice(4)
      console.log('Aye, this is me ' + url)
      fs.appendFile('./archives/sites.txt', url+'\n', function(){
        res.end('yo')
      })
    })
  }
}
