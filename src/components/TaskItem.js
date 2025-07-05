import React, { useState } from 'react';

const MAX_TITLE = 200;
const MAX_DESC = 500;

const TaskItem = ({ task, onToggle, onDelete, onEdit, darkMode }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [editPriority, setEditPriority] = useState(task.priority || 'medium');
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const titleError = touched && !editTitle.trim() ? 'Task title is required.' : '';
  const titleValid = !!editTitle.trim();

  const formatDate = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityColor = (priority) => {
    if (darkMode) {
      switch (priority) {
        case 'high': return { backgroundColor: '#FFCC00', color: '#0D0302' };
        case 'medium': return { backgroundColor: '#006BFF', color: '#FFFFFF' };
        case 'low': return { backgroundColor: '#FFD580', color: '#0D0302' };
        default: return { backgroundColor: '#006BFF', color: '#FFFFFF' };
      }
    } else {
      switch (priority) {
        case 'high': return { backgroundColor: '#FFCC00', color: '#0D0302' };
        case 'medium': return { backgroundColor: '#006BFF', color: '#FFFFFF' };
        case 'low': return { backgroundColor: '#0D0302', color: '#FFFFFF' };
        default: return { backgroundColor: '#006BFF', color: '#FFFFFF' };
      }
    }
  };

  const handleEdit = (e) => {
    e && e.preventDefault && e.preventDefault();
    setSubmitted(true);
    setTouched(true);
    if (!editTitle.trim()) return;
    onEdit(task.id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
      priority: editPriority
    });
    setShowEditModal(false);
    setTouched(false);
    setSubmitted(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setEditPriority(task.priority || 'medium');
    setShowEditModal(false);
    setTouched(false);
    setSubmitted(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  return (
    <>
      <div className={`task-item ${task.completed ? 'completed' : ''}`}>
        <div className="task-content">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="task-checkbox"
          />
          <div className="task-details">
            <div className="task-header">
              <h3 className="task-title">{task.title}</h3>
              <span 
                className="priority-badge"
                style={getPriorityColor(task.priority)}
              >
                {task.priority}
              </span>
            </div>
            {task.description && (
              <div className="task-description-container">
                <p className="task-description-text">{task.description}</p>
              </div>
            )}
            <div className="task-meta">
              <span className="task-date">
                Created: {formatDate(task.createdAt)}
              </span>
            </div>
          </div>
        </div>
        <div className="task-actions">
          <button
            onClick={() => setShowEditModal(true)}
            className="edit-btn"
            title="Edit task (Ctrl+Enter to save, Esc to cancel)"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="delete-btn"
            title="Delete task"
          >
            ×
          </button>
        </div>
      </div>

      {showEditModal && (
        <div className="modal-overlay" onClick={handleCancelEdit}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Edit Task</h3>
              <button className="close-btn" onClick={handleCancelEdit}>
                ×
              </button>
            </div>
            <form className="modal-form" onSubmit={handleEdit} noValidate>
              <div className="form-row-modern">
                <label htmlFor="edit-title" className="form-label-modern">
                  Task Title <span aria-hidden="true" className="required-star">*</span>
                </label>
                <input
                  type="text"
                  id="edit-title"
                  name="edit-title"
                  className={`task-title-input-modern${titleError ? ' error' : ''}${titleValid && submitted ? ' success' : ''}`}
                  placeholder="What needs to be done?"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  onBlur={() => setTouched(true)}
                  maxLength={MAX_TITLE}
                  aria-required="true"
                  aria-invalid={!!titleError}
                  aria-describedby="edit-title-desc edit-title-err"
                  autoFocus
                  onKeyDown={handleKeyPress}
                />
                <div className="form-row-bottom">
                  <span id="edit-title-desc" className="char-count-modern">{editTitle.length}/{MAX_TITLE}</span>
                  <span id="edit-title-err" className="error-message-modern" aria-live="polite">{titleError}</span>
                </div>
              </div>

              <div className="form-row-modern">
                <label htmlFor="edit-description" className="form-label-modern">
                  Description <span className="optional-label">(Optional)</span>
                </label>
                <textarea
                  id="edit-description"
                  name="edit-description"
                  className="task-desc-input-modern"
                  placeholder="Add more details about this task..."
                  value={editDescription}
                  onChange={e => setEditDescription(e.target.value)}
                  maxLength={MAX_DESC}
                  aria-describedby="edit-desc-desc"
                  rows={4}
                  onKeyDown={handleKeyPress}
                />
                <div className="form-row-bottom">
                  <span id="edit-desc-desc" className="char-count-modern">{editDescription.length}/{MAX_DESC}</span>
                </div>
              </div>

              <div className="form-row-modern priority-row">
                <label htmlFor="edit-priority" className="form-label-modern">Priority</label>
                <select
                  id="edit-priority"
                  name="edit-priority"
                  className="priority-select-modern"
                  value={editPriority}
                  onChange={e => setEditPriority(e.target.value)}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                <span className="priority-indicator-modern" style={getPriorityColor(editPriority)}>{editPriority}</span>
              </div>

              <div className="form-actions-modern">
                <button type="button" className="modal-btn cancel-btn" onClick={handleCancelEdit}>
                  Cancel
                </button>
                <button type="submit" className="modal-btn save-btn" disabled={!editTitle.trim()}>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskItem; 