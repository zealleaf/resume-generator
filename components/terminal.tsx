"use client"

import TerminalCore, { TCommand, TCommandMap } from "@/components/terminal-core"

const help: TCommand = ({ setOutPutItemList }) => {
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
    g, generate    Generate resume

  Options:
    -h, --help     Display this message
    -v, --version  Display version number
      `,
      },
    ]
  })
}

const commandMap: TCommandMap = {
  "rg --help": help,
  "rg -h": help,
}

export default function Terminal() {
  return <TerminalCore commandMap={commandMap} />
}
