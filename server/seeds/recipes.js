const mediterraneanData = require("../seed_data/recipes");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("recipes")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("recipes").insert(mediterraneanData);
    });
};
