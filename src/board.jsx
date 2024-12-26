import React, { useState, useEffect } from 'react';
import AddTaskModal from './components/taskModal';
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
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  // Function to add a new task
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
          <header className="mb-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">Task Dashboard</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add Task
            </button>
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
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={addTask}
      />
    </div>
  );
};
export default Dashboard;
