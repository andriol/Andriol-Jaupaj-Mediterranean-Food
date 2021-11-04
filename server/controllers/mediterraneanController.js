const mediterraneanModel = require("./models/mediterraneanModel");

function getAllData(_req, res) {
  const mediterraneanData = mediterraneanModel.getAllData();
  res.status(200).json(mediterraneanData);
}
function getIndividual(req, res) {
  const currMediterraneanId = req.params.mediterraneanId;
  const currMediterranean =
    mediterraneanModel.getIndividual(currMediterraneanId);
  res.status(200).json(currMediterranean);
}

function createMediterranean(req, res) {
  if (
    !req.body.name ||
    !req.body.country ||
    !req.body.description ||
    !req.body.ingredients ||
    !req.file.originalname
  ) {
    res
      .status(400)
      .send(
        "please provide name, country,ingredients and description of the food recipe"
      );
  }
  const newMed = mediterraneanModel.createMediterranean(req.body);
  res.status(200).json(newMed);
}

module.exports = {
  getAllData,
  getIndividual,
  createMediterranean,
};
