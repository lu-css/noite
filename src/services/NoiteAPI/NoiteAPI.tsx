import FlowModel from "@/models/FlowModel";
import INotieAPI from "./INoiteAPI";
import axios from "axios";
import TableNodeModel from "@/models/TableNodeModel";
import TableNode from "@/components/boards/utils/nodes/TableNode";

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

    const tables = flow.asJson().tables;
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

    const url = `${this.BASEURL}/api/Flow/${flowId}`;
    const response = await axios.put(url, body, requestConfig)
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
      return FlowModel.fromJson(response.data);
    } catch (error) {
      console.log(error)
      return null;
    }
  }
  async myFlows(): Promise<FlowModel[]> {
    const requestConfig = {
      headers: {
        Authorization: "Bearer " + this.jwtToken
      }
    }

    const url = `${this.BASEURL}/api/Flow/MyFlows`;
    const response = await axios.get(url, requestConfig)
    const body: any[] = response.data;

    return body.map(b => FlowModel.fromJson(b))
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
