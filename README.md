# FitHealth Tracker

A MERN fitness tracker with account registration/login, per-account profile and workout data, workout history, BMI/calorie calculations, and a 7-day Chart.js activity view.

## Local setup

### 1. Start MongoDB
Use DBngin and start `mongodb-community`. The application uses the existing local database connection:

`mongodb://127.0.0.1:27017/fithealth`

### 2. Backend
In a terminal:

```bash
cd backend
npm install
npm start
```

API runs at `http://localhost:8080`.

### 3. Frontend
In another terminal:

```bash
cd frontend/fithealth-tracker
npm install
npm run dev
```

Open `http://localhost:5173`.

## Authentication
- Register with a name, email, and password (minimum 8 characters).
- Passwords are hashed with bcryptjs.
- JWT is stored in an HttpOnly cookie; API routes require authentication.
- Profile and workout operations are scoped to the authenticated account.
- Log out clears the session cookie.

For a deployed environment, set `JWT_SECRET` to a long, random secret and configure the frontend origin/CORS and secure cookie settings for your deployment.

## Note about older data
The earlier version stored profile/workout records without a user owner. This version scopes new records to accounts. Legacy records remain in MongoDB but are not automatically assigned to an account.
