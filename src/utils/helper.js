// 检验 JSON 格式
export function validateJSON (json) {
  let [data, error] = [{}, null]
  try {
    data = JSON.parse(json)
  } catch (err) {
    error = err
  }
  return { data, error }
}

// 遍历 schema
function walker (schema, level, result) {
  if (schema.properties) {
    const requiredList = schema.required || []
    Object.keys(schema.properties).forEach((key) => {
      const keySchema = schema.properties[key]
      const {
        type,
        items,
        properties,
        description
      } = keySchema
      result.push({
        key,
        level,
        description,
        type: items && items.type ? `${type}<{${items.type}}>` : type,
        required: !!~requiredList.indexOf(key)
      })
      if (properties || items) {
        walker(keySchema, level + 1, result)
      }
    })
  } else if (schema.items) {
    const itemSchema = schema.items.length ? schema.items[0] : schema.items
    walker(itemSchema, level, result)
  }
}

// 转换 schema 格式为数组
export function genSchemaList (schema) {
  const result = []
  walker(schema, 0, result)
  return result
};
