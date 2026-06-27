# Auth App — Learning Project

A simple demo app I built while learning how **JWT authentication** works in Node.js. Not meant for production — just a hands-on way to understand user registration, login, and protected routes.

---

## What I learned building this

- How to hash passwords with `bcryptjs` before saving to DB
- How JWT tokens are created on login and verified on protected routes
- How middleware works (the `protect` function runs before the controller)
- Connecting Express to MongoDB using Mongoose
- Serving a static frontend from the `public/` folder

---

## Tech used

- Node.js + Express
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- dotenv

---

## Project structure

```
Auth_App/
├── config/database.js        # MongoDB connection
├── controllers/authController.js  # register, login, getProfile
├── middleware/authMiddleware.js    # JWT verification
├── models/User.js            # User schema
├── public/                   # Frontend (HTML, CSS, JS)
│   ├── index.html            # Login / Register page
│   ├── dashboard.html
│   └── learn.html            # Notes on how auth works
├── routes/user.js
├── .env.example
└── index.js                  # Entry point
```

---

## Running locally

```bash
# 1. Install dependencies
npm install

# 2. Create .env from the example
cp .env.example .env
# then fill in your MONGO_URI and JWT_SECRET

# 3. Start the dev server
npm run dev
```

App runs at `http://localhost:4000`

---

## API routes

| Method | Route | Auth? | What it does |
|--------|-------|-------|-------------|
| POST | `/api/users/register` | No | Creates a new user |
| POST | `/api/users/login` | No | Returns a JWT token |
| GET | `/api/users/profile` | Yes (Bearer token) | Returns logged-in user's data |

---

## Environment variables

Copy `.env.example` to `.env` and fill in:

```
PORT=4000
MONGO_URI=mongodb://localhost:27017/authapp
JWT_SECRET=any_random_string
```

*Built for learning purposes — Saurabh Raj Shekhar*
