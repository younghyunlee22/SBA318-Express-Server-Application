# Express Server Application

This project is a Node.js application built with Express to create a RESTful API. The application meets the following objectives:

## Objectives

### Middleware

- Two custom middleware functions have been created and used in the application to log all the API requests and validate todo data.
- An error-handling middleware is implemented to handle errors gracefully.

### Data Categories

- The application uses three different data categories: `users`, `todos`, and `mockTasks`.

### Data Structuring

- Reasonable data structuring practices are followed for each data category.

### REST Principles

- The application adheres to the guiding principles of REST.

### Routes

- GET /
  - GET /api
  - GET /api/users
  - POST /api/users
    - GET /api/users/:id
    - PATCH /api/users/:id
    - DELETE /api/users/:id
  - GET /api/tasks
    - Query parameters
      ```<code>
      - ?userId=<value> (between 1 and 50)
      - ?id=<VALUE> (between 1 and 150)
      - ?userId=<number>&id=<number>
      - ?completed=<true or false>
      ```
    - GET /api/tasks/:id
    - PATCH /api/tasks/:id
    - DELETE /api/tasks/:id
  - POST /api/tasks/new
  - GET /peektasks
  - GET /feedback/new (A form will get sent by res.send())
  - POST /feedback (The route to which the form will make a POST request)
  - GET /feedback (Getting the submitted form(s))

### Rendering Views

- Views are created and rendered using the ejs template engine.
- Simple CSS is applied to style the rendered views.

### Form Interaction

- A Feedback form is included within a rendered view, allowing interaction with the RESTful API.

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the server:

   ```bash
   npm start
   ```

3. Open your browser and navigate to http://localhost:8080 to interact with the REST APIs.
