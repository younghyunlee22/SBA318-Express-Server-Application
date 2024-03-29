const express = require("express");

const router = express.Router();

const mockTaskdata = require("../data/dataMockTasks");

router.get("/", (req, res) => {
  try {
    res.render("peekTasks", {
      title: "Peek sample tasks!",
      options: mockTaskdata,
    });
  } catch (err) {
    console.log("Failed to get peektasks", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
