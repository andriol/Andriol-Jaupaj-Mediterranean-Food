const bookshelf = require("../bookshelf");

const mediterraneanModel = bookshelf.model("mediterraneanModel", {
  tableName: "recipes",
});

module.exports = mediterraneanModel;
