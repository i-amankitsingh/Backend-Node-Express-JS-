# 🎬 VideoTube — YouTube-like Video Platform API

A production-ready, feature-complete REST API backend for a video hosting platform similar to YouTube. Built with Node.js, Express.js, MongoDB, and Mongoose — deployed live on Railway.

**🔗 Live API:** `https://videotube.up.railway.app/api/v1`  
**📦 GitHub:** [github.com/i-amankitsingh/videotube](https://github.com/i-amankitsingh/videotube)  
**❤️ Health Check:** [videotube.up.railway.app/api/v1/healthcheck](https://videotube.up.railway.app/api/v1/healthcheck)

---

## 🚀 Try the API

### ▶️ Postman Collection

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/36187007/2sBXwsMqXn)

> **How to get this link:** Import the collection JSON into Postman → click the collection → Share → "Via Run in Postman" → copy the public URL and replace the link above.

The collection includes:
- All endpoints pre-configured
- Live + local base URL variables
- Auto-saves `accessToken`, `videoId`, `commentId` etc. after each request
- Bearer auth set at collection level — login once, everything works

---

## 📡 Quick Endpoint Reference

| Module | Endpoints |
|--------|-----------|
| 🏥 Health | `GET /healthcheck` |
| 👤 Users | Register, Login, Logout, Refresh Token, Get Profile, Update Account, Avatar, Cover Image, Channel Profile, Watch History |
| 🎥 Videos | List, Upload, Get, Update, Delete, Toggle Publish |
| 💬 Comments | List, Add, Update, Delete |
| ❤️ Likes | Toggle on Video / Comment / Tweet, Get Liked Videos |
| 🔔 Subscriptions | Toggle Subscribe, Get Subscribers, Get Subscribed Channels |
| 📋 Playlists | Create, Get, Update, Delete, Add/Remove Video, Get User Playlists |
| 🐦 Tweets | Create, Get, Update, Delete |
| 📊 Dashboard | Channel Stats, Channel Videos |

Full endpoint details with request/response examples are in the sections below.

---

## 🧠 What is VideoTube?

VideoTube is a full-featured backend API that powers a YouTube-like platform. It handles:

- User authentication with JWT (access + refresh tokens)
- Video upload and management via Cloudinary
- Subscriptions, likes, comments, playlists, tweets
- Watch history, channel profiles, and aggregated stats
- Secure HTTP-only cookies and production-grade middleware

This is **not a toy project** — it implements real-world patterns including token rotation, aggregation pipelines, file upload handling, and role-based resource access.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js v22 |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (Access + Refresh Tokens) |
| File Storage | Cloudinary |
| File Uploads | Multer |
| Password Hashing | bcrypt |
| Deployment | Railway |

---

## 📁 Project Structure

```
src/
├── controllers/       # Business logic for each resource
│   ├── user.controller.js
│   ├── video.controller.js
│   ├── comment.controller.js
│   ├── like.controller.js
│   ├── playlist.controller.js
│   ├── subscription.controller.js
│   ├── tweet.controller.js
│   └── dashboard.controller.js
├── models/            # Mongoose schemas
│   ├── user.model.js
│   ├── video.model.js
│   ├── comment.model.js
│   ├── like.model.js
│   ├── playlist.model.js
│   ├── subscription.model.js
│   └── tweet.model.js
├── routes/            # Express routers
├── middlewares/       # Auth + Multer middleware
├── utils/             # ApiError, ApiResponse, asyncHandler, Cloudinary
└── db/                # MongoDB connection
```

---

## 🚀 Getting Started

### Option 1 — Use the Live API (No Setup Required)

**Base URL:** `https://videotube.up.railway.app/api/v1`

Import the Postman collection above, or use any HTTP client with the base URL. See the [endpoint reference](#-api-endpoints) below for all available routes.

### Option 2 — Run Locally

#### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Cloudinary account

#### Steps

```bash
# 1. Clone the repo
git clone https://github.com/i-amankitsingh/videotube.git
cd videotube

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.sample .env
# Fill in your values in .env

# 4. Start the development server
npm run dev
```

Server runs at `http://localhost:8000`

#### Environment Variables

```env
PORT=8000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net
CORS_ORIGIN=*
ACCESS_TOKEN_SECRET=your_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_secret
REFRESH_TOKEN_EXPIRY=10d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🔐 Authentication

VideoTube uses a dual-token system:

- **Access Token** — short-lived (1 day), sent in Authorization header or cookie
- **Refresh Token** — long-lived (10 days), stored in DB + HTTP-only cookie

### How to Authenticate

1. Register or Login → receive `accessToken` + `refreshToken`
2. Include `accessToken` in requests:
   ```
   Authorization: Bearer <accessToken>
   ```
3. When the access token expires, call `/users/refresh-token` with your refresh token to get a new pair

---

## 📡 API Endpoints

Base URL: `https://videotube.up.railway.app/api/v1`  
✅ = Requires authentication (Bearer token)  ❌ = Public

---

### 🏥 Health Check

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/healthcheck` | ❌ | Server health status |

---

### 👤 Users

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/users/register` | ❌ | Register new user (multipart: avatar required, coverImage optional) |
| POST | `/users/login` | ❌ | Login with username/email + password |
| POST | `/users/logout` | ✅ | Logout and clear cookies |
| POST | `/users/refresh-token` | ❌ | Refresh access token using refresh token |
| POST | `/users/change-password` | ✅ | Change current password |
| GET | `/users/current-user` | ✅ | Get logged-in user profile |
| PATCH | `/users/update-account` | ✅ | Update fullName and email |
| PATCH | `/users/avatar` | ✅ | Update avatar image |
| PATCH | `/users/cover-image` | ✅ | Update cover image |
| GET | `/users/c/:username` | ✅ | Get channel profile with subscriber count |
| GET | `/users/history` | ✅ | Get watch history |

**Register example (multipart/form-data):**
```
fullName: John Doe
username: johndoe
email: john@example.com
password: Password123
avatar: [file]
coverImage: [file] (optional)
```

**Login example:**
```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

---

### 🎥 Videos

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/videos` | ✅ | Get all videos (paginated, searchable) |
| POST | `/videos` | ✅ | Upload a new video |
| GET | `/videos/:videoId` | ✅ | Get single video by ID |
| PATCH | `/videos/:videoId` | ✅ | Update video details |
| DELETE | `/videos/:videoId` | ✅ | Delete a video |
| PATCH | `/videos/toggle/publish/:videoId` | ✅ | Toggle video publish status |

**GET /videos query params:**
```
page=1&limit=10&query=nodejs&sortBy=createdAt&sortType=desc&userId=<id>
```

**Upload video (multipart/form-data):**
```
videoFile: [file]
thumbnail: [file]
title: My Video Title
description: Video description
```

---

### 💬 Comments

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/comments/:videoId` | ✅ | Get all comments for a video |
| POST | `/comments/:videoId` | ✅ | Add a comment |
| PATCH | `/comments/c/:commentId` | ✅ | Update a comment |
| DELETE | `/comments/c/:commentId` | ✅ | Delete a comment |

```json
{ "content": "Great video!" }
```

---

### ❤️ Likes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/likes/toggle/v/:videoId` | ✅ | Toggle like on a video |
| POST | `/likes/toggle/c/:commentId` | ✅ | Toggle like on a comment |
| POST | `/likes/toggle/t/:tweetId` | ✅ | Toggle like on a tweet |
| GET | `/likes/videos` | ✅ | Get all videos liked by current user |

---

### 🔔 Subscriptions

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/subscriptions/c/:channelId` | ✅ | Toggle subscribe/unsubscribe |
| GET | `/subscriptions/c/:channelId` | ✅ | Get subscribers of a channel |
| GET | `/subscriptions/u/:subscriberId` | ✅ | Get channels a user is subscribed to |

---

### 📋 Playlists

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/playlist` | ✅ | Create a new playlist |
| GET | `/playlist/:playlistId` | ✅ | Get playlist by ID |
| PATCH | `/playlist/:playlistId` | ✅ | Update playlist |
| DELETE | `/playlist/:playlistId` | ✅ | Delete a playlist |
| PATCH | `/playlist/add/:videoId/:playlistId` | ✅ | Add video to playlist |
| PATCH | `/playlist/remove/:videoId/:playlistId` | ✅ | Remove video from playlist |
| GET | `/playlist/user/:userId` | ✅ | Get all playlists of a user |

```json
{ "name": "My Favourites", "description": "Videos I love" }
```

---

### 🐦 Tweets

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/tweets` | ✅ | Create a tweet |
| GET | `/tweets/user/:userId` | ✅ | Get all tweets by a user |
| PATCH | `/tweets/:tweetId` | ✅ | Update a tweet |
| DELETE | `/tweets/:tweetId` | ✅ | Delete a tweet |

```json
{ "content": "Hello from VideoTube!" }
```

---

### 📊 Dashboard

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/dashboard/stats` | ✅ | Channel stats (views, subscribers, videos, likes) |
| GET | `/dashboard/videos` | ✅ | All videos uploaded by logged-in channel |

---

## 📦 Response Format

All responses follow a consistent structure:

**Success:**
```json
{
  "statusCode": 200,
  "data": { },
  "message": "Operation successful",
  "success": true
}
```

**Error:**
```json
{
  "statusCode": 400,
  "message": "All fields are required",
  "success": false,
  "errors": []
}
```

---

## 🔒 Security Features

- Passwords hashed with **bcrypt**
- JWT tokens with configurable expiry
- **HTTP-only cookies** for refresh tokens (XSS protection)
- Refresh token stored in DB and invalidated on logout
- File type validation on uploads

---

## 🗃️ Data Models

| Model | Key Fields |
|-------|-----------|
| User | username, email, fullName, avatar, coverImage, password, refreshToken, watchHistory |
| Video | videoFile, thumbnail, title, description, duration, views, isPublished, owner |
| Comment | content, video, owner |
| Like | video / comment / tweet, likedBy |
| Subscription | subscriber, channel |
| Playlist | name, description, videos[], owner |
| Tweet | content, owner |

> 📐 [View full DB schema diagram](https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj?origin=share)

---

## 👨‍💻 Author

**Ankit Singh**  
GitHub: [@i-amankitsingh](https://github.com/i-amankitsingh)

---

## 📄 License

ISC License
