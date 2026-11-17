
const express = require("express");
const router = express.Router();

let leaves = [];
let nextId = 1;

// Get leave history for an employee
router.get("/", (req, res) => {
  const email = req.query.email;

  const employeeLeaves = leaves.filter(
    (leave) => leave.email === email
  );

  res.json(employeeLeaves);
});

// Submit a new leave application
router.post("/", (req, res) => {
  const { name, email, startDate, endDate, reason } = req.body;

  if (!name || !email || !startDate || !endDate || !reason?.trim()) {
    return res.status(400).json({
      message: "Please fill in all fields."
    });
  }

  const start = new Date(startDate + "T00:00:00");
  const end = new Date(endDate + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (
    isNaN(start.getTime()) ||
    isNaN(end.getTime()) ||
    end < start ||
    start < today
  ) {
    return res.status(400).json({
      message: "Please select valid future dates."
    });
  }

  const leave = {
    id: nextId++,
    name,
    email: email.toLowerCase(),
    startDate,
    endDate,
    reason: reason.trim(),
    status: "Pending",
    appliedAt: new Date().toISOString()
  };

  leaves.push(leave);

  res.status(201).json({
    message: "Leave application submitted successfully.",
    leave
  });
});

module.exports = router;
