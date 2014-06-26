var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  var urlString = fs.readFileSync(exports.paths.list).toString('utf-8');
  console.log(urlString);
  var urlArray = urlString.split('\n');
  console.log(urlArray);
  callback(urlArray);
  // return urlArray;


};
var urlStorage;
exports.readListOfUrls(function(urls){urlStorage = urls;});

exports.isUrlInList = function(url){
  // split into array before we check eac h url
  return (urlStorage.indexOf(url) !== -1);
};

exports.addUrlToList = function(url){
  // figure out basename
  var website = path.basename(url);
  console.log("website: " + website)
  
  // write it to sites.txt file
  fs.appendFile(exports.paths.list, website+'\n')
  
  // append to text list
  urlStorage.push(website)
};

exports.isURLArchived = function(){
};

exports.downloadUrls = function(){
};
