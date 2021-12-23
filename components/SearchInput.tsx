import { z } from 'zod'
import type { SearchValue } from './types'

export type SearchInputProps = Readonly<{
  index: number
  onSearchText: (value: SearchValue) => void
}>

export const SearchInput = ({ index, onSearchText }: SearchInputProps) => (
  <input
    type="search"
    style={{
      border: '0.5px solid black',
      outline: 'none',
      padding: '4px',
    }}
    onChange={e =>
      onSearchText({ index, text: z.string().parse(e.target.value) })
    }
  />
)
