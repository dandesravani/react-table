import invariant from 'tiny-invariant'
import { excelData } from '../components/data'

export const allEmpty = (arr: string[]): boolean => arr.every(v => v === '')

export const contains = (obj: string[], values: string[]): boolean => {
  invariant(obj.length === values.length)

  for (let i = 0; i < obj.length; i += 1) {
    if (!obj[i]!.toLowerCase().includes(values[i]!.toLowerCase())) {
      return false
    }
  }

  return true
}

export const containedValues = (
  data: string[][],
  values: string[],
): string[][] => {
  let result: string[][] = []
  for (let rows of data) {
    if (contains(rows, values)) {
      result.push(rows)
    }
  }
  return result
}

export type CmpResult = -1 | 0 | 1

export const cmp = <T>(x: T, y: T): CmpResult => {
  if (x > y) {
    return 1
  }
  if (x < y) {
    return -1
  }
  return 0
}

export const revCmp = <T>(x: T, y: T): CmpResult => cmp(y, x)

export const toCSV = (arr: string[][]) => {
  let result = []
  for (let v of arr) {
    result.push(v)
  }
  return result.join('\n')
}

console.log(toCSV(excelData.data))
