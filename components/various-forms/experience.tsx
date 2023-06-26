"use client"

import { useCallback, useEffect, useState } from "react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { toast } from "../ui/use-toast"

const FormSchema = z.object({
  _id: z.string().nonempty(),
  company_name: z.string().nonempty(),
  job_title: z.string().optional(),
  job_location: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  job_responsibilities: z.array(z.string().optional()).optional(),
})

type TExperienceItem = z.infer<typeof FormSchema>

type TReadonlyExperienceItem = Readonly<z.infer<typeof FormSchema>>

export const $Experience = proxy({
  show: false,
  newTabId: "",
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

  function onSubmit(data: z.infer<typeof FormSchema>) {
    for (const [i, v] of ($Experience_.list as any).entries()) {
      if (!!values.company_name && values._id === (v as TExperienceItem)._id) {
        $Experience.list[i] = data
        break
      }

      if (Object.keys(v).length === 1) {
        const _id = shortid.generate()
        $Experience.list[i] = data
        $Experience.list.push({ _id } as TExperienceItem)
        $Experience.newTabId = _id
        break
      }
    }

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify($Experience.list, null, 2)}
          </code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="company_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="inline-block w-full text-start">
                Company Name
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="job_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="inline-block w-full text-start">
                Job Title
              </FormLabel>
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
            <FormItem>
              <FormLabel className="inline-block w-full text-start">
                Job Location
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="start_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="inline-block w-full text-start">
                Location
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="end_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="inline-block w-full text-start">
                End Date
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
            Add
          </Button>
          <Button type="submit" variant={"destructive"}>
            Remove
          </Button>
        </div>
      </form>
    </Form>
  )
}

export const Experience = () => {
  const [activeTab, setActiveTab] = useState("")

  const $Experience_ = useSnapshot($Experience)
  const Resume$Core_ = useSnapshot(Resume.$Core)

  const callbackDialogClose = useCallback(() => {
    $Experience.show = false
  }, [])

  function onSubmit() {
    Resume.$Core.userData.experience = $Experience_.list as any

    callbackDialogClose()

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify($Experience_.list, null, 2)}
          </code>
        </pre>
      ),
    })
  }

  useEffect(() => {
    setActiveTab($Experience_.newTabId)
  }, [$Experience_.newTabId])

  useEffect(() => {
    $Experience.list = Resume$Core_.userData.experience as any
    setActiveTab(Resume$Core_.userData.experience[0]?._id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Dialog open={$Experience_.show} onOpenChange={callbackDialogClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="mb-2">Edit experience</DialogTitle>
          <Tabs
            value={activeTab}
            onValueChange={(value) => {
              setActiveTab(value)
            }}
          >
            <TabsList className="flex items-center justify-start overflow-hidden">
              {$Experience_.list.map((values) => {
                return (
                  <TabsTrigger
                    key={values._id}
                    value={values._id || "Untitled"}
                  >
                    <div className="w-32 justify-start truncate">
                      {values.company_name || "Untitled"}
                    </div>
                  </TabsTrigger>
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
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
