import { range } from 'lodash'
import React from 'react'
import { useImmer } from 'use-immer'
import type { CellValue } from '../components/Cell'
import { excelData } from '../components/data'
import { Excel } from '../components/Excel'
import type { SearchValue, Sort } from '../components/types'
import { allEmpty, cmp, containedValues, revCmp } from '../lib/utils'

const ExcelPage = () => {
  let [data, setData] = useImmer<string[][]>(excelData.data)
  const [searches, setSearches] = useImmer(() =>
    range(excelData.headers.length).map(_ => ''),
  )
  675
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
    />
  )
}

export default ExcelPage
