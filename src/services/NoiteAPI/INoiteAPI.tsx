import FlowModel from "@/models/FlowModel";

export default interface INotieAPI {
  jwtToken: string
  myFlows(): FlowModel[]
  getFlow(flowId: string): Promise<FlowModel | null>
  updateFlow(flowId: string, flow: FlowModel): Promise<void>
  createFlow(): FlowModel
  register(userName: string, email: string, password: string): Promise<string>
}
