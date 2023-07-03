"use client"

import { useCallback } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import shortid from "shortid"
import { proxy, useSnapshot } from "valtio"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Separator } from "../ui/separator"
import { Textarea } from "../ui/textarea"
import DisplayTabs from "./display-tabs"

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
  newItemId: "",
  activeItem: "",
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
    $Experience.newItemId = _id
  }, [])

  const callbackRemoveJob = useCallback(() => {
    if ($Experience_.list.length === 1) return

    const newList = $Experience_.list.filter((item) => {
      return item._id !== $Experience_.activeItem
    })

    $Experience.list = newList as TExperienceItem[]
    $Experience.activeItem = newList[0]._id
  }, [$Experience_.activeItem, $Experience_.list])

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
              <FormItem className="grow">
                <FormLabel>End Date:</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                <Textarea className="min-h-[8rem]" {...field} />
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
  return (
    <DisplayTabs
      $Atom={$Experience}
      form={function (params: any): JSX.Element {
        return <ExperienceItem values={params} />
      }}
      dataKey={"experience"}
      dialogTitle={"Edit Experience"}
      tabTitle={"company_name"}
    />
  )
}
