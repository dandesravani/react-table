import {
  Avatar,
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  WrapItem,
} from '@chakra-ui/react'
import { range } from 'lodash'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import { BiSortAlt2 } from 'react-icons/bi'
import { Cell, CellValue } from './Cell'
import { SortIcon } from './IconView'
import { SearchInput } from './SearchInput'
import type { Format, SearchValue, Sort } from './types'

export type ExcelProps = Readonly<{
  headers: string[]
  data: string[][]
  sort?: Sort
  sortIndex?: number
  show: boolean
  onSortHeader(idx: number, sort?: Sort): void
  onShowButton(): void
  onSearchText(value: SearchValue): void
  onCellSubmit(values: CellValue): void
  onDownload(format: Format, evt: React.MouseEvent<HTMLAnchorElement>): void
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
  onCellSubmit,
  onDownload,
}: ExcelProps) => {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  if (status === 'unauthenticated') {
    router.push('/')
  }

  return (
    <>
      <Flex>
        <HStack flex="1">
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
          <Link
            as="button"
            href="data.json"
            onClick={evt => onDownload('json', evt)}
          >
            Export JSON
          </Link>
          <Link
            as="button"
            href="data.csv"
            onClick={evt => onDownload('csv', evt)}
          >
            Export CSV
          </Link>
        </HStack>
        <WrapItem onClick={() => signOut()} m={4}>
          <Avatar name="Dan Abrahmov" src={session?.user?.image as any} />
        </WrapItem>
      </Flex>

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
          {data.map((books, rowIdx) => (
            <Tr key={rowIdx}>
              {books.map((b, colIdx) => (
                <Td key={colIdx}>
                  <Cell
                    row={rowIdx}
                    column={colIdx}
                    onChange={onCellSubmit}
                    text={b}
                  />
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  )
}
