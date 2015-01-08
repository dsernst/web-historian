var fs = require('fs')

exports.get = {
  '/': function (req, res) {
    fs.readFile('./web/public/index.html', function(err, data) {
      if (err) {
        throw err
      } else {
        res.writeHead(200)
        res.end(data)
      }
    })
  },
  '/styles.css': function (req, res) {
    fs.readFile('./web/public/styles.css', function(err, data) {
      if (err) {
        throw err
      } else {
        res.writeHead(200)
        res.end(data)
      }
    })
  }
}

exports.post = {
  '/': function (req, res) {
    var chunkedData = ''
    req.on('data', function(chunk) {
      chunkedData += chunk
    })
    req.on('end', function(){
      console.log(chunkedData)
    })
  }
}
