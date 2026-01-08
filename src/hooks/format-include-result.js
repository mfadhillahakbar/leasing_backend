export const formatIncludeResult = () => {
  return async context => {
    const { result, params } = context;
    const aliases = params._joinAlias;
    const fieldsMap = params._joinFields;

    if (!aliases || !fieldsMap) return context;

    const processItem = (item) => {
      const rest = { ...item };
      const joined = {};

      for (const alias of aliases) {
        const nested = {};
        const fields = fieldsMap[alias];

        for (const field of fields) {
          const key = `${alias}_${field}`;
          nested[field] = rest[key];
          delete rest[key];
        }

        joined[alias] = nested;
      }

      return { ...rest, ...joined };
    };

    if (Array.isArray(result.data)) {
      result.data = result.data.map(processItem);
    } else if (Array.isArray(result)) {
      context.result = result.map(processItem);
    } else if (result) {
      context.result = processItem(result);
    }

    return context;
  };
};