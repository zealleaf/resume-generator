"use client"

import { useCallback, useRef } from "react"
import { useReactToPrint } from "react-to-print"
import shortid from "shortid"
import { proxy, subscribe, useSnapshot } from "valtio"
import { subscribeKey } from "valtio/utils"

import {
  cn,
  handleLocalStorageForValtioGetItem,
  handleLocalStorageForValtioSetItem,
} from "@/lib/utils"

import { confetti_store } from "../confetti"
import { record_list_store } from "../various-forms/record-list"
import { template_list_store } from "../various-forms/template-list"
import Templates from "./templates"
import { TRecord, TTemplate } from "./types"

const initial_state = {
  template: "" as TTemplate,
  record: {
    _id: shortid.generate(),
  } as TRecord,
  print_resume: () => {},
}

export const store = proxy(
  handleLocalStorageForValtioGetItem({
    key: "current_resume",
    data: initial_state,
  })
)

subscribeKey(template_list_store, "active", (value) => {
  store.template = value
})

subscribeKey(record_list_store, "active", (value) => {
  const findItem = record_list_store.list.find((item) => item._id === value)
  if (findItem) {
    store.record = findItem
  }
})

subscribe(store, () => {
  handleLocalStorageForValtioSetItem({ key: "current_resume", data: store })

  const index = record_list_store.list.findIndex(
    (item) => item._id === store.record._id
  )
  record_list_store.list.splice(index, 1, store.record)
  record_list_store.active = store.record._id
})

export const Core = () => {
  const resumeRef = useRef(null)
  const store_snapshot = useSnapshot(store)

  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
    onAfterPrint: () => {
      confetti_store.run = true
    },
  })

  store.print_resume = useCallback(() => {
    handlePrint()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div id="resume-core">
      <div
        className={cn(
          "box-content bg-white p-4 text-black transition-all duration-500",
          "ml-[calc(-900px/2+100vw/2-50px)] mt-[-375px] min-h-[1273px] w-[900px] scale-[0.35]",
          "sm:mt-[-220px] sm:scale-[0.6]",
          "md:mt-[-155px] md:scale-[0.7]",
          "lg:mt-[-105px] lg:scale-[0.8]",
          "xl:m-auto xl:scale-[0.9]",
          "2xl:scale-[1]"
        )}
      >
        <div ref={resumeRef}>
          <Templates
            template={store_snapshot.template}
            record={store_snapshot.record as TRecord}
          />
        </div>
      </div>
    </div>
  )
}
