const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = ["Buy food", "Cook food", "Eat food"];
var workItems = ["Code"];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  var day = today.toLocaleDateString("en-US", options);
  res.render("list", { listTitle: day, newItems: items });
});

app.post("/", function (req, res) {
  if (req.body.submit === "Work") {
    workItems.push(req.body.newTask);
    res.redirect("/work");
  } else {
    items.push(req.body.newTask);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work", newItems: workItems });
});

app.post("/work", function (req, res) {
  items.push(req.body.newTask);
  res.redirect("/work");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Port started on server 3000.");
});
