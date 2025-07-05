import React, { useState } from 'react';

const MAX_TITLE = 200;
const MAX_DESC = 500;

const TaskForm = ({ onAddTask }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const titleError = touched && !taskTitle.trim() ? 'Task title is required.' : '';
  const titleValid = !!taskTitle.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTouched(true);
    if (!taskTitle.trim()) return;
    onAddTask({
      title: taskTitle.trim(),
      description: taskDescription.trim(),
      priority: priority
    });
    setTaskTitle('');
    setTaskDescription('');
    setPriority('medium');
    setTouched(false);
    setSubmitted(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return { backgroundColor: '#FFCC00', color: '#0D0302' };
      case 'medium': return { backgroundColor: '#006BFF', color: '#FFFFFF' };
      case 'low': return { backgroundColor: '#0D0302', color: '#FFFFFF' };
      default: return { backgroundColor: '#006BFF', color: '#FFFFFF' };
    }
  };

  return (
    <form className="task-form-modern" onSubmit={handleSubmit} noValidate>
      <div className="form-row-modern">
        <label htmlFor="task-title" className="form-label-modern">
          Task Title <span aria-hidden="true" className="required-star">*</span>
        </label>
        <input
          id="task-title"
          name="task-title"
          type="text"
          className={`task-title-input-modern${titleError ? ' error' : ''}${titleValid && submitted ? ' success' : ''}`}
          placeholder="What needs to be done?"
          value={taskTitle}
          onChange={e => setTaskTitle(e.target.value)}
          onBlur={() => setTouched(true)}
          maxLength={MAX_TITLE}
          aria-required="true"
          aria-invalid={!!titleError}
          aria-describedby="task-title-desc task-title-err"
          autoFocus
        />
        <div className="form-row-bottom">
          <span id="task-title-desc" className="char-count-modern">{taskTitle.length}/{MAX_TITLE}</span>
          <span id="task-title-err" className="error-message-modern" aria-live="polite">{titleError}</span>
        </div>
      </div>

      <div className="form-row-modern">
        <label htmlFor="task-description" className="form-label-modern">
          Description <span className="optional-label">(Optional)</span>
        </label>
        <textarea
          id="task-description"
          name="task-description"
          className="task-desc-input-modern"
          placeholder="Add more details about this task..."
          value={taskDescription}
          onChange={e => setTaskDescription(e.target.value)}
          maxLength={MAX_DESC}
          aria-describedby="task-desc-desc"
          rows={4}
        />
        <div className="form-row-bottom">
          <span id="task-desc-desc" className="char-count-modern">{taskDescription.length}/{MAX_DESC}</span>
        </div>
      </div>

      <div className="form-row-modern priority-row">
        <label htmlFor="task-priority" className="form-label-modern">Priority</label>
        <select
          id="task-priority"
          name="task-priority"
          className="priority-select-modern"
          value={priority}
          onChange={e => setPriority(e.target.value)}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <span className="priority-indicator-modern" style={getPriorityColor(priority)}>{priority}</span>
      </div>

      <div className="form-actions-modern">
        <button
          type="submit"
          className="add-task-btn-modern"
          disabled={!taskTitle.trim()}
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm; 