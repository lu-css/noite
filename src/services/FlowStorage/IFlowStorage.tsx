import FlowModel from "@/models/FlowModel"

export default interface IFlowStorage {
  getFlow(flowId: string): Promise<FlowModel | null>
  saveFlow(flowId: string, flow: FlowModel): void
}
