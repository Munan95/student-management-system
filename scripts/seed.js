// Loads sample data for the dashboard.
// Run with:  pnpm run seed   (requires Node 20+ for --env-file)
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
  { name: "John Doe", email: "john.doe@email.com", phone: "+8801711000001", department: "Computer Science", roll: "CS001", address: "Dhaka, Bangladesh", status: "Active" },
  { name: "Alice Smith", email: "alice.smith@email.com", phone: "+8801711000002", department: "Computer Science", roll: "CS002", address: "Barishal, Bangladesh", status: "Active" },
  { name: "Michael Brown", email: "michael.brown@email.com", phone: "+8801711000003", department: "Computer Science", roll: "CS003", address: "Khulna, Bangladesh", status: "Active" },
  
  { name: "Sarah Wilson", email: "sarah.wilson@email.com", phone: "+8801711000004", department: "Software Engineering", roll: "SE004", address: "Dhaka, Bangladesh", status: "Active" },
  { name: "David Miller", email: "david.miller@email.com", phone: "+8801711000005", department: "Software Engineering", roll: "SE005", address: "Chattogram, Bangladesh", status: "Active" },
  { name: "Emma Davis", email: "emma.davis@email.com", phone: "+8801711000006", department: "Software Engineering", roll: "SE006", address: "Sylhet, Bangladesh", status: "Inactive" },
  
  { name: "James Taylor", email: "james.taylor@email.com", phone: "+8801711000007", department: "Information Technology", roll: "IT007", address: "Rajshahi, Bangladesh", status: "Active" },
  { name: "Olivia Anderson", email: "olivia.anderson@email.com", phone: "+8801711000008", department: "Information Technology", roll: "IT008", address: "Dhaka, Bangladesh", status: "Active" },
  { name: "William Thomas", email: "william.thomas@email.com", phone: "+8801711000009", department: "Information Technology", roll: "IT009", address: "Rangpur, Bangladesh", status: "Active" },
  
  { name: "Sophia Jackson", email: "sophia.jackson@email.com", phone: "+8801711000010", department: "Data Science", roll: "DS010", address: "Barishal, Bangladesh", status: "Active" },
  { name: "Benjamin White", email: "benjamin.white@email.com", phone: "+8801711000011", department: "Data Science", roll: "DS011", address: "Dhaka, Bangladesh", status: "Inactive" },
  { name: "Isabella Harris", email: "isabella.harris@email.com", phone: "+8801711000012", department: "Data Science", roll: "DS012", address: "Cumilla, Bangladesh", status: "Active" },
  
  { name: "Lucas Martin", email: "lucas.martin@email.com", phone: "+8801711000013", department: "Cyber Security", roll: "CY013", address: "Khulna, Bangladesh", status: "Active" },
  { name: "Mia Thompson", email: "mia.thompson@email.com", phone: "+8801711000014", department: "Cyber Security", roll: "CY014", address: "Dhaka, Bangladesh", status: "Active" },
  { name: "Henry Garcia", email: "henry.garcia@email.com", phone: "+8801711000015", department: "Cyber Security", roll: "CY015", address: "Sylhet, Bangladesh", status: "Active" },
  
  { name: "Charlotte Martinez", email: "charlotte.martinez@email.com", phone: "+8801711000016", department: "Artificial Intelligence", roll: "AI016", address: "Chattogram, Bangladesh", status: "Active" },
  { name: "Alexander Robinson", email: "alexander.robinson@email.com", phone: "+8801711000017", department: "Artificial Intelligence", roll: "AI017", address: "Dhaka, Bangladesh", status: "Active" },
  { name: "Amelia Clark", email: "amelia.clark@email.com", phone: "+8801711000018", department: "Artificial Intelligence", roll: "AI018", address: "Rajshahi, Bangladesh", status: "Inactive" },
  
  { name: "Daniel Lewis", email: "daniel.lewis@email.com", phone: "+8801711000019", department: "Web Development", roll: "WD019", address: "Barishal, Bangladesh", status: "Active" },
  { name: "Harper Lee", email: "harper.lee@email.com", phone: "+8801711000020", department: "Web Development", roll: "WD020", address: "Dhaka, Bangladesh", status: "Active" },
  { name: "Matthew Walker", email: "matthew.walker@email.com", phone: "+8801711000021", department: "Web Development", roll: "WD021", address: "Mymensingh, Bangladesh", status: "Active" },
  
  { name: "Evelyn Hall", email: "evelyn.hall@email.com", phone: "+8801711000022", department: "Mobile App Development", roll: "MAD022", address: "Dhaka, Bangladesh", status: "Active" },
  { name: "Sebastian Allen", email: "sebastian.allen@email.com", phone: "+8801711000023", department: "Mobile App Development", roll: "MAD023", address: "Khulna, Bangladesh", status: "Inactive" },
  { name: "Abigail Young", email: "abigail.young@email.com", phone: "+8801711000024", department: "Mobile App Development", roll: "MAD024", address: "Sylhet, Bangladesh", status: "Active" },
  
  { name: "Jack Hernandez", email: "jack.hernandez@email.com", phone: "+8801711000025", department: "Database Management", roll: "DBM025", address: "Rajshahi, Bangladesh", status: "Active" },
  { name: "Emily King", email: "emily.king@email.com", phone: "+8801711000026", department: "Database Management", roll: "DBM026", address: "Dhaka, Bangladesh", status: "Active" },
  { name: "Owen Wright", email: "owen.wright@email.com", phone: "+8801711000027", department: "Database Management", roll: "DBM027", address: "Barishal, Bangladesh", status: "Active" },
  
  { name: "Ella Lopez", email: "ella.lopez@email.com", phone: "+8801711000028", department: "Cloud Computing", roll: "CC028", address: "Chattogram, Bangladesh", status: "Active" },
  { name: "Samuel Hill", email: "samuel.hill@email.com", phone: "+8801711000029", department: "Cloud Computing", roll: "CC029", address: "Dhaka, Bangladesh", status: "Inactive" },
  { name: "Grace Scott", email: "grace.scott@email.com", phone: "+8801711000030", department: "Cloud Computing", roll: "CC030", address: "Cumilla, Bangladesh", status: "Active" }
];

