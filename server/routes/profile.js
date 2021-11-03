const express = require("express");
const router = express.Router();
const multer = require("multer");
var imageMiddleware = require("../middlewares/imageMiddleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + "_" + Date.now() + ".png");
  },
  //});

  allowedImage: function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      req.fileValidationError = "Only image files are allowed!";
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
});

//const upload = multer({ storage: storage }).single("image");

var upload = multer({
  storage: imageMiddleware.image.storage(),
  allowedImage: imageMiddleware.image.allowedImage,
}).single("image");
router.post("/", function (req, res) {
  upload(req, res, function (err) {
    //console.log(req.file.originalname);
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
