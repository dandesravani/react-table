import { z } from 'zod'

export type Sort = 'asc' | 'desc'

export type SearchValue = Readonly<{ index: number; text: string }>
export type Format = 'json' | 'csv'

export const ExcelRow = z.array(z.string())

export const ExcelData = z.array(ExcelRow)

export type ExcelRow = z.infer<typeof ExcelRow>
export type ExcelData = z.infer<typeof ExcelData>
