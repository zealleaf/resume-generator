"use client"

import { useCallback, useRef } from "react"
import { useReactToPrint } from "react-to-print"
import { proxy, useSnapshot } from "valtio"
import { subscribeKey } from "valtio/utils"

import { cn, resetValtioState } from "@/lib/utils"

import Templates from "./templates"
import { TTemplate, TUserData } from "./type"

const initObj: any = {
  show: false,
  userData: {
    profile: {
      name: "",
      link: "",
      email: "",
      phone: "",
      location: "",
    },
    experience: [{}],
    skills: [{}],
    projects: [{}],
    awards: [{}],
    education: [{}],
  } as TUserData,
  template: "one",
  printResume: () => {},
}

export const core_atom = proxy<{
  show: boolean
  userData: TUserData
  template: TTemplate
  printResume: () => void
}>(initObj)

subscribeKey(core_atom, "show", (v) => {
  if (v === false) {
    resetValtioState(core_atom, initObj)
  }
})

export const Core = () => {
  const resumeRef = useRef(null)
  const core_atom_snapshot = useSnapshot(core_atom)

  // if (!atom_snapshot_resume_core.show) {
  //   return null
  // }

  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
  })

  core_atom.printResume = useCallback(() => {
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
          "lg:scale-[1]"
        )}
      >
        <div ref={resumeRef} className="p-4">
          <Templates
            template={core_atom_snapshot.template}
            userData={core_atom_snapshot.userData as TUserData}
          />
        </div>
      </div>
    </div>
  )
}
