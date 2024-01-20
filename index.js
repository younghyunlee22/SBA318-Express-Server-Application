const express = require("express");
const path = require("path");
const app = express();
const PORT = 8080;

const ejs = require("ejs");
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("./styles"));
app.use(express.static(path.join(__dirname, "images")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware 1.

app.use((req, res, next) => {
  console.log(`Request was made at: ${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.render("index", { title: "Pomodoro Planner" });
});

const apiTaskRouter = require("./routes/apis");
app.use("/api", apiTaskRouter);

const feedbackRouter = require("./routes/feedback");
app.use("/feedback", feedbackRouter);

const mockTodoRouter = require("./routes/peekTasks");
app.use("/peektasks", mockTodoRouter);

// Error-handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}.`);
});
