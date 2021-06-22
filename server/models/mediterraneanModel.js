const { v4: uuid4 } = require("uuid");
const fs = require("fs");

const readData = () => {
  return JSON.parse(fs.readFileSync("./data/mediterranean.json"));
};

const writeData = (myData) => {
  fs.writeFileSync("./data/mediterranean.json", JSON.stringify(myData));
};

const getAllData = () => {
  const mediterraneanData = readData();
  return mediterraneanData;
};
const getIndividual = (currMediterraneanId) => {
  const mediterraneanData = readData();
  const currMed = mediterraneanData.find(
    (med) => med.id === currMediterraneanId
  );
  return currMed;
};
const createMediterranean = (medData) => {
  const mediterraneanData = readData();
  const newMed = {
    id: uuid4(),
    ...medData,
  };
  mediterraneanData.push(newMed);
  writeData(mediterraneanData);
  return newMed;
};
module.exports = {
  getAllData,
  getIndividual,
  createMediterranean,
};
