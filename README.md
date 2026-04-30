# 🚀 Team Task Manager (AI-Ready)

A modern full-stack **Team Task Management Web Application** that helps teams collaborate, assign tasks, and track progress efficiently in real-time.

🔗 **Live Demo:**
👉 [https://team-task-manager-frontend-xi.vercel.app]

---

## 📌 Overview

This project is designed to simplify team collaboration by providing a centralized platform where:

* Admins can assign tasks to members
* Members can track and update their work
* Teams can manage projects efficiently

It follows a **role-based system (Admin + Member)** with secure authentication and a clean modern UI.

Task management systems like this improve productivity by organizing workflows, tracking progress, and reducing communication gaps in teams. ([GitHub][1])

---

## ✨ Features

### 🔐 Authentication & Authorization

* JWT-based login & signup
* Role-based access (Admin / Member)
* Secure API routes

### 📋 Task Management

* Create, update, delete tasks
* Assign tasks to team members
* Task priority & status tracking
* Due dates support

### 👥 Team Collaboration

* Admin assigns tasks to selected members
* Members can update progress
* Dashboard for overview

### 📊 Dashboard & UI

* Task statistics (Total, Pending, Completed)
* Clean UI with Dark & Light mode
* Responsive design (mobile + desktop)

### ⚡ AI Integration (Planned / Optional)

* Smart task suggestions
* Auto task description generator
* AI-based workload distribution

---

## 🛠️ Tech Stack

### 💻 Frontend

* React.js (Vite)
* Tailwind CSS
* Axios
* React Hot Toast

### 🔧 Backend

* Node.js
* Express.js
* JWT Authentication

### 🗄️ Database

* PostgreSQL (Railway)

### 🚀 Deployment

* Frontend → Vercel
* Backend → Railway

---

## 📁 Project Structure

```
team-task-manager/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── App.jsx
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 🔹 1. Clone Repository

```bash
git clone https://github.com/your-username/team-task-manager.git
cd team-task-manager
```

---

### 🔹 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
DATABASE_URL=your_postgres_url
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

### 🔹 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

---

## 🔑 Demo Credentials

```
Admin:
Email: admin@demo.com
Password: Admin@123

Member:
Email: member@demo.com
Password: Member@123
```

---

## 📡 API Endpoints (Sample)

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/login    | Login user    |
| POST   | /api/auth/register | Register user |
| GET    | /api/tasks         | Get all tasks |
| POST   | /api/tasks         | Create task   |
| PUT    | /api/tasks/:id     | Update task   |
| DELETE | /api/tasks/:id     | Delete task   |

---

## 🎯 Key Highlights (For Recruiters)

* ✅ Full-stack MERN-like architecture
* ✅ JWT Authentication & Role-Based Access
* ✅ Clean UI with modern design
* ✅ Real-world team workflow simulation
* ✅ Deployable & production-ready
* ✅ AI integration capability (future-ready)

---

## 🚀 Future Enhancements

* AI-powered task assignment
* Real-time updates (Socket.io)
* Notifications system
* File attachments in tasks
* Team chat integration

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch
3. Make changes
4. Submit a PR

---

## 📜 License

This project is licensed under the **MIT License**

---

## 👨‍💻 Author

**Nishant Verma**

* B.Tech (AKTU)
* AI/ML & Full Stack Developer

---

## ⭐ If you like this project

Give it a ⭐ on GitHub and share it!



[1]: https://github.com/Prajwal-kp-18/Task-Manager?utm_source=chatgpt.com "Prajwal-kp-18/Task-Manager"
