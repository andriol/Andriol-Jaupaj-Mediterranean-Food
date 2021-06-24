const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + ".png");
  },
});
const upload = multer({ storage: storage }).single("image");

router.post("/", function (req, res) {
  upload(req, res, function (err) {
    console.log(req.file);
    if (err) {
    }
    res.json({
      image: req.file,
      success: true,
      message: "Upload successful",
    });
  });
});

module.exports = router;
