import FlowModel from '@/models/FlowModel'
import NoiteAPI from '@/services/NoiteAPI/NoiteAPI'
import type { GetServerSideProps, InferGetStaticPropsType } from 'next'

type MyBoardsProps = {
  flows: FlowModel[]
}

export default function Index({ flows }: InferGetStaticPropsType<typeof getServerSideProps>) {
  const flow: FlowModel[] = flows
  return (
    <div className="w-screen h-screen">
      {flow.map(f => {
        const link = `/boards/board/${f.id}`;
        return (
          <div key={f.id}>
            <a href={link}>
              {f.name}
            </a>
            <br/>
          </div>
        )
      })}
    </div>
  )
}

export const getServerSideProps = (async (context) => {
  // TODO: Get from browser.
  const userId = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InN0cmluZyIsIm5hbWVpZCI6IjY0ZmQwOGVkNzY2YTY4YzhmMTM2NjU2NiIsIm5iZiI6MTY5NTY3MDE1NCwiZXhwIjoxNjk1NjczNzU0LCJpYXQiOjE2OTU2NzAxNTR9.WsZhUm0bqFaqJ4qwUXiKgu8ThH3kS9pxrHov7wnKENs";
  const localstorage = new NoiteAPI(userId);
  const res = await localstorage.myFlows()

  const flows = JSON.parse(JSON.stringify(res))

  return { props: { flows } }
}) satisfies GetServerSideProps<{
  flows: MyBoardsProps
}>

