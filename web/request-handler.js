var path = require('path');
var nodeStatic = require('node-static')
var archive = require('../helpers/archive-helpers');


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

var file = new (nodeStatic.Server)("./public", {});


exports.handleRequest = function (req, res) {
  // res.end(archive.paths.list);

  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain"

  switch (req.method) {
    case 'GET':
      var statusCode = 200;
      res.writeHead(statusCode, headers);
      var filePath = 'public/index.html'

      res.end(file.serve(req, res));

      break;
    case 'POST':
      var message = '';
      res.on('data', function(d) {
        message += d;
      });
      res.on('end', function(d) {
        callback(d);
      });
      var statusCode = 201;
      req.data;
      break;
    default:
      res.statusCode(404);
      res.end();
      break;
  }
};
