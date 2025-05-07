import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ tasks, onDelete, onToggle }) => {
  return (
    <ul className="space-y-4 mt-4">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
};

export default TodoList;
