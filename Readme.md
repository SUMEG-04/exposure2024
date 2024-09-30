# DSA Tracker

DSA Tracker is a web application designed to help users track their progress in solving Data Structures and Algorithms (DSA) problems across various coding platforms. The application allows users to set goals, view their solved problems, and receive personalized recommendations based on their performance.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features
- **User Authentication**: Sign up, log in, and manage user profiles.
- **Goal Management**: Set and track your DSA goals.
- **Problem Tracking**: View a list of problems you have solved.
- **Personalized Recommendations**: Get recommendations based on your problem-solving performance.
- **Performance Visualization**: Track and visualize your performance over time.

## Technologies
- **Frontend**: React, React Router, Context API
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Scraping**: Puppeteer
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: CSS

## Installation
### Prerequisites
Make sure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Clone the Repository
```bash
git clone https://github.com/your-username/dsa-tracker.git
cd dsa-tracker
```

### Backend Setup
Navigate to the backend directory:
```bash
cd backend
npm install
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
npm start
```

### Frontend Setup

Navigate to the frontend directory:
