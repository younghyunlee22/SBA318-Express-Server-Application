const express = require("express");

const router = express.Router();

// /tasks
// /tasks/new

const taskArr = [];

router.route("/").get((req, res) => {
  try {
    res.render("tasks", { title: "Tasks" });
  } catch (err) {
    console.log("Getting tasks page failed", err);
  }
});

router.post("/new", (req, res) => {
  try {
    const duration = req.body.duration;
    const task = req.body.task;

    const newTaskObj = {
      id: taskArr.length + 1,
      duration: duration,
      task: task,
    };
    console.log(newTaskObj);
    taskArr.push(newTaskObj);
    res.render("tasks");
  } catch (err) {
    console.log("Failed to creat a task", err);
  }
});

module.exports = router;
