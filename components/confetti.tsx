"use client"

import { delay } from "lodash"
import ReactConfetti from "react-confetti"
import useWindowSize from "react-use/lib/useWindowSize"
import { proxy, useSnapshot } from "valtio"
import { subscribeKey } from "valtio/utils"

export const confetti_store = proxy({
  run: false,
  recycle: false,
})

let timer: any

subscribeKey(confetti_store, "run", (value) => {
  if (value) {
    confetti_store.recycle = true

    if (timer) {
      clearTimeout(timer)
    }

    timer = delay(() => {
      confetti_store.recycle = false
    }, 6000)
  }
})

function Confetti() {
  const confetti_store_snapshot = useSnapshot(confetti_store)

  const { width, height } = useWindowSize()

  return (
    <ReactConfetti
      width={width * 0.98}
      height={height}
      run={confetti_store_snapshot.run}
      recycle={confetti_store_snapshot.recycle}
      onConfettiComplete={() => {
        confetti_store.run = false
      }}
    />
  )
}

export default Confetti
