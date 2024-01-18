const express = require("express");
const path = require("path");
const app = express();
const PORT = 8080;

const ejs = require("ejs");
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("./styles"));
app.use(express.static(path.join(__dirname, "images")));

const mockTodoRouter = require("./routes/peekTodos");
app.use("/peekTodos", mockTodoRouter);

// Middleware 1.
const logger = (req, res, next) => {
  console.log(`Request was made at: ${req.method} ${req.url}`);
  next();
};
app.use(logger);

app.get("/", (req, res) => {
  res.render("index", { title: "Pomodoro Planner" });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}.`);
});
