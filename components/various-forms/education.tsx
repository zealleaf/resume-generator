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
import { Textarea } from "../ui/textarea"
import DisplayAccordion from "./display-accordion"
import FormFooter from "./form-footer"
import { useContent } from "./hooks"
import { initialStateFN } from "./utils"

const FormSchema = z.object({
  _id: z.string().nonempty(),
  school_name: z.string().nonempty(),
  degree: z.string().nonempty(),
  major: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  additional_information: z.string().optional(),
})

type TReadonlySkillsItem = Readonly<z.infer<typeof FormSchema>>

export const education_store = proxy(initialStateFN())

export const EducationItem = ({ values }: { values: TReadonlySkillsItem }) => {
  const {
    store_snapshot: education_store_snapshot,
    formOBJ,
    save,
    add,
    remove,
  } = useContent({
    store: education_store,
    FormSchema,
    values,
  })

  return (
    <Form {...formOBJ}>
      <form onSubmit={formOBJ.handleSubmit(save)} className="space-y-6">
        <FormField
          control={formOBJ.control}
          name="school_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="inline-block w-full text-start">
                School Name:
              </FormLabel>
              <FormControl>
                <Input className="w-1/2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-2">
          <FormField
            control={formOBJ.control}
            name="degree"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Degree:</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formOBJ.control}
            name="major"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Major:</FormLabel>
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
            control={formOBJ.control}
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
            control={formOBJ.control}
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
        <FormField
          control={formOBJ.control}
          name="additional_information"
          render={({ field }) => (
            <FormItem className="grow">
              <FormLabel>Additional Information:</FormLabel>
              <FormControl>
                <Textarea className="min-h-[8rem]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormFooter
          store_snapshot={education_store_snapshot}
          add={add}
          remove={remove}
          maxLimit={5}
          isDirty={formOBJ.formState.isDirty}
        />
      </form>
    </Form>
  )
}

export const Education = () => {
  return (
    <DisplayAccordion
      store={education_store}
      formCpn={(params) => <EducationItem values={params} />}
      dataKey={"education"}
      dialogTitle={"Edit Education"}
      accordionTitle={"degree"}
    />
  )
}
