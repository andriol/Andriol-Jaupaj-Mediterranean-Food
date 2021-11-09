exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("username").notNullable();
      table.string("password").notNullable();
      table.string("email").notNullable().unique();
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("recipes", (table) => {
      table.increments("id").primary();
      table.string("name");
      table.string("country");
      table.string("description");
      table.string("ingredients");
      table.string("image");
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("recipes")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("recipes").dropTable("users");
};
