const express = require("express");
const cors = require("cors");
const mediterraneanRoutes = require("./routes/mediterranean-simpler");
const profileRoute = require("./routes/profile");

require("dotenv").config();
const PORT = process.env.PORT || 8081;
const app = express();

app.use(cors());

app.use(express.json());

app.use("/public", express.static("public"));

app.use("/mediterranean", mediterraneanRoutes);
app.use("/profile", profileRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
