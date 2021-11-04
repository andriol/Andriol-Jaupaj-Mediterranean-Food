const express = require("express");
const app = express();
const authRoute = require("./routes/auth");
const cors = require("cors");

const mediterraneanRoute = require("./routes/mediterranean");
require("dotenv").config();

const PORT = process.env.PORT || 8081;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static("public"));

app.use("/mediterranean", mediterraneanRoute);
app.use("/login", authRoute);
//app.use("/profile", authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
