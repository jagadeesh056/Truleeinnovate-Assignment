const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate"); // Make sure this is correctly spelled

// Get all candidates with pagination
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const candidates = await Candidate.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await Candidate.countDocuments();
    const totalPages = Math.ceil(total / limit);

    res.json({
      candidates,
      totalPages,
      currentPage: page,
      total,
    });
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get a single candidate by ID
router.get("/:id", async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.json(candidate);
  } catch (error) {
    console.error("Error fetching candidate:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Create a new candidate
router.post("/", async (req, res) => {
  try {
    console.log("Received candidate data:", req.body);
    const newCandidate = new Candidate(req.body);
    const savedCandidate = await newCandidate.save();
    res.status(201).json(savedCandidate);
  } catch (error) {
    console.error("Error creating candidate:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update a candidate
router.put("/:id", async (req, res) => {
  try {
    const updatedCandidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCandidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.json(updatedCandidate);
  } catch (error) {
    console.error("Error updating candidate:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Delete a candidate
router.delete("/:id", async (req, res) => {
  try {
    const deletedCandidate = await Candidate.findByIdAndDelete(req.params.id);

    if (!deletedCandidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.json({ message: "Candidate deleted successfully" });
  } catch (error) {
    console.error("Error deleting candidate:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;