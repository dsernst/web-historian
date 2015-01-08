var archive = require('../helpers/archive-helpers.js')

archive.readListOfUrls(function(urls){
  for(var i = 0; i < urls.length; i++){
    archive.downloadUrls(urls[i])
  }
  archive.clearSitesList();
})



