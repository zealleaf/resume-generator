"use client"

import { proxy, useSnapshot } from "valtio"
import { subscribeKey } from "valtio/utils"

import { resetValtioState } from "@/lib/utils"

const initObj = {
  show: false,
  userData: {},
  templateData: {},
}

export const atom_resume_core = proxy(initObj)

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
      <p className="text-sm">你好</p>
    </div>
  )
}
