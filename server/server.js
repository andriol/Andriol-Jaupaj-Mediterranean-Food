const express = require("express");
const cors = require("cors");
const mediterraneanRoutes = require("./routes/mediterranean-simpler");
const multer = require("multer");

require("dotenv").config();
const PORT = process.env.PORT || 8081;
const app = express();

app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const mediterranean = multer({ srorage: storage }).single("file");
app.post("/mediterranean", function (req, res) {
  mediterranean(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }

    return res.type(data.img.contentType).send(data.img.data);
  });
});
app.use(express.json());

app.use("/mediterranean", mediterraneanRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
