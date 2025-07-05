export async function up(knex) {
  await knex.schema.createTable('user', table => {
    table.increments('id').primary();
    table.string('nama', 50);
    table.string('username', 15).unique();
    table.string('password', 255)
    table.integer('id_role').unsigned();
    table.dateTime('created_at').defaultTo(knex.fn.now());
    table.dateTime('updated_at').defaultTo(knex.fn.now());
  })
}

export async function down(knex) {
  await knex.schema.dropTable('user')
}
