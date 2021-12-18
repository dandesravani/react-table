import React from 'react'
import { Cell, ExcelView, Sort } from '../../components/Excel'
import { excelData } from '../../components/data'
import produce from 'immer'

const cmp = (x: any, y: any) => {
  if (x > y) {
    return 1
  }
  if (x < y) {
    return -1
  }
  return 0
}

const revCmp = (x: any, y: any) => cmp(y, x)

const ExcelPage = () => {
  const [headerIndex, setHeaderIndex] = React.useState<number | undefined>()
  const [sort, setSort] = React.useState<Sort | undefined>()
  const [cell, setCell] = React.useState<Cell | undefined>()
  let [data, set] = React.useState<string[][]>(excelData.data)
  const [isEdit, setIsEdit] = React.useState(false)

  React.useEffect(() => {
    if (headerIndex === undefined) {
      return
    }

    const fn = sort === 'desc' ? revCmp : cmp
    set(
      produce(data, draft => {
        draft.sort((x, y) => fn(x[headerIndex], y[headerIndex]))
      }),
    )
  }, [headerIndex, sort, cell, isEdit])

  const handleSort = (index: number, sort: Sort | undefined) => {
    const order = index !== headerIndex || sort === 'desc' ? 'asc' : 'desc'
    setSort(order)

    setHeaderIndex(index)
  }

  const handleDoubleClick = (cell?: Cell) => {
    if (cell === undefined) {
      return
    }
    setCell(cell)
    setIsEdit(true)
  }

  const handleSubmit = async (cell: Cell, cellData?: string) => {
    const newState = data.map((rows, rIdx) =>
      rows.map((col, cIdx) => {
        if (rIdx === cell.row && cIdx === cell.column) {
          return cellData
        }
        return col
      }),
    )
    set(newState as any)
    setIsEdit(false)
  }

  return (
    <ExcelView
      headers={excelData.headers}
      data={data}
      cell={cell}
      sort={sort}
      isEdit={isEdit}
      onDoubleClick={handleDoubleClick}
      selectedIdx={headerIndex}
      onSortHeader={handleSort}
      onSubmit={handleSubmit}
    />
  )
}

export default ExcelPage
