module.exports = makeBlock;

var path = require('path');

function makeBlock(root){
  return function(req,res,next){
    if(path.extname(req.url) == '.jade' || path.extname(req.url) =='.less' ){
      res.statusCode = 404;
      res.end();
    }else{
      next();
    }
  }
}