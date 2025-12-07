📚 StudyNest – A Modern Study Material Sharing Platform

StudyNest is a full-stack learning platform where students can search, read, download, and upload study materials such as notes, PDFs, roadmaps, and practice questions.
It features smart search, ratings, reviews, Google authentication, and a separate admin dashboard for content moderation.

This project is a part of EduHubX, focused on helping students access quality learning resources easily.

🚀 Features
🧑‍🎓 User Features

🔍 Search study materials (e.g., “JavaScript Notes”)

🏷️ Categories: Notes, Roadmaps, Practice Questions

⭐ Filter by:

Highest Rating

Most Downloaded

Latest Uploaded

📄 Upload PDF notes with:

Title

Subject

Description

Optional poster image

💬 Give reviews & ratings

⚠️ Report incorrect or duplicate notes

🔐 Authentication:

Email/password signup

Google Sign-In

🛡️ Admin Panel

A completely separate interface where admins can:

👥 Manage users

📝 Approve/reject uploaded notes

🚫 Remove spam or duplicate content

📩 View reported notes

Prject Strucre:-

StudyNest/
├── backend/                     # Backend (Node + Express)
│   ├── controllers/             # Notes, users, reports logic
│   ├── models/                  # MongoDB/Mongoose models
│   ├── routes/                  # API endpoints
│   ├── middleware/              # Auth, error handling
│   ├── utils/                   # File upload, email, helpers
│   └── server.js                # Backend entry file
│
├── frontend/                    # User-facing website (React + Vite)
│   ├── public/
│   └── src/
│       ├── components/          # Navbar, Cards, Filters
│       ├── pages/               # Home, Notes, Roadmaps, Contact
│       ├── context/             # Auth & Theme Context
│       ├── services/            # API handlers (Axios)
│       └── App.jsx
│
├── admin-panel/                 # Separate admin dashboard
│   ├── public/
│   └── src/
│       ├── components/          # Admin-only components
│       ├── pages/               # Dashboard, Reports, Users
│       └── App.jsx
│
├── README.md                    # Project documentation
├── package.json                 # Dependencies (workspace level)
├── .gitignore                   # Ignored files
├── vite.config.js               # Vite config
└── .env.example                 # Example environment variables



🧩 Tech Stack
🌐 Frontend

React + Vite

Tailwind CSS

Framer Motion

React Router DOM

Axios

🖥️ Backend

Node.js

Express.js

JWT Authentication

Google OAuth 2.0

Multer (PDF/image upload)

🗂️ Database

MongoDB (Recommended)

OR MySQL (alternative with Prisma/Sequelize)

☁️ Cloud Storage (Optional)

Cloudinary

AWS S3


🛠️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/StudyNest.git
cd StudyNest


2️⃣ Install dependencies
npm install

3️⃣ Backend environment variables
Create .env inside /backend:

MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_id
CLOUDINARY_API_KEY=your_key

4️⃣ Run backend
cd backend
npm run dev

5️⃣ Run frontend
cd frontend
npm run dev

6️⃣ Run admin panel
cd admin-panel
npm run dev

📈 Future Enhancements

🔖 Bookmark feature

🧭 AI-based study recommendations

📚 Create “Study Groups”

🖼 PDF preview inside browser

🧵 Discussion threads under each note

❤️ Credits

Built with love using React, Node.js, Tailwind, and MongoDB.
Part of the EduHubX student learning project.
