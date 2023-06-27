"use client"

import { useCallback, useRef } from "react"
import { useReactToPrint } from "react-to-print"
import shortid from "shortid"
import { proxy, useSnapshot } from "valtio"
import { subscribeKey } from "valtio/utils"

import { cn, resetValtioState } from "@/lib/utils"

import Templates from "./templates"
import { TTemplate, TUserData } from "./type"

const initObj: any = {
  show: true, // TEMP
  userData: {
    profile: {
      name: "",
      link: "",
      email: "",
      phone: "",
      location: "",
    },
    experience: [
      {
        _id: shortid.generate(),
      },
    ],
    skills: [{ _id: shortid.generate() }],
    projects: [
      {
        _id: shortid.generate(),
      },
    ],
    awards: [
      {
        _id: shortid.generate(),
      },
    ],
    education: [
      {
        _id: shortid.generate(),
      },
    ],
  } as TUserData,
  template: "one",
  printResume: () => {},
}

export const $Core = proxy<{
  show: boolean
  userData: TUserData
  template: TTemplate
  printResume: () => void
}>(initObj)

subscribeKey($Core, "show", (v) => {
  if (v === false) {
    resetValtioState($Core, initObj)
  }
})

export const Core = () => {
  const resumeRef = useRef(null)
  const $Core_ = useSnapshot($Core)

  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
  })

  $Core.printResume = useCallback(() => {
    handlePrint()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div id="resume-core">
      <div
        className={cn(
          "box-border bg-white text-black transition-all duration-500",
          "ml-[calc(-794px/2+100vw/2-24px)] mt-[-335px] h-[1123px] w-[794px] scale-[0.4]",
          "sm:mt-[-205px] sm:scale-[0.6]",
          "md:m-auto md:scale-[0.95]",
          "lg:scale-[0.9]",
          "xl:scale-[1]"
        )}
      >
        <div ref={resumeRef} className="p-4">
          <Templates
            template={$Core_.template}
            userData={$Core_.userData as TUserData}
          />
        </div>
      </div>
    </div>
  )
}
