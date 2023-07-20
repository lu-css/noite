import TablePropertyModel from "./TablePropertyModel"
import { Node } from 'reactflow'

class TableNodeModel {
  id: string
  name: string
  node: Node
  properties: TablePropertyModel[]

  constructor(id: string, name: string, node: Node, properties: TablePropertyModel[]) {
    this.id = id
    this.name = name
    this.properties = properties
    this.node = node
  }

  asJSON = () => ({
    name: this.name,
    node: this.node,
    properties: this.properties,
  })

  static fromJSON(json: any) {
    const properties = json.properties.map((prop: any) => TablePropertyModel.fromJSON(prop))
    return new TableNodeModel(json.id, json.name, json.node, properties)
  }
}

export default TableNodeModel
