// Step 1: Pull in required dependecies
var express = require('express');
var router = express.Router();

// Step 2: Import the model using burger.js in the models folder
var burger = require('../models/burger.js');

// Step 3: Create the routes and associated logic like get, post, and put
router.get('/', function(req, res) {
    burger.selectAll(function(data) {
      var hbsObject = {
        burgers: data
      };
      // console.log(hbsObject);
      res.render('index', hbsObject);
    });
  });

  router.post('/burgers', function(req, res) {
    burger.insertOne([
      'burger_name'
    ], [
      req.body.burger_name
    ], function(data) {
      res.redirect('/');
    });
  });

  router.put('/burgers/:id', function(req, res) {
    var condition = 'id = ' + req.params.id;
  
    burger.updateOne({
      devoured: true
    }, condition, function(data) {
      res.redirect('/');
    });
  });
  
  // Step 4: Export routes by using server.js.
  module.exports = router;