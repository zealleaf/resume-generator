import { Core } from "./core"
import { Display } from "./display"
import { commandMap } from "./functions"

export * from "./type"

export const Terminal = {
  Display,
  Core,
  commandMap,
}
