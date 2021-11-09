const { response } = require("express");
var multer = require("multer");

module.exports.image = {
  storage: function () {
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "public/images/");
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
        console.log(file.mimetype);
      },
    });
    return storage;
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
};
