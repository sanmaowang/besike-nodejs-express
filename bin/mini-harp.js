#! /usr/bin/env node
var createMiniHarp = require("mini-harp");
var parseArgs = require('minimist');

var argv = parseArgs(process.argv.slice(2));

var port = argv.port || 4000;


var root = argv._[0] || process.cwd();

var app = createMiniHarp(root);






app.listen(port);

console.log("Starting mini-harp on http://localhost:"+port);
console.log(root);

