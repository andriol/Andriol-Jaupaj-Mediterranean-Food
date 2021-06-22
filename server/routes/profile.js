const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + ".png");
  },
});
const upload = multer({ storage: storage }).single("avatar");

router.post("/", function (req, res) {
  upload(req, res, function (err) {
    if (err) {
    }
    res.json({
      success: true,
      message: "Image uploaded successfully",
    });
  });
});

module.exports = router;
