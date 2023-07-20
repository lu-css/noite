import { Cross2Icon } from "@radix-ui/react-icons"

interface TableControllProps {
  onRemove(id: string): void
  id: string,
  visible?: boolean
}

function TableControll(props: TableControllProps) {
  function handleRemoveClick() {
    props.onRemove(props.id)
  }

  const canSee = props.visible ? props.visible : false;

  const containerclass = `transition-all opacity-1 ${canSee ? '' : 'opacity-0'} absolute bottom-full -translate-y-5 duration-1s`

  return (
    <div className={containerclass}>
      <div>
        <button
          className='rounded-full h-6 w-6 bg-red-500 flex items-center justify-center text-white shadow-md hover:bg-red-300'
          onClick={handleRemoveClick} >
          <Cross2Icon /></button>
      </div>
    </div>
  )
}

export default TableControll
