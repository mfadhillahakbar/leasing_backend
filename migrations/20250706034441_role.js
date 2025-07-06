export async function up(knex) {
  await knex.schema.createTable('role', table => {
    table.increments('id').primary();
    table.string('nama', 20);
    table.dateTime('created_at').defaultTo(knex.fn.now());
    table.dateTime('updated_at').defaultTo(knex.fn.now());
  })
}

export async function down(knex) {
  await knex.schema.dropTable('role')
}
