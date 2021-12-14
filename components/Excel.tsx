import { Table, Th, Thead, Tr, Tbody, Td } from '@chakra-ui/react'
import React from 'react'

interface ExcelViewProps {
  headers: string[]
  data: string[][]
}

export const ExcelView: React.FC<ExcelViewProps> = ({ data, headers }) => {
  return (
    <Table>
      <Thead>
        <Tr>
          {headers.map((h, idx) => (
            <Th key={idx}>{h}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((books, idx) => (
          <Tr key={idx}>
            {books.map((b, idx) => (
              <Td key={idx}>{b}</Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
