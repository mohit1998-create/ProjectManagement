require("dotenv").config();

const app = require("./src/app");

const connectDB = require("./src/config/db");

connectDB();

const PORT = process.env.PORT || 5000;
require(
  "./src/jobs/taskReminder.job"
);
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});