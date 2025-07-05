import React, { useState } from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggleTask, onDeleteTask, onEditTask, searchTerm, filter, darkMode }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleDeleteClick = (taskId) => {
    setTaskToDelete(taskId);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      onDeleteTask(taskToDelete);
      setShowDeleteConfirm(false);
      setTaskToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setTaskToDelete(null);
  };

  const getEmptyStateMessage = () => {
    if (searchTerm) {
      return {
        icon: '🔍',
        title: 'No tasks found',
        message: `No tasks match "${searchTerm}". Try a different search term.`
      };
    }
    if (filter === 'completed') {
      return {
        icon: '✅',
        title: 'No completed tasks',
        message: 'Complete some tasks to see them here!'
      };
    }
    if (filter === 'active') {
      return {
        icon: '🎉',
        title: 'No pending tasks',
        message: 'Great job! All tasks are completed.'
      };
    }
    return {
      icon: '📋',
      title: 'No tasks yet',
      message: 'Add your first task to get started!'
    };
  };

  if (tasks.length === 0) {
    const emptyState = getEmptyStateMessage();
    
    return (
      <div className="task-list-empty">
        <div className="empty-state">
          <div className="empty-icon">{emptyState.icon}</div>
          <h3 className="empty-title">{emptyState.title}</h3>
          <p className="empty-message">{emptyState.message}</p>
        </div>
      </div>
    );
  }

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <>
      <div className="task-list">
        {pendingTasks.length > 0 && (
          <div className="task-section">
            <div className="section-header">
              <span className="section-icon">⏳</span>
              <h2 className="section-title">Pending Tasks ({pendingTasks.length})</h2>
            </div>
            <div className="section-tasks">
              {pendingTasks.map((task, index) => (
                <div 
                  key={task.id} 
                  className="task-item-wrapper"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <TaskItem
                    task={task}
                    onToggle={onToggleTask}
                    onDelete={handleDeleteClick}
                    onEdit={onEditTask}
                    darkMode={darkMode}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {completedTasks.length > 0 && (
          <div className="task-section">
            <div className="section-header">
              <span className="section-icon">✅</span>
              <h2 className="section-title">Completed Tasks ({completedTasks.length})</h2>
            </div>
            <div className="section-tasks">
              {completedTasks.map((task, index) => (
                <div 
                  key={task.id} 
                  className="task-item-wrapper"
                  style={{ animationDelay: `${(pendingTasks.length + index) * 0.1}s` }}
                >
                  <TaskItem
                    task={task}
                    onToggle={onToggleTask}
                    onDelete={handleDeleteClick}
                    onEdit={onEditTask}
                    darkMode={darkMode}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={handleCancelDelete}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="confirm-title">Delete Task</h3>
            <p className="confirm-message">
              Are you sure you want to delete this task? This action cannot be undone.
            </p>
            <div className="confirm-actions">
              <button className="confirm-btn confirm-cancel" onClick={handleCancelDelete}>
                Cancel
              </button>
              <button className="confirm-btn confirm-delete" onClick={handleConfirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskList; 