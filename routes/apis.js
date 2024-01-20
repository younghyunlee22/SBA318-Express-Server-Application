const express = require("express");

const router = express.Router();
let todos = require("../data/todos");
let users = require("../data/users");

// Middleware 2.
const validateTask = (req, res, next) => {
  const { todo, completed, userId } = req.body;
  console.log(completed);
  if (userId < 1) {
    res.status(400).send("Invalid User ID");
  } else if (todo == "") {
    res.status(400).send("Input your task");
  } else {
    next();
  }
};

router.get("/users", (req, res) => {
  try {
    users = users.sort((a, b) => a.userId - b.userId);
    res.json(users);
  } catch (err) {
    console.log("Failed to get the user list", err);
  }
});

router
  .route("/users/:id")
  .get((req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const result = users.find((user) => user.userId == userId);
      // or destructure it like the following
      // const result = users.find(({ userId: user }) => user === userId);
      if (!result) {
        res.send("User Not Found");
      } else {
        res.json(result);
      }
    } catch (err) {
      console.log("Failed to find user by id", err);
    }
  })
  .patch((req, res) => {
    try {
      const user = users.find((u, i) => {
        if (u.userId == req.params.id) {
          for (const key in req.body) {
            if (key == "userId") continue;
            else users[i][key] = req.body[key];
          }
          return true;
        }
      });

      if (!user) res.send("User Not Found");
      else res.json(user);
    } catch (err) {
      console.log("Failed to update user", err);
    }
  })
  .delete((req, res) => {
    try {
      const user = users.find((u, i) => {
        if (u.userId == req.params.id) {
          users.splice(i, 1);
          return true;
        }
      });

      if (!user) res.send("User Not Found");
      else res.json(user);
    } catch (err) {
      console.log("Failed to delete user", err);
    }
  });

router.get("/tasks", (req, res) => {
  try {
    todos = todos.sort((a, b) => a.userId - b.userId);
    res.json(todos);
  } catch (err) {
    console.log("Failed to get the task list", err);
  }
});

router
  .route("/tasks/:id")
  .get((req, res) => {
    try {
      const taskId = parseInt(req.params.id);
      const result = todos.find((todo) => todo.id == taskId);
      if (!result) {
        res.send("Task Not Found");
      } else {
        res.json(result);
      }
    } catch (err) {
      console.log("Failed to find task by id", err);
    }
  })
  .patch(validateTask, (req, res) => {
    try {
      const result = todos.find((todo, i) => {
        if (todo.id == req.params.id) {
          for (const key in req.body) {
            if (key == "userId") continue;
            else todos[i][key] = req.body[key];
          }
          return true;
        }
      });

      if (!result) res.send("Task Not Found");
      else res.json(result);
    } catch (err) {
      console.log("Failed to update task", err);
    }
  })
  .delete((req, res) => {
    try {
      const result = todos.find((todo, i) => {
        if (todo.id == req.params.id) {
          todos.splice(i, 1);
          return true;
        }
      });

      if (!result) res.send("Task Not Found");
      else res.json(result);
    } catch (err) {
      console.log("Failed to delete task", err);
    }
  });

router.post("/tasks/new", validateTask, (req, res) => {
  try {
    const { todo, completed, userId } = req.body;

    const newTaskObj = {
      id: todos.length + 1,
      todo,
      completed,
      userId,
    };
    console.log(newTaskObj);
    todos.push(newTaskObj);
    res.redirect("/api/tasks");
  } catch (err) {
    console.log("Line 152 Failed to create a task", err);
  }
});

module.exports = router;
