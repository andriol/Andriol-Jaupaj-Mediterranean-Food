const recipeData = require("../seed_data/recipes");
const userData = require("../seed_data/users");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert(userData);
    })
    .then(() => {
      return knex("recipes").del();
    })
    .then(() => {
      return knex("recipes").insert(recipeData);
    });
};
