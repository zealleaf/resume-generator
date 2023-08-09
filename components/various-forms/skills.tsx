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
  active_item: "",
  list: [] as TSkillsItem[],
})

export const SkillsItem = ({ values }: { values: TReadonlySkillsItem }) => {
  const {
    store_snapshot: skills_store_snapshot,
    formState,
    save,
    add,
    remove,
  } = useContent({
    store: skills_store,
    FormSchema,
    values,
  })

  return (
    <Form {...formState}>
      <form onSubmit={formState.handleSubmit(save)} className="space-y-6">
        <FormField
          control={formState.control}
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
          control={formState.control}
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
      formCpn={function (params: any): JSX.Element {
        return <SkillsItem values={params} />
      }}
      dataKey={"skills"}
      dialogTitle={"Edit Skills"}
      accordionTitle={"skill_kind"}
    />
  )
}
