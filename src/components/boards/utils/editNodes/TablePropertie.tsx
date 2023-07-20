import { Cross2Icon } from "@radix-ui/react-icons"
import { ChangeEvent, useEffect, useState } from "react"

interface TablePropertieProp {
  id: string
  defaultName?: string
  defaultType?: string
  onRemovePropertie(id: string): void
  onPropretyChange(change: PropertyType): void
}

export type PropertyType = {
  id: string
  columnName?: string
  columnType?: string
}

function TablePropertie({ id, onRemovePropertie, onPropretyChange, defaultName, defaultType }: TablePropertieProp) {
  const [columnName, setColumnName] = useState(defaultName ?? '')
  const [columnType, setColumnType] = useState(defaultType ?? '')

  useEffect(() => {
    const change = { id: id, columnName: columnName, columnType: columnType } satisfies PropertyType
    onPropretyChange(change)
  }, [columnName, columnType])

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    const t = event.target.value
    setColumnName(t)
  }

  function handleTypeChange(event: ChangeEvent<HTMLInputElement>) {
    const t = event.target.value
    setColumnType(t)
  }

  const propertieClass = ' w-[150px] h-[25px] border rounded  bg-white text-black font-normal text-sm pl-2 mx-2 outline-none text-sm mb-4'

  return (
    <div className="flex flex-row items-center">
      <div
        className="w-[12px] h-[12px] -translate-y-[5.5px] rounded-full text-red-300 flex items-center justify-center shadow-md"
        onClick={() => onRemovePropertie(id)}>
        <Cross2Icon />
      </div>
      <input className={propertieClass} onChange={handleNameChange} defaultValue={columnName} />
      <input className={propertieClass} onChange={handleTypeChange} defaultValue={columnType} />
    </div>
  )
}

export default TablePropertie
