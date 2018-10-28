
exports.up = function(knex, Promise) {
  return knex.schema.createTable('uploads', (table) => {
    table.increments('id');
    table.integer('userid').references('id').inTable('users').notNullable().onDelete('cascade');
    table.string('fileid').unique().notNullable();
    table.string('path').unique().notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
  });  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('uploads');
};
