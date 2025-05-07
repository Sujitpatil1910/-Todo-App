import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'; // Ensure this path is correct

import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import FilterBar from './components/FilterBar';

const getSavedTasks = () => {
  const saved = localStorage.getItem('tasks');
  return saved ? JSON.parse(saved) : [];
};

function App() {
  const [tasks, setTasks] = useState(getSavedTasks);
  const [filter, setFilter] = useState('all');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const navigate = useNavigate();

  // Check login status and loading state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate('/login');
      } else {
        setUser(currentUser);
      }
      setLoading(false); // Set loading to false after checking auth state
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id, newText) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, text: newText } : task)));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  // Handle loading state and prevent rendering while auth state is being checked
  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-4 text-center">Todo App</h1>
      <TodoInput onAdd={addTask} />
      <FilterBar filter={filter} setFilter={setFilter} />
      {filteredTasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks available.</p>
      ) : (
        <TodoList
          tasks={filteredTasks}
          onDelete={deleteTask}
          onUpdate={updateTask}
          onToggle={toggleComplete}
        />
      )}
    </div>
  );
}

export default App;
