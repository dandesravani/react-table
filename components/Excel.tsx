import { IconButton, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'
import { BiSortAlt2, BiSortDown, BiSortUp } from 'react-icons/bi'

export type Sort = 'asc' | 'desc'

export type Cell = { row: number; column: number }

interface ExcelViewProps {
  headers: string[]
  data: string[][]
  sort?: Sort
  selectedIdx?: number
  isEdit: boolean
  cell?: Cell
  onSortHeader(idx: number, sort?: Sort): void
  onDoubleClick(cell?: Cell): void
  onSubmit(cell: Cell, cellData: string): Promise<void>
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
  cell,
  selectedIdx,
  isEdit,
  onSortHeader,
  onDoubleClick,
  onSubmit,
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
        {data.map((books, rowIdx) => {
          return (
            <Tr key={rowIdx}>
              {books.map((b, colIdx) => {
                const [editText, setEditText] = React.useState(b)
                return isEdit &&
                  cell &&
                  rowIdx === cell.row &&
                  colIdx === cell.column ? (
                  <Td key={colIdx}>
                    <form
                      onSubmit={async e => {
                        e.preventDefault()
                        await onSubmit(
                          { row: rowIdx, column: colIdx },
                          editText,
                        )
                      }}
                    >
                      <input
                        type="text"
                        value={editText}
                        onChange={e => setEditText(e.target.value)}
                        style={{ border: '1px solid black' }}
                      />
                    </form>
                  </Td>
                ) : (
                  <Td
                    key={colIdx}
                    onDoubleClick={() =>
                      onDoubleClick({ row: rowIdx, column: colIdx })
                    }
                  >
                    {b}
                  </Td>
                )
              })}
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}
