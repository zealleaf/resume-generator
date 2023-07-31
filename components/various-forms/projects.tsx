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
  project_name: z.string().nonempty(),
  project_description: z.string().optional(),
  link: z.string().optional(),
  tools_used: z.string().optional(),
})

type TProjectItem = z.infer<typeof FormSchema>

type TReadonlyProjectItem = Readonly<z.infer<typeof FormSchema>>

export const projects_store = proxy({
  show: false,
  newItemId: "",
  activeItem: "",
  list: [] as TProjectItem[],
})

export const ProjectsItem = ({ values }: { values: TReadonlyProjectItem }) => {
  const {
    store_snapshot: projects_store_snapshot,
    form,
    save,
    add,
    remove,
  } = useContent({
    store: projects_store,
    FormSchema,
    values,
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(save)} className="space-y-6">
        <FormField
          control={form.control}
          name="project_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name:</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tools_used"
          render={({ field }) => (
            <FormItem className="grow">
              <FormLabel>Tools Used:</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem className="grow">
              <FormLabel>Link To Project:</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="project_description"
          render={({ field }) => (
            <FormItem className="grow">
              <FormLabel>Project Description:</FormLabel>
              <FormControl>
                <Textarea className="min-h-[8rem]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <FormFooter
          store_snapshot={projects_store_snapshot}
          add={add}
          remove={remove}
          maxLimit={6}
        />
      </form>
    </Form>
  )
}

export const Projects = () => {
  return (
    <DisplayTabs
      store={projects_store}
      form={function (params: any): JSX.Element {
        return <ProjectsItem values={params} />
      }}
      dataKey={"projects"}
      dialogTitle={"Edit Projects"}
      tabTitle={"project_name"}
    />
  )
}
