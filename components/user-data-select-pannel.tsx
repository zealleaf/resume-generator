import React from "react"
import { proxy, useSnapshot } from "valtio"

export const user_data_select_pannel_store = proxy({
  show: false,
  list: [],
})

export default function TemplateSelectPannel() {
  const user_data_select_pannel_store_snapshot = useSnapshot(
    user_data_select_pannel_store
  )

  if (!user_data_select_pannel_store_snapshot.show) return null

  return <div>UserDataSelectPannel</div>
}
