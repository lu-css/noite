import type { GetServerSideProps, InferGetStaticPropsType } from 'next'

import DerBoard from "@/components/boards/DerBoard";
import FlowModel from "@/models/FlowModel";
import NoiteAPI from "@/services/NoiteAPI/NoiteAPI";
import Link from 'next/link';

type BoardProps = {
  flow: FlowModel
}

// TODO: Make here all requests
export default function Index(props: InferGetStaticPropsType<typeof getServerSideProps>) {
  if(!props.flow){
    throw new Error("Something not found");
  }
  // const flow = props.flow
  const noiteapi = new NoiteAPI("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InN0cmluZyIsIm5hbWVpZCI6IjY0ZmQwOGVkNzY2YTY4YzhmMTM2NjU2NiIsIm5iZiI6MTY5NTY3MDE1NCwiZXhwIjoxNjk1NjczNzU0LCJpYXQiOjE2OTU2NzAxNTR9.WsZhUm0bqFaqJ4qwUXiKgu8ThH3kS9pxrHov7wnKENs");

  async function updateNode(flow: FlowModel) {
    await noiteapi.updateFlow(flow.id, flow);
  }

  return (
    <div className="w-screen h-screen flex row-auto" >
      <div>
        <Link href="/boards/myboards">Back to Flows</Link>
      </div>
      <div className="w-full h-full">
        <DerBoard flow={props.flow} updateFlow={updateNode} />
      </div>
    </div >
  )
}

export const getServerSideProps = (async (context) => {
  // TODO: Get from browser.
  const userId = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InN0cmluZyIsIm5hbWVpZCI6IjY0ZmQwOGVkNzY2YTY4YzhmMTM2NjU2NiIsIm5iZiI6MTY5NTY3MDE1NCwiZXhwIjoxNjk1NjczNzU0LCJpYXQiOjE2OTU2NzAxNTR9.WsZhUm0bqFaqJ4qwUXiKgu8ThH3kS9pxrHov7wnKENs";
  const { id } = context.query;

  if(typeof id !== "string" || !id)
    throw new Error("Invalid flow id")

  const noiteapi = new NoiteAPI(userId);
  const res = await noiteapi.getFlow(id)

  if(!res){
    throw new Error("Cannot find flow");
  }

  const flow = JSON.parse(JSON.stringify(res))

  return { props: { flow } }
}) satisfies GetServerSideProps<{
  flow: BoardProps
}>

