import {
  Button,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { range } from 'lodash'
import React from 'react'
import { BiSortAlt2 } from 'react-icons/bi'
import { SortIcon } from './IconView'
import { SearchInput } from './SearchInput'
import type { SearchValue, Sort } from './types'

export type ExcelProps = Readonly<{
  headers: string[]
  data: string[][]
  sort?: Sort
  sortIndex?: number
  show: boolean
  onSortHeader(idx: number, sort?: Sort): void
  onShowButton(): void
  onSearchText(value: SearchValue): void
  // cell?: Cell
  // isEdit: boolean
  // onDoubleClick(cell?: Cell): void
  // onSubmit(cell: Cell, cellData: string): Promise<void>
}>

export const Excel = ({
  headers,
  data,
  sort,
  sortIndex: selectedIdx,
  show,
  onShowButton,
  onSortHeader,
  onSearchText,
}: ExcelProps) => {
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
                    <SortIcon sort={sort} />
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
              range(headers.length).map(idx => {
                return (
                  <Td key={idx}>
                    <SearchInput index={idx} onSearchText={onSearchText} />
                  </Td>
                )
              })}
          </Tr>
          {data.map((books, rowIdx) => {
            return (
              <Tr key={`r${rowIdx}`}>
                {books.map((b, colIdx) => {
                  return (
                    // return isEdit &&
                    //   cell &&
                    //   rowIdx === cell.row &&
                    //   colIdx === cell.column ? (
                    //   <Td key={colIdx}>
                    //     <form
                    //       onSubmit={async e => {
                    //         e.preventDefault()
                    //         await onSubmit(
                    //           { row: rowIdx, column: colIdx },
                    //           editText,
                    //         )
                    //       }}
                    //     >
                    //       <input
                    //         type="text"
                    //         value={editText}
                    //         onChange={e => setEditText(e.target.value)}
                    //         style={{ border: '1px solid black' }}
                    //       />
                    //     </form>
                    //   </Td>
                    // ) : (
                    <Td key={colIdx}>{b}</Td>
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
