import type { GetServerSideProps, InferGetStaticPropsType } from 'next'

import DerBoard from "@/components/boards/DerBoard";
import FlowModel from "@/models/FlowModel";
import { useState } from 'react';
import LocalStorage from '@/services/FlowStorage/Localstorage';

export default function Index() {
  const [flow, setFlow] = useState<FlowModel>();

  if (!flow) {
    return (
      <input
        type='file'
        accept='.json'
        placeholder='Submit a file'
        onChange={async (e) => {
          const f = e.target.files?.[0];

          if (!f) { return }

          const bytes = await f.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const content = JSON.parse(buffer.toString());

          setFlow(FlowModel.fromJson(content));
        }}
      />
    )
  }

  const storage = new LocalStorage(flow.id);

  function updateNode(flow: FlowModel) {
    storage.saveFlow(flow.id, flow);
  }

  async function saveNodes() {
    const flow = await storage.getFlow();

    if (!flow) {
      return
    }

    const jsonContent = JSON.stringify(flow.asJson())
    const file = new File([jsonContent], 'myFile.json', { type: "text/plain:charset=UTF-8" });
    const url = window.URL.createObjectURL(file);

    var a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  return (
    <div className="w-screen h-screen flex row-auto" >
      <div>
        <a
          onClick={() => setFlow(undefined)}
        >Open new File</a>
        <br />
        <br />
        <a
          onClick={() => saveNodes()}>Save</a>
      </div>
      <div className="w-full h-full">
        <DerBoard flow={flow} updateFlow={updateNode} />
      </div>
    </div >
  )
}

