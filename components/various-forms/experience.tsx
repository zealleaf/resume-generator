"use client"

import { proxy } from "valtio"
import { z } from "zod"

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
import FormFooter from "./form-footer"
import { useContent } from "./hooks"

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

export const experience_store = proxy({
  show: false,
  new_item_id: "",
  active_item: "",
  list: [] as TExperienceItem[],
})

export const ExperienceItem = ({
  values,
}: {
  values: TReadonlyExperienceItem
}) => {
  const {
    store_snapshot: experience_store_snapshot,
    form,
    save,
    add,
    remove,
  } = useContent({
    store: experience_store,
    FormSchema,
    values,
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(save)} className="space-y-6">
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
        <FormFooter
          store_snapshot={experience_store_snapshot}
          add={add}
          remove={remove}
          maxLimit={5}
        />
      </form>
    </Form>
  )
}

export const Experience = () => {
  return (
    <DisplayTabs
      store={experience_store}
      form={function (params: any): JSX.Element {
        return <ExperienceItem values={params} />
      }}
      dataKey={"experience"}
      dialogTitle={"Edit Experience"}
      tabTitle={"company_name"}
    />
  )
}
