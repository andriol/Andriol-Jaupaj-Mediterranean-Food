const express = require("express");
const router = express.Router();
const { v4: uuid4 } = require("uuid");
const multer = require("multer");
const path = require("path");
const Mediterranean = require("../models/mediterraneanModel");

router.route("/").get((req, res) => {
  Mediterranean.where({ ...req.query })
    .fetchAll({
      columns: ["id", "name", "country", "image", "description", "ingredients"],
    })
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch(() => res.status(400).json({ message: "Error can't get recipes" }));
});

router.route("/:mediterraneanId").get((req, res) => {
  Mediterranean.where({ id: req.params.mediterraneanId })
    .fetch()
    .then((recipe) => {
      console.log(recipe);
      res.status(200).json(recipe);
    })
    .catch((err) => res.send("Error getting recipes data"));
});
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },

  //   allowedImage: function (req, file, cb) {
  //     // Accept images only
  //     if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
  //       req.fileValidationError = "Only image files are allowed!";
  //       return cb(new Error("Only image files are allowed!"), false);
  //     }
  //     cb(null, true);
  //   },
});

var upload = multer({
  storage: storage,
  //allowedImage: allowedImage,
}).single("file");
router.post("/", upload, (req, res) => {
  var imageName = req.file.originalname;

  const newRecipe = new Mediterranean({
    name: req.body.name,
    country: req.body.country,
    image: "http://localhost:8080/images/" + imageName,
    description: req.body.description,
    ingredients: req.body.ingredients,
  });
  newRecipe
    .save()
    .then((newRecipe) => {
      res.status(201).json(newRecipe);
    })
    .catch(() =>
      res.status(400).json({ message: "Error can't create new recipe" })
    );
});

// router.put("/:mediterraneanId", (req, res) => {
//   const mediterraneanData = readData();
//   const currMediterraneanId = req.params.mediterraneanId;
//   let updatedMed;
//   const updatedMediterannean = mediterraneanData.map((med) => {
//     if (med.id === currMediterraneanId) {
//       updatedMed = {
//         id: med.id,
//         ...req.body,
//       };
//       return updatedMed;
//     } else {
//       return med;
//     }
//   });
//   writeData(updatedMediterannean);
//   res.status(200).json(updatedMed);
// });
// router.delete("/:mediterraneanId", (req, res) => {
//   const mediterraneanData = readData();
//   const currMediterraneanId = req.params.mediterraneanId;
//   const filteredMed = mediterraneanData.filter(
//     (med) => med.id !== currMediterraneanId
//   );
//   writeData(filteredMed);
//   res.status(204).json({ status: "Done" });
// });

module.exports = router;
