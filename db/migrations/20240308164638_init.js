/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('forget-password_1',(table)=>{
        table.increments('id').primary()
        table.string('username').notNullable()
        table.string('token').notNullable()
        table.timestamp('expires_at').notNullable()
        })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('forget-password_1')
};
