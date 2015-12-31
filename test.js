"use strict";

//You'd expect a test framework here, but... f*ck the overhead and npm install just for something as simple as this

var exec = require('child_process').exec;

var solutions = {
    "1a" : 232,
    "1b" : 1783,
    "2a" : 1606483,
    "2b" : 3842356,
    "3a" : 2565,
    "3b" : 2639,
    "4a" : 346386,
    "4b" : 9958218,
    "5a" : 255,
    "5b" : 55,
    "6a" : 569999,
    "6b" : 17836115,
    "7a" : 3176,
    "7b" : 14710,
    "8a" : 1342,
    "8b" : 2074,
    "9a" : 207,
    "9b" : 804,
    "10a": 492982,
    "10b": 6989950,
    "11a": "cqjxxyzz",
    "11b": "cqkaabcc",
    "12a": 119433,
    "12b": 68466,
    "13a": 664,
    "13b": 640,
    "14a": 2640,
    "14b": 1102,
    "15a": 222870,
    "15b": 117936,
    "16a": 373,
    "16b": 260,
    "17a": undefined,
    "17b": undefined,
    "18a": undefined,
    "18b": undefined,
    "19a": undefined,
    "19b": undefined,
    "20a": undefined,
    "20b": undefined,
    "21a": undefined,
    "21b": undefined,
    "22a": undefined,
    "22b": undefined,
    "23a": undefined,
    "23b": undefined,
    "24a": undefined,
    "24b": undefined,
    "25a": undefined,
    "25b": undefined
};

console.log("testing...");

var keys = Object.keys(solutions);

var write=m=>process.stdout.write(m);

for(var j=3;j>0;j--){ //print out names vertically - none of them is len > 3
    keys.forEach(e=>{
        write(e[e.length-j]?e[e.length-j]:" ");
    });
    write("\n");
}

var check=i=>{
    exec("node solve.js "+keys[i], function(error, stdout, stderr) {
        write((stdout==solutions[keys[i]]+"\n"?"\x1b[32m":"\x1b[31m")+"█\x1b[0m"); // write █ in either green(32) or red(31)
        if(i<keys.length-1)check(i+1);
    });
};

check(0);
