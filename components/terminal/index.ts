import { Core } from "./core"
import { Display } from "./display"
import { commandMap } from "./functions"

export * from "./types"

export const Terminal = {
  Display,
  Core,
  commandMap,
}
