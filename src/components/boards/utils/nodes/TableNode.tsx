import { NodeProps, NodeResizer, Position, Node } from 'reactflow'
import CustomHandle from '../handlers/CustomHandle'

import '@reactflow/node-resizer/dist/style.css'
import { ChangeEvent, useEffect, useState } from 'react'
import TablePropertiesControll from '../editNodes/TablePropertiesControlll'
import TableControll from '../editNodes/TableControll'
import { PropertyType } from '../editNodes/TablePropertie'
import TableNodeModel from '@/models/TableNodeModel'
import TablePropertyModel from '@/models/TablePropertyModel'

enum TABLE_COLOR {
  violet = 'bg-violet-500',
  red = 'bg-red-500',
  blue = 'bg-blue-500',
  yellow = 'bg-yellow-500',
  green = 'bg-green-500',
}

enum TABLE_COLOR_HOVER {
  violet = 'bg-violet-700',
  red = 'bg-red-700',
  blue = 'bg-blue-700',
  yellow = 'bg-yellow-700',
  green = 'bg-green-700',
}

const TableNode = ({ selected, id, dragging, data, xPos, yPos }: NodeProps) => {
  const [hovered, setHovered] = useState(false)

  const [inputName, setInputName] = useState(data.table ? data.table.name ?? '' : '')
  const [properties, setProperties] = useState<PropertyType[]>(data.table ? data.table.properties ?? [] : [])
  const [tableColor, setTableColor] = useState(2)

  const colorLoop = [TABLE_COLOR.violet, TABLE_COLOR.red, TABLE_COLOR.blue, TABLE_COLOR.yellow, TABLE_COLOR.green]
  const colorHoverLoop = [TABLE_COLOR_HOVER.violet, TABLE_COLOR_HOVER.red, TABLE_COLOR_HOVER.blue, TABLE_COLOR_HOVER.yellow, TABLE_COLOR_HOVER.green]

  function nextColor() {
    if (tableColor + 1 > colorLoop.length) {
      setTableColor(0)
    }

    setTableColor(oldColor => {
      if (oldColor + 1 >= colorLoop.length) {
        return 0
      }

      return oldColor + 1
    })
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    const t = event.target.value
    setInputName(t)
  }

  function tablePropertiesChange(changes: PropertyType[]) {
    setProperties(changes)
  }

  // Save data to localStorage whenever the data state changes
  useEffect(() => {
    const a = properties.map(prop => TablePropertyModel.fromJSON(prop))

    const table = new TableNodeModel(id, inputName, { id: id, data: data, position: { x: xPos, y: yPos }, type: 'table' } satisfies Node, a)
    data.onTableChange(table)
  }, [inputName, properties, xPos]);

  const squareNameClass = `text-center bg-transparent border border-b-0 border-t-0 ${inputName === '' ? ' border-white' : 'border-transparent'}  outline-none text-3x1 text-bold`

  const propertyCircleColor = colorLoop[tableColor] == TABLE_COLOR.yellow ? TABLE_COLOR.green : TABLE_COLOR.yellow

  return (
    <div id={id} className={`${colorLoop[tableColor]} rounded-2xl w-full h-full min-w-[200px] min-h-[100px] node flex items-center justify-center text-white font-bold p-4 relative ${'hover:' + colorHoverLoop[tableColor]} ${selected ? colorHoverLoop[tableColor] : ""}`}
      onMouseEnter={() => { setHovered(true) }}
      onMouseLeave={() => { setHovered(false) }}>
      <TableControll id={id} onRemove={data.onRemoveNode} visible={hovered && !dragging} />
      <NodeResizer
        lineClassName='border-blue-400'
        handleClassName='h-3 w-3 bg-white border-2 rounded border-blue-400'
        isVisible={selected}
        minWidth={200}
        minHeight={100} />

      <div className='bottom-2 h-3 w-[80%] absolute flex items-center'>
        <span
          className='cursor-pointer'
          onClick={nextColor}
        >color</span>
      </div>
      <div className='top-2 h-3 w-[80%]  absolute flex items-center'>
        {properties.map(property => (
          <span className={`h-2 w-2 ${property.columnName?.endsWith('_id') ? propertyCircleColor : 'bg-white'} rounded-full mr-2`}></span>
        ))}
      </div>

      <CustomHandle position={Position.Right} visible={selected || hovered} />
      <CustomHandle position={Position.Left} visible={selected || hovered} />
      <CustomHandle position={Position.Top} visible={selected || hovered} />
      <CustomHandle position={Position.Bottom} visible={selected || hovered} />

      <input className={squareNameClass} defaultValue={inputName}
        onChange={handleNameChange} />

      <TablePropertiesControll visible={selected && !dragging} onPropertyChange={tablePropertiesChange} defaultProperties={properties} />
    </div >
  )
}

export default TableNode;
