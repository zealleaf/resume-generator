import { clsx, type ClassValue } from "clsx"
import { cloneDeep } from "lodash"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const resetValtioState = (
  store: Record<string, unknown>,
  initialObj: Record<string, unknown>
) => {
  const resetObj = cloneDeep(initialObj)
  Object.keys(resetObj).forEach((key) => {
    store[key] = resetObj[key]
  })
}

export const handleLocalStorageForValtioGetItem = <
  T extends Record<"key" | "data", unknown>
>({
  key,
  data,
}: T): T["data"] => {
  if (typeof window !== "undefined") {
    try {
      return JSON.parse(localStorage.getItem(key as string) || "") || data
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

export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    alert(text + "已复制到剪贴板")
  } catch (err) {
    console.error("无法复制文本到剪贴板:", err)
  }
}
