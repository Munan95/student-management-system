# Student Management System

A CRUD app built with **Next.js (App Router)**, **Tailwind CSS**, **MongoDB** and **Mongoose**.

Each student has: **Name, Email, Phone, Department**.

## Setup

1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Make sure MongoDB is running locally, or use a MongoDB Atlas connection string.
3. Check `.env.local`:
   ```
   MONGODB_URI=mongodb://127.0.0.1:27017/student_management
   ```
4. Start the dev server:
   ```bash
   pnpm run dev
   ```
5. (Optional) Load sample students, courses and marks for the dashboard:
   ```bash
   pnpm run seed
   ```
6. Open http://localhost:3000 (Dashboard). Students are at http://localhost:3000/students

7. Website https://student-management-system-delta-dun.vercel.app/

## API

| Method | Endpoint             | Action                |
| ------ | -------------------- | --------------------- |
| GET    | `/api/students`      | List all students     |
| POST   | `/api/students`      | Create a student      |
| GET    | `/api/students/:id`  | Get one student       |
| PUT    | `/api/students/:id`  | Update a student      |
| DELETE | `/api/students/:id`  | Delete a student      |
| GET / POST | `/api/courses`       | List (with student counts) / create course |
| PUT / DELETE | `/api/courses/:id` | Update / delete a course |
| GET / POST | `/api/marks`         | List / create marks   |
| PUT / DELETE | `/api/marks/:id`   | Update / delete marks |
| GET `?date=YYYY-MM-DD` | `/api/attendance` | Attendence for a date |
| POST   | `/api/attendance`    | Save attendence for a date (`{ date, records }`) |