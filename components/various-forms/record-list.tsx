"use client"

import { ChangeEvent, useRef } from "react"
import { delay } from "lodash"
import shortid from "shortid"
import { proxy, subscribe, useSnapshot } from "valtio"

import {
  handleLocalStorageForValtioGetItem,
  handleLocalStorageForValtioSetItem,
} from "@/lib/utils"

import { TRecord } from "../resume"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { toast } from "../ui/use-toast"

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
  const inputRef = useRef<HTMLInputElement>(null)

  if (!record_list_store_snapshot.show) return null

  const selectRecord = (record: TRecord) => {
    record_list_store.active = record._id
    delay(() => {
      record_list_store.show = false
    }, 334)
  }

  const deleteRecord = (record: TRecord) => {
    record_list_store.list = record_list_store.list.filter(
      (item: any) => item._id !== record._id
    )
  }

  const exportAllRecord = () => {
    const data = handleLocalStorageForValtioGetItem({
      key: "record_list",
      data: JSON.stringify(initial_state),
      isRaw: true,
    })

    const blob = new Blob([data], { type: "application/json" })

    const downloadLink = document.createElement("a")
    downloadLink.href = URL.createObjectURL(blob)
    downloadLink.download = `my-resume-record-history-${shortid.generate()}.json`

    document.body.appendChild(downloadLink)

    downloadLink.click()

    document.body.removeChild(downloadLink)
  }

  const addRecord = () => {
    record_list_store.list.push({
      _id: shortid.generate(),
    })
  }

  const importRecordTrigger = () => {
    inputRef.current?.click()
  }

  const importRecordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = (e) => {
        const result = e.target?.result

        try {
          const { active, list } = JSON.parse(result as string)
          if (active) {
            record_list_store.active = active
            record_list_store.list = list
          } else {
            toast({
              content: "The import format is incorrect",
            })
          }
        } catch (error) {
          toast({
            content: "Import failed",
          })
        }
      }

      reader.readAsText(file)
    }
  }

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
          <div className="flex max-h-[400px] min-h-[300px] flex-col items-center space-y-2 overflow-y-scroll p-2">
            {list.length ? (
              list.map((item) => {
                return (
                  <div className="flex w-full space-x-3">
                    <Button
                      className="grow"
                      variant={
                        record_list_store_snapshot.active === item._id
                          ? "default"
                          : "outline"
                      }
                      style={{
                        fontWeight:
                          record_list_store_snapshot.active === item._id
                            ? "bolder"
                            : "lighter",
                      }}
                      onClick={() => {
                        selectRecord(item as TRecord)
                      }}
                    >
                      {item._id}
                    </Button>
                    <Button
                      variant={"destructive"}
                      onClick={() => {
                        deleteRecord(item as TRecord)
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                )
              })
            ) : (
              <div className="w-full py-20 text-center">empty</div>
            )}
          </div>
          <div className="mt-4 flex w-full space-x-3 p-2">
            <section className="grow">
              <Button className="w-full" onClick={addRecord}>
                Add a record
              </Button>
            </section>
            <section className="space-x-1">
              <Button variant={"outline"} onClick={importRecordTrigger}>
                Import
              </Button>
              <Button variant={"secondary"} onClick={exportAllRecord}>
                Export
              </Button>
            </section>
          </div>
        </div>
        <div>
          <input
            className="absolute top-[-99999px] opacity-0"
            type={"file"}
            ref={inputRef}
            onChange={importRecordHandler}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
