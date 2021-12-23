import { Input } from '@chakra-ui/react'
import React from 'react'

export type CellValue = Readonly<{
  row: number
  column: number
  text: string
}>

export type CellProps = Readonly<{
  row: number
  column: number
  text: string
  onChange(value: CellValue): void
}>

export const Cell = ({ row, column, text, onChange }: CellProps) => {
  const [edit, setEdit] = React.useState(false)
  const [value, setValue] = React.useState(text)

  return edit ? (
    <Input
      value={value}
      onKeyDown={evt => {
        if (evt.key === 'Enter') {
          setEdit(false)
          onChange({ row, column, text: value })
        } else if (evt.key === 'Escape') {
          setValue(text)
          setEdit(false)
        }
      }}
      ref={ref => {
        ref?.focus()
      }}
      onBlur={() => {
        setEdit(false)
      }}
      onChange={evt => setValue(evt.currentTarget.value)}
    />
  ) : (
    <span
      onDoubleClick={() => {
        setEdit(true)
      }}
    >
      {text}
    </span>
  )
}
