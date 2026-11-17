
const express = require("express");
const cors = require("cors");
const leaveRoutes = require("./routes/leaveRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Check backend connection
app.get("/", (req, res) => {
  res.send("Leave Management API is running.");
});

// Leave application APIs
app.use("/api/leaves", leaveRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
