const express = require("express");
const router = express.Router();
const { v4: uuid4 } = require("uuid");
const multer = require("multer");
const path = require("path");
const Recipe = require("../models/recipe");
const User = require("../models/user");
const auth = require("../middleware/auth");
router.get("/", (req, res) => {
  Recipe.fetchAll()

    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch(() => res.status(400).json({ message: "Error can't get recipes" }));
});

router.get("/:mediterraneanId", (req, res) => {
  Recipe.where({ id: req.params.mediterraneanId })
    .fetch({ withRelated: ["user"] })
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
router.post("/", upload, auth.auth, (req, res) => {
  var imageName = req.file.originalname;

  User.where({ id: req.body.user_id })
    .fetch()
    .then(
      (user) => {
        console.log("user found");

        return user;
      },
      () => res.status(404).json({ message: "user not found" })
    )
    .then((user) => {
      new Recipe({
        name: req.body.name,
        country: req.body.country,
        image: "http://localhost:8080/images/" + imageName,
        description: req.body.description,
        ingredients: req.body.ingredients,
        user_id: user.id,
      })

        .save()
        .then((newRecipe) => {
          res.status(201).json(newRecipe);
        });
    })
    .catch((err) =>
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
