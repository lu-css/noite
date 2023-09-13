import FlowModel from "@/models/FlowModel";
import INotieAPI from "./INoiteAPI";
import axios from "axios";
import TableNodeModel from "@/models/TableNodeModel";

class NoiteAPI implements INotieAPI {
  jwtToken: string;

  constructor(jwtToken: string) {
    this.jwtToken = jwtToken;
  }

  async updateFlow(flowId: string, flow: FlowModel): Promise<void> {
    const requestConfig = {
      headers: {
        Authorization: "Bearer " + this.jwtToken
      }
    }

    const tables = flow.tables;
    const body = tables.map((table: TableNodeModel) => ({
      id: table.id,
      name: table.name,
      color: table.color.toString(),
      type: "table",
      properties: (table.properties.map(prop => (
        {
          id: prop.id,
          columnName: prop.columnName,
          columnType: prop.columnType
        }
      ))),
      node: {
        id: table.node.id,
        position: {
          x: table.node.position.x,
          y: table.node.position.y
        },
        type: table.node.type
      }
    }))

    console.log(body)

    const url = `${this.BASEURL}/api/Flow/${flowId}`;
    const response = await axios.put(url, body, requestConfig)
    console.log(response);
  }

  BASEURL = process.env.NOITE_API_URL ?? "http://localhost:5204";

  async getFlow(flowId: string): Promise<FlowModel | null> {
    const requestConfig = {
      headers: {
        Authorization: "Bearer " + this.jwtToken
      }
    }

    const url = `${this.BASEURL}/api/Flow/${flowId}`;
    const response = await axios.get(url, requestConfig)

    try {
      console.log(response.data.savedNodes);
      const tables = response.data.savedNodes.map((json: any) => TableNodeModel.fromJSON(json));
      console.log(tables);
      return new FlowModel(tables, [])
    } catch (error) {
      console.log(error)
      return null;
    }
  }
  myFlows(): FlowModel[] {
    throw new Error("Method not implemented.");
  }
  createFlow(): FlowModel {
    throw new Error("Method not implemented.");
  }
  async register(userName: string, email: string, password: string): Promise<string> {
    throw new Error("Method not implemented.");
    return "";
  }
}

export default NoiteAPI;
