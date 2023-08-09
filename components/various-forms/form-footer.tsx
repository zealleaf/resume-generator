import React from "react"

import { Button } from "../ui/button"
import { Separator } from "../ui/separator"

const FormFooter = ({
  store_snapshot,
  add,
  remove,
  maxLimit,
}: {
  store_snapshot: any
  add: () => void
  remove: () => void
  maxLimit: number
}) => {
  return (
    <div className="flex h-5 items-center space-x-4 text-sm">
      <Button type="submit" variant={"outline"}>
        Edit
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
