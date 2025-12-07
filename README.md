# StudyNest 📚

**StudyNest** is a full-stack web application designed for students and learners to **search, read, download, and upload study materials** like notes, roadmaps, and practice questions in PDF format. It features **user authentication**, a **search-based system**, **reviews & ratings**, and a **separate admin panel** for moderation.

---

## 🚀 Features

### User Features
- User registration and login with **email/password** or **Google OAuth**.
- Search for study materials by keyword (e.g., "JavaScript Notes").
- Filter results by:
  - Highest Rating  
  - Most Downloaded  
  - Recently Added
- Upload study materials (PDF) with:
  - Optional poster image  
  - Description  
  - Auto-fill username  
  - Subject selection
- Rate and review study materials.
- Report any note for spam, low quality, or errors.

### Admin Panel
- Separate dashboard for admins.
- Manage users (block, delete, update).
- Approve/reject uploaded notes.
- Delete or handle reported notes.
- View analytics: top contributors, trending notes, most downloaded.

---

## 🎯 Purpose
StudyNest aims to **help learners find organized, reliable study resources** and allows students to **contribute their own content**. By combining search, ratings, and admin moderation, it ensures a safe and useful learning environment.

---

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
StudyNest/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── server.js
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/
│ │ └── App.jsx
│ └── index.html
├── admin-panel/
│ └── src/
├── README.md
└── package.json



---

## 📄 Summary
**StudyNest** is a modern, full-stack study platform where students can **find, upload, and share educational resources**. It provides **powerful search**, **filtering**, **ratings/reviews**, and **admin moderation**, making it an **ideal project for portfolios and resumes**.

---

## 📌 How to Run
Frontend
cd frontend
npm install
npm run dev

Admin Panel
cd admin-panel
npm install
npm run dev

### Backend
```bash
cd backend


📚 Future Enhancements

Dark/Light mode

Recommendation system based on user activity

Personal "Favorites" for saved notes

Analytics dashboard for users and admins

Weekly trending notes

🔗 Demo

(Optional: Add live demo link here if hosted)

✨ Author

Your Name - Full-Stack Developer

GitHub: [your-github-link]

LinkedIn: [your-linkedin-link]


---

If you want, I can also **make an even shorter, GitHub-ready version** that looks **clean and attractive with badges for tech stack and features** — perfect for recruiters to glance at quickly.  

Do you want me to do that?


npm run dev
