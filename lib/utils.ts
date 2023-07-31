import { clsx, type ClassValue } from "clsx"
import { cloneDeep } from "lodash"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const resetValtioState = (store: any, initialObj: any) => {
  const resetObj = cloneDeep(initialObj)
  Object.keys(resetObj).forEach((key) => {
    ;(store as any)[key] = (resetObj as any)[key]
  })
}

export const handleLocalStorageForValtioGetItem = ({ key, data }) => {
  if (typeof window !== "undefined") {
    try {
      return JSON.parse(localStorage.getItem(key) || "") || data
    } catch (error) {
      return data
    }
  } else {
    return data
  }
}

export const handleLocalStorageForValtioSetItem = ({ key, data }) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data))
  }
}
