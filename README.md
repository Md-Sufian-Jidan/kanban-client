![KanbanBoard](./assets/kanban-board-client.png)

# 📝 Kanban Task Manager (Client)

A responsive, modern Kanban-style task management web app built with the **MERN stack**, featuring drag-and-drop task organization, user authentication via Firebase, and an interactive dashboard with progress analytics.

---

## 🚀 Live Demo

👉 [Live Site URL Here](https://kanban-client-mu.vercel.app)

---

## 🧰 Tech Stack

- **React 19** + **React Router v7**
- **Tailwind CSS** + **Framer Motion** (soft, animated UI)
- **Firebase Auth** (Email/Password & Google Login)
- **@dnd-kit** (Drag-and-drop Kanban board)
- **SweetAlert2** + **React Hot Toast** (for feedback)
- **Recharts** (Pie chart for task overview)
- **Axios** for API calls (to the Express backend)

---

## 📦 Key Features

- 🔐 **Authentication** – Register, login, logout via Firebase
- 🗂️ **Drag & Drop Kanban** – Organize tasks across To Do, In Progress, Completed
- 📝 **Create / Edit / Delete Tasks** – Full CRUD with modals and feedback
- 📊 **Dashboard Overview** – Pie chart + stats for your task progress
- 📱 **Responsive Design** – Optimized for all screen sizes
- 🧪 **Protected Routes** – Only logged-in users can access dashboard

---

## 🧪 Environment Setup

### 1. Clone this repo

```bash
git clone https://github.com/Md-Sufian-Jidan/kanban-client.git
cd kanban-client

npm install

VITE_API_BASE_URL=https://your-backend-url/api
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_APP_ID=...

npm run dev       # Run in development
npm run build     # Production build

