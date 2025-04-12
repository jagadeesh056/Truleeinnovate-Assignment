const mongoose = require("mongoose")
const Candidate = require("./models/Candidate")

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected for seeding"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Sample candidate data
const candidateData = [
  {
    name: "John Doe",
    phone: "+1 6789376579",
    email: "john@gmail.com",
    gender: "Male",
    qualification: "Bachelor of Arts (BA)",
    experience: 2,
    skills: ["Angular"],
  },
  {
    name: "Jane Smith",
    phone: "+1 9786578678",
    email: "jane@gmail.com",
    gender: "Female",
    qualification: "Master of Commerce (MCom)",
    experience: 1,
    skills: ["HTML"],
  },
  {
    name: "Michael Johnson",
    phone: "+1 8765432109",
    email: "michael@gmail.com",
    gender: "Male",
    qualification: "Bachelor of Technology (BTech)",
    experience: 3,
    skills: ["React", "JavaScript"],
  },
  {
    name: "Emily Davis",
    phone: "+1 9876543210",
    email: "emily@gmail.com",
    gender: "Female",
    qualification: "Master of Science (MSc)",
    experience: 4,
    skills: ["Python", "Data Science"],
  },
]

const seedDB = async () => {
  try {
    await Candidate.deleteMany({})
    console.log("Deleted all existing candidates")

    const insertedCandidates = await Candidate.insertMany(candidateData)
    console.log(`Added ${insertedCandidates.length} candidates to the database`)
    mongoose.disconnect()
    console.log("MongoDB disconnected")
  } catch (error) {
    console.error("Error seeding database:", error)
    mongoose.disconnect()
  }
}

seedDB()
