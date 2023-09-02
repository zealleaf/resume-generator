import React from "react"

import { Button } from "../ui/button"
import { Separator } from "../ui/separator"

const FormFooter = ({
  store_snapshot,
  add,
  remove,
  maxLimit,
  isDirty,
}: {
  store_snapshot: any
  add: () => void
  remove: () => void
  maxLimit: number
  isDirty: boolean
}) => {
  return (
    <div className="flex h-5 items-center space-x-4 text-sm">
      <Button type="submit" variant={"outline"} className="relative">
        Save
        {isDirty && (
          <span className="absolute right-[-2px] top-[-2px] h-3 w-3 animate-pulse rounded-full bg-red-500" />
        )}
      </Button>
      <Button
        type="button"
        variant={"destructive"}
        onClick={remove}
        disabled={store_snapshot.list.length === 1}
      >
        Delete
      </Button>
      <Separator orientation="vertical" />
      <Button
        type="button"
        variant={"outline"}
        onClick={add}
        disabled={store_snapshot.list.length === maxLimit}
      >
        New
      </Button>
    </div>
  )
}

export default React.memo(FormFooter)
