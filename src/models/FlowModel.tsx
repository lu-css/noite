import { Edge } from "reactflow";
import TableNodeModel from "./TableNodeModel";

class FlowModel {
  tables: TableNodeModel[]
  edges: Edge<any>[]

  constructor(tables: TableNodeModel[], edges: Edge<any>[]) {
    this.tables = tables;
    this.edges = edges
  }


  asJson() {
    return {
      tables: this.tables,
      edges: this.edges
    }
  }

  static fromJson(json: any) {
    const tables = json.tables.map((table: any) => TableNodeModel.fromJSON(table))
    console.log(tables)
    const edges = json.edges
    return new FlowModel(tables, edges)
  }
}

export default FlowModel
