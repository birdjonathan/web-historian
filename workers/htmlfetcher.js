// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
var httpget = require('http-get');
var archive = require('../helpers/archive-helpers');

archive.readListOfUrls(function(urls){

  for (var i=0; i<urls.length; i++){
    var url = urls[i];
    if (!archive.isUrlArchived(url)){
      httpget.get(url, archive.paths.archivedSites+url);
    }
  }
});