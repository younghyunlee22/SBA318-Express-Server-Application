const express = require("express");
const path = require("path");
const app = express();
const PORT = 8080;

const ejs = require("ejs");
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("./styles"));
app.use(express.static(path.join(__dirname, "images")));

// Middleware 1.
const logger = (req, res, next) => {
  console.log(`Request was made at: ${req.method} ${req.url}`);
  next();
};
app.use(logger);

// ejs testing
const data = {
  h1: "Younghyun",
};

app.get("/", (req, res) => {
  res.render("index", data);
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}.`);
});
