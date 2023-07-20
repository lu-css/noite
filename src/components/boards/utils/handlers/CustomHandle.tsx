import { Handle, Position } from 'reactflow'

type HandleProps = {
  position: Position
  visible: boolean
}

function getPositionName(position: Position): string {
  switch (position) {
    case Position.Left:
      return "left"
    case Position.Top:
      return "top"
    case Position.Right:
      return "right"
    case Position.Bottom:
      return "bottom"
  }

}

const CustomHandle = (props: HandleProps) => {
  const posName = getPositionName(props.position)
  const classConfig = `-${posName}-5 w-5 h-5 bg-blue-400/80 node-handle ${props.visible ? 'opacity-1' : 'opacity-0'}`

  const handleId = `handle-${posName}`

  return (
    <div>
      <Handle
        id={handleId}
        type="source"
        position={props.position}
        className={classConfig}
      />

    </div>
  )
}

export default CustomHandle
