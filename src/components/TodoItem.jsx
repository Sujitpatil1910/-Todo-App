import React from 'react';

const TodoItem = ({ task, onDelete, onToggle }) => {
  const handleCheckboxChange = () => {
    onToggle(task.id); // Toggle the task completion status
  };

  return (
    <li className={`flex items-center justify-between p-4 bg-gray-100 rounded-md mb-4
      ${task.completed ? 'bg-green-100 line-through text-gray-500' : 'text-gray-800'}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleCheckboxChange}
        className="mr-4"
      />
      <span className="flex-1 cursor-pointer">{task.text}</span>
      <button
        onClick={() => onDelete(task.id)}
        className="text-red-600 hover:text-red-800 transition"
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
