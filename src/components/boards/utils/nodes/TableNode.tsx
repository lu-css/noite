import { NodeProps, NodeResizer, Position, Node } from 'reactflow'
import CustomHandle from '../handlers/CustomHandle'

import '@reactflow/node-resizer/dist/style.css'
import { ChangeEvent, useEffect, useState } from 'react'
import TablePropertiesControll from '../editNodes/TablePropertiesControlll'
import TableControll from '../editNodes/TableControll'
import { PropertyType } from '../editNodes/TablePropertie'
import TableNodeModel from '@/models/TableNodeModel'
import TablePropertyModel from '@/models/TablePropertyModel'

const TableNode = ({ selected, id, dragging, data, xPos, yPos }: NodeProps) => {
  const [hovered, setHovered] = useState(false)

  const [inputName, setInputName] = useState(data.table ? data.table.name ?? '' : '')
  const [properties, setProperties] = useState<PropertyType[]>(data.table ? data.table.properties ?? [] : [])

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    const t = event.target.value
    setInputName(t)
  }

  function tablePropertiesChange(changes: PropertyType[]) {
    setProperties(changes)
  }

  useEffect(() => {
    const storedData = localStorage.getItem('data');
    if (storedData) {
    }
  }, []);

  // Save data to localStorage whenever the data state changes
  useEffect(() => {
    const a = properties.map(prop => TablePropertyModel.fromJSON(prop))

    const table = new TableNodeModel(id, inputName, { id: id, data: data, position: { x: xPos, y: yPos }, type: 'table' } satisfies Node, a)
    data.onTableChange(table)
  }, [inputName, properties, xPos]);

  const squareNameClass = `text-center bg-transparent border border-b-0 border-t-0 ${inputName === '' ? ' border-white' : 'border-transparent'}  outline-none text-3x1 text-bold`

  return (
    <div id={id} className={`bg-violet-500 rounded-2xl w-full h-full min-w-[200px] min-h-[100px] node flex items-center justify-center text-white font-bold p-4 relative hover:bg-violet-700 ${selected ? "bg-violet-700" : ""}`}
      onMouseEnter={() => { setHovered(true) }}
      onMouseLeave={() => { setHovered(false) }}>
      <TableControll id={id} onRemove={data.onRemoveNode} visible={hovered && !dragging} />
      <NodeResizer
        lineClassName='border-blue-400'
        handleClassName='h-3 w-3 bg-white border-2 rounded border-blue-400'
        isVisible={selected}
        minWidth={200}
        minHeight={100} />
      <div className='top-2 h-3 w-[80%]  absolute flex items-center'>
        {properties.map(_ => (
          <span className='h-2 w-2 bg-white rounded-full mr-2'></span>
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
