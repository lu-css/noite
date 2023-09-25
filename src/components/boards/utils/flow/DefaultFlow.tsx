import React, { useCallback, useRef, SetStateAction } from 'react'
import ReactFlow, { Background, ConnectionMode, Controls, ReactFlowProps, updateEdge, Edge } from 'reactflow'
import TableNode from '../nodes/TableNode'

const NODE_TYPES = {
  table: TableNode
}

interface DefaultFlowProps extends ReactFlowProps {
  setEdges(edge: SetStateAction<Edge<any>[]>): any
}

export default function DefaultFlow({ setEdges, nodes, edges, onConnect, onEdgesChange, onNodesChange }: DefaultFlowProps) {
  const edgeUpdateSuccessful = useRef(true);

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge: any, newConnection: any) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_: any, edge: any) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  return (
    <div className='w-full h-full'>
      <ReactFlow
        nodeTypes={NODE_TYPES}
        nodes={nodes}
        edges={edges}
        connectionMode={ConnectionMode.Loose}
        onConnect={onConnect}
        onEdgesChange={onEdgesChange}
        onEdgeUpdate={onEdgeUpdate}
        onEdgeUpdateStart={onEdgeUpdateStart}
        onEdgeUpdateEnd={onEdgeUpdateEnd}
        fitView
        onNodesChange={onNodesChange}
      >
        <Background
          gap={24}
          size={1.5}
        />
        <Controls />
      </ReactFlow>
    </div>
  )
}
