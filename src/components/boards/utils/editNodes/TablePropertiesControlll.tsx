import { PlusIcon } from '@radix-ui/react-icons';
import TablePropertie, { PropertyType } from './TablePropertie';
import { useState } from 'react';

interface TablePropertiesProp {
  visible?: boolean,
  defaultProperties?: PropertyType[],
  onPropertyChange(change: PropertyType[]): void
}

export default function TablePropertiesControll({ visible, onPropertyChange, defaultProperties }: TablePropertiesProp) {
  const canView = visible ? visible : false
  const tablePropertiescClassname = `bg-white absolute left-1/2 -translate-x-1/2 top-full translate-y-4 flex items-center flex-col shadow-lg border-0 rounded-2x1 ${canView ? '' : 'hidden'}`

  const [properties, setProperties] = useState<PropertyType[]>(defaultProperties || [])

  function handleAddProp() {
    setProperties(prevElement => [
      ...prevElement,
      { id: crypto.randomUUID() }
    ])
    onPropertyChange(properties)
  }

  function handlePropertyChange(change: PropertyType) {
    // const property = properties.find(property => property.id === change.id)
    const updatedProperties = properties.map(property => {
      if (property.id !== change.id) return property

      return { id: property.id, columnName: change.columnName, columnType: change.columnType } satisfies PropertyType
    })

    setProperties(updatedProperties)
    onPropertyChange(properties)
  }

  function onRemovePropertie(id: string) {
    setProperties(properties.filter(property => property.id !== id))
  }

  return (
    <div className={tablePropertiescClassname}>
      <div className='properties'>
        {properties?.map(propertie => {
          return <TablePropertie onRemovePropertie={onRemovePropertie} id={propertie.id} key={propertie.id} onPropretyChange={handlePropertyChange} defaultName={propertie.columnName} defaultType={propertie.columnType}/>
        })}
      </div>
      <div>
        <button
          className='rounded-full h-6 w-6 bg-white flex items-center justify-center text-purple-500 shadow-md hover:bg-zinc-200'
          onClick={handleAddProp}>

          <PlusIcon /></button>
      </div>
    </div>
  )
}

