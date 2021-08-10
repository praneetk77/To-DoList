const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/views/date.js");
const mongoose = require("mongoose");

const app = express();

// var items = ["Buy food", "Cook food", "Eat food"];
// var workItems = ["Code"];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const itemSchema = mongoose.Schema({
  name: String,
});

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
  name: "This is the first task.",
});

const item2 = new Item({
  name: "This is the second task.",
});

const item3 = new Item({
  name: "This is the third task.",
});

app.get("/", function (req, res) {
  let day = date.getDate();

  Item.find(function (err, items) {
    if (items.length === 0) {
      const defaultItems = [item1, item2, item3];

      Item.insertMany(defaultItems, function (err) {
        if (err) console.log(err);
        else console.log("Successfully added default items.");
      });
      res.redirect("/");
    } else {
      res.render("list", { listTitle: day, newItems: items });
    }
  });
});

app.post("/", function (req, res) {
  const itemName = req.body.newTask;

  const newItem = new Item({
    name: itemName,
  });

  newItem.save();
  res.redirect("/");

  // if (req.body.submit === "Work") {
  //   workItems.push(req.body.newTask);
  //   res.redirect("/work");
  // } else {
  //   items.push(req.body.newTask);
  //   res.redirect("/");
  // }
});

app.post("/delete", function (req, res) {
  const checkedBoxId = req.body.checkbox;
  Item.findByIdAndRemove(checkedBoxId, function (err) {
    if (err) console.log(err);
    else console.log("Successfully deleted.");
    res.redirect("/");
  });
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work", newItems: workItems });
});

// app.post("/work", function (req, res) {
//   items.push(req.body.newTask);
//   res.redirect("/work");
// });

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Port started on server 3000.");
});
