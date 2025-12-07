# StudyNest 📚

**StudyNest** is a full-stack web application designed for students and learners to **search, read, download, and upload study materials** like notes, roadmaps, and practice questions in PDF format. It features **user authentication**, a **search-based system**, **reviews & ratings**, and a **separate admin panel** for moderation.
## 🚀 Features

### User Features
- Search for study materials by keyword (e.g., "JavaScript Notes").
- Filter results by:
  - Highest Rating  
  - Most Downloaded  
  - Optional poster image  
  - Description  
### Admin Panel
- Manage users (block, delete, update).
- Approve/reject uploaded notes.
**Project Structure**
```
StudyNest/
├── backend/                 # Backend code
│   ├── controllers/         # Logic for APIs (Notes, Users, Reports)
│   ├── models/              # Database models (User, Note, Review, Report)
│   ├── routes/              # API routes
│   ├── middleware/          # Authentication & error handling
│   ├── utils/               # Helper functions (e.g., file upload, email)
│   └── server.js            # Main server file
│
├── frontend/                # Main Website for users
│   ├── public/              # Static assets (images, favicon)
│   ├── src/
│   │   ├── components/      # Reusable UI components (Navbar, Card, Footer)
│   │   ├── pages/           # Pages (Home, About, Contact, Notes, Roadmaps)
│   │   ├── context/         # React context for global state
│   │   ├── services/        # API service calls
│   │   └── App.jsx          # Main App entry
│   └── index.html
│
├── admin-panel/             # Admin Dashboard (Separate UI)
│   ├── public/
│   ├── src/
│   │   ├── components/      # Admin components (UserList, ReportList)
│   │   ├── pages/           # Admin pages (Dashboard, Analytics, Notes Management)
│   │   └── App.jsx
│   └── index.html
│
├── README.md                # Project overview (polished for GitHub)
├── .gitignore               # Files/folders to ignore (node_modules, .env)
├── package.json             # Node.js dependencies for backend/frontend/admin
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.js           # Vite config for frontend & admin
└── .env.example             # Sample environment variables file

```

## 💡 Importance for Resume
- Demonstrates **full-stack development skills**.  
- Includes **authentication**, **file uploads**, **role-based access**, and **search algorithms**.  
- Shows ability to build **production-ready applications**.  
- Highlights **frontend, backend, and database integration skills**.
---

## 🛠️ Tech Stack

### Frontend
- React + Vite (fast and modern UI)
- Tailwind CSS (responsive design)
- Framer Motion (animations)
- Axios / Fetch API (backend communication)
- React Router DOM (multi-page navigation)

### Backend
- Node.js + Express.js (server & APIs)
- JWT Authentication for secure login
- Google OAuth for social login
- Multer for PDF and image uploads

### Database
- MongoDB (NoSQL, flexible document storage)  
  **OR**  
- MySQL (Structured relational storage)

### Optional
- Cloudinary / AWS S3 for storing PDFs and poster images

---

## 📁 Folder Structure (Suggested)
```
EduHubX/
├── backend/                 # Backend code
│   ├── controllers/         # Logic for APIs (Notes, Users, Reports)
│   ├── models/              # Database models (User, Note, Review, Report)
│   ├── routes/              # API routes
│   ├── middleware/          # Authentication & error handling
│   ├── utils/               # Helper functions (e.g., file upload, email)
│   └── server.js            # Main server file
│
├── frontend/                # Main Website for users
```
# EduHubX / StudyNest

A front-end React + Vite project (Study materials sharing app). This repository contains the client-side code and assets for the EduHubX / StudyNest app.

Overview
- Purpose: Provide a clean UX for searching, reading and sharing study resources (PDFs, notes, roadmaps).
- Status: Frontend with Vite and React. (If you plan to add backend or admin UI, place them at the repository root as separate folders.)

Quick Links
- Project structure (styled): `docs/project-structure.html`

Getting started
1. Install dependencies:

```
npm install
```

2. Run the development server:

```
npm run dev
```

Project layout (top-level)

```
EduHubX/
├─ index.html
├─ package.json
├─ vite.config.js
├─ public/
└─ src/
   ├─ App.jsx
   ├─ main.jsx
   ├─ index.css
   └─ assets/
```

Notes & recommendations
- If you add backend code, add a `backend/` folder with its own `package.json`.
- Use the `docs/` folder for lightweight documentation or GitHub Pages (the `docs/project-structure.html` file added shows the current layout).

Contributing
- Open issues or PRs for improvements. Keep changes focused and add tests where appropriate.

License
- Add a `LICENSE` file if you want to specify a license.



