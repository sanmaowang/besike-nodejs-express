var connect = require('connect');
var serveStatic = require('serve-static');
var makeJade = require('./lib/processor/jade');
var makeLess = require('./lib/processor/less');
var makeRewrite = require('./lib/processor/rewrite');
var makeBlock = require('./lib/processor/block');


function createMiniHarp(root){
  var app = connect();
	// app.use(serveStatic(root));
  app.use(makeRewrite(root));
  app.use(makeBlock(root));
  app.use(makeLess(root));
  app.use(makeJade(root));

// app.use('/current-time',function(req,res,next){
//     res.end(new Date().toISOString());
// });
  return app;
};

module.exports = createMiniHarp;
