var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpUtils = require('./http-helpers');

var fs = require('fs');
var qs = require('querystring');

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var homepage = fs.readFileSync('./public/index.html');
var content = {};

exports.handleRequest = function (req, res) {
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/html";

  switch (req.method) {
    case 'GET':
// read/file, take in callback, put response code
// in callback
      if (req.url === '/') {
        var statusCode = 200;
        res.writeHead(statusCode, headers);
        res.end(homepage);

      } else {
        // Check if we have archived webpage, if it is
        // present it, if not do 404
        // archive.paths.list
        var filename = path.basename(req.url)
        if (archive.isUrlInList(filename)){
          var archivedWebpage = fs.readFileSync('../archives/sites/' + filename);
          var statusCode = 200;
          res.writeHead(statusCode, headers);
          res.end(archivedWebpage);
        } else {
          var statusCode = 404; 
          res.writeHead(statusCode, headers);
          res.end();
        }          
      }
      break;

    case 'POST':
      var statusCode = 302;
      var postdata = '';
      req.on('data', function(d) {
        postdata += d;   //postdata is a string
      });
      req.on('end', function() {
        var parsedPostData = qs.parse(postdata);
        var url = parsedPostData.url;
        if (archive.isUrlInList(url)){
          httpUtils.redirectUrl(res, url);
        }
      
        archive.addUrlToList(url);
        res.writeHead(statusCode, headers);
        res.end();
      });
      break;
    default:
      res.statusCode(404);
      res.end();
      break;
  }
};


