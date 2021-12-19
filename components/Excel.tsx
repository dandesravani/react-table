import {
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
} from '@chakra-ui/react'
import React from 'react'
import { BiSortAlt2, BiSortDown, BiSortUp } from 'react-icons/bi'
// import { range, uniqueId } from 'lodash'

export type Sort = 'asc' | 'desc'

export type Cell = { row: number; column: number }

interface ExcelViewProps {
  headers: string[]
  data: string[][]
  sort?: Sort
  selectedIdx?: number
  isEdit: boolean
  cell?: Cell
  isSearch: boolean
  onSortHeader(idx: number, sort?: Sort): void
  onDoubleClick(cell?: Cell): void
  onSearch(): void
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
  isSearch,
  onSearch,
  onSortHeader,
  onDoubleClick,
  onSubmit,
}) => {
  return (
    <>
      <Button
        onClick={onSearch}
        m="4"
        bg="blue.500"
        color="#fff"
        _hover={{ bg: 'blue.700' }}
        _active={{ outline: 'none', border: 'none' }}
      >
        {isSearch ? 'Hide Search' : 'Show Search'}
      </Button>
      <Table>
        <Thead>
          <Tr>
            {headers.map((h, idx) => {
              return (
                <Th
                  key={idx}
                  onClick={() => {
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
              <>
                {/* {isSearch ? (
                  <Td>
                    {range(0, 1).map(v => (
                      <input
                        key={uniqueId(rowIdx.toString())}
                        style={{ border: '1px solid black' }}
                      />
                    ))}
                  </Td>
                ) : null} */}
                <Tr key={rowIdx}>
                  {books.map((b, colIdx) => {
                    const [editText, setEditText] = React.useState(b)

                    return isEdit &&
                      cell &&
                      rowIdx === cell.row &&
                      colIdx === cell.column ? (
                      <>
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
                      </>
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
              </>
            )
          })}
        </Tbody>
      </Table>
    </>
  )
}
