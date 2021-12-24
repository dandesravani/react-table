import { range } from 'lodash'
import React from 'react'
import { useImmer } from 'use-immer'
import type { CellValue } from '../components/Cell'
import { excelData } from '../components/data'
import { Excel } from '../components/Excel'
import type { Format, SearchValue, Sort } from '../components/types'
import { allEmpty, cmp, containedValues, revCmp, toCSV } from '../lib/utils'

const ExcelPage = () => {
  let [data, setData] = useImmer<string[][]>(excelData.data)
  const [searches, setSearches] = useImmer(() =>
    range(excelData.headers.length).map(_ => ''),
  )

  const [sortIndex, setSortIndex] = React.useState<number | undefined>()
  const [sort, setSort] = React.useState<Sort | undefined>()
  const [showSearch, setShowSearch] = React.useState(true)

  React.useEffect(() => {
    if (sortIndex === undefined) {
      return
    }

    const fn = sort === 'desc' ? revCmp : cmp

    setData(draft => {
      draft.sort((x, y) => fn(x[sortIndex], y[sortIndex]))
    })
  }, [sortIndex, sort])

  const handleSort = (index: number, sort: Sort | undefined) => {
    const order = index !== sortIndex || sort === 'desc' ? 'asc' : 'desc'
    setSort(order)

    setSortIndex(index)
  }

  const handleButton = () => {
    setShowSearch(!showSearch)
  }

  const handleSearchText = ({ index, text }: SearchValue) => {
    setSearches(draft => {
      draft[index] = text
        .split(' ')
        .filter(s => s !== '')
        .join(' ')
    })
  }

  const filtered = allEmpty(searches) ? data : containedValues(data, searches)

  const handleCellSubmit = (values: CellValue) => {
    const { row, column, text } = values

    setData(draft => {
      draft[row]![column] = text
    })
  }

  const handleDownload = (
    format: Format,
    evt: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    const contents =
      format === 'json' ? JSON.stringify(data, null, ' ') : toCSV(data)

    const target = evt.target as any
    target.href = URL.createObjectURL(new Blob([contents], { type: format }))
    target.download = 'data.' + format
  }

  return (
    <Excel
      headers={excelData.headers}
      data={filtered}
      sort={sort}
      show={showSearch}
      onShowButton={handleButton}
      sortIndex={sortIndex}
      onSortHeader={handleSort}
      onSearchText={handleSearchText}
      onCellSubmit={handleCellSubmit}
      onDownload={handleDownload}
    />
  )
}

export default ExcelPage
