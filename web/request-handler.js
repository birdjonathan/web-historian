var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');

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
       if (archive.isUrlInList(req.url)){
        var archivedWebpage = fs.readFileSync('../archives/sites/' + req.url);
          var statusCode = 200;
          res.writeHead(statusCode, headers);
          res.end(archivedWebpage);
        } else {
          var statusCode = 404; 
        }
        
            
          
      }
      break;

    case 'POST':
      var statusCode = 201;
      
      var data = '';
      var result;
      res.on('data', function(d) {
        data += d;
      });
      res.on('end', function(d) {
        result = JSON.parse(d);
      });
      res.writeHead(statusCode, headers);
      res.end('endofpost');
      break;
    default:
      res.statusCode(404);
      res.end();
      break;
  }
};
