const express = require("express");
const app = express();
const cors = require("cors");

const recipeRoute = require("./routes/recipes");
const userRoute = require("./routes/users");

require("dotenv").config();

const PORT = process.env.PORT || 8081;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static("public"));

app.use("/mediterranean", recipeRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
