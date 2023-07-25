"use client"

import { useSnapshot } from "valtio"

import { command_controller_store } from "../command-controller"

export const Display = ({ children }: { children: JSX.Element }) => {
  const command_controller_store_snapshot = useSnapshot(
    command_controller_store
  )

  if (command_controller_store_snapshot.show) {
    return null
  }

  return <div>{children}</div>
}
