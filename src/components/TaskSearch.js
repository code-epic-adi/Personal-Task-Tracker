import React from 'react';

const TaskSearch = ({ searchTerm, onSearchChange }) => {
  const handleClear = () => {
    onSearchChange('');
  };

  return (
    <div className="task-search-container">
      <div className="search-input-wrapper">
        <div className="search-icon">🔍</div>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="clear-search-btn"
            title="Clear search"
          >
            ×
          </button>
        )}
      </div>
      {searchTerm && (
        <p className="search-info">
          Searching for: "{searchTerm}"
        </p>
      )}
    </div>
  );
};

export default TaskSearch; 