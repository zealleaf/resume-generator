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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Separator } from "../ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Textarea } from "../ui/textarea"

const FormSchema = z.object({
  _id: z.string().nonempty(),
  company_name: z.string().nonempty(),
  job_title: z.string().optional(),
  job_location: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  job_responsibilities: z.string().optional(),
})

type TExperienceItem = z.infer<typeof FormSchema>

type TReadonlyExperienceItem = Readonly<z.infer<typeof FormSchema>>

export const $Experience = proxy({
  show: false,
  newTabId: "",
  activeTab: "",
  list: [] as TExperienceItem[],
})

export const ExperienceItem = ({
  values,
}: {
  values: TReadonlyExperienceItem
}) => {
  const $Experience_ = useSnapshot($Experience)
  const form = useForm<TReadonlyExperienceItem>({
    resolver: zodResolver(FormSchema),
    values,
  })

  const saveJob = (data: z.infer<typeof FormSchema>) => {
    for (const [i, v] of ($Experience_.list as any).entries()) {
      if (values._id === (v as TExperienceItem)._id) {
        $Experience.list[i] = data
        break
      }
    }
  }

  const callbackAddJob = useCallback(() => {
    const _id = shortid.generate()
    $Experience.list.push({ _id } as TExperienceItem)
    $Experience.newTabId = _id
  }, [])

  const callbackRemoveJob = useCallback(() => {
    if ($Experience_.list.length === 1) return

    const newList = $Experience_.list.filter((item) => {
      return item._id !== $Experience_.activeTab
    })

    $Experience.list = newList as TExperienceItem[]
    $Experience.activeTab = newList[0]._id
  }, [$Experience_.activeTab, $Experience_.list])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(saveJob)} className="space-y-6">
        <FormField
          control={form.control}
          name="company_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name:</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-2">
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Start Date:</FormLabel>
                <FormControl>
                  <Input placeholder="2023-05" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>End Date:</FormLabel>
                <FormControl>
                  <Input placeholder="2023-06/present" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex space-x-2">
          <FormField
            control={form.control}
            name="job_title"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Job Title:</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="job_location"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Job Location:</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="job_responsibilities"
          render={({ field }) => (
            <FormItem className="grow">
              <FormLabel>Job Responsibilities:</FormLabel>
              <FormControl>
                <Textarea
                  className="min-h-[8rem]"
                  placeholder={`1.xxxxxxxxxxxxxxxx
2.xxxxxxxx
`}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <div className="space-x-2">
          <Button type="submit" variant={"outline"}>
            Save Job
          </Button>
          <Button
            type="submit"
            variant={"outline"}
            onClick={callbackAddJob}
            disabled={$Experience_.list.length === 5}
          >
            Add Job
          </Button>
          <Button
            type="button"
            variant={"destructive"}
            onClick={callbackRemoveJob}
            disabled={$Experience_.list.length === 1}
          >
            Remove Job
          </Button>
        </div>
      </form>
    </Form>
  )
}

export const Experience = () => {
  const $Experience_ = useSnapshot($Experience)
  const Resume$Core_ = useSnapshot(Resume.$Core)

  const callbackDialogClose = useCallback(() => {
    $Experience.show = false
  }, [])

  function onSubmit() {
    Resume.$Core.userData.experience = [...$Experience_.list] as any

    callbackDialogClose()
  }

  useEffect(() => {
    $Experience.activeTab = $Experience_.newTabId
  }, [$Experience_.newTabId])

  useEffect(() => {
    $Experience.list = [...Resume$Core_.userData.experience]
    $Experience.activeTab = Resume$Core_.userData.experience[0]?._id
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Dialog open={$Experience_.show} onOpenChange={callbackDialogClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Experience</DialogTitle>
        </DialogHeader>

        <Tabs
          value={$Experience_.activeTab}
          onValueChange={(value) => {
            $Experience.activeTab = value
          }}
        >
          <TabsList className="my-4 flex items-center justify-start">
            {$Experience_.list.map((values) => {
              return (
                <div>
                  <TabsTrigger
                    key={values._id}
                    value={values._id || "Untitled"}
                  >
                    <div className="w-8 justify-start truncate text-xs font-bold sm:w-16">
                      {values.company_name || "Untitled"}
                    </div>
                  </TabsTrigger>
                </div>
              )
            })}
          </TabsList>

          {$Experience_.list.map((values) => {
            return (
              <TabsContent key={values._id} value={values._id || "Untitled"}>
                <ExperienceItem values={values as TReadonlyExperienceItem} />
              </TabsContent>
            )
          })}
        </Tabs>

        <DialogFooter>
          <Button className="mt-4 grow" onClick={onSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
