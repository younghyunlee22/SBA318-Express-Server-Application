const express = require("express");

const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));

let taskArr = [{ id: 1, duration: "22", task: "learn javascript" }];

router.get("/", (req, res) => {
  try {
    console.log("Line 15 taskArr", taskArr);
    res.json(taskArr);
  } catch (err) {
    console.log("Failed to get task lists", err);
  }
});

router.post("/new", (req, res) => {
  try {
    console.log("Reqeust body?", req.body);

    const { duration, task } = req.body;

    const newTaskObj = {
      id: taskArr.length + 1,
      duration,
      task,
    };
    console.log(newTaskObj);
    taskArr.push(newTaskObj);
    console.log("line 35", taskArr);
    res.redirect("/");
  } catch (err) {
    console.log("Line 39 Failed to create a task", err);
  }
});

module.exports = router;
