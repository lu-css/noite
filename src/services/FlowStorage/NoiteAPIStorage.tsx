import FlowModel from "@/models/FlowModel";
import IFlowStorage from "./IFlowStorage";
import axios from "axios";
import dotenv from 'dotenv'
import NoiteAPI from "../NoiteAPI/NoiteAPI";

dotenv.config()

class NoiteAPIStorage implements IFlowStorage {
  jwtToken: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InN0cmluZyIsIm5hbWVpZCI6IjY0ZmQwOGVkNzY2YTY4YzhmMTM2NjU2NiIsIm5iZiI6MTY5NDU2MTA4MiwiZXhwIjoxNjk0NTY0NjgyLCJpYXQiOjE2OTQ1NjEwODJ9.O37zHYb2Sv6TkePm0NBp0M3JqGGJEELng9xzG4PhC7g";
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
