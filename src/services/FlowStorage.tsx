import FlowModel from "@/models/FlowModel"

class FlowStorage {
  flowId: string

  constructor(flowId: string) {
    this.flowId = flowId
  }

  async getFlow(): Promise<FlowModel> {
    const storagedItem = localStorage.getItem(this.flowId)
    if (!storagedItem) return new FlowModel([], [])
    
    try {
      const json = await JSON.parse(storagedItem)

      if (!json) {
        console.error("invalid json", json)
        return new FlowModel([], [])
      }

      const flow = FlowModel.fromJson(json)
      return flow
    }
    catch (e) {
      return new FlowModel([], [])
    }
  }

  saveFlow(flow: FlowModel) {
    const json = JSON.stringify(flow)
    localStorage.setItem(this.flowId, json)
    console.log("Saved")
  }
}

export default FlowStorage
