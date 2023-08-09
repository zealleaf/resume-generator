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
  award_name: z.string().nonempty(),
  more_info: z.string().optional(),
})

type TSkillsItem = z.infer<typeof FormSchema>

type TReadonlySkillsItem = Readonly<z.infer<typeof FormSchema>>

export const award_store = proxy({
  show: false,
  active_item: "",
  list: [] as TSkillsItem[],
})

export const AwardItem = ({ values }: { values: TReadonlySkillsItem }) => {
  const {
    store_snapshot: award_store_snapshot,
    formState,
    save,
    add,
    remove,
  } = useContent({
    store: award_store,
    FormSchema,
    values,
  })

  return (
    <Form {...formState}>
      <form onSubmit={formState.handleSubmit(save)} className="space-y-6">
        <div className="flex space-x-2">
          <FormField
            control={formState.control}
            name="award_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="grow">Award Name:</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={formState.control}
          name="more_info"
          render={({ field }) => (
            <FormItem>
              <FormLabel>More Info:</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormFooter
          store_snapshot={award_store_snapshot}
          add={add}
          remove={remove}
          maxLimit={5}
        />
      </form>
    </Form>
  )
}

export const Awards = () => {
  return (
    <DisplayAccordion
      store={award_store}
      formCpn={function (params: any): JSX.Element {
        return <AwardItem values={params} />
      }}
      dataKey={"awards"}
      dialogTitle={"Edit Awards"}
      accordionTitle={"award_name"}
    />
  )
}
