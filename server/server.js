const express = require("express");
const cors = require("cors");
const profileRoute = require("./routes/profile");
const authRoute = require("./routes/auth");
//const fileUpload = require("express-fileupload");
//const exphbs = require("express-handlebars");
const imageRouter = require("./routes/image-route");
const mediterraneanRoute = require("./routes/mediterranean");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8081;
app.use(express.json());
app.use(cors());

app.use(express.static("public"));
app.use("/", imageRouter);
app.use("/mediterranean", mediterraneanRoute);
app.use("/profile", profileRoute);
app.use("/login", authRoute);
//app.use("/profile", authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
