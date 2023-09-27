import FlowModel from "@/models/FlowModel"
import IFlowStorage from "./IFlowStorage"

class LocalStorage implements IFlowStorage {
  flowId: string

  constructor(flowId: string) {
    this.flowId = flowId
  }
    myFlows(_userId: string): Promise<FlowModel[]> {
        throw new Error("Method not implemented.")
    }

  async getFlow(): Promise<FlowModel | null> {
    const storagedItem = localStorage.getItem(this.flowId)
    if (!storagedItem) return new FlowModel("", "", [], [])

    try {
      const json = await JSON.parse(storagedItem)

      if (!json) {
        console.error("invalid json", json)
        return new FlowModel("", "", [], [])
      }

      const flow = FlowModel.fromJson(json)
      return flow
    }
    catch (e) {
      return new FlowModel("", "", [], [])
    }
  }

  saveFlow(_flowId: string, flow: FlowModel) {
    const json = JSON.stringify(flow)
    localStorage.setItem(this.flowId, json)
    console.log("Saved")
  }
}

export default LocalStorage
