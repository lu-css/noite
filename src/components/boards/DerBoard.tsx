// 'use client'

import { ConnectionMode, Connection, useEdgesState, addEdge, Node, useNodesState } from 'reactflow';
import { useCallback, useEffect, useState } from 'react';
import * as Toolbar from '@radix-ui/react-toolbar';
import DefaultFlow from './utils/flow/DefaultFlow';
import TableNodeModel from '@/models/TableNodeModel';

import 'reactflow/dist/style.css';
import FlowModel from '@/models/FlowModel';
import { FaPlus } from 'react-icons/fa';

interface DerBoardProps {
  flow: FlowModel,
  updateFlow(flow: FlowModel): void
}

function DerBoard(props: DerBoardProps) {
  function buildNodes(tables: TableNodeModel[]): Node[] {
    if (!tables) {
      return []
    }
    tables.forEach(table => {
      table.node.data = {};
      delete table.node.data.onRemoveNode;
      table.node.data.onRemoveNode = onRemoveNode;
      table.node.data.onTableChange = handleTableChange;
      table.node.data.table = { id: table.id, name: table.name, properties: table.properties, color: table.color }
    })

    return tables.map(t => t.node)
  }

  const [nodes, setNodes, onNodeChange] = useNodesState(buildNodes([]));
  const [edges, setEdges, onEdgeChange] = useEdgesState([]);
  const [tables, setTables] = useState<TableNodeModel[]>([])

  const onConnect = useCallback((connection: Connection) => setEdges((edges) => addEdge(connection, edges)), [])

  useEffect(() => {
    setNodes(buildNodes(props.flow.savedNodes))
    setEdges(props.flow.edges)
  }, [props])

  function onRemoveNode(id: string) {
    setNodes(nodes =>
      nodes.filter(node => node.id !== id)
    )

    setTables(oldTables =>
      oldTables.filter(table => table.id !== id)
    )
  }

  function handleTableChange(table: TableNodeModel) {
    setTables(oldTables => {
      if (!oldTables || !oldTables.some(t => t.id === table.id)) {
        return [
          ...oldTables,
          table
        ]
      }

      const updatedTable = oldTables.map(t => {
        if (t.id !== table.id) return t

        return table
      })

      return updatedTable;
    })
  }

  useEffect(() => {
    if (tables.length == 0) {
      return
    }

    const f = new FlowModel(props.flow.id, props.flow.name, tables, edges)
    props.updateFlow(f);

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
    <div className='w-full h-full bg-gray-900/60'>
      <DefaultFlow
        setEdges={setEdges}
        nodes={nodes}
        edges={edges}
        connectionMode={ConnectionMode.Loose}
        onConnect={onConnect}
        onEdgesChange={onEdgeChange}
        fitView
        onNodesChange={onNodeChange} />

      <Toolbar.Root className='fixed right-10 top-[70px] bg-transparent rounded-2xl h-96 w-32 overflow-hidden flex justify-center border-[2px] border-zinc-100/10'>
        <Toolbar.Button className='w-full h-12  bg-violet-500 gap-2 px-2 text-sm hover:bg-violet-500/80 transition-all  text-white flex items-center justify-center shadow-lg' onClick={addSquareNode} >
        <FaPlus></FaPlus> Nova Tabela</Toolbar.Button>
      </Toolbar.Root>
    </div>
  );
}

export default DerBoard;
