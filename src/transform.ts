type ValueAtPath<T> = T extends { [key: string]: any } ? ValueAtPath<T[keyof T]> : T

function getValueByPath<T>(data: any, path: Array<string | number>): ValueAtPath<T> | undefined {
  let result: any = data

  for (const key of path) {
    if (result && typeof result === 'object') {
      result = result[key]
    } else {
      return undefined
    }
  }

  return result
}

export interface Mapping {
  [key: string]: {
    path: Array<string | number>
    nestedMapping?: Mapping // 可选的嵌套映射
  }
}

export function transformObject(data: any, mapping: Mapping): { [key: string]: any } {
  const result: { [key: string]: any } = {}

  for (const key in mapping) {
    if (mapping.hasOwnProperty(key)) {
      const path = mapping[key].path
      const value = getValueByPath(data, path)

      if (value !== undefined && typeof value === 'object' && mapping[key].nestedMapping) {
        // 仅在存在嵌套映射时才递归
        result[key] = transformObject(value, mapping[key].nestedMapping!)
      } else {
        result[key] = value
      }
    }
  }

  return result
}
