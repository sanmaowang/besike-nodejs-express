module.exports = makeJade;

var path = require('path');
var fs = require('fs');
var jade = require('jade');


function makeJade(root){
	return function(req, res, next){
		if(path.extname(req.url) == '.html'){
			var html_file = root+req.url;
			var jade_file = root + path.dirname(req.url) + path.basename(req.url,'.html')+'.jade';

			if(fs.existsSync(html_file)){

				fs.readFile(html_file,{encoding:"utf8"},function(err, data){
						if(err){
							throw err;
							next();
						}
						res.writeHead(200,{
							'Content-Length': data.length,
							'Content-Type':"text/html;charset=utf-8"
						});
						res.end(data);
					})

			}else if(fs.existsSync(jade_file)){

				fs.readFile(jade_file,{encoding:"utf8"},function(err, data){
						if(err){
							throw err;
							next();
						}
						var html = jade.render(data);
						res.writeHead(200,{
							'Content-Length': html.length,
							'Content-Type':"text/html;charset=utf-8"
						});
						res.end(html);
					})

			}else{
				res.statusCode = 404;
				res.end();
			}
			
		};
	}
}
