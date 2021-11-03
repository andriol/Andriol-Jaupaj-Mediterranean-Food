const express = require("express");
const router = express.Router();
const { v4: uuid4 } = require("uuid");

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

router.route("/").post((req, res) => {
  const newRecipe = new Mediterranean({
    name: req.body.name,
    country: req.body.country,
    image: req.body.image,
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
