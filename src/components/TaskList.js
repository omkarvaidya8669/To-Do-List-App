import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TaskList = ({ tasks, deleteTask, selectTask }) => {
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const tasksPerPage = 5; // Number of tasks per page

  // Logic to calculate the current tasks to display based on pagination
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Title</th>
            <th>Assigned User</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.assignedUser}</td>
              <td>{task.status}</td>
              <td>{task.dueDate}</td>
              <td>{task.priority}</td>
              <td>{task.comments}</td>
              <td>
                <button onClick={() => selectTask(task)} className="btn btn-warning btn-sm me-2">
                  Edit
                </button>
                <button onClick={() => deleteTask(task.id)} className="btn btn-danger btn-sm">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <nav>
          <ul className="pagination justify-content-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index + 1} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                <button onClick={() => paginate(index + 1)} className="page-link">
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
};

export default TaskList;
