import { useCallback, useEffect, useMemo } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { UseFormReturn, useForm } from "react-hook-form"
import shortid from "shortid"
import { useSnapshot } from "valtio"
import { z } from "zod"

import { Resume } from "../resume"
import { IDisplayProps } from "./types"

export const useDisplay = ({
  atom,
  dataKey,
}: Omit<IDisplayProps, "form" | "dialogTitle" | "tabTitle">) => {
  const atom_snapshot = useSnapshot(atom)
  const resume_store_snapshot = useSnapshot(Resume.store)

  const callbackDialogClose = useCallback(() => {
    atom.show = false
  }, [atom])

  const onSubmit = useCallback(() => {
    Resume.store.userData[dataKey] = [...atom_snapshot.list] as any
    callbackDialogClose()
  }, [atom_snapshot.list, dataKey, callbackDialogClose])

  useEffect(() => {
    atom.activeItem = atom_snapshot.newItemId
  }, [atom, atom_snapshot.newItemId])

  useEffect(() => {
    atom.list = [...resume_store_snapshot.userData[dataKey]]
    atom.activeItem = resume_store_snapshot.userData[dataKey][0]?._id
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return useMemo(() => {
    return {
      atom_snapshot,
      onSubmit,
      callbackDialogClose,
    }
  }, [atom_snapshot, onSubmit, callbackDialogClose])
}

export const useContent = <T extends Record<string, any>>({
  atom,
  FormSchema,
  values,
}: T): {
  atom_snapshot: T["values"]
  form: UseFormReturn<T["values"], any, undefined>
  save: (data: any) => void
  add: () => void
  remove: () => void
} => {
  const atom_snapshot = useSnapshot(atom)
  const form = useForm({
    resolver: zodResolver(FormSchema),
    values,
  })

  const save = useCallback(
    (data: z.infer<typeof FormSchema>) => {
      for (const [i, v] of (atom_snapshot.list as any).entries()) {
        if (values._id === v._id) {
          atom.list[i] = data
          break
        }
      }
    },
    [atom, atom_snapshot.list, values._id]
  )

  const add = useCallback(() => {
    const _id = shortid.generate()
    atom.list.push({ _id })
    atom.newItemId = _id
  }, [atom])

  const remove = useCallback(() => {
    if (atom_snapshot.list.length === 1) return

    const newList = atom_snapshot.list.filter((item: any) => {
      return item._id !== atom_snapshot.activeItem
    })

    atom.list = newList
    atom.activeItem = newList[0]._id
  }, [atom, atom_snapshot.activeItem, atom_snapshot.list])

  return useMemo(
    () => ({ atom_snapshot, form, save, add, remove }),
    [atom_snapshot, form, save, add, remove]
  )
}
