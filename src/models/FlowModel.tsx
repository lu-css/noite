import { Edge } from "reactflow";
import TableNodeModel from "./TableNodeModel";

class FlowModel {
  id: string
  name: string
  savedNodes: TableNodeModel[]
  edges: Edge<any>[]

  constructor(id: string, name: string, savedNodes: TableNodeModel[], edges: Edge<any>[]) {
    this.id = id;
    this.name = name;
    this.savedNodes = savedNodes;
    this.edges = edges
  }


  asJson() {
    return {
      tables: this.savedNodes,
      edges: this.edges
    }
  }

  static fromJson(json: any) {
    const tables = json.savedNodes.map((table: any) => TableNodeModel.fromJSON(table))
    console.log(tables)
    const edges = json.edges
    const name = json.name
    const id = json.id
    return new FlowModel(id, name, tables, edges)
  }
}

export default FlowModel
