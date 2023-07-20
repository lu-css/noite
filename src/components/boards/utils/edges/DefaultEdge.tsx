import { EdgeProps, getSmoothStepPath } from "reactflow"

const DefaultEdge = (props: EdgeProps) => {
  const edge = props
  const [edgePath] = getSmoothStepPath(edge)

  return (
    <>
      <path
        id={edge.id}
        style={edge.style}
        className="react-flow__edge-path stroke-2 stroke-purple-500"
        d={edgePath}
        markerEnd={edge.markerEnd}
      />
    </>
  )
}

export default DefaultEdge
