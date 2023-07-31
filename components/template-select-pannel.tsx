import React from "react"
import { proxy, useSnapshot } from "valtio"

export const template_select_pannel_store = proxy({
  show: false,
  list: [],
})

export default function TemplateSelectPannel() {
  const template_select_pannel_store_snapshot = useSnapshot(
    template_select_pannel_store
  )

  if (!template_select_pannel_store_snapshot.show) return null

  return <div>TemplateSelectPannel</div>
}
