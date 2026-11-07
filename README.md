# FitHealth Tracker 🏥

FitHealth Tracker is a full-stack web application designed to help users monitor their health, track fitness activities, and manage their wellness journey. Built using the MERN stack, the application provides an interactive platform for maintaining health-related information.

## 🚀 Tech Stack

- **Frontend:** React.js, HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **API Communication:** Axios
- **Version Control:** Git & GitHub

## ✨ Features

- User registration and login
- Personalized health dashboard
- Health and fitness tracking
- Monitor fitness progress
- Manage personal health information
- Responsive user interface
- RESTful API integration
- MongoDB database for data management

## 📁 Project Structure

```text
FitHealth-Tracker/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── .env
│
├── server/
│   ├── index.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/codingwithaish/FitHealth-Tracker.git
cd FitHealth-Tracker
```

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../server
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the server directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Create a `.env` file in the client directory:

```env
VITE_API_URL=http://localhost:5000
```

Replace the placeholder values with your actual configuration.

### 5. Run the Application

Start the backend:

```bash
cd server
npm run dev
```

Start the frontend in a separate terminal:

```bash
cd client
npm run dev
```

Open the local URL displayed by Vite in your browser.

## 🛠️ Future Enhancements

- Integration with wearable fitness devices
- Advanced health analytics and visualizations
- Personalized fitness recommendations
- AI-powered health insights
- Daily activity and nutrition tracking

## 👩‍💻 Author

**Aishwarya**

GitHub: [@codingwithaish](https://github.com/codingwithaish)

## 📄 License

This project is intended for educational and personal development purposes.
