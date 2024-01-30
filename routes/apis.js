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

router
  .route("/users")
  .get((req, res) => {
    try {
      users = users.sort((a, b) => a.userId - b.userId);
      res.json(users);
    } catch (err) {
      console.log("Failed to get the user list", err);
      res.status(500).json({ success: false, error: err.message });
    }
  })
  .post((req, res) => {
    try {
      const { username, firstName } = req.body;
      if (username !== undefined) {
        const result = users.find((user) => user.username == username);
        if (!result) {
          if (firstName !== undefined) {
            const newUserObj = {
              userId: users.length + 1,
              username,
              firstName,
            };
            users.push(newUserObj);
            res.json(newUserObj);
          }
        } else {
          res.send("Username is already taken");
        }
      }
    } catch (err) {
      console.log("Failed to create a user", err);
      res.status(500).json({ success: false, error: err.message });
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
      res.status(500).json({ success: false, error: err.message });
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
      res.status(500).json({ success: false, error: err.message });
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
      res.status(500).json({ success: false, error: err.message });
    }
  });

router.get("/tasks", (req, res) => {
  try {
    // query parameters for data filtering
    const { userId, id, completed } = req.query;
    if (userId !== undefined || id !== undefined || completed !== undefined) {
      let filteredTasks = [...todos];

      if (userId !== undefined) {
        const targetUserId = parseInt(userId);
        filteredTasks = filteredTasks.filter(
          (user) => user.userId === targetUserId
        );
        // nested if for additional filtering through the use of query parameters
        if (id !== undefined) {
          const targetTaskId = parseInt(id);
          filteredTasks = filteredTasks.filter(
            (task) => task.id === targetTaskId
          );
        }
      }

      if (id !== undefined) {
        const targetTaskId = parseInt(id);
        filteredTasks = filteredTasks.filter(
          (task) => task.id === targetTaskId
        );
      }
      if (completed !== undefined) {
        const isCompleted = completed.toLowerCase() === "true";
        filteredTasks = filteredTasks.filter(
          (task) => task.completed === isCompleted
        );
      }
      res.json(filteredTasks);
    } else {
      res.json(todos);
    }
  } catch (err) {
    console.log("Failed to get the task list", err);
    res.status(500).json({ success: false, error: err.message });
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
      res.status(500).json({ success: false, error: err.message });
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
      res.status(500).json({ success: false, error: err.message });
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
      res.status(500).json({ success: false, error: err.message });
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
    console.log("Failed to create a task", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
