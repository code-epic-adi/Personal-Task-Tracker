const USERS_STORAGE_KEY = 'task-tracker-users';
const CURRENT_USER_KEY = 'task-tracker-current-user';

export const saveTasks = (tasks, username) => {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '{}');
    if (!users[username]) return; // Don't save if user doesn't exist
    users[username] = {
      ...users[username], // preserve password and other fields
      tasks,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};

export const loadTasks = (username) => {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '{}');
    return users[username]?.tasks || [];
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    return [];
  }
};

export const clearTasks = (username) => {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '{}');
    delete users[username];
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error clearing tasks from localStorage:', error);
  }
};

export const saveCurrentUser = (username) => {
  try {
    localStorage.setItem(CURRENT_USER_KEY, username);
  } catch (error) {
    console.error('Error saving current user to localStorage:', error);
  }
};

export const loadCurrentUser = () => {
  try {
    return localStorage.getItem(CURRENT_USER_KEY) || '';
  } catch (error) {
    console.error('Error loading current user from localStorage:', error);
    return '';
  }
};

export const clearCurrentUser = () => {
  try {
    localStorage.removeItem(CURRENT_USER_KEY);
  } catch (error) {
    console.error('Error clearing current user from localStorage:', error);
  }
};

export const createUser = (username, password) => {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '{}');
    if (users[username]) {
      return { success: false, message: 'Username already exists' };
    }
    
    users[username] = {
      password: password,
      tasks: [],
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    return { success: true };
  } catch (error) {
    console.error('Error creating user:', error);
    return { success: false, message: 'Error creating user' };
  }
};

export const authenticateUser = (username, password) => {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '{}');
    const user = users[username];
    
    if (!user) {
      return { success: false, message: 'User not found' };
    }
    
    if (user.password !== password) {
      return { success: false, message: 'Incorrect password' };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error authenticating user:', error);
    return { success: false, message: 'Error authenticating user' };
  }
};

export const getAllUsers = () => {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '{}');
    return Object.keys(users);
  } catch (error) {
    console.error('Error getting all users:', error);
    return [];
  }
}; 