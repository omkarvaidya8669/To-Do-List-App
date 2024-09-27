import React, { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import "bootstrap/dist/css/bootstrap.min.css";

const Application = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showForm, setShowForm] = useState(false); // New state to handle form visibility

  // Example list of users for the dropdown
  const users = ["Alice", "Bob", "Charlie", "Dave"];

  const addTask = (task) => {
    setTasks([...tasks, task]);
    setShowForm(false); // Hide the form after adding a task
  };

  const editTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    setSelectedTask(null);
    setShowForm(false); // Hide the form after editing a task
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const selectTask = (task) => {
    setSelectedTask(task);
    setShowForm(true); // Show form when editing a task
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="text-left">To-Do List</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Hide Task Form" : "Add Task"}
        </button>
      </div>

      {/* Conditionally render TaskForm based on showForm */}
      {showForm && (
        <div className="mb-4">
          <TaskForm
            addTask={addTask}
            editTask={editTask}
            selectedTask={selectedTask}
            users={users}
          />
        </div>
      )}

      {/* Conditionally render TaskList if the form is not visible */}
      {!showForm && (
        <TaskList tasks={tasks} deleteTask={deleteTask} selectTask={selectTask} />
      )}
    </div>
  );
};

export default Application;
