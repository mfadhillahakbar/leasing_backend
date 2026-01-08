const getForeignKey = async (knex, baseTable, targetTable) => {
  const result = await knex
    .select(
      'tp.name AS parent_table',
      'cp.name AS parent_column',
      'tr.name AS referenced_table',
      'cr.name AS referenced_column'
    )
    .from('sys.foreign_keys AS fk')
    .join('sys.foreign_key_columns AS fkc', 'fkc.constraint_object_id', 'fk.object_id')
    .join('sys.tables AS tp', 'tp.object_id', 'fkc.parent_object_id')
    .join('sys.columns AS cp', function () {
      this.on('cp.column_id', '=', 'fkc.parent_column_id')
        .andOn('cp.object_id', '=', 'fkc.parent_object_id');
    })
    .join('sys.tables AS tr', 'tr.object_id', 'fkc.referenced_object_id')
    .join('sys.columns AS cr', function () {
      this.on('cr.column_id', '=', 'fkc.referenced_column_id')
        .andOn('cr.object_id', '=', 'fkc.referenced_object_id');
    })
    .where('tp.name', baseTable)
    .andWhere('tr.name', targetTable);

  if (result.length === 0) return null;

  const { parent_table, parent_column, referenced_table, referenced_column } = result[0];
  return {
    joinTable: targetTable,
    localKey: `${parent_table}.${parent_column}`,
    foreignKey: `${referenced_table}.${referenced_column}`
  };
};

export const includeTable = (configs = []) => {
  return async context => {
    const { app, service, params } = context;
    const knex = app.get('mssqlClient');
    const baseTable = service.tableName || service.options?.name;

    if (!baseTable) throw new Error('Relasi tabel tidak ditemukan');

    let builder = knex.from(baseTable).select(`${baseTable}.*`);
    const allJoinFields = {};

    for (const config of configs) {
      let joinInfo = config;

      if (typeof config === 'string') {
        const autoMapping = await getForeignKey(knex, baseTable, config);
        if (!autoMapping) {
          throw new Error(`Relasi antara ${baseTable} dan ${config} tidak ditemukan di database.`);
        }
        joinInfo = autoMapping;
      }

      const { joinTable, localKey, foreignKey } = joinInfo;

      const columns = await knex(joinTable).columnInfo();
      const selectFields = Object.keys(columns).map(col =>
        `${joinTable}.${col} as ${joinTable}_${col}`
      );

      builder = builder.leftJoin(joinTable, localKey, foreignKey).select(...selectFields);
      allJoinFields[joinTable] = Object.keys(columns);
    }

    const query = params.query || {};
    Object.entries(query).forEach(([key, value]) => {
      if (!key.startsWith('$') && key !== 'q') {
        builder.where(`${baseTable}.${key}`, value);
      }
    });

    params.knex = builder;
    params._joinAlias = Object.keys(allJoinFields);
    params._joinFields = allJoinFields;

    return context;
  };
};
