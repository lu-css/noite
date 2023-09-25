import FlowModel from "@/models/FlowModel";
import IFlowStorage from "./IFlowStorage";
import dotenv from 'dotenv'
import NoiteAPI from "../NoiteAPI/NoiteAPI";

dotenv.config()

class NoiteAPIStorage implements IFlowStorage {

  myFlows(userId: string): Promise<FlowModel[]> {
    throw new Error("Method not implemented");
  }

  jwtToken: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InN0cmluZyIsIm5hbWVpZCI6IjY0ZmQwOGVkNzY2YTY4YzhmMTM2NjU2NiIsIm5iZiI6MTY5NTY2NjE3MiwiZXhwIjoxNjk1NjY5NzcyLCJpYXQiOjE2OTU2NjYxNzJ9.q09KfECQWxjP-LeNtn_C4g1L6Szx6nd5OO5S1DG7mrQ";
  noiteapi = new NoiteAPI(this.jwtToken);

  async getFlow(flowId: string): Promise<FlowModel | null> {
    const flow = await this.noiteapi.getFlow(flowId);
    console.log(flow)
    return flow
  }

  async saveFlow(flowId: string, flow: FlowModel): Promise<void> {
    await this.noiteapi.updateFlow(flowId, flow);
  }
}

export default NoiteAPIStorage
