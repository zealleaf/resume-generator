import { useCallback, useEffect, useMemo } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { UseFormReturn, useForm } from "react-hook-form"
import shortid from "shortid"
import { useSnapshot } from "valtio"
import { z } from "zod"

import { Resume } from "../resume"
import { IDisplayProps } from "./types"

export const useDisplay = ({
  $Atom,
  dataKey,
}: Omit<IDisplayProps, "form" | "dialogTitle" | "tabTitle">) => {
  const $Atom_ = useSnapshot($Atom)
  const Resume$Core_ = useSnapshot(Resume.$Core)

  const callbackDialogClose = useCallback(() => {
    $Atom.show = false
  }, [$Atom])

  const onSubmit = useCallback(() => {
    Resume.$Core.userData[dataKey] = [...$Atom_.list] as any
    callbackDialogClose()
  }, [$Atom_.list, dataKey, callbackDialogClose])

  useEffect(() => {
    $Atom.activeItem = $Atom_.newItemId
  }, [$Atom, $Atom_.newItemId])

  useEffect(() => {
    $Atom.list = [...Resume$Core_.userData[dataKey]]
    $Atom.activeItem = Resume$Core_.userData[dataKey][0]?._id
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return useMemo(() => {
    return {
      $Atom_,
      onSubmit,
      callbackDialogClose,
    }
  }, [$Atom_, onSubmit, callbackDialogClose])
}

export const useContent = <T extends Record<string, any>>({
  $Atom,
  FormSchema,
  values,
}: T): {
  $Atom_: T["values"]
  form: UseFormReturn<T["values"], any, undefined>
  save: (data: any) => void
  add: () => void
  remove: () => void
} => {
  const $Atom_ = useSnapshot($Atom)
  const form = useForm({
    resolver: zodResolver(FormSchema),
    values,
  })

  const save = useCallback(
    (data: z.infer<typeof FormSchema>) => {
      for (const [i, v] of ($Atom_.list as any).entries()) {
        if (values._id === v._id) {
          $Atom.list[i] = data
          break
        }
      }
    },
    [$Atom, $Atom_.list, values._id]
  )

  const add = useCallback(() => {
    const _id = shortid.generate()
    $Atom.list.push({ _id })
    $Atom.newItemId = _id
  }, [$Atom])

  const remove = useCallback(() => {
    if ($Atom_.list.length === 1) return

    const newList = $Atom_.list.filter((item: any) => {
      return item._id !== $Atom_.activeItem
    })

    $Atom.list = newList
    $Atom.activeItem = newList[0]._id
  }, [$Atom, $Atom_.activeItem, $Atom_.list])

  return useMemo(
    () => ({ $Atom_, form, save, add, remove }),
    [$Atom_, form, save, add, remove]
  )
}
