'use client'

import DerBoard from "@/components/boards/DerBoard";
import { useRouter } from 'next/router'

export default function Index() {
  const router = useRouter()
  const { id } = router.query
  return (
    <div className="w-screen h-screen">
      <DerBoard flowId={id} />
    </div>
  )
}
