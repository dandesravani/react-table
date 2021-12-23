import { IconButton } from '@chakra-ui/react'
import React from 'react'
import { BiSortDown, BiSortUp } from 'react-icons/bi'
import type { Sort } from './types'

type SortIconProps = Readonly<{
  sort?: Sort
}>

export const SortIcon = ({ sort }: SortIconProps) =>
  sort === 'asc' || sort === undefined ? (
    <IconButton size="xs" aria-label="asc" icon={<BiSortUp />} />
  ) : (
    <IconButton size="xs" aria-label="desc" icon={<BiSortDown />} />
  )
