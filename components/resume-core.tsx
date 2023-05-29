"use client"

import { proxy, useSnapshot } from "valtio"
import { subscribeKey } from "valtio/utils"

import { resetValtioState } from "@/lib/utils"

import ResumeTemplates from "./resume-templates"

const initObj = {
  show: false,
  userData: {} as TUserData,
  template: "one" as TTemplate,
}

export type TUserData = Record<string, any>
export type TTemplate = "one"

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

  if (!atom_snapshot_resume_core.show) {
    return null
  }

  return (
    <div className="resume-core">
      <ResumeTemplates
        template={atom_snapshot_resume_core.template}
        userData={atom_snapshot_resume_core.userData}
      />
    </div>
  )
}
