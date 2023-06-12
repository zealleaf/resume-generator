"use client"

import { proxy, useSnapshot } from "valtio"
import { subscribeKey } from "valtio/utils"

import { TTemplate, TUserData } from "@/types/resume-core"
import { cn, resetValtioState } from "@/lib/utils"

import ResumeTemplates from "./resume-templates"

const initObj = {
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
  template: "one" as TTemplate,
}

export const atom_resume_core = proxy<{
  show: boolean
  userData: TUserData
  template: TTemplate
}>(initObj)

subscribeKey(atom_resume_core, "show", (v) => {
  if (v === false) {
    resetValtioState(atom_resume_core, initObj)
  }
})

export default function ResumeCore() {
  const atom_snapshot_resume_core = useSnapshot(atom_resume_core)

  // if (!atom_snapshot_resume_core.show) {
  //   return null
  // }

  return (
    <div
      id="resume-core"
      className={cn(
        "relative",
        "overflow-x-hidden",
        "m-auto",
        "h-[500px] w-[335px]",
        "md:h-[650px] md:w-[460px]",
        "lg:h-[780px] lg:w-[552px]",
        "2xl:h-[1169px] 2xl:w-[827px]"
      )}
    >
      <ResumeTemplates
        template={atom_snapshot_resume_core.template}
        userData={atom_snapshot_resume_core.userData as TUserData}
      />
    </div>
  )
}
