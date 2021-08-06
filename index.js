const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

var items = [];

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  var day = today.toLocaleDateString("en-US", options);
  res.render("list", { kindOfDay: day, newItems: items });
});

app.post("/", function (req, res) {
  items.push(req.body.newTask);
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Port started on server 3000.");
});
