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
import { initialStateFN } from "./utils"

const FormSchema = z.object({
  _id: z.string().nonempty(),
  award_name: z.string().nonempty(),
  more_info: z.string().optional(),
})

type TReadonlySkillsItem = Readonly<z.infer<typeof FormSchema>>

export const award_store = proxy(initialStateFN())

export const AwardItem = ({ values }: { values: TReadonlySkillsItem }) => {
  const {
    store_snapshot: award_store_snapshot,
    formOBJ,
    save,
    add,
    remove,
  } = useContent({
    store: award_store,
    FormSchema,
    values,
  })

  return (
    <Form {...formOBJ}>
      <form onSubmit={formOBJ.handleSubmit(save)} className="space-y-6">
        <div className="flex space-x-2">
          <FormField
            control={formOBJ.control}
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
          control={formOBJ.control}
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
          isDirty={formOBJ.formState.isDirty}
        />
      </form>
    </Form>
  )
}

export const Awards = () => {
  return (
    <DisplayAccordion
      store={award_store}
      formCpn={(params) => <AwardItem values={params} />}
      dataKey={"awards"}
      dialogTitle={"Edit Awards"}
      accordionTitle={"award_name"}
    />
  )
}
