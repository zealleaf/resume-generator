"use client"

import { useCallback, useEffect } from "react"
import { Printer, Terminal, User } from "lucide-react"
import { proxy, useSnapshot } from "valtio"

import { Resume } from "./resume"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./ui/command"
import { $BaseInfo } from "./various-forms/base-info"

export const $CommandController = proxy({
  show: true,
})

export default function CommandController() {
  const $CommandController_ = useSnapshot($CommandController)

  const callbackBaseInfoShow = useCallback(() => {
    $BaseInfo.show = true
  }, [])

  const callbackTerminalShow = useCallback(() => {
    $CommandController.show = false
  }, [])

  const callbackPrintResume = useCallback(() => {
    Resume.$Core.printResume()
  }, [])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.ctrlKey) {
        switch (e.key) {
          case "b":
            callbackBaseInfoShow()
            break

          case "t":
            callbackTerminalShow()
            break

          case "g":
            callbackPrintResume()
            break

          default:
            break
        }
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [callbackBaseInfoShow, callbackTerminalShow, callbackPrintResume])

  // JSX render

  if (!$CommandController_.show) {
    return null
  }

  return (
    <Command className="h-fit rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Forms">
          <CommandItem
            className="cursor-pointer"
            onSelect={callbackBaseInfoShow}
          >
            <User className="mr-2 h-4 w-4" />
            <span>Base info</span>
            <CommandShortcut>ctrl+b</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Options">
          <CommandItem
            className="cursor-pointer"
            onSelect={callbackPrintResume}
          >
            <Printer className="mr-2 h-4 w-4" />
            <span>Generate resume</span>
            <CommandShortcut>ctrl+g</CommandShortcut>
          </CommandItem>
          <CommandItem
            className="cursor-pointer"
            onSelect={callbackTerminalShow}
          >
            <Terminal className="mr-2 h-4 w-4" />
            <span>Terminal mode(wip)</span>
            <CommandShortcut>ctrl+t</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
