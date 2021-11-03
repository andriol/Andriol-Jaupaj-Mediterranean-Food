const express = require("express");
const router = express.Router();
const imageController = require("../controllers/imageController");

router.get("/profile", imageController.imageUploadForm);

router.post("/profile", imageController.storeImage);

router.get("/profile", imageController.displayImage);

module.exports = router;
