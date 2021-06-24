const router = require("express").Router();
const { v4: uuid4 } = require("uuid");
const fs = require("fs");
//const { route } = require("./mediterranean");

const readData = () => {
  return JSON.parse(fs.readFileSync("./data/mediterranean.json"));
};

const writeData = (myData) => {
  fs.writeFileSync("./data/mediterranean.json", JSON.stringify(myData));
};

router.get("/", (_req, res) => {
  const mediterraneanData = readData();
  const mediterraneanFilered = mediterraneanData.map((med) => {
    return {
      id: med.id,
      name: med.name,
      country: med.country,
      image: med.image,
      description: med.description,
      ingredients: med.ingredients,
    };
  });
  res.status(200).json(mediterraneanFilered);
});

router.get("/:mediterraneanId", (req, res) => {
  const mediterraneanData = readData();
  const currMediterraneanId = req.params.mediterraneanId;
  const currMediterranean = mediterraneanData.find(
    (med) => med.id === currMediterraneanId
  );
  res.status(200).json(currMediterranean);
});
router.post("/", (req, res) => {
  const mediterraneanData = readData();
  const newMed = {
    id: uuid4(),
    image: req.body.path,
    ...req.body,
  };
  mediterraneanData.push(newMed);
  writeData(mediterraneanData);
  res.status(200).json(newMed);
});

router.put("/:mediterraneanId", (req, res) => {
  const mediterraneanData = readData();
  const currMediterraneanId = req.params.mediterraneanId;
  let updatedMed;
  const updatedMediterannean = mediterraneanData.map((med) => {
    if (med.id === currMediterraneanId) {
      updatedMed = {
        id: med.id,
        ...req.body,
      };
      return updatedMed;
    } else {
      return med;
    }
  });
  writeData(updatedMediterannean);
  res.status(200).json(updatedMed);
});
router.delete("/:mediterraneanId", (req, res) => {
  const mediterraneanData = readData();
  const currMediterraneanId = req.params.mediterraneanId;
  const filteredMed = mediterraneanData.filter(
    (med) => med.id !== currMediterraneanId
  );
  writeData(filteredMed);
  res.status(204).json({ status: "Deleted" });
});

module.exports = router;
