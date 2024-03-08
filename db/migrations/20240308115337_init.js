/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Users_1',(table)=>{
        table.increments('id').primary
        table.string('username').unique().notNullable()
        table.string('email').unique().notNullable()
        table.string('password').notNullable()
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Users_1')
  
};
