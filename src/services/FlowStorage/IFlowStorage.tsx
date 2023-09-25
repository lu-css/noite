import FlowModel from "@/models/FlowModel"

export default interface IFlowStorage {
  getFlow(flowId: string): Promise<FlowModel | null>
  myFlows(userId: string): Promise<FlowModel[]>;
  saveFlow(flowId: string, flow: FlowModel): void
}
