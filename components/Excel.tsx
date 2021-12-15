import { Table, Th, Thead, Tr, Tbody, Td, IconButton } from '@chakra-ui/react'
import { BiSortDown, BiSortUp, BiSortAlt2 } from 'react-icons/bi'
import React from 'react'

export type Sort = 'asc' | 'desc'

interface ExcelViewProps {
  headers: string[]
  data: string[][]
  sort?: Sort
  selectedIdx?: number
  onSortHeader(idx: number, sort?: Sort): void
}

interface IconViewProps {
  sort?: Sort
}

export const IconView = ({ sort }: IconViewProps) => {
  return sort === 'asc' || sort === undefined ? (
    <IconButton size="xs" aria-label="asc" icon={<BiSortUp />} />
  ) : (
    <IconButton size="xs" aria-label="desc" icon={<BiSortDown />} />
  )
}

export const ExcelView: React.FC<ExcelViewProps> = ({
  headers,
  data,
  sort,
  selectedIdx,
  onSortHeader,
}) => {
  return (
    <Table>
      <Thead>
        <Tr>
          {headers.map((h, idx) => {
            return (
              <Th
                key={idx}
                onClick={() => {
                  console.log(idx, 'idx')
                  onSortHeader(idx, sort)
                }}
              >
                {h}{' '}
                {selectedIdx === idx ? (
                  <IconView sort={sort} />
                ) : (
                  <IconButton
                    size="xs"
                    aria-label="sortable"
                    icon={<BiSortAlt2 />}
                  />
                )}
              </Th>
            )
          })}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((books, idx) => {
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
