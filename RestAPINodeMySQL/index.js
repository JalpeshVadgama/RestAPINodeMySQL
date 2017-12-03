var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.por || 3000;
var router = express.Router();

app.use("/api/employee", router);

var mysql = require("mysql");

var con = mysql.createConnection({
    host: "Your host or ip address",
    user: "username for mysql",
    password: "Password for mysql",
    database: "database-name"
});

router.get("/", function (req, res, next) {
    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT * FROM employee", function (err, result, fields) {
            if (err) throw err;
            res.send(JSON.stringify({
                "status": 200,
                "error": null,
                "response": result
            }));
        });
    });
});

app.listen(port, function () {
    console.log("Express server running on port %d", port);
});







