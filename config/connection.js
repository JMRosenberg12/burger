// Step 1: Pull in required dependencies
var mysql = require("mysql");

// Step 2: Create the object for the MySQL connection 
var connection;
// Step: 3: use JawsDB
if (process.env.JAWSDB_URL) {
	// DB is JawsDB on Heroku
	connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
	// DB is ALWAYS local on localhost

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Trainstogo1@",
  database: "burgers_db"
})
};

// Step 4: Make a connection to Mysql

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Step 4: Have ORM to Export connection
module.exports = connection;
