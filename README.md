# Yappy

A polished MERN real-time chat application with authentication, live presence, image messages, profile uploads, and a refreshed responsive interface.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black&style=flat-square)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white&style=flat-square)](https://vitejs.dev)
[![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white&style=flat-square)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white&style=flat-square)](https://mongoosejs.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## Preview

Yappy includes a modern chat shell with a glassy card layout, gradient brand accents, themed authentication screens, online-user filtering, and direct/private conversations.

---

## System Documentation

To support maintainability and open-source collaboration, the project includes structured guides:

- **[ARCHITECTURE.md](ARCHITECTURE.md)**: Explains frontend state, backend API layers, Socket.IO flow, and deployment behavior.
- **[CONTRIBUTING.md](CONTRIBUTING.md)**: Covers local setup, coding conventions, validation, and pull request expectations.
- **[LICENSE](LICENSE)**: MIT license terms.

---

## What Works Today

- **Authentication**: Sign up, log in, log out, and protected session checks with JWT cookies.
- **Real-time Chat**: Socket.IO broadcasts new messages to active recipients.
- **Online Presence**: Connected users appear as online in the sidebar.
- **Private Messaging**: Users can select contacts and view one-to-one conversation history.
- **Image Sharing**: Chat attachments and profile images upload through Cloudinary.
- **Theme Engine**: DaisyUI themes are persisted with Zustand and previewed in settings.
- **Production Serving**: Express can serve the built Vite frontend in production mode.

---

## Stack & Technologies

- **Frontend**: React 19, Vite, React Router, Tailwind CSS, DaisyUI, Lucide React
- **State Management**: Zustand stores for auth, chat, and theme state
- **Backend**: Node.js, Express 5, Socket.IO
- **Database**: MongoDB with Mongoose models
- **Auth & Security**: bcryptjs password hashing, JWT cookie sessions
- **Media**: Cloudinary uploads for avatars and message images

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm
- MongoDB connection string
- Cloudinary account credentials

### Local Setup

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd Yappy
   ```

2. Install dependencies:
   ```bash
   npm install --prefix backend
   npm install --prefix frontend
   ```

3. Create backend environment variables:
   ```bash
   cp backend/.env.example backend/.env
   ```

4. Update `backend/.env`:
   ```env
   NODE_ENV=development
   PORT=5001
   MONGODB_URI=mongodb://127.0.0.1:27017/yappy
   JWT_SECRET=replace_this_with_a_long_random_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ALLOWED_ORIGINS=http://localhost:5173
   ```

5. Start the backend:
   ```bash
   npm run dev --prefix backend
   ```

6. Start the frontend in another terminal:
   ```bash
   npm run dev --prefix frontend
   ```

7. Open `http://localhost:5173`.

---

## Production Build

From the repository root:

```bash
npm run build
npm start
```

The root build script installs backend/frontend dependencies and builds the frontend. In production mode, the backend serves `frontend/dist`.

---

## Project Structure

```text
Yappy/
├── backend/
│   ├── src/controllers/   # Auth and message request handlers
│   ├── src/lib/           # DB, Cloudinary, JWT, and Socket.IO helpers
│   ├── src/middleware/    # Protected route middleware
│   ├── src/models/        # User and message schemas
│   └── src/routes/        # API route definitions
├── frontend/
│   ├── src/components/    # Navbar, chat shell, sidebar, inputs, skeletons
│   ├── src/pages/         # Home, auth, profile, settings pages
│   ├── src/store/         # Zustand state stores
│   └── src/lib/           # Axios and utility helpers
└── package.json           # Root build/start orchestration
```

---

## License

This project is licensed under the [MIT License](LICENSE).
