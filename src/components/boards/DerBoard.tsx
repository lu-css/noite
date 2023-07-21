'use client'

import { ConnectionMode, Connection, useEdgesState, addEdge, Node, useNodesState } from 'reactflow';
import { useCallback, useEffect, useState } from 'react';
import * as Toolbar from '@radix-ui/react-toolbar'
import DefaultFlow from './utils/flow/DefaultFlow';
import TableNodeModel from '@/models/TableNodeModel';
import FlowStorage from '@/services/FlowStorage'

import 'reactflow/dist/style.css';
import FlowModel from '@/models/FlowModel';

interface DerBoardProps {
  flowId: string
}

function DerBoard({ flowId }: DerBoardProps) {
  function buildNodes(tables: TableNodeModel[]): Node[] {
    if (!tables) {
      return []
    }
    tables.forEach(table => {
      table.node.data.onRemoveNode = onRemoveNode;
      table.node.data.onTableChange = handleTableChange;
      table.node.data.table = { id: table.id, name: table.name, properties: table.properties }
    })

    return tables.map(t => t.node)
  }

  const [nodes, setNodes, onNodeChange] = useNodesState(buildNodes([]));
  const [edges, setEdges, onEdgeChange] = useEdgesState([]);
  const [tables, setTables] = useState<TableNodeModel[]>([])

  const onConnect = useCallback((connection: Connection) => setEdges((edges) => addEdge(connection, edges)), [])

  useEffect(() => {
    const storage = new FlowStorage(flowId)

    storage.getFlow().then((a) => {
      setNodes(buildNodes(a.tables))
      setEdges(a.edges)
    })
  }, [flowId])

  function onRemoveNode(id: string) {
    setNodes(nodes =>
      nodes.filter(node => node.id !== id)
    )
  }

  function handleTableChange(table: TableNodeModel) {
    setTables(oldTables => {
      if (oldTables && oldTables.some(t => t.id === table.id)) {
        const updatedTable = oldTables.map(t => {
          if (t.id !== table.id) return t

          return table
        })

        return updatedTable
      }

      return [
        ...oldTables,
        table
      ]
    })
  }

  useEffect(() => {

    if (tables.length == 0) {
      return
    }

    const f = new FlowModel(tables, edges)
    const storage = new FlowStorage(flowId)

    storage.saveFlow(f)
  }, [tables, edges])


  function addSquareNode() {
    setNodes(nodes => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: 'table',
        position: {
          x: 300,
          y: 200
        },
        data: { onRemoveNode: onRemoveNode, onTableChange: handleTableChange, a: 'a' },
      }]
    )
  }


  return (
    <div className='w-full h-full bg-white'>
      <DefaultFlow
        setEdges={setEdges}
        nodes={nodes}
        edges={edges}
        connectionMode={ConnectionMode.Loose}
        onConnect={onConnect}
        onEdgesChange={onEdgeChange}
        fitView
        onNodesChange={onNodeChange} />

      <Toolbar.Root className='fixed bottom-20 left-1/2 -translate-x-1/2 bg-white brorder rounded-2xl h-20 w-96 border shadow-lg border-zinc-300 px-8 overflow-hidden'>
        <Toolbar.Button className='w-32 h-32 bg-violet-500 rounded mt-6 transition-transform hover:-translate-y-2 flex align-top justify-center pt-2 text-white' onClick={addSquareNode} >
          Add Table
        </Toolbar.Button>
      </Toolbar.Root>
    </div>
  );
}

export default DerBoard;
