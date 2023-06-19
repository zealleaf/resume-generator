"use client"

import { proxy, useSnapshot } from "valtio"
import { subscribeKey } from "valtio/utils"

import { TTemplate, TUserData } from "@/types/resume-core"
import { resetValtioState } from "@/lib/utils"

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

  // TODO 提供生成resume功能函数

  return (
    <div id="resume-core">
      <ResumeTemplates
        template={atom_snapshot_resume_core.template}
        userData={atom_snapshot_resume_core.userData as TUserData}
      />
    </div>
  )
}
