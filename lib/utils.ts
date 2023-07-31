import { clsx, type ClassValue } from "clsx"
import { cloneDeep } from "lodash"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function resetValtioState(store: any, initialObj: any) {
  const resetObj = cloneDeep(initialObj)
  Object.keys(resetObj).forEach((key) => {
    ;(store as any)[key] = (resetObj as any)[key]
  })
}
