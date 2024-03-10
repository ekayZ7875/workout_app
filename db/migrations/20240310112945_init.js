/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable(('bmi'),(table)=>{
        table.increments('id').primary()
        table.string('user_id').notNullable()
        table.integer('weight').notNullable()
        table.integer('height').notNullable()
        })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('bmi')
};
