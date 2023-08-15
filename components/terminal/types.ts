import { CSSProperties, Dispatch, SetStateAction } from "react"

export interface outPutItem {
  prefix: "$" | ">" | null
  code: string
  style?: CSSProperties
}

export type TCommand = (params: {
  setOutPutItemList: Dispatch<SetStateAction<outPutItem[]>>
  next: () => void
}) => void

export type TCommandMap = Record<string, TCommand>

export interface ITerminal {
  commandMap: TCommandMap
}
