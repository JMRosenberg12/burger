// step 1: pull in the requirements
var express = require('express');
var expresshandlebars = require('expresshandlebars')
var mysql = require('mysql')

var port = process.env.PORT || 3000;

var app = express();

// step 2: Server content
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Trainstogo1@",
  database: "burger_db"
});

connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });

  app.get("/", function(req, res) {
    connection.query("SELECT * FROM burger;", function(err, data) {
      if (err) {
        return res.status(500).end();
      }
  
      res.render("index", { quotes: data });
    });
  });

  app.get("/:id", function(req, res) {
    connection.query("SELECT * FROM burger where id = ?", [req.params.id], function(err, data) {
      if (err) {
        return res.status(500).end();
      }
  
  
