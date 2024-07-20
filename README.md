# Personal Finance Dashboard

## Overview

Welcome to the **Personal Finance Dashboard** project! This application is designed to help you easily manage your finances with a user-friendly interface.
 The project focuses on providing a seamless front-end experience with robust backend functionality.


## Features

- 💸 **Comprehensive Financial Tracking:** Monitor income, expenses, and savings in one place.
- 📊 **Intuitive Visualizations:** Utilize charts and graphs to understand spending patterns.
- 🔔 **Real-time Updates :** Stay on top of your budget with timely notifications.


## Technology Stack

### Frontend
- **Figma**: For UI/UX Design of webpages
- **JavaScript**: The core scripting language for dynamic content.
- **Tailwind CSS**: For sleek and responsive styling.
- **Apex Charts**: For building graphs and charts

### Backend
- **Express.js**: A minimal and flexible Node.js web application framework.
- **Node.js**: JavaScript runtime for executing backend code.
- **MongoDB**: Mongodb for storing user data.

## Usage

1. **Clone the repository** and navigate to the project directory. <br>
2. **Install dependencies** for both frontend and backend.<br>
3. **Start the application** and open your browser to view the dashboard.<br>

## Demo Video








## Details
1.Frontend:














2.Backend:



### Authentication Process

### Backend Setup

- **Install Dependencies**:
  - `express`: Web framework for Node.js.
  - `mongoose`: ODM for MongoDB.
  - `bcryptjs`: Library for hashing passwords.
  - `jsonwebtoken`: Library for generating and verifying JWTs.
  - `body-parser`: Middleware to parse incoming request bodies.

- **User Model**:
  - Define a `User` schema with `username` and `password` fields.
  - Hash passwords before saving using `bcryptjs`.
  - Include a method to compare hashed passwords during login.

- **Routes**:
  - **Sign Up** (`/api/auth/signup`):
    - Create a new user with a hashed password and save it to MongoDB.
  - **Login** (`/api/auth/login`):
    - Verify the user's credentials and generate a JWT if valid.
  - **Logout** (`/api/auth/logout`):
    - Invalidate the JWT on the client-side (usually by removing it from localStorage or cookies).

### Frontend Integration

- **Sign Up Form**:
  - Collect `username` and `password` from the user.
  - Send a POST request to `/api/auth/signup` to create a new user.

- **Login Form**:
  - Collect `username` and `password` from the user.
  - Send a POST request to `/api/auth/login` to authenticate the user.
  - Store the received JWT in localStorage or cookies for subsequent requests.

- **Logout**:
  - Remove the JWT from client-side storage (localStorage or cookies).
  - Redirect the user to the login page.

For a visual guide on setting up authentication with MongoDB, Express, and Node.js, check out this [YouTube video]([https://www.youtube.com/watch?v=7CqJlxBYj-M](https://youtu.be/OWeruyqhiTo?si=QXaGQMbCmBeJN9-Q)).


-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
## Our goal
1.Easily manage your finances with a comprehensive view of your income, expenses, and savings. Track your financial health and make informed decisions to achieve your financial goals.
2.Visualize your spending patterns with intuitive charts and graphs. 
3.Stay on top of your budget with real-time updates and alerts. 
4.Empower your financial journey with actionable insights and personalized recommendations.



---

> Your contributions and feedback are always appreciated!


