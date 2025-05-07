import { useState } from 'react'; // Ensure useState is imported
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import TodoInput from '../components/TodoInput'; // Import TodoInput
import TodoList from '../components/TodoList'; // Import TodoList
import FilterBar from '../components/FilterBar'; // Import FilterBar

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Initialize state for tasks
  const [tasks, setTasks] = useState([]); // Store tasks in state
  const [filter, setFilter] = useState('all'); // Set initial filter as 'all'

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/'); // Navigate to the login page after logout
  };

  const addTask = (text) => {
    const newTask = { id: Date.now(), text, completed: false }; // Add task with unique id
    setTasks([...tasks, newTask]); // Add new task to the list
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id)); // Remove task from the list
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true; // For 'all' tasks
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-green-500 flex flex-col items-center justify-center p-6">
      <div className="text-white text-center mb-6">
        <h1 className="text-3xl font-bold mb-4">Welcome, {currentUser?.email}</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-xl">
        {/* Todo List Components */}
        <TodoInput onAdd={addTask} />
        <FilterBar filter={filter} setFilter={setFilter} />
        <TodoList
          tasks={filteredTasks}
          onDelete={deleteTask}
          onToggle={toggleComplete}
        />
      </div>
    </div>
  );
};

export default Dashboard;
