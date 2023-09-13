// 'use client'

import { ConnectionMode, Connection, useEdgesState, addEdge, Node, useNodesState } from 'reactflow';
import { GetServerSideProps } from 'next';
import { useCallback, useEffect, useState } from 'react';
import * as Toolbar from '@radix-ui/react-toolbar'
import DefaultFlow from './utils/flow/DefaultFlow';
import TableNodeModel from '@/models/TableNodeModel';
import Localstorage from '@/services/FlowStorage/Localstorage'
import NoiteAPIStorage from '@/services/FlowStorage/NoiteAPIStorage'
import IFlowStorage from '@/services/FlowStorage/IFlowStorage'

import 'reactflow/dist/style.css';
import FlowModel from '@/models/FlowModel';

interface DerBoardProps {
  flowId: string
}

function DerBoard(props: DerBoardProps) {
  const localstorage = new NoiteAPIStorage();
  function buildNodes(tables: TableNodeModel[]): Node[] {
    if (!tables) {
      return []
    }
    tables.forEach(table => {
      table.node.data = {};
      delete table.node.data.onRemoveNode;
      console.log(table)
      table.node.data.onRemoveNode = onRemoveNode;
      table.node.data.onTableChange = handleTableChange;
      table.node.data.table = { id: table.id, name: table.name, properties: table.properties, color: table.color }
    })

    return tables.map(t => t.node)
  }

  // const [localstorage, setLocalstorage] = useState<IFlowStorage>();
  const [nodes, setNodes, onNodeChange] = useNodesState(buildNodes([]));
  const [edges, setEdges, onEdgeChange] = useEdgesState([]);
  const [tables, setTables] = useState<TableNodeModel[]>([])

  const onConnect = useCallback((connection: Connection) => setEdges((edges) => addEdge(connection, edges)), [])

  useEffect(() => {
    localstorage.getFlow(props.flowId).then((a) => {
      if (!a) return []

      setNodes(buildNodes(a.tables))
      setEdges(a.edges)
    })
  }, [props.flowId])

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

    const f = new FlowModel(tables, edges)
    if (!localstorage)
      console.error("Localstorage connection unsuccessful");
    else
      localstorage.saveFlow(props.flowId,f)

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

      <Toolbar.Root className='fixed right-10 top-[60px] bg-transparent rounded-2xl h-96 w-20 overflow-hidden flex justify-center py-4 border border-zinc-100 px-2 hover:border-zinc-300'>
        <Toolbar.Button className='w-32 h-20 opacity-0 bg-violet-500 rounded-full transition-all duration-300 hover:-translate-y-2 text-white flex items-center justify-center px-1 shadow-lg hover:opacity-100' onClick={addSquareNode} >
          Table
        </Toolbar.Button>
      </Toolbar.Root>
    </div>
  );
}

export async function getServerSideProps({ flowId }: DerBoardProps) {
  console.log("FLOW ID AE", flowId);
  return { props: { flowId } };
}

export default DerBoard;
