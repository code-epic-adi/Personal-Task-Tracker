# 📋 Personal Task Tracker

A modern, user-friendly task management application built with React. Designed for productivity, this app helps you organize, track, and manage your daily tasks efficiently.

---

## ✨ Features

### 🔐 Authentication
- Simple username-based login
- Username persistence in localStorage
- Automatic login restoration on page refresh

### 📋 Task Management
- **Add Task**: Form with title (required) and description (optional)
- **Edit Task**: Inline editing via modal with form validation
- **Delete Task**: Confirmation modal before deletion
- **Toggle Complete**: Checkbox to mark tasks as completed/pending

### 📄 Task Display
- Clear title and description display
- Creation date/time stamp
- Visual distinction between completed and pending tasks
- Responsive design for mobile and desktop

### 🔍 Task Filtering
- Filter tabs for All, Active, and Completed tasks
- Real-time task count for each filter category
- Smooth transitions and visual feedback

### 💾 Data Persistence
- localStorage integration for task storage
- Username persistence across sessions
- Automatic data synchronization

---

## 🏗️ Project Structure

```
task-tracker/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Login.js          # Authentication component
│   │   ├── TaskForm.js       # Add new tasks
│   │   ├── TaskItem.js       # Individual task display & edit
│   │   ├── TaskList.js       # Task list with delete confirmation
│   │   └── TaskFilter.js     # Filter tabs with counts
│   ├── utils/
│   │   └── localStorage.js   # Data persistence utilities
│   ├── styles/
│   │   └── App.css           # Modern styling with color scheme
│   ├── App.js                # Main application component
│   └── index.js              # Application entry point
├── README.md
└── package.json
```

---

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm start
   ```
3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Available Scripts

- `npm start` — Runs the app in development mode
- `npm run build` — Builds the app for production
- `npm test` — Launches the test runner
- `npm run eject` — Ejects from Create React App

---
## 📸 Screenshots
![Screenshot 2025-07-05 102547](https://github.com/user-attachments/assets/26e9ec33-62a7-4aaa-ad8b-a1a9b0172bd6)

![Screenshot 2025-07-05 102657](https://github.com/user-attachments/assets/6ba36735-e31b-4572-add8-2893eb0aae2c)

![Screenshot 2025-07-05 102723](https://github.com/user-attachments/assets/7dc94730-2fbe-4f3d-a0cd-8e80b5a08858)

---

## 🎨 Design Highlights

- **Modern UI**: Clean, card-based design with subtle shadows
- **Color Harmony**: Professional color scheme with excellent contrast
- **Responsive**: Works seamlessly on mobile and desktop
- **Accessibility**: Proper focus states and keyboard navigation
- **Animations**: Smooth transitions and hover effects
- **User Experience**: Intuitive interface with clear feedback

---

## 🛡️ Error Handling

- Form validation for required fields
- Graceful localStorage error handling
- Confirmation modals for destructive actions
- Empty state handling for task lists

---


## 🔧 Technologies Used

- **React 18** — Modern React with hooks
- **JavaScript (ES6+)** — Latest JavaScript features
- **CSS3** — Modern styling with custom properties
- **HTML5** — Semantic markup
- **localStorage** — Client-side data persistence

---

## 📦 Usage

- Log in with any username to start managing your tasks.
- Add, edit, complete, or delete tasks as needed.
- Filter tasks by status (All, Active, Completed).
- All data is stored locally in your browser.

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

---

## 📬 Contact

For questions, feedback, or support, please contact the project maintainer:
- **Name:** Aditya Gupta
- **Email:** aditya308989@gmail.com

--- 
