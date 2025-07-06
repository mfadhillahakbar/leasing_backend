export const formatIncludeResult = () => {
  return async context => {
    const { result, params } = context;
    const alias = params._joinAlias;
    const fields = params._joinFields;

    if (!alias || !fields) return context;

    const mapJoinFields = item => {
      const nested = {};
      const rest = { ...item };

      for (const field of fields) {
        const key = `${alias}_${field}`;
        nested[field] = item[key];
        delete rest[key];
      }

      return {
        ...rest,
        [alias]: nested
      };
    };

    if (Array.isArray(result.data)) {
      result.data = result.data.map(mapJoinFields);
    } else {
      context.result = mapJoinFields(result);
    }

    return context;
  };
};