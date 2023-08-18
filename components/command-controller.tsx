"use client"

import { useCallback, useEffect } from "react"
import {
  Award,
  Briefcase,
  Code,
  Folder,
  History,
  LayoutTemplate,
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
import { award_store } from "./various-forms/awards"
import { base_info_store } from "./various-forms/base-info"
import { education_store } from "./various-forms/education"
import { experience_store } from "./various-forms/experience"
import { projects_store } from "./various-forms/projects"
import { record_list_store } from "./various-forms/record-list"
import { skills_store } from "./various-forms/skills"
import { template_list_store } from "./various-forms/template-list"

export const command_controller_store = proxy({
  show: true,
})

export default function CommandController() {
  const command_controller_store_snapshot = useSnapshot(
    command_controller_store
  )

  const callbackModalShow = useCallback(
    ({
      which,
    }: {
      which:
        | "TemplateList"
        | "RecordList"
        | "BaseInfo"
        | "Experience"
        | "Skills"
        | "Projects"
        | "Education"
        | "Award"
    }) => {
      switch (which) {
        case "TemplateList":
          template_list_store.show = true
          break

        case "RecordList":
          record_list_store.show = true
          break

        case "BaseInfo":
          base_info_store.show = true
          break

        case "Experience":
          experience_store.show = true
          break

        case "Skills":
          skills_store.show = true
          break

        case "Projects":
          projects_store.show = true
          break

        case "Education":
          education_store.show = true
          break

        case "Award":
          award_store.show = true
          break

        default:
          break
      }
    },
    []
  )

  const callbackTerminalShow = useCallback(() => {
    command_controller_store.show = false
  }, [])

  const callbackprint_resume = useCallback(() => {
    Resume.store.print_resume()
  }, [])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.ctrlKey) {
        switch (e.key) {
          case "b":
            callbackModalShow({ which: "BaseInfo" })
            break

          case "j":
            callbackModalShow({ which: "Experience" })
            break

          case "s":
            callbackModalShow({ which: "Skills" })
            break

          case "p":
            callbackModalShow({ which: "Projects" })
            break

          case "e":
            callbackModalShow({ which: "Education" })
            break

          case "a":
            callbackModalShow({ which: "Award" })
            break

          case "t":
            callbackTerminalShow()
            break

          case "g":
            callbackprint_resume()
            break

          default:
            break
        }
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // JSX render

  if (!command_controller_store_snapshot.show) {
    return null
  }

  return (
    <Command className="h-fit rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList className="max-h-[600px]">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Starter">
          <CommandItem
            className="cursor-pointer"
            onSelect={() => {
              callbackModalShow({ which: "TemplateList" })
            }}
          >
            <LayoutTemplate className="mr-2 h-4 w-4" />
            <span>Select a template</span>
          </CommandItem>

          <CommandItem
            className="cursor-pointer"
            onSelect={() => {
              callbackModalShow({ which: "TemplateList" })
            }}
          >
            <History className="mr-2 h-4 w-4" />
            <span>History edit records</span>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Forms">
          <CommandItem
            className="cursor-pointer"
            onSelect={() => callbackModalShow({ which: "BaseInfo" })}
          >
            <User className="mr-2 h-4 w-4" />
            <span>Base Info</span>
            <CommandShortcut>ctrl+b</CommandShortcut>
          </CommandItem>

          <CommandItem
            className="cursor-pointer"
            onSelect={() => callbackModalShow({ which: "Experience" })}
          >
            <Briefcase className="mr-2 h-4 w-4" />
            <span>Experience</span>
            <CommandShortcut>ctrl+j</CommandShortcut>
          </CommandItem>

          <CommandItem
            className="cursor-pointer"
            onSelect={() => callbackModalShow({ which: "Skills" })}
          >
            <Code className="mr-2 h-4 w-4" />
            <span>Skills</span>
            <CommandShortcut>ctrl+s</CommandShortcut>
          </CommandItem>

          <CommandItem
            className="cursor-pointer"
            onSelect={() => callbackModalShow({ which: "Projects" })}
          >
            <Folder className="mr-2 h-4 w-4" />
            <span>Projects</span>
            <CommandShortcut>ctrl+p</CommandShortcut>
          </CommandItem>

          <CommandItem
            className="cursor-pointer"
            onSelect={() => callbackModalShow({ which: "Education" })}
          >
            <School className="mr-2 h-4 w-4" />
            <span>Education</span>
            <CommandShortcut>ctrl+e</CommandShortcut>
          </CommandItem>

          <CommandItem
            className="cursor-pointer"
            onSelect={() => callbackModalShow({ which: "Award" })}
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
            onSelect={callbackprint_resume}
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
