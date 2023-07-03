"use client"

import { $CommandController } from "../command-controller"
import { Resume } from "../resume"
import { TCommand, TCommandMap } from "./types"

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
    o, open        open the command controller
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
  Resume.$Core.show = true
  Resume.$Core.template = "one"

  next()
}

const open: TCommand = ({ setOutPutItemList, next }) => {
  $CommandController.show = true

  setOutPutItemList((oldData) => {
    return [
      ...oldData,
      {
        prefix: ">",
        code: "opened!",
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

  Resume.$Core.printResume()

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

export const commandMap: TCommandMap = {
  "rg --help": help,
  "rg -h": help,
  "rg t": template,
  "rg template": template,
  "rg o": open,
  "rg open": open,
  "rg g": generate,
  "rg generate": generate,
}
