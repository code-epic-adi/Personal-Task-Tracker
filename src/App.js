import React, { useState, useEffect, useMemo } from 'react';
import Login from './components/Login';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import TaskSearch from './components/TaskSearch';
import { loadTasks, saveTasks, loadCurrentUser, clearCurrentUser } from './utils/localStorage';

const DARK_MODE_KEY = 'task-tracker-dark-mode';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem(DARK_MODE_KEY);
    return stored ? stored === 'true' : false;
  });

  useEffect(() => {
    const savedUsername = loadCurrentUser();
    if (savedUsername) {
      const savedTasks = loadTasks(savedUsername);
      setUsername(savedUsername);
      setTasks(savedTasks);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && username) {
      saveTasks(tasks, username);
    }
  }, [tasks, isLoggedIn, username]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem(DARK_MODE_KEY, darkMode);
  }, [darkMode]);

  const handleLogin = (user) => {
    setUsername(user);
    setIsLoggedIn(true);
    const userTasks = loadTasks(user);
    setTasks(userTasks);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setTasks([]);
    clearCurrentUser();
  };

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now().toString(),
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority || 'medium',
      completed: false,
      createdAt: new Date()
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const editTask = (taskId, updatedData) => {
    setTasks(tasks.map(task =>
      task.id === taskId 
        ? { ...task, ...updatedData }
        : task
    ));
  };

  const clearCompleted = () => {
    if (window.confirm('Are you sure you want to delete all completed tasks?')) {
      setTasks(prev => prev.filter(task => !task.completed));
    }
  };

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks;
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchLower) || 
        (task.description && task.description.toLowerCase().includes(searchLower))
      );
    }
    switch (filter) {
      case 'active':
        filtered = filtered.filter(task => !task.completed);
        break;
      case 'completed':
        filtered = filtered.filter(task => task.completed);
        break;
      default:
        break;
    }
    return filtered.sort((a, b) => {
      switch (sort) {
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
          if (priorityDiff !== 0) return priorityDiff;
          // If same priority, sort by newest
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
  }, [tasks, filter, sort, searchTerm]);

  const stats = {
    total: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    pending: tasks.filter(task => !task.completed).length,
    completionRate: tasks.length > 0 ? Math.round((tasks.filter(task => task.completed).length / tasks.length) * 100) : 0,
    highPriority: tasks.filter(task => task.priority === 'high' && !task.completed).length
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className={`app${darkMode ? ' dark' : ''}`}>
      <header className="app-header">
        <div className="header-content">
          <div className="user-info">
            <div className="user-avatar">
              <span className="user-icon">👤</span>
            </div>
            <div>
              <h1>📋 Personal Task Tracker</h1>
              <p>Welcome back, {username}!</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              className="darkmode-toggle-btn"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={() => setDarkMode(dm => !dm)}
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? '🌙 Dark' : '☀️ Light'}
            </button>
            <button 
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <main className="app-main">
        {/* Stats Dashboard */}
        <div className="stats-dashboard">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-value">{stats.completed}</div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏰</div>
            <div className="stat-value">{stats.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-value">{stats.highPriority}</div>
            <div className="stat-label">High Priority</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-value">{stats.completionRate}%</div>
            <div className="stat-label">Completion Rate</div>
          </div>
        </div>

        <TaskForm onAddTask={addTask} darkMode={darkMode} />
        
        <TaskSearch 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <TaskFilter 
          currentFilter={filter} 
          sort={sort}
          onFilterChange={setFilter}
          onSortChange={setSort}
          onClearCompleted={clearCompleted}
          tasks={tasks}
        />
        
        <TaskList 
          tasks={filteredAndSortedTasks}
          onToggleTask={toggleTask}
          onDeleteTask={deleteTask}
          onEditTask={editTask}
          searchTerm={searchTerm}
          filter={filter}
          darkMode={darkMode}
        />
      </main>
    </div>
  );
}

export default App; 