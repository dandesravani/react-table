import React from 'react'
import { Cell, ExcelView, Sort } from '../../components/Excel'
import { excelData } from '../../components/data'
import produce from 'immer'

export const contains = (arr: string[], val: string) => {
  let result = []
  for (let v of arr) {
    if (v.includes(val)) {
      result.push(v)
    }
  }
  return result
}

export const containedValues = (arr: string[][], text: string): string[][] => {
  let result: string[][] = []
  for (let v of arr) {
    let con = contains(v, text)
    if (con.length !== 0) {
      result.push(v)
    }
  }
  return result
}

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
  let [data, set] = React.useState<string[][]>(excelData.data)
  const [headerIndex, setHeaderIndex] = React.useState<number | undefined>()
  const [sort, setSort] = React.useState<Sort | undefined>()
  const [cell, setCell] = React.useState<Cell | undefined>()
  const [isEdit, setIsEdit] = React.useState(false)
  const [show, setShow] = React.useState(true)
  const [searchText, setSearchText] = React.useState('')

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
  }, [headerIndex, sort, cell, isEdit, searchText])

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

  const handleButton = () => {
    setShow(!show)
  }

  const handleSearchText = (text: string) => {
    setSearchText(text)
  }

  const filtered = searchText ? containedValues(data, searchText) : data

  return (
    <ExcelView
      headers={excelData.headers}
      data={filtered}
      cell={cell}
      sort={sort}
      isEdit={isEdit}
      show={show}
      searchText={searchText}
      onShowButton={handleButton}
      onDoubleClick={handleDoubleClick}
      selectedIdx={headerIndex}
      onSortHeader={handleSort}
      onSubmit={handleSubmit}
      onSearchText={handleSearchText}
    />
  )
}

export default ExcelPage
