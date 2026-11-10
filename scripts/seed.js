// Loads sample data for the dashboard.
// Run with:  npm run seed   (requires Node 20+ for --env-file)
const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI is not set. Check .env.local");
  process.exit(1);
}

const Student =
  mongoose.models.Student ||
  mongoose.model(
    "Student",
    new mongoose.Schema(
      {
        name: String,
        email: { type: String, unique: true, lowercase: true },
        phone: String,
        department: String,
        roll: String,
        address: String,
        status: { type: String, default: "Active" },
      },
      { timestamps: true }
    )
  );

const Course =
  mongoose.models.Course ||
  mongoose.model(
    "Course",
    new mongoose.Schema(
      {
        name: { type: String, unique: true },
        code: { type: String, unique: true, sparse: true, uppercase: true },
        instructor: String,
        duration: String,
        fees: Number,
      },
      { timestamps: true }
    )
  );

const Mark =
  mongoose.models.Mark ||
  mongoose.model(
    "Mark",
    new mongoose.Schema(
      {
        student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
        subject: String,
        exam: String,
        score: Number,
        total: { type: Number, default: 100 },
      },
      { timestamps: true }
    )
  );

const students = [
  { name: "Rahul Sharma", email: "rahul.sharma@email.com", phone: "+91-9867543001", department: "Computer Science", roll: "CS001", address: "Mumbai,Maharashtra", status: "Active" },
  { name: "Priya Patel", email: "priya.patel@email.com", phone: "+91-9867543001", department: "Information Technology", roll: "IT002", address: "Ahmedabad,Gujarat", status: "Active" },
  { name: "Arjun Singh", email: "arjun.singh@email.com", phone: "+91-9867543001", department: "Electronics", roll: "EC003", address: "Delhi,India", status: "Inactive" },
  { name: "Sneha Gupta", email: "sneha.gupta@email.com", phone: "+91-9867543001", department: "Mechanical Engineering", roll: "ME004", address: "Pune,Maharashtra", status: "Active" },
  { name: "Vikram Rao", email: "vikram.rao@email.com", phone: "+91-9867543002", department: "Civil Engineering", roll: "CE005", address: "Chennai,Tamil Nadu", status: "Active" },
];

const courses = [
  { name: "Computer Science", code: "CS", instructor: "Dr.Rajesh Kumar", duration: "4 Years", fees: 250000 },
  { name: "Information Technology", code: "IT", instructor: "Prof.Sunita Sharma", duration: "4 Years", fees: 230000 },
  { name: "Electronics Engineering", code: "EC", instructor: "Dr.Amit Verma", duration: "4 Years", fees: 240000 },
  { name: "Mechanical Engineering", code: "ME", instructor: "Prof.Ravi Gupta", duration: "4 Years", fees: 220000 },
];

const marks = [
  { email: "rahul.sharma@email.com", subject: "Data Structures", exam: "Mid-term", score: 85 },
  { email: "priya.patel@email.com", subject: "Database Management", exam: "Final", score: 92 },
  { email: "arjun.singh@email.com", subject: "Digital Electronics", exam: "Mid-term", score: 78 },
  { email: "rahul.sharma@email.com", subject: "Algorithms", exam: "Final", score: 88 },
];

async function main() {
  await mongoose.connect(uri);

  if ((await Student.countDocuments()) === 0) {
    // Insert oldest first so the dashboard's "recent" order looks right
    for (const s of [...students].reverse()) {
      await Student.create(s);
    }
    console.log(`Inserted ${students.length} students`);
  } else {
    console.log("Students already exist, skipping");
  }

  // Remove old sample courses from the earlier dashboard version (no course code)
  await Course.deleteMany({ code: { $exists: false } });

  if ((await Course.countDocuments()) === 0) {
    await Course.insertMany(courses);
    console.log(`Inserted ${courses.length} courses`);
  } else {
    console.log("Courses already exist, skipping");
  }

  if ((await Mark.countDocuments()) === 0) {
    const docs = [];
    for (const m of marks) {
      const st = await Student.findOne({ email: m.email });
      if (st) docs.push({ student: st._id, subject: m.subject, exam: m.exam, score: m.score, total: 100 });
    }
    for (const d of [...docs].reverse()) await Mark.create(d);
    console.log(`Inserted ${docs.length} marks`);
  } else {
    console.log("Marks already exist, skipping");
  }

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
