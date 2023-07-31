"use client"

import { useCallback, useRef } from "react"
import { useReactToPrint } from "react-to-print"
import { proxy, subscribe, useSnapshot } from "valtio"

import {
  cn,
  handleLocalStorageForValtioGetItem,
  handleLocalStorageForValtioSetItem,
} from "@/lib/utils"

import Templates from "./templates"
import { TTemplate, TUserData } from "./types"

const initial_state = {
  show: true,
  user_data: {} as TUserData,
  template: "one" as TTemplate,
  print_resume: () => {},
}

export const store = proxy(
  handleLocalStorageForValtioGetItem({
    key: "current_resume",
    data: initial_state,
  })
)

subscribe(store, () => {
  handleLocalStorageForValtioSetItem({ key: "current_resume", data: store })
})

export const Core = () => {
  const resumeRef = useRef(null)
  const store_snapshot = useSnapshot(store)

  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
  })

  store.print_resume = useCallback(() => {
    handlePrint()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div id="resume-core">
      <div
        className={cn(
          "box-border bg-white text-black transition-all duration-500",
          "ml-[calc(-900px/2+100vw/2-28px)] mt-[-375px] h-[1273px] w-[900px] scale-[0.35]",
          "sm:mt-[-220px] sm:scale-[0.6]",
          "md:mt-[-155px] md:scale-[0.7]",
          "lg:mt-[-105px] lg:scale-[0.8]",
          "xl:m-auto xl:scale-[0.9]",
          "2xl:scale-[1]"
        )}
      >
        <div ref={resumeRef} className="p-4">
          <Templates
            template={store_snapshot.template}
            userData={store_snapshot.user_data as TUserData}
          />
        </div>
      </div>
    </div>
  )
}
