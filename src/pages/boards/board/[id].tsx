import DerBoard from "@/components/boards/DerBoard";
import { useRouter } from 'next/router'

export default function Index() {
  const router = useRouter()
  const { id } = router.query

  if (typeof id != "string") return

  return (
    <div className="w-screen h-screen">
      <DerBoard flowId={id} />
    </div>
  )
}
