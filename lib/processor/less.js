module.exports = makeLess;

var path = require('path');
var fs = require('fs');
var less = require('less');

function makeLess(root){
  return function(req,res,next){
    if(path.extname(req.url) === '.css'){
      var css_file = root + req.url;
      var less_file = root + path.dirname(req.url) + path.basename(req.url,'.css') + '.less';
      
      if(fs.existsSync(css_file)){
        fs.readFile(css_file,{encoding:"utf8"}, function(err, data){
            if(err){
              throw err;
              next();
            }
            res.writeHead(200,{
              'Content-Length': data.length,
              'Content-Type':"text/css; charset=UTF-8"
            });
            res.end(data);
          })

      }else if(fs.existsSync(less_file)){

        fs.readFile(less_file,{encoding:"utf8"},function(err, data){
            if(err){
              throw err;
              next();
            }
            less.render(data, function(err,css){
              if(err){
                throw err;
              }
              res.writeHead(200,{
                'Content-Length': css.length,
                'Content-Type':"text/css; charset=UTF-8"
              });
              res.end(css);

              next();
            })
          });

      }else{
        res.statusCode = 404;
        res.end();
      }
    }else{
      next();
    }

  }

}