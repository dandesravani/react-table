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
import { range } from 'lodash'
import { excelData } from './data'

export type Sort = 'asc' | 'desc'

export type Cell = { row: number; column: number }

interface SearchInputProps {
  searchText: string
  onSearchText(text: string): void
}

export const SearchInput: React.FC<SearchInputProps> = ({
  searchText,
  onSearchText,
}) => {
  return (
    <input
      type="search"
      style={{
        border: '0.5px solid black',
        outline: 'none',
        padding: '4px',
      }}
      value={searchText}
      onChange={e => onSearchText(e.target.value)}
    />
  )
}

interface ExcelViewProps {
  headers: string[]
  data: string[][]
  sort?: Sort
  selectedIdx?: number
  isEdit: boolean
  cell?: Cell
  show: boolean
  onSortHeader(idx: number, sort?: Sort): void
  onDoubleClick(cell?: Cell): void
  onShowButton(): void
  onSubmit(cell: Cell, cellData: string): Promise<void>
  searchText: string
  onSearchText(text: string): void
}

interface IconViewProps {
  sort?: Sort
}

const searchInputArray = range(0, excelData.headers.length)

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
  show,
  onShowButton,
  onSortHeader,
  onDoubleClick,
  onSubmit,
  searchText,
  onSearchText,
}) => {
  const [editText, setEditText] = React.useState('')

  return (
    <>
      <Button
        onClick={onShowButton}
        m="4"
        bg="blue.500"
        color="#fff"
        _hover={{ bg: 'blue.700' }}
        _active={{ outline: 'none', border: 'none' }}
      >
        {show ? 'Hide Search' : 'Show Search'}
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
          <Tr key={-1}>
            {show &&
              searchInputArray.map(idx => {
                return (
                  <Td key={idx}>
                    <SearchInput
                      searchText={searchText}
                      onSearchText={onSearchText}
                    />
                  </Td>
                )
              })}
          </Tr>
          {data.map((books, rowIdx) => {
            return (
              <Tr key={`r${rowIdx}`}>
                {books.map((b, colIdx) => {
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
    </>
  )
}
