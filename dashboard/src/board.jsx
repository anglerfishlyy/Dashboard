import React, { useState, useEffect } from 'react';

// Load tasks from localStorage
const loadSavedTasks = () => {
  const saved = localStorage.getItem('tasks');
  if (saved) {
    return JSON.parse(saved);
  }
  return {
    todo: [{ id: 1, title: 'Sample Task', description: 'This is a sample task description' }],
    inProgress: [],
    done: []
  };
};

const Dashboard = () => {
  // State for all tasks
  const [tasks, setTasks] = useState(loadSavedTasks());

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Function to add a new task (we'll implement this next)
  const addTask = (title, description) => {
    const newTask = {
      id: Date.now(),
      title,
      description
    };
    
    setTasks(prev => ({
      ...prev,
      todo: [...prev.todo, newTask]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Task Dashboard</h1>
        {/* We'll add the add task button and filter controls here later */}
      </header>

      {/* Task columns container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Todo Column */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">To Do</h2>
          <div className="space-y-4">
            {tasks.todo.map(task => (
              <div key={task.id} className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* In Progress Column */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">In Progress</h2>
          <div className="space-y-4">
            {tasks.inProgress.map(task => (
              <div key={task.id} className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Done Column */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Done</h2>
          <div className="space-y-4">
            {tasks.done.map(task => (
              <div key={task.id} className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;