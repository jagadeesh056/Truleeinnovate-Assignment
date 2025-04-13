# Candidate Management System

A full-stack web application for managing job candidates with features for adding, editing, filtering, and deleting candidate records.

## Features

- **Candidate CRUD Operations**:
  - Create new candidate records
  - Read/list all candidates with pagination
  - Update existing candidate information
  - Delete candidates
  
- **Advanced Filtering**:
  - Filter by gender
  - Filter by years of experience
  - Filter by skills
  - Search by name, email, or phone number

- **User-Friendly Interface**:
  - Responsive design
  - Pagination controls
  - Easy-to-use forms for adding and editing
  - Confirmation before deletion

## Tech Stack

### Frontend
- React.js
- CSS for styling
- Font Awesome icons

### Backend
- Node.js with Express
- MongoDB with Mongoose
- RESTful API design

## Getting Started

### Prerequisites
- Node.js (v14.0.0 or later)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```
   git clone https://github.com/yourusername/candidate-management-system.git
   cd candidate-management-system
   ```

2. **Set up the backend**:
   ```
   cd server
   npm install
   ```

3. **Create a .env file in the server directory**:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. **Set up the frontend**:
   ```
   cd ../client
   npm install
   ```

5. **Start the development servers**:

   For backend:
   ```
   cd server
   npm start
   ```

   For frontend:
   ```
   cd client
   npm run dev
   ```

6. **Access the application**: Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Candidates

- **GET /api/candidates** - Get all candidates (paginated)
  - Query params: `page` (default: 1), `limit` (default: 10)
  
- **GET /api/candidates/:id** - Get a specific candidate

- **POST /api/candidates** - Create a new candidate
  - Required fields: name, email, phone, gender, experience
  - Optional: skills (array)

- **PUT /api/candidates/:id** - Update a candidate

- **DELETE /api/candidates/:id** - Delete a candidate

## Project Structure

```
candidate-management-system/
├── client/                 # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.js          # Main application component
│   │   ├── App.css         # Styles
│   │   └── index.js        # Entry point
│   └── package.json
│
└── server/                 # Backend Node.js application
    ├── models/             # Mongoose models
    ├── routes/             # Express routes
    ├── index.js            # Server entry point
    └── package.json
```

## Candidate Model

```javascript
{
  name: String,          // Required
  email: String,         // Required, unique
  phone: String,         // Required
  gender: String,        // Required (Male/Female/Other)
  experience: Number,    // Required, in years
  skills: [String],      // Optional array of skills
  createdAt: Date,       // Automatically set
  updatedAt: Date        // Automatically updated
}
```

## Future Enhancements

- User authentication and authorization
- File upload for candidate resumes
- Interview scheduling functionality
- Email notifications
- Advanced reporting features
