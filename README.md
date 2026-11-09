# Student Management System

A CRUD app built with **Next.js (App Router)**, **Tailwind CSS**, **MongoDB** and **Mongoose**.

Each student has: **Name, Email, Phone, Department**.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Make sure MongoDB is running locally, or use a MongoDB Atlas connection string.
3. Check `.env.local`:
   ```
   MONGODB_URI=mongodb://127.0.0.1:27017/student_management
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```
5. Open http://localhost:3000

## API

| Method | Endpoint             | Action                |
| ------ | -------------------- | --------------------- |
| GET    | `/api/students`      | List all students     |
| POST   | `/api/students`      | Create a student      |
| GET    | `/api/students/:id`  | Get one student       |
| PUT    | `/api/students/:id`  | Update a student      |
| DELETE | `/api/students/:id`  | Delete a student      |

## Structure

```
app/
  api/students/route.js        # GET all, POST
  api/students/[id]/route.js   # GET one, PUT, DELETE
  layout.js, page.js, globals.css
components/
  StudentManager.js            # state + API calls
  StudentForm.js               # add / edit form
  StudentTable.js              # list with Edit / Delete
lib/mongodb.js                 # cached Mongoose connection
models/Student.js              # Mongoose schema & model
```
