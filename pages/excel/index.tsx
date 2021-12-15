import React from 'react'
import { ExcelView } from '../../components/Excel'
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

const ExcelPage = () => {
  const [headerIndex, setHeaderIndex] = React.useState<number | undefined>(
    undefined,
  )

  React.useEffect(() => {
    if (headerIndex === undefined) {
      return
    }

    set(
      produce(data, draft => {
        draft.sort((x, y) => cmp(x[headerIndex], y[headerIndex]))
      }),
    )
  }, [headerIndex])

  const [data, set] = React.useState<string[][]>(excelData.data)

  const handleSort = (index: number) => {
    setHeaderIndex(index)
  }

  return (
    <ExcelView
      headers={excelData.headers}
      data={data}
      onSortHeader={handleSort}
    />
  )
}

export default ExcelPage
