import React from 'react'
import { ExcelView, Sort } from '../../components/Excel'
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
  }, [headerIndex, sort])

  const [data, set] = React.useState<string[][]>(excelData.data)

  const handleSort = (index: number, sort: Sort | undefined) => {
    const order = index !== headerIndex || sort === 'desc' ? 'asc' : 'desc'
    setSort(order)

    setHeaderIndex(index)
  }

  return (
    <ExcelView
      headers={excelData.headers}
      data={data}
      sort={sort}
      selectedIdx={headerIndex}
      onSortHeader={handleSort}
    />
  )
}

export default ExcelPage
