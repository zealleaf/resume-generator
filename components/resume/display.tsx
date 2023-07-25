"use client"

import EmptyResume from "@/lottie/components/empty-resume"
import { useSnapshot } from "valtio"

import { store } from "./core"

export const Display = ({ children }: { children: JSX.Element }) => {
  const store_snapshot = useSnapshot(store)

  if (!store_snapshot.show) {
    return (
      <div className="flex h-[469px] flex-col items-center space-y-1 rounded-sm border-[1px] border-gray-200 pt-52 dark:border-gray-800 sm:h-[80vh]">
        <EmptyResume />
        <p>Select a template</p>
      </div>
    )
  }

  return (
    <div className="rounded-sm bg-[#31333e] py-3">
      <div className="max-h-[469px] overflow-hidden overflow-y-auto px-3 sm:max-h-[80vh]">
        {children}
      </div>
    </div>
  )
}
