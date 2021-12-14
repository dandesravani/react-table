import React from 'react'
import { ExcelView } from '../../components/Excel'
import { data, headers } from '../../components/data'

const ExcelPage: React.FC = () => {
  return <ExcelView headers={headers} data={data} />
}

export default ExcelPage
