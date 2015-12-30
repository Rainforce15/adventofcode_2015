"use strict";
var args=process.argv;
var lastArg = args[args.length-1];
var fileData = require('fs').readFileSync(lastArg, "UTF-8");
fileData = fileData.replace(/    |\n|\r/g, ""); //remove indentation and newline stuff
console.log(fileData.length);
