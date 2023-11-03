const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDb();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/staff", require("./routes/staffRoutes"));
app.use("/api/family", require("./routes/familyRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
