import { Table, Th, Thead, Tr, Tbody, Td } from '@chakra-ui/react'
import React from 'react'

interface ExcelViewProps {
  headers: string[]
  data: string[][]
  onSortHeader(idx: number): void
}

export const ExcelView: React.FC<ExcelViewProps> = ({
  headers,
  data,
  onSortHeader,
}) => {
  return (
    <Table>
      <Thead>
        <Tr>
          {headers.map((h, idx) => (
            <Th key={idx} onClick={() => onSortHeader(idx)}>
              {h}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((books, idx) => {
          // console.log(books)
          return (
            <Tr key={idx}>
              {books.map((b, idx) => (
                <Td key={idx}>{b}</Td>
              ))}
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}
