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
    connection.query("SELECT * FROM burgers;", function(err, data) {
      if (err) {
        return res.status(500).end();
      }
  
      res.render("index", { quotes: data });
    });
  });

  app.get("/:id", function(req, res) {
    connection.query("SELECT * FROM burgers where id = ?", [req.params.id], function(err, data) {
      if (err) {
        return res.status(500).end();
      }
      res.render("index", { burgers: data });
    });
  });

  app.get("/:id", function(req, res) {
    connection.query("SELECT * FROM burgers where id = ?", [req.params.id], function(err, data) {
      if (err) {
        return res.status(500).end();
      }
  
      console.log(data);
      res.render("single-burger", data[0]);
    });
  });

  app.post("/api/burger", function(req, res) {
    connection.query("INSERT INTO burger, [req.params.id] function(
      err,
      result
    ) {
      if (err) {
        // If an error occurred, send a generic server failure
        return res.status(500).end();
      }
  
      // Send back the ID of new burger
      res.json({ id: result.insertId });
    });
  });
  app.delete("/api/quotes/:id", function(req, res) {
    connection.query("DELETE FROM quotes WHERE id = ?", [req.params.id], function(err, result) {
      if (err) {
        // If an error occurred, send a generic server failure
        return res.status(500).end();
      }
      else if (result.affectedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
  
    });
  });

  app.put("/api/quotes/:id", function(req, res) {
    connection.query(
      "UPDATE quotes SET author = ?, quote = ? WHERE id = ?",
      [req.body.author, req.body.quote, req.params.id],
      function(err, result) {
        if (err) {
          // If an error occurred, send a generic server failure
          return res.status(500).end();
        }
        else if (result.changedRows === 0) {
          // If no rows were changed, then the ID must not exist, so 404
          return res.status(404).end();
        }
        res.status(200).end();
  
      }
    );
  });
  
  app.listen(PORT, function() {
    
    console.log("Server listening on: http://localhost:" + PORT);
  });
  
  
  
  
  
  
  
