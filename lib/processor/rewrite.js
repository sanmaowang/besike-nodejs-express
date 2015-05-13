module.exports = makeRewrite;

var path = require('path');

function makeRewrite(root){
  return function(req,res,next){
    if(req.url == '/'){
      req.url = '/index.html';
    }
    next();
  }
}