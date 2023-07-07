"use client"

import { useCallback, useRef } from "react"
import { useReactToPrint } from "react-to-print"
import shortid from "shortid"
import { proxy, subscribe, useSnapshot } from "valtio"

import { cn } from "@/lib/utils"

import Templates from "./templates"
import { TTemplate, TUserData } from "./types"

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

const handleLocalStorageGetItem = () => {
  if (typeof window !== "undefined") {
    try {
      return JSON.parse(localStorage.getItem("current_resume") || "") || initObj
    } catch (error) {
      return initObj
    }
  } else {
    return initObj
  }
}

export const $Core = proxy<{
  show: boolean
  userData: TUserData
  template: TTemplate
  printResume: () => void
}>(handleLocalStorageGetItem())

subscribe($Core, () => {
  if (typeof window !== "undefined") {
    localStorage.setItem("current_resume", JSON.stringify($Core))
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
            template={$Core_.template}
            userData={$Core_.userData as TUserData}
          />
        </div>
      </div>
    </div>
  )
}
