export const isObject = (value) =>
  value && typeof value === "object" && !Array.isArray(value);

/**
 * @summary Преобразует все данные в snake_case формат (рекурсивно).
 *
 * @param data - Объект, который нужно трансформировать в формат snake_case.
 */
export const toSnakeCaseFormat = (data) => {
  const toSnakeCase = (text) => text.replace(/([A-Z])/g, "_$1").toLowerCase();

  if (Array.isArray(data)) {
    return data.map((item) => toSnakeCaseFormat(item));
  }

  if (isObject(data)) {
    return Object.keys(data).reduce((prev, key) => {
      let value = data[key];

      if (isObject(value) || Array.isArray(value)) {
        value = toSnakeCaseFormat(value);
      }

      return { ...prev, [toSnakeCase(key)]: value };
    }, {});
  }

  return data;
};

/**
 * @summary Преобразует все данные в camelCase формат (рекурсивно).
 *
 * @param data - Объект, который нужно трансформировать в формат CamelCase.
 */
export const toCamelCaseFormat = (data) => {
  const replacer = ([, symbol]) => symbol.toUpperCase();
  const toCamelCase = (text) => text.replace(/(_[a-z])/g, replacer);

  if (Array.isArray(data)) {
    return data.map((item) => toCamelCaseFormat(item));
  }

  if (isObject(data)) {
    return Object.keys(data).reduce((prev, key) => {
      let value = data[key];

      if (isObject(value) || Array.isArray(value)) {
        value = toCamelCaseFormat(value);
      }

      return { ...prev, [toCamelCase(key)]: value };
    }, {});
  }

  return data;
};
