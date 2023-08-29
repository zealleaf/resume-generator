"use client"

import { delay } from "lodash"
import shortid from "shortid"
import { proxy, subscribe, useSnapshot } from "valtio"

import {
  handleLocalStorageForValtioGetItem,
  handleLocalStorageForValtioSetItem,
} from "@/lib/utils"

import { TRecord } from "../resume"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"

const initial_state = {
  active: "",
  list: [] as TRecord[],
}

export const record_list_store = proxy({
  ...handleLocalStorageForValtioGetItem({
    key: "record_list",
    data: initial_state,
  }),
  show: false,
})

subscribe(record_list_store, () => {
  const { active, list } = record_list_store

  handleLocalStorageForValtioSetItem({
    key: "record_list",
    data: { active, list },
  })
})

export function RecordList() {
  const record_list_store_snapshot = useSnapshot(record_list_store)
  const list = record_list_store_snapshot.list

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
          <DialogTitle>Record List</DialogTitle>
        </DialogHeader>
        <div>
          <div className="flex max-h-[400px] min-h-[300px] flex-col items-center space-y-2 overflow-y-scroll px-2">
            {list.length ? (
              list.map((item) => {
                return (
                  <div
                    className="w-full rounded-lg border py-2 text-center"
                    style={
                      record_list_store_snapshot.active === item._id
                        ? {
                            backgroundColor: "#000",
                            color: "#fff",
                          }
                        : {
                            backgroundColor: "#fff",
                            color: "#000",
                          }
                    }
                    onClick={() => {
                      record_list_store.active = item._id
                      delay(() => {
                        record_list_store.show = false
                      }, 334)
                    }}
                  >
                    {item._id}
                  </div>
                )
              })
            ) : (
              <div className="w-full rounded-lg border py-2 text-center">
                empty
              </div>
            )}
          </div>
          <div
            className="btn mt-4 w-full"
            onClick={() => {
              record_list_store.list.push({
                _id: shortid.generate(),
              })
            }}
          >
            Add a record
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
