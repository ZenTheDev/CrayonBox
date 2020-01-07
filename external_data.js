/*
 * Copyright (c) 2019.
 * All rights lies to "VukAnd12#4407" and "Gravity Assist#0852"
 */

var fs = require('fs');

var contents = fs.readFileSync('./data.json', 'utf8');
const data = JSON.parse(contents);
data.baseprefix = "ok";
fs.writeFileSync("./data.json", JSON.stringify(data, null,2));


var jsonString = '{"some":"json"}';
var jsonPretty = JSON.stringify(JSON.parse(jsonString),null,2);
console.log(jsonPretty);

