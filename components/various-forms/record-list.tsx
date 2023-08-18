"use client"

import React from "react"
import { proxy, useSnapshot } from "valtio"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"

export const record_list_store = proxy({
  show: false,
})

export function RecordList() {
  const record_list_store_snapshot = useSnapshot(record_list_store)

  if (!record_list_store_snapshot.show) return null

  return (
    <Dialog
      open={record_list_store_snapshot.show}
      onOpenChange={() => {
        record_list_store.show = false
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Record List</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
