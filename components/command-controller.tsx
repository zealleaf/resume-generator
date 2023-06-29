"use client"

import { useCallback, useEffect } from "react"
import { Briefcase, Code, Printer, Terminal, User } from "lucide-react"
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
import { $Experience } from "./various-forms/experience"
import { $Skills } from "./various-forms/skills"

export const $CommandController = proxy({
  show: true,
})

export default function CommandController() {
  const $CommandController_ = useSnapshot($CommandController)

  const callbackFormShow = useCallback(
    ({ which }: { which: "b" | "e" | "s" }) => {
      switch (which) {
        case "b":
          $BaseInfo.show = true
          break

        case "e":
          $Experience.show = true
          break

        case "s":
          $Skills.show = true
          break

        default:
          break
      }
    },
    []
  )

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
            callbackFormShow({ which: "b" })
            break

          case "e":
            callbackFormShow({ which: "e" })
            break

          case "s":
            callbackFormShow({ which: "s" })
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
  }, [callbackFormShow, callbackTerminalShow, callbackPrintResume])

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
            onSelect={() => callbackFormShow({ which: "b" })}
          >
            <User className="mr-2 h-4 w-4" />
            <span>Base Info</span>
            <CommandShortcut>ctrl+b</CommandShortcut>
          </CommandItem>
          <CommandItem
            className="cursor-pointer"
            onSelect={() => callbackFormShow({ which: "e" })}
          >
            <Briefcase className="mr-2 h-4 w-4" />
            <span>Experience</span>
            <CommandShortcut>ctrl+e</CommandShortcut>
          </CommandItem>
          <CommandItem
            className="cursor-pointer"
            onSelect={() => callbackFormShow({ which: "s" })}
          >
            <Code className="mr-2 h-4 w-4" />
            <span>Skills</span>
            <CommandShortcut>ctrl+s</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Options">
          <CommandItem
            className="cursor-pointer"
            onSelect={callbackPrintResume}
          >
            <Printer className="mr-2 h-4 w-4" />
            <span>Generate Resume</span>
            <CommandShortcut>ctrl+g</CommandShortcut>
          </CommandItem>
          <CommandItem
            className="cursor-pointer"
            onSelect={callbackTerminalShow}
          >
            <Terminal className="mr-2 h-4 w-4" />
            <span>Terminal Mode(wip)</span>
            <CommandShortcut>ctrl+t</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
