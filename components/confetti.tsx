"use client"

import ReactConfetti from "react-confetti"
import useWindowSize from "react-use/lib/useWindowSize"
import { proxy, useSnapshot } from "valtio"

export const confetti_store = proxy({
  show: false,
})

function Confetti() {
  const confetti_store_snapshot = useSnapshot(confetti_store)

  const { width, height } = useWindowSize()

  if (!confetti_store_snapshot.show) return null

  return <ReactConfetti width={width * 0.98} height={height} />
}

export default Confetti
