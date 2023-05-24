"use client"

import { generatePDF } from "@/lib/utils"
import TerminalCore, { TCommand, TCommandMap } from "@/components/terminal-core"

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

  generatePDF(() => {
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
  })
}

const commandMap: TCommandMap = {
  "rg --help": help,
  "rg -h": help,
  "rg g": generate,
  "rg generate": generate,
}

export default function TerminalConsole() {
  return (
    <div className="text-xs md:text-sm lg:text-base">
      <TerminalCore commandMap={commandMap} />
    </div>
  )
}
