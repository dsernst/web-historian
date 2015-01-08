var archive = require('/Users/student/Desktop/2014-12-web-historian/helpers/archive-helpers.js')
var fs = require('fs')

var sites

archive.readListOfUrls(function(urls){
  for(var i = 0; i < urls.length; i++){
    archive.downloadUrls(urls[i])
  }
  archive.clearSitesList();
})

var log = new Date() + ': ran \n'
fs.appendFileSync(__dirname + '/CRONLOG', log)
