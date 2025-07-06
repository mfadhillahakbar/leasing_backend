/**
 * @param {import('knex')} knex
 */
export async function up(knex) {
  const hasColumn = await knex.schema.hasColumn('user', 'id_role');

  if (hasColumn) {
    await knex.schema.alterTable('user', (table) => {
      table
        .foreign('id_role')
        .references('id')
        .inTable('role')
        .onDelete('SET NULL');
    });
  }
}

/**
 * @param {import('knex')} knex
 */
export async function down(knex) {
  await knex.schema.alterTable('user', (table) => {
    table.dropForeign('id_role');
  });
}
