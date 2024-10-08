import { useCallback, useEffect, useMemo } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { UseFormReturn, useForm } from "react-hook-form"
import shortid from "shortid"
import { useSnapshot } from "valtio"
import { z } from "zod"

import { Resume } from "../resume"
import { IDisplayProps } from "./types"

export const useDisplay = ({
  store,
  dataKey,
}: Omit<IDisplayProps, "formCpn" | "dialogTitle" | "tabTitle">) => {
  const store_snapshot = useSnapshot(store)
  const resume_store_snapshot = useSnapshot(Resume.store)

  const callbackDialogClose = useCallback(() => {
    store.show = false
  }, [store])

  const onSubmit = useCallback(() => {
    Resume.store.record[dataKey] = [...store_snapshot.list] as any
    callbackDialogClose()
  }, [store_snapshot.list, dataKey, callbackDialogClose])

  useEffect(() => {
    let ignore = false

    if (ignore) return

    const arr = resume_store_snapshot.record[dataKey] as any

    if (arr) {
      store.list = [...arr]
      store.active_item = arr[0]._id
    } else {
      const _id = shortid.generate()
      store.list = [{ _id }]
      store.active_item = _id
    }

    return () => {
      ignore = true
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return useMemo(() => {
    return {
      store_snapshot,
      onSubmit,
      callbackDialogClose,
    }
  }, [store_snapshot, onSubmit, callbackDialogClose])
}

export const useContent = <
  T extends Record<"store" | "FormSchema" | "values", any>
>({
  store,
  FormSchema,
  values,
}: T): {
  store_snapshot: T["values"]
  formOBJ: UseFormReturn<T["values"], any, undefined>
  save: (data: any) => void
  add: () => void
  remove: () => void
} => {
  const store_snapshot = useSnapshot(store)
  const formOBJ = useForm({
    resolver: zodResolver(FormSchema),
    values,
  })

  const save = useCallback(
    (data: z.infer<typeof FormSchema>) => {
      for (const [i, v] of (store_snapshot.list as any).entries()) {
        if (values._id === v._id) {
          store.list[i] = data
          break
        }
      }
    },
    [store, store_snapshot.list, values._id]
  )

  const add = useCallback(() => {
    const _id = shortid.generate()

    const activeItemIndex = store_snapshot.list.findIndex((item: any) => {
      return item._id === store_snapshot.active_item
    })

    store.list.splice(activeItemIndex + 1, 0, { _id })

    store.active_item = _id
  }, [store, store_snapshot.active_item, store_snapshot.list])

  const remove = useCallback(() => {
    if (store_snapshot.list.length === 1) return

    const newList = store_snapshot.list.filter((item: any) => {
      return item._id !== store_snapshot.active_item
    })

    store.list = newList
    store.active_item = newList[0]._id
  }, [store, store_snapshot.active_item, store_snapshot.list])

  return useMemo(
    () => ({ store_snapshot, formOBJ, save, add, remove }),
    [store_snapshot, formOBJ, save, add, remove]
  )
}
