# 📌 Pinterest Clone – Full Stack Mobile App

A Pinterest-inspired full-stack mobile application built from scratch using **React Native (Expo)** and **Node.js**, focusing on real-world architecture, authentication flows, and scalable backend design.

---

## 🚀 Overview

This project goes beyond a simple clone. It simulates a real-world content-sharing platform where users can:

- Create and share posts (pins)
- Like ❤️ and save 📌 posts
- Follow 👥 other users
- Comment 💬 with pagination
- Explore categorized content
- View individual pin screens
- Manage profiles and avatars

---

## 🧠 Key Learning Outcomes

- Secure JWT authentication (Access + Refresh tokens)
- Scalable backend architecture (MVC + service separation)
- MongoDB relationship handling (likes, saves, follows)
- Cloudinary image upload & management
- React Native state management patterns
- Axios interceptors for token refresh handling

---

## ⚙️ Tech Stack

### 📱 Frontend (Mobile App)
- React Native (Expo)
- TypeScript
- Context API (Auth state)
- TanStack Query (Server state management)
- Axios (interceptors for auth flow)

### 🖥 Backend
- Node.js
- Express.js
- MongoDB + Mongoose

### 🔐 Auth
- JWT (Access + Refresh Token rotation)

### ☁️ Media
- Cloudinary (Image upload + deletion)

---

## 📁 Project Structure

### 📱 Mobile (Frontend)
mobile/
│
├── app/
│   ├── (auth)/
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── _layout.tsx
│   │
│   ├── (tabs)/
│   │   ├── account/
│   │   │   ├── index.tsx
│   │   │   ├── created.tsx
│   │   │   ├── saved.tsx
│   │   │   └── profile.tsx
│   │   ├── createPost.tsx
│   │   ├── inbox.tsx
│   │   └── _layout.tsx
│   │
│   ├── [id].tsx
│   └── index.tsx
│
├── assets/
├── components/
│   ├── card.tsx
│   ├── pinList.tsx
│   └── Screen.tsx
│
├── context/
│   ├── authContext.tsx
│   └── useAuth.tsx
│
├── hooks/
│   ├── usePins.ts
│   ├── useCreatePin.ts
│   ├── useDeletePin.ts
│   ├── useEditPin.ts
│   ├── useSaved.ts
│   ├── useSinglePin.ts
│   └── useComment.ts
│
├── services/
│   ├── api.ts
│   ├── authApi.ts
│   ├── pinApi.ts
│   ├── commentApi.ts
│   └── userApi.ts
│
├── providers/
│   └── QueryProvider.tsx
│
├── utils/
│   └── storage.ts

### 🖥 Backend (Server)
server/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── auth.controller.js
│   ├── user.controller.js
│   ├── pin.controller.js
│   └── comment.controller.js
│
├── middlewares/
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   └── multer.middleware.js
│
├── models/
│   ├── user.model.js
│   ├── pin.model.js
│   └── comment.model.js
│
├── routes/
│   ├── auth.route.js
│   ├── user.route.js
│   ├── pin.route.js
│   └── comment.route.js
│
├── utils/
│   ├── apiError.js
│   ├── apiResponse.js
│   ├── asyncHandler.js
│   └── cloudinary.js
│
├── app.js
├── index.js
├── constants.js
└── .env


---

## 🔐 Authentication Flow

- Login → Access + Refresh tokens issued
- Access token used for API requests
- When expired:
  - Axios interceptor triggers refresh API
  - New access token generated automatically
- No user interruption

---

## 📌 Core Features

### 👤 User System
- Signup / Login
- Profile management
- Follow / Unfollow users

### 📌 Pin System
- Create / Edit / Delete pins
- Image upload via Cloudinary
- Category-based feed

### ❤️ Social Features
- Like / Unlike posts
- Save / Unsave pins
- Comment system with pagination

### 🔄 Feed System
- Dynamic pin loading
- Infinite scroll (TanStack Query)

---

## ⚠️ Challenges Faced

- Handling refresh token race conditions
- Designing scalable MongoDB schemas
- Managing cascade delete (pins, comments, images)
- Axios retry logic after token expiry
- Keeping backend modular and clean

---

## 🛠 Setup Instructions

### 1. Clone repo
```bash
git clone <repo-url>
```

### 2. Backend setup
```
cd server
npm install
npm run dev
```
### 3. create .env file
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLOUDINARY_NAME=xxx
CLOUDINARY_KEY=xxx
CLOUDINARY_SECRET=xxx
```

### 4. mobile setup
```
cd mobile
npm install
npx expo start
```