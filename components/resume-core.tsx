"use client"

import { useEffect, useRef } from "react"
import { useReactToPrint } from "react-to-print"
import { proxy, useSnapshot } from "valtio"
import { subscribeKey } from "valtio/utils"

import { TTemplate, TUserData } from "@/types/resume-core"
import { cn, resetValtioState } from "@/lib/utils"

import ResumeTemplates from "./resume-templates"

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
    works: [{}],
    skills: [{}],
    projects: [{}],
    awards: [{}],
    education: [{}],
  } as TUserData,
  template: "one",
  printResume: () => {},
}

export const atom_resume_core = proxy<{
  show: boolean
  userData: TUserData
  template: TTemplate
  printResume: () => void
}>(initObj)

subscribeKey(atom_resume_core, "show", (v) => {
  if (v === false) {
    resetValtioState(atom_resume_core, initObj)
  }
})

export default function ResumeCore() {
  const resumeRef = useRef(null)
  const atom_snapshot_resume_core = useSnapshot(atom_resume_core)

  // if (!atom_snapshot_resume_core.show) {
  //   return null
  // }

  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
  })

  useEffect(() => {
    atom_resume_core.printResume = handlePrint
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
          <ResumeTemplates
            template={atom_snapshot_resume_core.template}
            userData={atom_snapshot_resume_core.userData as TUserData}
          />
        </div>
      </div>
    </div>
  )
}
