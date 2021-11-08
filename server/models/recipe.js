const bookshelf = require("../bookshelf");

const Recipe = bookshelf.model("Recipe", {
  tableName: "recipes",
  user: function () {
    return this.belongsTo("User");
  },
});

module.exports = Recipe;
