export type Sort = 'asc' | 'desc'

export type Cell = Readonly<{ row: number; column: number }>

export type SearchValue = Readonly<{ index: number; text: string }>