const courses = [
  { name: "Computer Science", code: "CS", instructor: "Dr. Kane William", duration: "4 Years", fees: 250000 },
  { name: "Software Engineering", code: "SE", instructor: "Dr. Robert Smith", duration: "4 Years", fees: 240000 },
  { name: "Information Technology", code: "IT", instructor: "Prof. James Wilson", duration: "4 Years", fees: 220000 },
  { name: "Data Science", code: "DS", instructor: "Dr. Emily Johnson", duration: "4 Years", fees: 280000 },
  { name: "Cyber Security", code: "CY", instructor: "Prof. Michael Brown", duration: "4 Years", fees: 270000 },
  { name: "Artificial Intelligence", code: "AI", instructor: "Dr. Sarah Davis", duration: "4 Years", fees: 300000 },
  { name: "Web Development", code: "WD", instructor: "Mr. David Miller", duration: "2 Years", fees: 150000 },
  { name: "Mobile App Development", code: "MAD", instructor: "Mr. Daniel Taylor", duration: "2 Years", fees: 160000 },
  { name: "Database Management", code: "DBM", instructor: "Prof. Olivia Martin", duration: "3 Years", fees: 190000 },
  { name: "Cloud Computing", code: "CC", instructor: "Dr. William Anderson", duration: "3 Years", fees: 210000 }
];

const marks = [
  { email: "john.doe@email.com", subject: "Computer Science", exam: "Mid-term", score: 85 },
  { email: "alice.smith@email.com", subject: "Computer Science", exam: "Final", score: 91 },
  { email: "michael.brown@email.com", subject: "Computer Science", exam: "Mid-term", score: 78 },

  { email: "sarah.wilson@email.com", subject: "Software Engineering", exam: "Mid-term", score: 88 },
  { email: "david.miller@email.com", subject: "Software Engineering", exam: "Final", score: 92 },
  { email: "emma.davis@email.com", subject: "Software Engineering", exam: "Mid-term", score: 76 },

  { email: "james.taylor@email.com", subject: "Information Technology", exam: "Mid-term", score: 81 },
  { email: "olivia.anderson@email.com", subject: "Information Technology", exam: "Final", score: 95 },
  { email: "william.thomas@email.com", subject: "Information Technology", exam: "Mid-term", score: 87 },

  { email: "sophia.jackson@email.com", subject: "Data Science", exam: "Mid-term", score: 90 },
  { email: "benjamin.white@email.com", subject: "Data Science", exam: "Final", score: 83 },
  { email: "isabella.harris@email.com", subject: "Data Science", exam: "Mid-term", score: 94 },

  { email: "lucas.martin@email.com", subject: "Cyber Security", exam: "Mid-term", score: 79 },
  { email: "mia.thompson@email.com", subject: "Cyber Security", exam: "Final", score: 89 },
  { email: "henry.garcia@email.com", subject: "Cyber Security", exam: "Mid-term", score: 86 },

  { email: "charlotte.martinez@email.com", subject: "Artificial Intelligence", exam: "Mid-term", score: 93 },
  { email: "alexander.robinson@email.com", subject: "Artificial Intelligence", exam: "Final", score: 88 },
  { email: "amelia.clark@email.com", subject: "Artificial Intelligence", exam: "Mid-term", score: 82 },

  { email: "daniel.lewis@email.com", subject: "Web Development", exam: "Mid-term", score: 91 },
  { email: "harper.lee@email.com", subject: "Web Development", exam: "Final", score: 96 },
  { email: "matthew.walker@email.com", subject: "Web Development", exam: "Mid-term", score: 84 },

  { email: "evelyn.hall@email.com", subject: "Mobile App Development", exam: "Mid-term", score: 87 },
  { email: "sebastian.allen@email.com", subject: "Mobile App Development", exam: "Final", score: 75 },
  { email: "abigail.young@email.com", subject: "Mobile App Development", exam: "Mid-term", score: 90 },

  { email: "jack.hernandez@email.com", subject: "Database Management", exam: "Mid-term", score: 82 },
  { email: "emily.king@email.com", subject: "Database Management", exam: "Final", score: 94 },
  { email: "owen.wright@email.com", subject: "Database Management", exam: "Mid-term", score: 88 },

  { email: "ella.lopez@email.com", subject: "Cloud Computing", exam: "Mid-term", score: 86 },
  { email: "samuel.hill@email.com", subject: "Cloud Computing", exam: "Final", score: 80 },
  { email: "grace.scott@email.com", subject: "Cloud Computing", exam: "Mid-term", score: 92 }
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