// Step1: Import orm.js
var orm = require('../config/orm.js');

// Step 2: Create the burger object and select all burger table entries
var burger = {
    
    selectAll: function(cb) {
      orm.selectAll('burgers', function(res) {
        cb(res);
      });
    },

    // Step 3: The variables cols and vals are arrays
  insertOne: function(cols, vals, cb) {
    orm.insertOne('burgers', cols, vals, function(res) {
      cb(res);
    });
  },

// Step 4: The objColVals is an object specifying columns as object keys with associated values
updateOne: function(objColVals, condition, cb) {
    orm.updateOne('burgers', objColVals, condition, function(res) {
      cb(res);
    });
  }
};

// Step 5: Export the database functions for the controller (burgerController.js).
module.exports = burger;