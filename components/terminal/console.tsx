"use client"

import { command_controller_atom } from "../command-controller"
import { Resume } from "../resume"
import TerminalCore from "./core"
import { TCommand, TCommandMap } from "./type"

const help: TCommand = ({ setOutPutItemList, next }) => {
  setOutPutItemList((oldData) => {
    return [
      ...oldData,
      {
        prefix: null,
        code: `
  Usage:
    rg <command> [options]

  Commands:
    t, template    Select a resume template
    s, start       start writing
    g, generate    Generate a resume

  Options:
    -h, --help     Display this message
    -v, --version  Display version number
      `,
      },
    ]
  })

  next()
}

const template: TCommand = ({ setOutPutItemList, next }) => {
  Resume.atom_core.show = true
  Resume.atom_core.template = "one"

  next()
}

const start: TCommand = ({ setOutPutItemList, next }) => {
  console.log(111)
  command_controller_atom.show = true
  next()
}

const generate: TCommand = ({ setOutPutItemList, next }) => {
  setOutPutItemList((oldData) => {
    return [
      ...oldData,
      {
        prefix: ">",
        code: "generating...",
      },
    ]
  })

  Resume.atom_core.printResume()

  setOutPutItemList((oldData) => {
    return [
      ...oldData,
      {
        prefix: ">",
        code: "generated!",
      },
    ]
  })

  next()
}

const commandMap: TCommandMap = {
  "rg --help": help,
  "rg -h": help,
  "rg t": template,
  "rg template": template,
  "rg s": start,
  "rg start": start,
  "rg g": generate,
  "rg generate": generate,
}

export default function TerminalConsole() {
  return (
    <div>
      <TerminalCore commandMap={commandMap} />
    </div>
  )
}
