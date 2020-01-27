// step 1: pull in the requirements
var express = require('express');
var expresshandlebars = require('expresshandlebars')
var mysql = require('mysql')

var port = process.env.PORT || 3000;

var app = express();

// step 2: Server content
app.use(express.static(process.cwd() + '/public'));