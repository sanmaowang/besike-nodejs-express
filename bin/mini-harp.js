#! /usr/bin/env node
var createMiniHarp = require("mini-harp");
var parseArgs = require('minimist');
var serveStatic = require('serve-static');

var argv = parseArgs(process.argv.slice(2));

var port = argv.port || 4000;

var app = createMiniHarp();

var path = argv._[0] || process.cwd();

app.use('/current-time',function(req,res,next){
    res.end(new Date().toISOString());
});


app.use(serveStatic(path));


app.listen(port);

console.log("Starting mini-harp on http://localhost:"+port);

