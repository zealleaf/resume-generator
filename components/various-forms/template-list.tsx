"use client"

import React from "react"
import { proxy, useSnapshot } from "valtio"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"

export const template_list_store = proxy({
  show: false,
})

export function TemplateList() {
  const template_list_store_snapshot = useSnapshot(template_list_store)

  if (!template_list_store_snapshot.show) return null

  return (
    <Dialog
      open={template_list_store_snapshot.show}
      onOpenChange={() => {
        template_list_store.show = false
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Template List</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
