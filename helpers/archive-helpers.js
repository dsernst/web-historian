var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http')
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : './archives/sites.txt'
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = readListOfUrls = function(cb){
  fs.readFile('./archives/sites.txt', 'utf8', function(err, data) {
    var list = data.split('\n')
    list.pop()
    cb(list)
  })
};

exports.isUrlInList = function(url, cb){
  readListOfUrls(function(list){
    if (list.indexOf(url)) {
      cb(true)
    } else {
      cb(false)
    }
  })
};

exports.addUrlToList = function(){
};

exports.isURLArchived = function(url, cb){
  fs.exists('./archives/sites' + url, cb)
};

exports.downloadUrls = function(url){
  var req = http.request({hostname: url, method: 'GET', path: '/', port: '80'}, function(res){
    console.log('STATUS: ' + res.statusCode)
    console.log('HEADERS: ' + JSON.stringify(res.headers))
    res.setEncoding('utf8')
    var fullChunk = '';
    res.on('data', function (chunk) {
      fullChunk += chunk
    })
    res.on('end', function(){
      fs.writeFile('./archives/sites/' + url, fullChunk, function(err){
        if(err){
          throw err
        } else{
          console.log(url + ' have been saved!')
        }
      })
    })
  })
  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  })
  req.end()
}

exports.clearSitesList = function() {
  fs.writeFile('./archives/sites.txt', '')
}
