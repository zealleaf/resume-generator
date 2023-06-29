"use client"

import { useCallback, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import shortid from "shortid"
import { proxy, useSnapshot } from "valtio"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import { Resume } from "../resume"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"

const FormSchema = z.object({
  _id: z.string().nonempty(),
  skill_kind: z.string().nonempty(),
  skill_content: z.string().optional(),
})

type TSkillsItem = z.infer<typeof FormSchema>

type TReadonlySkillsItem = Readonly<z.infer<typeof FormSchema>>

export const $Skills = proxy({
  show: false,
  newTabId: "",
  activeAccordionItem: "",
  list: [] as TSkillsItem[],
})

export const SkillsItem = ({ values }: { values: TReadonlySkillsItem }) => {
  const $Skills_ = useSnapshot($Skills)
  const form = useForm<TReadonlySkillsItem>({
    resolver: zodResolver(FormSchema),
    values,
  })

  const saveJob = (data: z.infer<typeof FormSchema>) => {
    for (const [i, v] of ($Skills_.list as any).entries()) {
      if (values._id === (v as TSkillsItem)._id) {
        $Skills.list[i] = data
        break
      }
    }
  }

  const callbackAddJob = useCallback(() => {
    const _id = shortid.generate()
    $Skills.list.push({ _id } as TSkillsItem)
    $Skills.newTabId = _id
  }, [])

  const callbackRemoveJob = useCallback(() => {
    if ($Skills_.list.length === 1) return

    const newList = $Skills_.list.filter((item) => {
      return item._id !== $Skills_.activeAccordionItem
    })

    $Skills.list = newList as TSkillsItem[]
    $Skills.activeAccordionItem = newList[0]._id
  }, [$Skills_.activeAccordionItem, $Skills_.list])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(saveJob)} className="space-y-6">
        <FormField
          control={form.control}
          name="skill_kind"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="inline-block w-full text-start">
                Skill Kind:
              </FormLabel>
              <FormControl>
                <Input className="w-1/2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="skill_content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="inline-block w-full text-start">
                Skill Content:
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-x-2">
          <Button type="submit" variant={"outline"}>
            Save Skill
          </Button>
          <Button
            type="submit"
            variant={"outline"}
            onClick={callbackAddJob}
            disabled={$Skills_.list.length === 5}
          >
            Add Skill
          </Button>
          <Button
            type="button"
            variant={"destructive"}
            onClick={callbackRemoveJob}
            disabled={$Skills_.list.length === 1}
          >
            Remove Skill
          </Button>
        </div>
      </form>
    </Form>
  )
}

export const Skills = () => {
  const $Skills_ = useSnapshot($Skills)
  const Resume$Core_ = useSnapshot(Resume.$Core)

  const callbackDialogClose = useCallback(() => {
    $Skills.show = false
  }, [])

  function onSubmit() {
    Resume.$Core.userData.skills = [...$Skills_.list] as any

    callbackDialogClose()
  }

  useEffect(() => {
    $Skills.activeAccordionItem = $Skills_.newTabId
  }, [$Skills_.newTabId])

  useEffect(() => {
    $Skills.list = [...Resume$Core_.userData.skills]
    $Skills.activeAccordionItem = Resume$Core_.userData.skills[0]?._id
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Dialog open={$Skills_.show} onOpenChange={callbackDialogClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Skills</DialogTitle>
        </DialogHeader>

        <Accordion
          type="single"
          collapsible
          className="min-h-[300px]"
          value={$Skills_.activeAccordionItem}
          onValueChange={(value) => {
            $Skills.activeAccordionItem = value
          }}
        >
          {$Skills_.list.map((values) => {
            return (
              <AccordionItem key={values._id} value={values._id || "Untitled"}>
                <AccordionTrigger className="font-bold">
                  {values.skill_kind || "Untitled"}
                </AccordionTrigger>
                <AccordionContent className="overflow-visible">
                  <SkillsItem values={values} />
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>

        <DialogFooter>
          <Button className="mt-4 grow" onClick={onSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
