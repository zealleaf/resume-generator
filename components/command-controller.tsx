"use client"

import { useCallback, useEffect } from "react"
import {
  Award,
  Briefcase,
  Code,
  Folder,
  Printer,
  School,
  Terminal,
  User,
} from "lucide-react"
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
import { $Award } from "./various-forms/awards"
import { $BaseInfo } from "./various-forms/base-info"
import { $Education } from "./various-forms/education"
import { $Experience } from "./various-forms/experience"
import { $Projects } from "./various-forms/projects"
import { $Skills } from "./various-forms/skills"

export const $CommandController = proxy({
  show: true,
})

export default function CommandController() {
  const $CommandController_ = useSnapshot($CommandController)

  const callbackFormShow = useCallback(
    ({
      which,
    }: {
      which:
        | "BaseInfo"
        | "Experience"
        | "Skills"
        | "Projects"
        | "Education"
        | "Award"
    }) => {
      switch (which) {
        case "BaseInfo":
          $BaseInfo.show = true
          break

        case "Experience":
          $Experience.show = true
          break

        case "Skills":
          $Skills.show = true
          break

        case "Projects":
          $Projects.show = true
          break

        case "Education":
          $Education.show = true
          break

        case "Award":
          $Award.show = true
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
            callbackFormShow({ which: "BaseInfo" })
            break

          case "j":
            callbackFormShow({ which: "Experience" })
            break

          case "s":
            callbackFormShow({ which: "Skills" })
            break

          case "p":
            callbackFormShow({ which: "Projects" })
            break

          case "e":
            callbackFormShow({ which: "Education" })
            break

          case "a":
            callbackFormShow({ which: "Award" })
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
      <CommandList className="max-h-[600px]">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Forms">
          <CommandItem
            className="cursor-pointer"
            onSelect={() => callbackFormShow({ which: "BaseInfo" })}
          >
            <User className="mr-2 h-4 w-4" />
            <span>Base Info</span>
            <CommandShortcut>ctrl+b</CommandShortcut>
          </CommandItem>
          <CommandItem
            className="cursor-pointer"
            onSelect={() => callbackFormShow({ which: "Experience" })}
          >
            <Briefcase className="mr-2 h-4 w-4" />
            <span>Experience</span>
            <CommandShortcut>ctrl+j</CommandShortcut>
          </CommandItem>
          <CommandItem
            className="cursor-pointer"
            onSelect={() => callbackFormShow({ which: "Skills" })}
          >
            <Code className="mr-2 h-4 w-4" />
            <span>Skills</span>
            <CommandShortcut>ctrl+s</CommandShortcut>
          </CommandItem>
          <CommandItem
            className="cursor-pointer"
            onSelect={() => callbackFormShow({ which: "Projects" })}
          >
            <Folder className="mr-2 h-4 w-4" />
            <span>Projects</span>
            <CommandShortcut>ctrl+p</CommandShortcut>
          </CommandItem>
          <CommandItem
            className="cursor-pointer"
            onSelect={() => callbackFormShow({ which: "Education" })}
          >
            <School className="mr-2 h-4 w-4" />
            <span>Education</span>
            <CommandShortcut>ctrl+e</CommandShortcut>
          </CommandItem>
          <CommandItem
            className="cursor-pointer"
            onSelect={() => callbackFormShow({ which: "Award" })}
          >
            <Award className="mr-2 h-4 w-4" />
            <span>Award</span>
            <CommandShortcut>ctrl+a</CommandShortcut>
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
