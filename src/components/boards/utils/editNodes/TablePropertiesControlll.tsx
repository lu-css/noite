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

  const [properties, setProperties] = useState<PropertyType[]>(sortArrayToid(defaultProperties || []))

  function sortArrayToid(arr: PropertyType[]): PropertyType[] {
    if(!arr) return []

    return arr.sort((a, b) => {
      if (a.columnName?.endsWith("_id") && !b.columnName?.endsWith("_id")) {
        return 1;
      }

      if (!a.columnName?.endsWith("_id") && b.columnName?.endsWith("_id")) {
        return -1;
      }

      return 0;
    });
  }

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

    updatedProperties.forEach(a => {
      console.log(a.columnName)
    })
    setProperties(sortArrayToid(updatedProperties))
    onPropertyChange(properties)
  }

  function onRemovePropertie(id: string) {
    const newProps = properties.filter(property => property.id !== id)
    setProperties(newProps)
    onPropertyChange(newProps)
  }

  return (
    <div className={`bg-white absolute left-1/2 -translate-x-1/2 top-full translate-y-4 flex items-center flex-col shadow-lg border-0 rounded-2x1 ${canView ? '' : 'hidden'}`}>
      <div className='properties'>
        {properties?.map((propertie, i) => {
          return <TablePropertie
            id={propertie.id}
            key={propertie.id}
            onRemovePropertie={onRemovePropertie}
            onPropretyChange={handlePropertyChange}
            defaultName={propertie.columnName}
            defaultType={propertie.columnType} />
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

