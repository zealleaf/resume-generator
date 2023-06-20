"use client"

import { TCommand, TCommandMap } from "@/types/terminal-core"
import TerminalCore from "@/components/terminal-core"

import { atom_resume_core } from "./resume-core"

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

  atom_resume_core.printResume()

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

const template: TCommand = ({ setOutPutItemList, next }) => {
  atom_resume_core.show = true
  atom_resume_core.template = "one"

  next()
}

const commandMap: TCommandMap = {
  "rg --help": help,
  "rg -h": help,
  "rg g": generate,
  "rg generate": generate,
  "rg t": template,
  "rg template": template,
}

export default function TerminalConsole() {
  return (
    <div>
      <TerminalCore commandMap={commandMap} />
    </div>
  )
}
