import { intToColorHex } from './utils/color'

type ValueAtPath<T> = T extends { [key: string]: any } ? ValueAtPath<T[keyof T]> : T

export type MappingPath = Array<string | number>

export type MappingItem =
  | {
      type: 'data' | 'color'
      path: MappingPath
    }
  | {
      type: 'dataCall'
      path: MappingPath
      call(value: any): any
    }
  | {
      type: 'nested'
      nested: Record<string, MappingItem> | MappingItem[]
    }

export type Mapping = Record<string, MappingItem>

function getValueByPath<T>(data: any, path: MappingPath): ValueAtPath<T> | undefined {
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

export function transform(data: any, mapping: Mapping | MappingItem[]): { [key: string]: any } {
  const result: { [key: string]: any } = Array.isArray(mapping) ? [] : {}
  for (const key in mapping) {
    const map: MappingItem = mapping[key]
    if (map.type === 'nested') {
      result[key] = transform(data, map.nested)
    } else {
      let value = getValueByPath(data, map.path)
      if (value === undefined) {
        result[key] = undefined
        return
      }
      if (map.type === 'dataCall') {
        result[key] = map.call(value)
      } else {
        result[key] = map.type === 'color' ? intToColorHex(value) : value
      }
    }
  }

  return result
}
