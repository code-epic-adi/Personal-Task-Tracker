import React from 'react';

const TaskFilter = ({ 
  currentFilter, 
  sort, 
  onFilterChange, 
  onSortChange, 
  onClearCompleted, 
  tasks 
}) => {
  const getTaskCount = (filterType) => {
    switch (filterType) {
      case 'all':
        return tasks.length;
      case 'active':
        return tasks.filter(task => !task.completed).length;
      case 'completed':
        return tasks.filter(task => task.completed).length;
      default:
        return 0;
    }
  };

  const completedCount = tasks.filter(task => task.completed).length;

  const filters = [
    { key: 'all', label: 'All', icon: '📋' },
    { key: 'active', label: 'Active', icon: '⏳' },
    { key: 'completed', label: 'Completed', icon: '✅' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'priority', label: 'By Priority' },
    { value: 'alphabetical', label: 'Alphabetical' }
  ];

  return (
    <div className="task-filter">
      <div className="filter-header">
        <div className="filter-title">
          <span className="filter-icon">🔍</span>
          <span>Filter & Sort</span>
        </div>
      </div>
      
      <div className="filter-controls">
        <div className="filter-buttons">
          {filters.map(filter => (
            <button
              key={filter.key}
              onClick={() => onFilterChange(filter.key)}
              className={`filter-btn ${currentFilter === filter.key ? 'active' : ''}`}
            >
              <span className="filter-icon">{filter.icon}</span>
              {filter.label}
              <span className="filter-count">{getTaskCount(filter.key)}</span>
            </button>
          ))}
        </div>

        <div className="sort-controls">
          <div className="sort-selector">
            <label htmlFor="sort-select">Sort by:</label>
            <select
              id="sort-select"
              value={sort}
              onChange={(e) => onSortChange(e.target.value)}
              className="sort-select"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {completedCount > 0 && (
            <button
              onClick={onClearCompleted}
              className="clear-completed-btn"
              title="Delete all completed tasks"
            >
              🗑️ Clear Completed
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskFilter; 