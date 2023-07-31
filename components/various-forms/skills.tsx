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
import DisplayAccordion from "./display-accordion"
import FormFooter from "./form-footer"
import { useContent } from "./hooks"

const FormSchema = z.object({
  _id: z.string().nonempty(),
  skill_kind: z.string().nonempty(),
  skill_content: z.string().optional(),
})

type TSkillsItem = z.infer<typeof FormSchema>

type TReadonlySkillsItem = Readonly<z.infer<typeof FormSchema>>

export const skills_store = proxy({
  show: false,
  newItemId: "",
  activeItem: "",
  list: [] as TSkillsItem[],
})

export const SkillsItem = ({ values }: { values: TReadonlySkillsItem }) => {
  const {
    store_snapshot: skills_store_snapshot,
    form,
    save,
    add,
    remove,
  } = useContent({
    store: skills_store,
    FormSchema,
    values,
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(save)} className="space-y-6">
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
        <FormFooter
          store_snapshot={skills_store_snapshot}
          add={add}
          remove={remove}
          maxLimit={5}
        />
      </form>
    </Form>
  )
}

export const Skills = () => {
  return (
    <DisplayAccordion
      store={skills_store}
      form={function (params: any): JSX.Element {
        return <SkillsItem values={params} />
      }}
      dataKey={"skills"}
      dialogTitle={"Edit Skills"}
      accordionTitle={"skill_kind"}
    />
  )
}
