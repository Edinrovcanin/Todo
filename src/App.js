import React from "react";
import "./App.css";
import { Button, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "./config"

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function Todo({ todo, index, markTask, removeTask }) {
  return (
    <div className="todo">
      <span style={{ textDecoration: todo.finished ? "line-through" : "" }}>
        {todo.text}
      </span>
      <div>
        <Button variant="outline-success" onClick={() => markTask(index)}>
          Finish
        </Button>{" "}
        <Button variant="outline-danger" onClick={() => removeTask(index)}>
          Delete
        </Button>
      </div>
    </div>
  );
}

function FormTodo({ addTask }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTask(value);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>
          <b>Add Task</b>
        </Form.Label>
        <Form.Control
          type="text"
          className="input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add new task"
        />
      </Form.Group>
      <Button variant="primary mb-3" type="submit">
        Add
      </Button>
    </Form>
  );
}

function App() {
  const [tasks, setTasks] = React.useState([
    {
      text: "Testni zadatak",
      finished: false,
    },
  ]);

  const addTask = (text) => {
    const newtasks = [...tasks, { text }];
    setTasks(newtasks);
  };

  const markTask = (index) => {
    const newtasks = [...tasks];
    newtasks[index].finished = true;
    setTasks(newtasks);
  };

  const removeTask = (index) => {
    const newtasks = [...tasks];
    newtasks.splice(index, 1);
    setTasks(newtasks);
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">List of tasks</h1>
        <FormTodo addTask={addTask} />
        <div>
          {tasks.map((todo, index) => (
            <Card>
              <Card.Body>
                <Todo
                  key={index}
                  index={index}
                  todo={todo}
                  markTask={markTask}
                  removeTask={removeTask}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
