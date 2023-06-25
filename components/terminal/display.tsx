"use client"

import { useSnapshot } from "valtio"

import { $CommandController } from "../command-controller"

export const Display = ({ children }: { children: JSX.Element }) => {
  const $CommandController_ = useSnapshot($CommandController)

  if ($CommandController_.show) {
    return null
  }

  return <div>{children}</div>
}
